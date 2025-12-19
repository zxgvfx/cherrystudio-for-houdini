"""
统一的日志模块
避免在不同文件中重复日志代码
"""

import os
from datetime import datetime
from pathlib import Path


class Logger:
    """简单的文件日志记录器"""
    
    def __init__(self, log_file_name: str):
        """
        初始化日志记录器
        
        Args:
            log_file_name: 日志文件名（不含路径）
        """
        # 日志文件路径：cherrystudio 目录下
        base_dir = Path(__file__).parent.parent
        self.log_file = base_dir / log_file_name
    
    def log(self, message: str) -> None:
        """记录日志消息"""
        try:
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            with open(self.log_file, 'a', encoding='utf-8') as f:
                f.write(f"[{timestamp}] {message}\n")
        except Exception:
            # 静默失败，避免日志记录本身导致程序崩溃
            pass
    
    def __call__(self, message: str) -> None:
        """允许直接调用 logger(message) 的方式记录日志"""
        self.log(message)


# 预定义的日志实例
network_logger = Logger('cherrystudio_network.log')
agent_server_logger = Logger('cherrystudio_agent_server.log')

