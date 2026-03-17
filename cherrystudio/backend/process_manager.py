"""
子进程生命周期管理器

核心机制：
  1. Windows Job Object — 将所有子进程分配到同一个 Job，
     设置 JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE 标志，
     当主进程退出（包括直接关闭 CMD 窗口）时，
     Windows 自动杀死 Job 内全部进程。

  2. 显式注册表 — 记录所有 Popen 对象，
     在优雅关闭时依次 terminate → kill。

  3. atexit / signal — 作为额外保障。

用法：
    from cherrystudio.backend.process_manager import pm

    proc = subprocess.Popen(...)
    pm.register(proc, "my-service")   # 注册并绑定到 Job

    pm.cleanup_all()                  # 优雅关闭全部子进程
"""

import atexit
import os
import subprocess
import threading
from typing import Dict, Optional

try:
    from ..utils.logger import network_logger as _log
except Exception:
    _log = print  # type: ignore


# ─── Windows Job Object ──────────────────────────────────────────────────────

_job_handle = None

if os.name == "nt":
    try:
        import ctypes
        from ctypes import wintypes

        kernel32 = ctypes.windll.kernel32  # type: ignore[attr-defined]

        # Job Object constants
        JobObjectExtendedLimitInformation = 9
        JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE = 0x2000
        PROCESS_SET_QUOTA = 0x0100
        PROCESS_TERMINATE = 0x0001

        class JOBOBJECT_BASIC_LIMIT_INFORMATION(ctypes.Structure):
            _fields_ = [
                ("PerProcessUserTimeLimit", ctypes.c_int64),
                ("PerJobUserTimeLimit", ctypes.c_int64),
                ("LimitFlags", wintypes.DWORD),
                ("MinimumWorkingSetSize", ctypes.c_size_t),
                ("MaximumWorkingSetSize", ctypes.c_size_t),
                ("ActiveProcessLimit", wintypes.DWORD),
                ("Affinity", ctypes.POINTER(ctypes.c_ulong)),
                ("PriorityClass", wintypes.DWORD),
                ("SchedulingClass", wintypes.DWORD),
            ]

        class IO_COUNTERS(ctypes.Structure):
            _fields_ = [
                ("ReadOperationCount", ctypes.c_uint64),
                ("WriteOperationCount", ctypes.c_uint64),
                ("OtherOperationCount", ctypes.c_uint64),
                ("ReadTransferCount", ctypes.c_uint64),
                ("WriteTransferCount", ctypes.c_uint64),
                ("OtherTransferCount", ctypes.c_uint64),
            ]

        class JOBOBJECT_EXTENDED_LIMIT_INFORMATION(ctypes.Structure):
            _fields_ = [
                ("BasicLimitInformation", JOBOBJECT_BASIC_LIMIT_INFORMATION),
                ("IoInfo", IO_COUNTERS),
                ("ProcessMemoryLimit", ctypes.c_size_t),
                ("JobMemoryLimit", ctypes.c_size_t),
                ("PeakProcessMemoryUsed", ctypes.c_size_t),
                ("PeakJobMemoryUsed", ctypes.c_size_t),
            ]

        def _create_job_object():
            """创建带有 KILL_ON_JOB_CLOSE 标志的 Job Object"""
            global _job_handle
            handle = kernel32.CreateJobObjectW(None, None)
            if not handle:
                _log("[ProcessManager] Failed to create Job Object")
                return

            info = JOBOBJECT_EXTENDED_LIMIT_INFORMATION()
            info.BasicLimitInformation.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE
            if not kernel32.SetInformationJobObject(
                handle,
                JobObjectExtendedLimitInformation,
                ctypes.byref(info),
                ctypes.sizeof(info),
            ):
                _log("[ProcessManager] Failed to set Job Object info")
                kernel32.CloseHandle(handle)
                return

            _job_handle = handle
            _log("[ProcessManager] Windows Job Object created (KILL_ON_JOB_CLOSE)")

        def _assign_to_job(proc: subprocess.Popen) -> bool:
            """将子进程分配到 Job Object"""
            if not _job_handle:
                return False
            try:
                h_process = kernel32.OpenProcess(
                    PROCESS_SET_QUOTA | PROCESS_TERMINATE, False, proc.pid
                )
                if not h_process:
                    return False
                result = kernel32.AssignProcessToJobObject(_job_handle, h_process)
                kernel32.CloseHandle(h_process)
                return bool(result)
            except Exception as e:
                _log(f"[ProcessManager] Assign to job failed: {e}")
                return False

        def _kill_process_tree(pid: int):
            """终止整个进程树（Windows taskkill /T /F）"""
            try:
                subprocess.run(
                    ["taskkill", "/F", "/T", "/PID", str(pid)],
                    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                    timeout=10,
                    creationflags=subprocess.CREATE_NO_WINDOW,
                )
            except Exception:
                pass

    except Exception as e:
        _log(f"[ProcessManager] Win32 Job Object unavailable: {e}")

        def _create_job_object():
            pass

        def _assign_to_job(proc):
            return False

        def _kill_process_tree(pid):
            pass
