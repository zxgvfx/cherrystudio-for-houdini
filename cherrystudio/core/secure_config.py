# -*- coding: utf-8 -*-
# cython: language_level=3
"""
安全配置模块 - 代理 URL 混淆存储，绕过规则从中心化配置读取

编译命令：
    python setup_secure.py build_ext --inplace
"""

import base64
import json
import os
import zlib


# ============================================================
# 混淆存储的代理 URL（编译后难以直接读取）
# ============================================================

class _ProxyConfig:
    """混淆的代理配置"""

    _D1 = b'eJwztDTSMzSz0DMy1DMyMgUAFM0Cwg=='
    _D2 = b'eJwzNLAwsAAAAvoBAg=='
    
    @staticmethod
    def _decode(data):
        """解码数据"""
        try:
            return zlib.decompress(base64.b64decode(data)).decode('utf-8')
        except:
            return ''
    
    @classmethod
    def get_url(cls):
        """获取代理 URL"""
        host = cls._decode(cls._D1)
        port = cls._decode(cls._D2)
        if host and port:
            return f"http://{host}:{port}"
        return ''


# ============================================================
# 从中心化配置读取绕过规则
# ============================================================

def _get_centralized_config_path():
    """获取中心化配置文件路径"""
    possible_paths = [
        os.path.join(os.path.dirname(__file__), '..', 'resources', 'centralized-config.json'),
        os.path.join('cherrystudio', 'resources', 'centralized-config.json'),
        os.path.join(os.path.dirname(os.path.dirname(__file__)), 'resources', 'centralized-config.json'),
    ]
    
    for path in possible_paths:
        abs_path = os.path.abspath(path)
        if os.path.exists(abs_path):

            return abs_path
    

    return None


def _load_bypass_rules():
    """从中心化配置加载绕过规则"""
    config_path = _get_centralized_config_path()
    if not config_path:

        return _get_default_bypass_rules()
    
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
            proxy_config = config.get('proxy', {})
            bypass_rules = proxy_config.get('bypassRules', '')
            if bypass_rules:
                # print(f"[SecureConfig] Loaded bypass rules: {bypass_rules}")
                return bypass_rules
            else:
                # print(f"[SecureConfig] No bypassRules in config, using default")
                pass
    except Exception as e:
        # print(f"[SecureConfig] Failed to load bypass rules: {e}")
        pass
    
    return _get_default_bypass_rules()


def _get_default_bypass_rules():
    """默认绕过规则（备用）"""
    return "localhost,127.0.0.1,::1"


# ============================================================
# 公开 API
# ============================================================

def get_secure_proxy():
    """获取安全代理配置
    
    Returns:
        dict: {'proxyUrl': str, 'bypassRules': str}
    """
    proxy_url = _ProxyConfig.get_url()
    bypass_rules = _load_bypass_rules()
    
    return {
        'proxyUrl': proxy_url,
        'bypassRules': bypass_rules
    }


def is_hardcoded_proxy_enabled():
    """检查是否启用了托管代理"""
    return bool(_ProxyConfig.get_url())


def get_bypass_rules():
    """单独获取绕过规则"""
    return _load_bypass_rules()


