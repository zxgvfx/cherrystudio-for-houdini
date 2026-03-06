# API 服务器"未启动"问题修复

## 问题描述

用户在点击"设置" → "API 服务器"（可能被理解为"模型服务"）时，会出现以下问题：
1. 页面显示"API 服务器已启用但未正常运行"的错误提示
2. 点击启动按钮后显示"启动API服务器失败：Not available"

## 根本原因

在 Houdini for Qt 版本中，QWebChannel 会**自动将 Python 的 `@Slot` 方法转换为 JavaScript 中的异步函数（返回 Promise）**。

但是 `electron_injector.py` 中的 API Server 桥接代码没有正确处理这个异步特性：

1. **问题 1**：JavaScript 代码直接调用 `window.qt.api.apiServerStatus()`，但没有使用 `await` 等待 Promise 完成
2. **问题 2**：代码期望返回字符串，但实际返回的是 `[object Promise]`

前端 TypeScript 代码期望这些函数返回 Promise：

```typescript
const status = await window.api.apiServer.getStatus()
```

这导致前端无法正确获取 API 服务器的状态，从而显示错误提示。

## 修复方案

修改 `cherrystudio/web/electron_injector.py` 中的以下函数，使用 `async/await` 语法正确等待 QWebChannel 返回的 Promise：

1. `apiServerApi.getStatus()` - 获取服务器状态
2. `apiServerApi.start()` - 启动服务器
3. `apiServerApi.stop()` - 停止服务器
4. `apiServerApi.restart()` - 重启服务器

### 修改示例

**修改前（错误 - 未使用 await）：**
```javascript
apiServerApi.getStatus = function () {
    try {
        // ❌ 错误：window.qt.api.apiServerStatus() 返回 Promise，但没有 await
        var statusStr = window.qt?.api?.apiServerStatus?.();
        // statusStr 实际是 [object Promise]，不是字符串！
        if (typeof statusStr === 'string') {
            var status = JSON.parse(statusStr);
            return {
                running: status.running || false,
                config: status.config || null
            };
        }
    } catch (e) {
        console.error('[Houdini] apiServer.getStatus error:', e);
    }
    return { running: false, config: null };
};
```

**修改后（正确 - 使用 async/await）：**
```javascript
apiServerApi.getStatus = async function () {
    // ✅ 正确：使用 async 函数和 await 等待 Promise
    try {
        console.log('[Houdini] Calling apiServerStatus (async)...');
        var statusStr = await window.qt?.api?.apiServerStatus?.();
        console.log('[Houdini] apiServerStatus returned:', statusStr, 'type:', typeof statusStr);
        
        if (typeof statusStr === 'string' && statusStr) {
            var status = JSON.parse(statusStr);
            console.log('[Houdini] apiServer.getStatus result:', status);
            return {
                running: status.running || false,
                config: status.config || null
            };
        } else {
            console.error('[Houdini] apiServerStatus returned invalid result:', statusStr);
        }
    } catch (e) {
        console.error('[Houdini] apiServer.getStatus error:', e);
    }
    return { running: false, config: null };
};
```

## 影响范围

此修复影响以下功能：
- API 服务器设置页面的状态显示
- API 服务器的启动/停止/重启功能
- 依赖 API 服务器状态的其他功能（如 Agent 功能）

## 测试方法

1. 启动 Cherry Studio for Houdini
2. 点击"设置"按钮
3. 点击左侧菜单中的"API 服务器"
4. 确认页面正常显示，不再出现"API 服务器已启用但未正常运行"的错误
5. 测试启动/停止/重启按钮功能是否正常

## 相关文件

- `cherrystudio/web/electron_injector.py` - 修复的主要文件
- `web/src/renderer/src/hooks/useApiServer.ts` - 前端 API Server Hook
- `web/src/renderer/src/pages/settings/ToolSettings/ApiServerSettings/ApiServerSettings.tsx` - API 服务器设置页面
- `cherrystudio/api/cherry_studio_api.py` - Python 后端 API 实现

## 关键知识点

### QWebChannel 的异步特性

在 Qt WebEngine 的 QWebChannel 中：
- Python 端的 `@Slot` 装饰的方法会被自动转换为 JavaScript 中的**异步函数**
- 这些方法在 JavaScript 中调用时**总是返回 Promise**
- 即使 Python 方法是同步的，JavaScript 端也必须使用 `await` 或 `.then()` 来获取结果

### 调试技巧

当遇到类似问题时，可以：
1. 在浏览器控制台中打印返回值的类型：`console.log(typeof result)`
2. 如果看到 `[object Promise]`，说明返回的是 Promise，需要使用 `await`
3. 检查终端日志，查看是否有相关错误信息

## 修复日期

2025-12-25 (修复两次：第一次添加 Promise 包装，第二次使用 async/await 等待 QWebChannel 的 Promise)

