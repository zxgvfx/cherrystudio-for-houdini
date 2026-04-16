"""
统一的日志模块
避免在不同文件中重复日志代码
"""

import os
from datetime import datetime
from pathlib import Path


def _get_user_log_dir() -> Path:
    """获取用户日志目录（按 DCC 类型位于 ~/.cherrystudio/<dcc>/logs）。"""
    try:
        from ..core.paths import get_app_data_dir
        log_dir = Path(get_app_data_dir()) / "logs"
    except (ImportError, ValueError):
        try:
            from cherrystudio.core.paths import get_app_data_dir
            log_dir = Path(get_app_data_dir()) / "logs"
        except ImportError:
            try:
                from core.paths import get_app_data_dir
                log_dir = Path(get_app_data_dir()) / "logs"
            except ImportError:
                log_dir = Path.home() / ".cherrystudio" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    return log_dir


class Logger:
    """简单的文件日志记录器"""
    
    def __init__(self, log_file_name: str):
        """
        初始化日志记录器
        
        Args:
            log_file_name: 日志文件名（不含路径）
        """
        # 日志文件路径：用户文件夹下的 logs 目录
        log_dir = _get_user_log_dir()
        self.log_file = log_dir / log_file_name
    
    def log(self, message: str) -> None:
        """记录日志消息"""
        try:
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            full_msg = f"[{timestamp}] {message}"
            print(full_msg)  # 输出到控制台以便调试
            with open(self.log_file, 'a', encoding='utf-8') as f:
                f.write(f"{full_msg}\n")
        except Exception:
            # 静默失败，避免日志记录本身导致程序崩溃
            pass
    
    def __call__(self, message: str) -> None:
        """允许直接调用 logger(message) 的方式记录日志"""
        self.log(message)


# 预定义的日志实例
network_logger = Logger('cherrystudio_network.log')
agent_server_logger = Logger('cherrystudio_agent_server.log')

