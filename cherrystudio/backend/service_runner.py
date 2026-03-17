"""
Backend Service Runner

两种运行模式：

  Mode A - 嵌入模式（默认）
    由 Houdini 插件在自身进程内启动，作为后台线程运行。
    window_manager.py 调用 BackendService.instance().start()

  Mode B - 独立进程模式
    用 uv / python 直接运行此文件：
      uv run cherrystudio/backend/service_runner.py
      uv run cherrystudio/backend/service_runner.py --port 9876
      uv run cherrystudio/backend/service_runner.py --host 0.0.0.0 --port 9876

    服务启动后将端口号写入 ~/.cherrystudio/backend.port，
    Houdini 插件启动时读取此文件来发现服务地址。
"""

import os
import sys
import threading
import signal
import time
from typing import Optional

# ── 兼容直接运行和包导入两种方式 ─────────────────────────────────────────────
if __name__ == "__main__":
    # 直接运行时，将项目根目录加入 sys.path
    _here = os.path.dirname(os.path.abspath(__file__))
    _project_root = os.path.dirname(os.path.dirname(_here))
    if _project_root not in sys.path:
        sys.path.insert(0, _project_root)
    from cherrystudio.backend.server import BackendHTTPServer
    from cherrystudio.backend.process_manager import pm as _pm
    from cherrystudio.utils.logger import network_logger
else:
    from .server import BackendHTTPServer
    from .process_manager import pm as _pm
    from ..utils.logger import network_logger

# 防御性兜底：若上方某条 import 分支漏写（旧文件遗留），用 print 替代避免 NameError
try:
    _log = network_logger
except NameError:
    class _PrintLogger:
        def __call__(self, msg: str) -> None:
            print(msg)
    _log = network_logger = _PrintLogger()  # type: ignore

# 服务发现文件路径（Houdini 插件通过此文件获知服务端口）
_PORT_FILE = os.path.join(os.path.expanduser("~"), ".cherrystudio", "backend.port")

_instance: Optional["BackendService"] = None
_lock = threading.Lock()


def _write_port_file(port: int, host: str = "127.0.0.1"):
    """将监听端口写入发现文件"""
    try:
        os.makedirs(os.path.dirname(_PORT_FILE), exist_ok=True)
        with open(_PORT_FILE, "w") as f:
            f.write(f"{host}:{port}\n")
        _log(f"[BackendService] Port file written: {_PORT_FILE} -> {host}:{port}")
    except Exception as e:
        _log(f"[BackendService] Failed to write port file: {e}")


def _remove_port_file():
    """服务退出时删除发现文件"""
    try:
        if os.path.exists(_PORT_FILE):
            os.remove(_PORT_FILE)
    except Exception:
        pass


def read_backend_url() -> str:
    """
    读取独立后端服务的 URL（从发现文件）。
    Houdini 插件调用此函数，找到已经运行的后端服务。
    返回 '' 表示未发现运行中的服务。
    """
    try:
        if not os.path.exists(_PORT_FILE):
            return ""
        with open(_PORT_FILE) as f:
            content = f.read().strip()
        if not content:
            return ""
        # 验证服务确实在运行
        import urllib.request
        url = f"http://{content}/api/v1/config/merged"
        req = urllib.request.Request(url, method="GET")
        urllib.request.urlopen(req, timeout=2)
        return f"http://{content}"
    except Exception:
        _remove_port_file()  # 文件存在但服务已停止，清理
        return ""


class BackendService:
    """
    后端服务管理类。

    嵌入模式：
        svc = BackendService.instance()
        port = svc.start()          # 后台线程启动，立即返回端口号

    独立模式（在 __main__ 中使用）：
        svc = BackendService()
        svc.run_forever(host, port)  # 阻塞，直到 Ctrl+C
    """

    def __init__(self):
        self._server: Optional[BackendHTTPServer] = None

    # ── 单例（嵌入模式）──────────────────────────────────────────────────────

    @classmethod
    def instance(cls) -> "BackendService":
        global _instance
        with _lock:
            if _instance is None:
                _instance = cls()
        return _instance

    # ── 生命周期 ──────────────────────────────────────────────────────────────

    def start(self, host: str = "127.0.0.1", port: int = 0) -> int:
        """
        嵌入模式启动：在后台线程运行，立即返回实际端口号。
        port=0 让操作系统自动分配端口。
        """
        if self._server and self._server.is_running():
            _log(f"[BackendService] Already running on port {self._server.port}")
            return self._server.port

        _pm.init()
        self._server = BackendHTTPServer(host=host, port=port)
        actual_port = self._server.start()
        _write_port_file(actual_port, host)
        _log(f"[BackendService] Started (embedded) on {host}:{actual_port}")
        return actual_port

    def run_forever(self, host: str = "127.0.0.1", port: int = 9876):
        """
        独立进程模式：阻塞运行直到收到 Ctrl+C / SIGTERM。
        适合用 uv run / python 直接运行此文件。
        """
        _pm.init()
        self._server = BackendHTTPServer(host=host, port=port)
        actual_port = self._server.start()
        _write_port_file(actual_port, host)

        print(f"\n{'='*55}")
        print(f"  Cherry Studio Backend Service")
        print(f"  Listening on : http://{host}:{actual_port}")
        print(f"  Port file    : {_PORT_FILE}")
        print(f"  API prefix   : /api/v1/")
        print(f"{'='*55}")
        print("  Press Ctrl+C to stop.\n")

        # 注册退出信号
        def _shutdown(sig, frame):
            print("\n[BackendService] Shutting down...")
            self.stop()
            sys.exit(0)

        signal.signal(signal.SIGINT,  _shutdown)
        signal.signal(signal.SIGTERM, _shutdown)

        # 阻塞主线程（服务器在后台线程运行）
        try:
            while self._server.is_running():
                time.sleep(1)
        except KeyboardInterrupt:
            _shutdown(None, None)

    def stop(self):
        _pm.cleanup_all()
        if self._server:
            self._server.stop()
            self._server = None
        _remove_port_file()

    def is_running(self) -> bool:
        return self._server is not None and self._server.is_running()

    # ── 信息查询 ──────────────────────────────────────────────────────────────

    def get_port(self) -> int:
        return self._server.port if self._server else 0

    def get_base_url(self) -> str:
        return self._server.get_base_url() if self._server else ""

    def get_server(self) -> Optional[BackendHTTPServer]:
        return self._server

    # ── Session 管理 ──────────────────────────────────────────────────────────

    def register_dcc_session(self, session_id: str, mcp_port: int,
                              dcc_type: str = "houdini", extra: dict = None):
        if self._server:
            self._server.register_session(session_id, {
                "mcp_port": mcp_port,
                "dcc_type": dcc_type,
                **(extra or {}),
            })

    def get_dcc_session(self, session_id: str) -> dict:
        return self._server.get_session(session_id) if self._server else {}


# ─── 独立运行入口 ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Cherry Studio Backend Service",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例：
  uv run cherrystudio/backend/service_runner.py
  uv run cherrystudio/backend/service_runner.py --port 9876
  uv run cherrystudio/backend/service_runner.py --host 0.0.0.0 --port 9876
        """
    )
    parser.add_argument("--host", default="127.0.0.1",
                        help="监听地址 (默认: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=9876,
                        help="监听端口 (默认: 9876)")
    args = parser.parse_args()

    svc = BackendService()
    svc.run_forever(host=args.host, port=args.port)
