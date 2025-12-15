# Cherry Studio 更新指南

当上游 Cherry Studio 项目更新时，本指南将帮助您同步更新移植到 Houdini 的代码。

## 📋 目录

1. [更新前准备](#更新前准备)
2. [同步上游代码](#同步上游代码)
3. [重新构建 Web 应用](#重新构建-web-应用)
4. [检查适配层兼容性](#检查适配层兼容性)
5. [测试验证](#测试验证)
6. [常见问题处理](#常见问题处理)

## 🔍 更新前准备

### 1. 检查当前版本

```bash
# 进入 web 子模块目录
cd web

# 查看当前提交
git log -1 --oneline

# 查看当前版本（package.json）
cat package.json | grep version

# 查看上游最新版本
git fetch upstream
git log upstream/main --oneline -10
```

### 2. 备份当前工作

```bash
# 返回项目根目录
cd ..

# 提交当前所有更改（如果有）
git add .
git commit -m "备份：更新前的工作状态"

# 或者创建备份分支
git branch backup-before-update-$(date +%Y%m%d)
```

## 🔄 同步上游代码

### 方法一：使用 Git Submodule（推荐）

```bash
# 1. 进入 web 子模块
cd web

# 2. 确保在正确的分支（通常是 main 或 master）
git checkout main

# 3. 拉取上游更新
git fetch upstream

# 4. 查看可用的更新
git log HEAD..upstream/main --oneline

# 5. 合并上游更新（推荐使用 merge，保留历史）
git merge upstream/main

# 或者使用 rebase（更干净的提交历史，但需要解决冲突）
# git rebase upstream/main

# 6. 如果有冲突，解决冲突后继续
# git add .
# git rebase --continue  # 如果使用 rebase
# git commit  # 如果使用 merge

# 7. 推送到您的 fork（如果需要）
git push origin main

# 8. 返回项目根目录
cd ..

# 9. 更新子模块引用
git add web
git commit -m "更新 Cherry Studio 子模块到最新版本"
```

### 方法二：更新到特定版本/标签

```bash
cd web

# 查看可用的标签（版本）
git fetch upstream --tags
git tag | grep -E "^v?[0-9]" | sort -V | tail -10

# 切换到特定版本（例如 v1.6.0）
git checkout tags/v1.6.0

# 或者切换到特定提交
git checkout <commit-hash>

cd ..
git add web
git commit -m "更新 Cherry Studio 到版本 v1.6.0"
```

## 🏗️ 重新构建 Web 应用

### 1. 安装/更新依赖

```bash
cd web

# 清理旧的依赖（可选，但推荐）
rm -rf node_modules
rm -rf .yarn/cache  # 如果使用 yarn
rm yarn.lock  # 如果使用 yarn，重新生成

# 安装依赖
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 检查构建配置

确认 `web/package.json` 中是否有适合 Houdini 的构建脚本。如果没有，可能需要：

- 检查 `electron.vite.config.ts` 的配置
- 确认构建输出目录
- 检查是否有 `build:web` 或类似的脚本

### 3. 执行构建

```bash
# 标准构建（生成 Electron 应用）
npm run build

# 如果项目有专门的 web-only 构建脚本
npm run build:web

# 构建产物通常在以下位置之一：
# - web/out/renderer/
# - web/dist/
# - web/dist-web/
```

### 4. 复制构建产物到 Houdini 插件

```bash
# 返回项目根目录
cd ..

# 根据实际构建输出目录调整路径
# 示例：如果构建产物在 web/out/renderer/
Copy-Item -Path "web\out\renderer\*" -Destination "houdini_plugin\public\" -Recurse -Force

# 或者使用 PowerShell 脚本（如果存在）
.\scripts\copy_web_dist.ps1
```

## 🔧 检查适配层兼容性

### 1. 检查 Electron API 变化

Cherry Studio 更新可能引入新的 Electron API 调用。需要检查并更新适配层：

**文件位置：**
- `houdini_plugin/web/electron_injector.py` - Electron API 注入脚本
- `houdini_plugin/api/cherry_studio_api.py` - Python API 桥接

**检查步骤：**

```bash
# 搜索新的 Electron API 调用
cd web
grep -r "electron\." src/ | grep -v node_modules
grep -r "require('electron')" src/ | grep -v node_modules
grep -r "ipcRenderer" src/ | grep -v node_modules
grep -r "ipcMain" src/ | grep -v node_modules
```

### 2. 更新 electron_injector.py

如果发现新的 Electron API 调用，需要在 `electron_injector.py` 中添加对应的适配：

```python
# 示例：如果 Cherry Studio 新增了某个 API
# 在 get_electron_api_script() 函数中添加：

window.electronAPI.newFeature = function(...) {
    // 使用 Qt WebChannel 调用 Python 后端
    if (window.qt && window.qt.api && window.qt.api.newFeature) {
        return window.qt.api.newFeature(...);
    }
    // 或者提供模拟实现
    return Promise.resolve(null);
};
```

### 3. 更新 Python API 桥接

如果需要在 Python 端实现新功能，更新 `cherry_studio_api.py`：

```python
class CherryStudioAPI(QObject):
    # ... 现有代码 ...
    
    @Slot(...)  # 添加新的 Slot 方法
    def newFeature(self, ...):
        """新的功能实现"""
        # 实现逻辑
        pass
```

### 4. 检查依赖变化

```bash
cd web

# 对比 package.json 的变化
git diff HEAD~1 package.json

# 检查是否有新的 Node.js 模块需要适配
# 特别关注：
# - 文件系统操作
# - 网络请求
# - 本地存储
# - 窗口管理
```

## ✅ 测试验证

### 1. 基础功能测试

```bash
# 启动 Houdini 插件
.\launch_cherry_studio.bat

# 或直接运行
C:"\Program Files\Side Effects Software\Houdini 20.5.613\bin"\hython.exe houdini_plugin\main.py
```

**测试清单：**
- [ ] 界面正常加载
- [ ] 聊天功能正常
- [ ] 模型切换正常
- [ ] 设置页面正常
- [ ] 文件拖拽功能正常
- [ ] Houdini 节点选择功能正常
- [ ] 配置保存/加载正常

### 2. 检查控制台错误

在 Houdini Python 控制台或终端中检查是否有错误信息：

```python
# 常见错误类型：
# - JavaScript 错误（通常在 electron_injector.py 中处理）
# - API 调用失败（检查 cherry_studio_api.py）
# - 路径问题（检查文件路径配置）
```

### 3. 功能回归测试

对比更新前后的功能，确保没有功能丢失：

- [ ] 所有原有功能仍然可用
- [ ] 新功能（如果有）正常工作
- [ ] 性能没有明显下降

## 🐛 常见问题处理

### 问题 1：构建失败

**可能原因：**
- Node.js 版本不匹配
- 依赖安装不完整
- 构建配置变化

**解决方法：**
```bash
cd web

# 检查 Node.js 版本（Cherry Studio 要求 >= 22.0.0）
node --version

# 清理并重新安装
rm -rf node_modules package-lock.json yarn.lock
npm install

# 如果仍有问题，检查 package.json 的 engines 字段
cat package.json | grep engines
```

### 问题 2：API 调用失败

**可能原因：**
- Cherry Studio 使用了新的 Electron API
- API 签名变化

**解决方法：**
1. 检查浏览器控制台错误信息
2. 在 `electron_injector.py` 中添加缺失的 API 适配
3. 在 `cherry_studio_api.py` 中添加对应的 Python 实现

### 问题 3：界面显示异常

**可能原因：**
- CSS/资源路径问题
- 构建产物未正确复制

**解决方法：**
```bash
# 检查构建产物是否完整
ls houdini_plugin/public/assets/

# 重新构建并复制
cd web
npm run build
cd ..
Copy-Item -Path "web\out\renderer\*" -Destination "houdini_plugin\public\" -Recurse -Force
```

### 问题 4：子模块更新冲突

**可能原因：**
- 本地有未提交的更改
- 上游更改与本地修改冲突

**解决方法：**
```bash
cd web

# 查看冲突
git status

# 如果有本地修改，先暂存
git stash

# 更新子模块
git fetch upstream
git merge upstream/main

# 恢复本地修改
git stash pop

# 解决冲突后提交
git add .
git commit -m "合并上游更新并保留本地修改"
```

## 📝 更新检查清单

每次更新时，请按以下清单检查：

- [ ] 已备份当前工作
- [ ] 已同步上游代码
- [ ] 已更新依赖
- [ ] 已重新构建 Web 应用
- [ ] 已复制构建产物
- [ ] 已检查适配层兼容性
- [ ] 已测试基础功能
- [ ] 已检查控制台错误
- [ ] 已进行功能回归测试
- [ ] 已更新文档（如有必要）

## 🔗 相关资源

- **Cherry Studio 官方仓库**: https://github.com/CherryHQ/cherry-studio
- **您的 Fork 仓库**: https://github.com/zxgvfx/cherry-studio
- **项目文档**: 
  - `README.md` - 项目说明
  - `PROJECT_SUMMARY.md` - 项目总结
  - `INTEGRATION_COMPLETE.md` - 集成完成报告

## 💡 最佳实践

1. **定期更新**：建议每月检查一次上游更新，避免积累过多更改
2. **小步更新**：优先更新小版本（patch/minor），大版本更新需要更仔细的测试
3. **保留历史**：使用 merge 而非 rebase，保留完整的更新历史
4. **测试充分**：每次更新后都要进行完整测试
5. **文档同步**：如果发现新的适配需求，及时更新本文档

## 🆘 需要帮助？

如果遇到无法解决的问题：

1. 检查 Cherry Studio 的更新日志（CHANGELOG.md）
2. 查看 Cherry Studio 的 Issues 和 Pull Requests
3. 对比更新前后的代码差异
4. 在项目仓库中提交 Issue 描述问题