else:
    # Unix: 使用 process group
    import signal as _signal

    def _create_job_object():
        pass

    def _assign_to_job(proc):
        return False

    def _kill_process_tree(pid: int):
        try:
            os.killpg(os.getpgid(pid), _signal.SIGKILL)
        except Exception:
            try:
                os.kill(pid, _signal.SIGKILL)
            except Exception:
                pass


# ─── 进程注册表 ──────────────────────────────────────────────────────────────

class ProcessManager:
    """管理所有由应用启动的子进程"""

    def __init__(self):
        self._procs: Dict[int, tuple] = {}  # {pid: (Popen, label)}
        self._lock = threading.Lock()
        self._initialized = False

    def init(self):
        """初始化 Job Object（应在服务启动时调用一次）"""
        if self._initialized:
            return
        self._initialized = True
        _create_job_object()
        atexit.register(self.cleanup_all)
        _log("[ProcessManager] Initialized with atexit cleanup")

    def register(self, proc: subprocess.Popen, label: str = ""):
        """注册子进程并绑定到 Job Object"""
        if proc is None or proc.pid is None:
            return
        self.init()
        with self._lock:
            self._procs[proc.pid] = (proc, label)
        assigned = _assign_to_job(proc)
        _log(f"[ProcessManager] Registered PID={proc.pid} label={label!r} job={assigned}")

    def unregister(self, proc: subprocess.Popen):
        """取消注册（进程已自行退出时调用）"""
        if proc is None or proc.pid is None:
            return
        with self._lock:
            self._procs.pop(proc.pid, None)

    def cleanup_all(self):
        """优雅关闭所有注册的子进程"""
        with self._lock:
            procs = list(self._procs.items())
            self._procs.clear()

        if not procs:
            return

        _log(f"[ProcessManager] Cleaning up {len(procs)} child process(es)...")

        # 第一轮：terminate
        for pid, (proc, label) in procs:
            try:
                if proc.poll() is None:
                    _log(f"[ProcessManager] Terminating PID={pid} ({label})")
                    proc.terminate()
            except Exception:
                pass

        # 等待短暂时间让进程优雅退出
        import time
        time.sleep(1.0)

        # 第二轮：强杀仍存活的进程（包括子进程树）
        for pid, (proc, label) in procs:
            try:
                if proc.poll() is None:
                    _log(f"[ProcessManager] Force killing PID={pid} ({label})")
                    _kill_process_tree(pid)
                    try:
                        proc.kill()
                    except Exception:
                        pass
            except Exception:
                pass

        _log("[ProcessManager] Cleanup complete")

    def get_status(self) -> dict:
        """获取所有注册进程的状态"""
        with self._lock:
            return {
                pid: {
                    "label": label,
                    "alive": proc.poll() is None,
                    "returncode": proc.returncode,
                }
                for pid, (proc, label) in self._procs.items()
            }


# 全局单例
pm = ProcessManager()
