# API 服务器端口同步修复

## 问题描述

虽然 API 服务器启动成功，但创建 Agent 时仍然失败，显示网络错误。

## 根本原因

1. **Python 端**：API 服务器使用 `port=0` 启动，让系统自动分配端口（如 12345）
2. **前端 Redux**：`settings.apiServer.port` 保存的是默认值（如 3000）
3. **AgentApiClient**：从 Redux 读取 `host` 和 `port`，构造 `baseURL: http://127.0.0.1:3000`
4. **结果**：请求发送到错误的端口，导致网络错误

```
Python 启动: port 12345 ✓
Redux 存储: port 3000  ✗
前端请求: http://127.0.0.1:3000  ✗ (连接失败)
```

## 修复方案

### 1. Python 端添加详细日志

**文件：** `cherrystudio/api/cherry_studio_api.py`

添加日志以便调试：

```python
@Slot(result=str)
def apiServerStart(self) -> str:
    """启动 API 服务器"""
    _log("[apiServerStart] Called")
    try:
        # ... 启动逻辑 ...
        if success:
            _log(f"[apiServerStart] ✓ Agent server started successfully on port {port}")
            return json.dumps({
                "running": True,
                "port": port,  # 返回实际端口
                "url": f"http://127.0.0.1:{port}",
                "error": None
            })
```

### 2. JavaScript 桥接层返回端口

**文件：** `cherrystudio/web/electron_injector.py`

确保返回的对象包含 `port` 字段：

```javascript
apiServerApi.start = async function () {
    try {
        var resultStr = await window.qt?.api?.apiServerStart?.();
        if (typeof resultStr === 'string' && resultStr) {
            var result = JSON.parse(resultStr);
            // 返回完整信息，包括 port
            return {
                success: result.running || false,
                error: result.error || null,
                port: result.port || null,      // ← 新增
                url: result.url || null          // ← 新增
            };
        }
    } catch (e) {
        return { success: false, error: String(e), port: null };
    }
};
```

### 3. 前端 Hook 更新 Redux

**文件：** `web/src/renderer/src/hooks/useApiServer.ts`

在启动成功后，将实际端口更新到 Redux：

```typescript
import { setApiServerPort } from '@renderer/store/settings'

const startApiServer = useCallback(async () => {
  try {
    const result = await window.api.apiServer.start()
    logger.info('API server start result:', result)
    
    if (result.success) {
      setApiServerRunning(true)
      setApiServerEnabled(true)
      
      // ✓ 更新实际端口到 Redux
      if (result.port) {
        logger.info(`API server started on port ${result.port}, updating Redux store`)
        dispatch(setApiServerPort(result.port))
      }
      
      window.toast.success(t('apiServer.messages.startSuccess'))
    }
  } catch (error: any) {
    logger.error('Failed to start API server:', error)
    window.toast.error(t('apiServer.messages.startError') + error.message)
  }
}, [dispatch, ...])
```

## 数据流

修复后的完整流程：

```
1. 用户点击"启动"按钮
   ↓
2. 前端调用: window.api.apiServer.start()
   ↓
3. JavaScript 桥接: await window.qt.api.apiServerStart()
   ↓
4. Python 执行: apiServerStart() 
   - 启动服务器在随机端口 (如 12345)
   - 返回: {"running": true, "port": 12345, "url": "http://127.0.0.1:12345"}
   ↓
5. JavaScript 桥接返回: {success: true, port: 12345, url: "..."}
   ↓
6. 前端 Hook 接收结果
   - dispatch(setApiServerPort(12345))  ← 更新 Redux
   - Redux: settings.apiServer.port = 12345 ✓
   ↓
7. AgentApiClient 初始化
   - 从 Redux 读取: port = 12345 ✓
   - baseURL = "http://127.0.0.1:12345" ✓
   ↓
8. 创建 Agent 请求
   - POST http://127.0.0.1:12345/v1/agents ✓
   - 成功！
```

## 测试步骤

1. **重新编译前端**：
   ```bash
   cd web
   npm run build
   ```

2. **重新启动应用**：
   ```bash
   cd ..
   python start_cherry_studio.py
   ```

3. **启动 API 服务器**：
   - 进入"设置" → "API 服务器"
   - 点击绿色 ▶️ 按钮
   - 查看终端日志，应该看到：
     ```
     [apiServerStart] Called
     [apiServerStart] ✓ Agent server started successfully on port 12345
     ```

4. **验证端口更新**：
   - 在浏览器控制台输入：
     ```javascript
     window.store.getState().settings.apiServer.port
     ```
   - 应该显示实际端口（如 `12345`），而不是默认值

5. **创建 Agent**：
   - 点击"添加 Agent"
   - 填写信息并选择模型
   - 点击"创建"
   - 应该成功创建！

## 相关文件

- `cherrystudio/api/cherry_studio_api.py` - Python API，添加日志
- `cherrystudio/web/electron_injector.py` - JavaScript 桥接，返回 port
- `web/src/renderer/src/hooks/useApiServer.ts` - 前端 Hook，更新 Redux
- `web/src/renderer/src/hooks/agents/useAgentClient.ts` - 使用 Redux 中的 port

## 修复日期

2025-12-25

