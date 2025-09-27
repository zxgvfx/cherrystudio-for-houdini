# Cherry Studio for Houdini 项目重构计划

## 当前问题
- `main.py` 文件过大（2597行）
- 所有功能都集中在一个文件中，难以维护和调试
- API类、窗口管理、JavaScript注入等混合在一起

## 重构目标
1. 模块化：将功能拆分为独立的模块
2. 可维护性：每个模块职责单一，便于调试
3. 可扩展性：新功能可以独立添加

## 建议的项目结构

```
houdini_plugin/
├── __init__.py
├── main.py                    # 简化的主入口文件
├── config.py                  # 配置管理
├── utils.py                   # 工具函数
├── window/
│   ├── __init__.py
│   ├── manager.py            # 窗口管理
│   └── container.py          # WebContainer类
├── api/
│   ├── __init__.py
│   ├── base.py               # 基础API类
│   ├── electron.py           # ElectronAPI
│   ├── file.py               # FileAPI
│   ├── app.py                # AppAPI
│   ├── selection.py          # SelectionAPI
│   ├── store_sync.py         # StoreSyncAPI
│   └── network.py            # NetworkAPI
├── bridge/
│   ├── __init__.py
│   ├── host_bridge.py        # HostBridge类
│   └── webchannel.py         # WebChannel相关
├── injection/
│   ├── __init__.py
│   ├── scripts.py            # JavaScript注入脚本
│   └── manager.py            # 注入管理
└── tests/
    ├── __init__.py
    └── test_network.py       # 网络测试
```

## 重构步骤

### 第一阶段：创建目录结构
1. 创建新的目录结构
2. 创建空的`__init__.py`文件

### 第二阶段：拆分API类
1. 提取`ElectronAPI`类到`api/electron.py`
2. 提取`NetworkAPI`类到`api/network.py`
3. 提取其他API类到对应文件

### 第三阶段：拆分窗口管理
1. 提取窗口创建和管理逻辑到`window/manager.py`
2. 提取`WebContainer`类到`window/container.py`

### 第四阶段：拆分JavaScript注入
1. 提取JavaScript脚本到`injection/scripts.py`
2. 提取注入逻辑到`injection/manager.py`

### 第五阶段：拆分其他组件
1. 提取`HostBridge`类到`bridge/host_bridge.py`
2. 提取配置相关代码到`config.py`
3. 提取工具函数到`utils.py`

### 第六阶段：重构主入口
1. 简化`main.py`，只保留主要逻辑
2. 确保所有导入正确

### 第七阶段：测试和验证
1. 测试重构后的功能完整性
2. 修复任何导入或依赖问题

## 预期收益
- 代码更易维护和调试
- 功能模块独立，便于测试
- 新功能开发更高效
- 代码复用性提高
