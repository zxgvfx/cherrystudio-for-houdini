#!/usr/bin/env python3
"""
MCP 连接诊断脚本
帮助诊断为什么某些电脑无法连接到 MCP 服务器
"""

import sys
import json
import urllib.request
import urllib.error
import socket
import platform

def check_dns(hostname):
    """检查 DNS 解析"""
    print(f"\n[1] 检查 DNS 解析: {hostname}")
    try:
        ip = socket.gethostbyname(hostname)
        print(f"✓ DNS 解析成功: {hostname} -> {ip}")
        return ip
    except socket.gaierror as e:
        print(f"✗ DNS 解析失败: {e}")
        return None

def check_port(host, port, timeout=5):
    """检查端口是否可访问"""
    print(f"\n[2] 检查端口连接: {host}:{port}")
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        result = sock.connect_ex((host, port))
        sock.close()
        if result == 0:
            print(f"✓ 端口 {port} 可访问")
            return True
        else:
            print(f"✗ 端口 {port} 无法访问 (错误代码: {result})")
            return False
    except Exception as e:
        print(f"✗ 端口检查失败: {e}")
        return False

def check_http_request(url, timeout=10):
    """检查 HTTP 请求"""
    print(f"\n[3] 检查 HTTP 请求: {url}")
    try:
        req = urllib.request.Request(url, method='GET')
        req.add_header('User-Agent', 'CherryStudio-MCP-Checker/1.0')
        
        with urllib.request.urlopen(req, timeout=timeout) as response:
            status = response.status
            content_type = response.headers.get('Content-Type', 'unknown')
            body = response.read().decode('utf-8', errors='ignore')[:500]
            
            print(f"✓ HTTP 请求成功")
            print(f"  状态码: {status}")
            print(f"  Content-Type: {content_type}")
            print(f"  响应内容 (前500字符):\n{body}")
            return True
            
    except urllib.error.HTTPError as e:
        print(f"✗ HTTP 错误: {e.code} {e.reason}")
        try:
            error_body = e.read().decode('utf-8', errors='ignore')[:500]
            print(f"  错误响应:\n{error_body}")
        except:
            pass
        return False
    except urllib.error.URLError as e:
        print(f"✗ URL 错误: {e.reason}")
        return False
    except Exception as e:
        print(f"✗ 请求失败: {e}")
        return False

def check_mcp_tools(base_url, timeout=10):
    """尝试获取 MCP 工具列表"""
    print(f"\n[4] 尝试获取 MCP 工具列表")
    
    # 尝试不同的 MCP 端点
    endpoints = [
        '',  # 基础URL
        '/list_tools',
        '/tools/list',
        '/mcp/list_tools'
    ]
    
    for endpoint in endpoints:
        url = base_url.rstrip('/') + endpoint
        print(f"\n  尝试端点: {url}")
        
        try:
            req = urllib.request.Request(url, method='POST')
            req.add_header('Content-Type', 'application/json')
            req.add_header('User-Agent', 'CherryStudio-MCP/1.0')
            
            # 尝试 JSON-RPC 格式
            data = json.dumps({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "tools/list"
            }).encode('utf-8')
            
            req.add_header('Content-Length', str(len(data)))
            
            with urllib.request.urlopen(req, data, timeout=timeout) as response:
                status = response.status
                body = response.read().decode('utf-8', errors='ignore')
                
                print(f"  ✓ 响应状态: {status}")
                print(f"  响应内容:\n{body[:1000]}")
                
                try:
                    result = json.loads(body)
                    if 'result' in result and 'tools' in result['result']:
                        tools = result['result']['tools']
                        print(f"  ✓ 成功获取 {len(tools)} 个工具")
                        return True
                except:
                    pass
                    
        except Exception as e:
            print(f"  ✗ 失败: {e}")
    
    return False

def print_system_info():
    """打印系统信息"""
    print("\n" + "="*60)
    print("系统信息")
    print("="*60)
    print(f"操作系统: {platform.system()} {platform.release()}")
    print(f"Python 版本: {sys.version}")
    print(f"主机名: {socket.gethostname()}")
    
    # 检查代理设置
    try:
        import os
        http_proxy = os.environ.get('HTTP_PROXY') or os.environ.get('http_proxy')
        https_proxy = os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy')
        if http_proxy or https_proxy:
            print(f"\n代理设置:")
            if http_proxy:
                print(f"  HTTP_PROXY: {http_proxy}")
            if https_proxy:
                print(f"  HTTPS_PROXY: {https_proxy}")
        else:
            print("\n代理设置: 未设置")
    except:
        pass

def main():
    print("="*60)
    print("Cherry Studio MCP 连接诊断工具")
    print("="*60)
    
    print_system_info()
    
    # 从配置文件读取或使用默认值
    mcp_url = "http://mcp.ccc.net/mcp"
    
    if len(sys.argv) > 1:
        mcp_url = sys.argv[1]
    
    print(f"\n目标 MCP 服务器: {mcp_url}")
    print("="*60)
    
    # 解析 URL
    from urllib.parse import urlparse
    parsed = urlparse(mcp_url)
    hostname = parsed.hostname or "mcp.ccc.net"
    port = parsed.port or 80
    
    # 执行检查
    ip = check_dns(hostname)
    
    if ip:
        check_port(ip, port)
    
    check_http_request(mcp_url)
    check_mcp_tools(mcp_url)
    
    print("\n" + "="*60)
    print("诊断完成")
    print("="*60)
    
    print("\n建议:")
    print("1. 如果 DNS 解析失败，请检查网络连接或配置 hosts 文件")
    print("2. 如果端口无法访问，请检查防火墙设置")
    print("3. 如果 HTTP 请求失败，请检查代理设置")
    print("4. 确保 A 电脑和 B 电脑在同一网络环境")
    print("5. 检查 Cherry Studio 的日志输出")

if __name__ == "__main__":
    main()

