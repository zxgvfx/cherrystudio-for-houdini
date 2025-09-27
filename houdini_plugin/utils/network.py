"""网络工具函数"""

import json
from urllib import request as urllib_request


def simple_fetch(url: str, method: str = "GET", data: str = None, headers: dict = None) -> str:
    """简单的网络请求函数"""
    try:
        req = urllib_request.Request(url, data=data.encode() if data else None, method=method)
        if headers:
            for key, value in headers.items():
                req.add_header(key, value)
        
        with urllib_request.urlopen(req, timeout=10.0) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Network request failed: {e}")
        return ""
