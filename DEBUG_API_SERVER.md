# API 服务器调试指南

## 当前问题

虽然点击了"启动"按钮，但 Agent API 服务器实际上没有启动。需要调试以下几点：

## 调试步骤

### 1. 检查 Python 方法是否被调用

已添加详细日志到 `apiServerStart()` 方法。重新启动应用后，应该在终端看到：

```
[apiServerStart] Called
[apiServerStart] Attempting to start Agent Server...
[apiServerStart] Calling AgentServer.start()...
[apiServerStart] AgentServer.start() returned: success=True, port=12345
[apiServerStart] ✓ Agent server started successfully on port 12345
```

如果看不到这些日志，说明：
- JavaScript 的 `await window.qt.api.apiServerStart()` 没有被调用
- 或者 QWebChannel 绑定有问题

### 2. 检查前端是否正确调用

在浏览器控制台应该看到：

```
[Houdini] Calling apiServerStart (async)...
[Houdini] apiServerStart returned: {"running":true,"port":12345,...}
```

### 3. 检查 AgentApiClient 的 baseURL

AgentApiClient 从 Redux store 的 `settings.apiServer` 获取配置：

```typescript
const { host, port, apiKey } = apiServer
const client = new AgentApiClient({
  baseURL: `http://${host}:${port}`,
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
})
```

**问题可能在这里：**
- 如果 API 服务器启动成功但返回的 port 没有更新到 Redux store
- 前端仍然使用默认的 port（可能是 0 或其他值）
- 导致请求发送到错误的地址

## 修复方案

需要确保当 API 服务器启动成功后：
1. Python 返回正确的 port
2. 前端接收到 port
3. **前端更新 Redux store 中的 `settings.apiServer.port`**
4. AgentApiClient 使用更新后的 port

### 检查 useApiServer hook

在 `web/src/renderer/src/hooks/useApiServer.ts` 的 `startApiServer` 方法中：

```typescript
const result = await window.api.apiServer.start()
if (result.success) {
  setApiServerRunning(true)
  setApiServerEnabled(true)
  // ❓ 是否更新了 port？
  window.toast.success(t('apiServer.messages.startSuccess'))
}
```

**可能缺少：**
```typescript
if (result.success && result.port) {
  dispatch(setApiServerPort(result.port))  // 更新 port 到 Redux
}
```

## 下一步

1. 重新启动应用
2. 打开浏览器开发者工具（F12）
3. 进入"设置" → "API 服务器"
4. 点击启动按钮
5. 查看：
   - 终端中的 Python 日志
   - 浏览器控制台的 JavaScript 日志
   - Redux store 中的 `settings.apiServer.port` 值

## 临时解决方案

如果发现 port 没有更新，可以手动在设置中输入正确的端口号（从 Python 日志中获取）。

