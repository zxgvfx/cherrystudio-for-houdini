#!/usr/bin/env python3
import os
import urllib.request
import urllib.error
import json


def test_network_request():
    """简单的网络连通性测试（不再硬编码敏感密钥）。

    运行前请在环境变量中配置：
        CHERRY_API_KEY 或 VVEAI_API_KEY
    """
    url = "https://api.vveai.com/v1/models"

    api_key = os.getenv("CHERRY_API_KEY") or os.getenv("VVEAI_API_KEY")
    if not api_key:
        print("Environment variable CHERRY_API_KEY or VVEAI_API_KEY is required for this test.")
        return None

    headers = {
        "accept": "application/json",
        "authorization": f"Bearer {api_key}",
        "http-referer": "https://cherry-ai.com",
        "x-api-key": api_key,
        "x-stainless-retry-count": "0",
        "x-title": "Cherry Studio",
    }
    
    try:
        req = urllib.request.Request(url, method='GET')
        req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
        
        for key, value in headers.items():
            req.add_header(str(key), str(value))
        
        with urllib.request.urlopen(req, timeout=15.0) as resp:
            raw = resp.read().decode('utf-8', errors='ignore')
            print(f"Success: {len(raw)} bytes")
            print(f"Response preview: {raw[:200]}...")
            
            # 尝试解析JSON
            try:
                data = json.loads(raw)
                if isinstance(data, dict) and 'data' in data:
                    print(f"Parsed {len(data.get('data', []))} models")
                    return data
                else:
                    print("Response is not a valid model list")
                    return None
            except json.JSONDecodeError as e:
                print(f"JSON parse error: {e}")
                return None
                
    except Exception as e:
        print(f"Request failed: {e}")
        return None

if __name__ == "__main__":
    result = test_network_request()
    if result:
        print("✅ Network request successful!")
    else:
        print("❌ Network request failed!")












