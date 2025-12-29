#!/usr/bin/env python3
"""
简单的 MCP 连接测试
"""

import json
import urllib.request

def test_mcp(base_url):
    """测试 MCP 服务器连接"""
    print(f"测试 MCP 服务器: {base_url}")
    
    try:
        # 构造请求
        req = urllib.request.Request(base_url, method='POST')
        req.add_header('Content-Type', 'application/json')
        
        # JSON-RPC 请求获取工具列表
        data = json.dumps({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/list"
        }).encode('utf-8')
        
        # 发送请求
        with urllib.request.urlopen(req, data, timeout=10) as response:
            body = response.read().decode('utf-8')
            result = json.loads(body)
            
            print("✓ 连接成功!")
            print(f"响应: {json.dumps(result, indent=2, ensure_ascii=False)}")
            
            if 'result' in result and 'tools' in result['result']:
                tools = result['result']['tools']
                print(f"\n✓ 获取到 {len(tools)} 个工具:")
                for i, tool in enumerate(tools[:5], 1):  # 显示前5个
                    tool_name = tool.get('name', '未知')
                    tool_desc = tool.get('description', '无描述')
                    print(f"  {i}. {tool_name}: {tool_desc}")
                    
                if len(tools) > 5:
                    print(f"  ... 还有 {len(tools) - 5} 个工具")
                    
                return True
            else:
                print("✗ 响应格式不正确")
                return False
                
    except Exception as e:
        print(f"✗ 连接失败: {e}")
        import traceback
        print(traceback.format_exc())
        return False

if __name__ == "__main__":
    # 测试配置中的 MCP 服务器
    test_mcp("http://mcp.ccc.net/mcp")

