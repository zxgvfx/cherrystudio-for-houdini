# AI Pipeline 中枢框架 — 架构优势与传统 DCC 流程对比

## 1. 传统 DCC 流程现状

### 1.1 典型工作流

```
概念设计 → Maya建模 → Houdini特效 → Katana灯光 → 渲染 → 后期合成
```

在传统流程中，每个环节相互独立：

- 艺术家在 Maya 中完成角色建模，手动导出 FBX/USD
- 另一位艺术家在 Houdini 中手动导入，做散布/特效，再导出
- Katana 灯光师手动加载场景，手动设置材质
- AI 工具（如 ComfyUI 生成贴图、SAM3 分割）作为独立工具运行，结果文件手动拷贝回 DCC
- 每个工具自己管自己的输入输出格式，没有统一标准

### 1.2 现有 Pipeline 基础设施

公司已经具备一套成熟的传统 pipeline 体系：

| 组件 | 现状 |
|------|------|
| **项目管理** | ftrack / Jira 管理任务、Shot、资产审批流 |
| **DCC 间数据互通** | 已通过公司自有 pipeline 实现 DCC 之间的数据流转，模型/灯光/场景等数据使用 **USD** 作为交换格式 |
| **环境管理** | 使用 **Rez** 管理 DCC 版本、插件版本、Python 环境依赖，由 TD 手动编写和维护 Rez 配置 |
| **资产发布** | 通过 pipeline 的 publish/load 流程管理资产版本 |

这套体系解决了 DCC 之间"数据能不能通"的问题，但没有解决"AI 能不能介入"的问题。

### 1.3 传统流程的痛点

虽然现有 pipeline + USD + ftrack + Rez 已经让 DCC 间数据互通成为可能，但依然存在以下瓶颈：

| 痛点 | 具体表现 |
|------|---------|
| **LLM/AI 无法介入** | 现有 pipeline 提供了数据通路，但没有标准化的工具描述和数据契约，LLM 强大却找不到接入点——它看不懂 pipeline 里有什么工具、能做什么、该怎么调 |
| **AI 工具游离在 pipeline 之外** | ComfyUI、SAM3、3D 生成等 AI 工具独立运行，产出的结果需要人手动搬回 USD pipeline，无法自动衔接 |
| **TD 工作高度手工化** | Rez 配置手写维护，pipeline 脚本逐个开发，环境出问题全靠 TD 人工排查——这些重复性工作 LLM 完全可以辅助但目前无法介入 |
| **上下文断裂** | 从工具 A 切到工具 B 时，虽然 USD 能传数据，但操作上下文（为什么这么做、前一步的参数、决策依据）丢失了 |
| **人力密集的衔接工作** | USD 解决了格式问题，但工具之间的衔接逻辑（选什么文件、配什么参数、下一步该用什么工具）仍然全靠人 |
| **错误处理依赖人工** | 某个环节失败（渲染崩溃、服务挂掉、DCC 断连），全靠人发现和手动处理 |
| **知识无法沉淀** | 每次做类似项目都从头开始，过去的经验、参考资料、最佳参数没有系统化的方式复用 |
| **DCC 操作不可编排** | 在 Houdini 里做的一套散布参数想在另一个场景复用，只能手动抄或者写 HDA——但 LLM 无法自动调用这些 HDA |
| **项目进度缺乏实时洞察** | ftrack 能看到任务分配和状态，但看不到实际制作过程中的实时数据流——哪个镜头的哪个资产正在处理、pipeline 运行状态、瓶颈在哪里 |

---

## 2. AI Pipeline 中枢框架的核心理念

### 万物皆节点，协议统一一切

框架的核心理念可以用一句话概括：**每个工具、每个 DCC 操作、每个 AI 服务、每个 Agent 都是一个标准节点，通过统一的 Port 协议（输入什么类型、输出什么类型）自动衔接**。

```
传统: 人连接工具
Pipeline: 协议连接工具，人/AI 驱动执行
```

---

## 3. 逐项对比

### 3.1 发布与领取（Publish / Load）

这是传统 pipeline 的核心流程，也是 AI Pipeline 赋能最大的地方。

#### 传统流程实际长什么样

以公司现有 `cocoPipeline` 的领取项代码为例，一个特效环节领取上游资产的流程：

```
特效师点击"领取" → RI 类初始化(接收 task_entity 上下文)
→ Analyze 解析项目配置 → get_project_const_setting() 获取 server_root/work_root
→ 遍历镜头关联资产(从 Excel 读取 shot-asset 关联表)
→ 对每个资产，构建 task_structure: {step, task, variant, task_state}
→ 用 template_key 调 data2path() 拼出文件路径
→ 检查文件是否存在，不存在则 fallback 到其他 step(如 animation → layout)
→ 手动版本解析: get_task_versions()[-1] 取最新版
→ 构建 Qt UI (AssetBaseItem + TaskView) 展示给用户勾选
→ 用户确认后执行 DCC 内的导入逻辑(usd_nodes.SopNode)
```

**一个领取项的代码量：300+ 行 Python**。每个环节（模型/绑定/动画/特效/灯光）都需要写类似的领取项。每个 DCC（Maya/Houdini/Katana）需要各写一套。

#### 传统流程的具体痛点

| 痛点 | 代码中的体现 |
|------|------------|
| **每个环节都是定制代码** | `RI` 类和 `RecIG` 类是按环节定制的，特效领取 ≠ 灯光领取 ≠ 合成领取，每个都要 TD 从头写 |
| **路径拼接逻辑复杂且脆弱** | `data2path(task_entity, template_key)` 依赖正确的 `task_structure` 字典（step/task/variant/task_state），少一个字段或值错了就找不到文件 |
| **大量 fallback 逻辑** | 动画缓存不存在就 fallback 到 layout 缓存 —— `if not os.path.exists(filePath): task.add_task_structure({task: 'lay'})`，这种 fallback 逻辑散落在代码各处 |
| **版本管理靠手写** | `get_task_versions()[-1][0].replace('v', '')` 取最新版本号，版本号解析、排序、异常处理全部手写 |
| **资产关联依赖 Excel** | `Function.getLinkedAssetsFrom(excel_path, shot)` —— Shot 和 Asset 的关联关系存在 Excel 里，不在 pipeline 的数据库中 |
| **格式和模板硬编码** | `.usd`、`.abc`、`.mtlx` 各有不同的 `template_key`（`vfx_ani_usd_cache`、`shot_cam_abc`、`assembly_usd_cache`），每种格式一套处理逻辑 |
| **UI 和业务逻辑耦合** | Qt 界面构建（`AssetBaseItem`、`TaskView`、`closeButton`）和领取逻辑写在一起，无法被 Agent 或自动化工具调用 |
| **跨环节定位靠 task_entity 手工构造** | `task_entity.add_task_structure({'step': 'ani_cache', 'task': 'animation', 'asset_name': assItem, ...})` —— 知道上游是什么环节、什么任务、什么命名全靠 TD 的经验写死在代码里 |
| **换项目需要大量适配** | `template_key` 命名、`task_structure` 字段、fallback 逻辑、资产类型映射（`typeOfName = dict(c='char', e='elem', p="prop", s='set')`）可能因项目不同而不同 |
| **LLM 完全无法介入** | 所有逻辑藏在 300+ 行 Python 里，没有标准化描述，LLM 看不到、理解不了、调不动 |

#### AI Pipeline 如何赋能

| 维度 | 传统流程 (cocoPipeline) | AI Pipeline 赋能 |
|------|------------------------|------------------|
| **领取项开发** | 每个环节 TD 写 300+ 行定制 Python（RI + RecIG） | 声明式：下游节点只需声明 `input_port` 类型，零行领取代码 |
| **路径解析** | `Analyze.data2path()` + 手工构造 `task_structure` 字典 | Asset Store 统一 URI，`ctx.query_assets(type, tags)` 一行搞定 |
| **Fallback 逻辑** | 散落在代码各处的 `if not os.path.exists → 换 task` | Asset Store 支持 fallback 策略配置：`fallback: [animation, layout]`，声明式而非命令式 |
| **版本管理** | `get_task_versions()[-1]` 手动解析版本号 | Asset Store 自动版本化，`latest=True` 或指定版本号 |
| **资产关联** | Excel 表 (`getLinkedAssetsFrom(excel_path, shot)`) | Asset Store 的 `tags` + `metadata` + 关系图，或直接同步 ftrack 的 linking |
| **格式匹配** | 按 template_key 硬编码 `.usd` / `.abc` / `.mtlx` | Port 协议 `accepts_mime` 自动过滤 |
| **DCC 导入** | `usd_nodes.SopNode()` 手写 Houdini 导入逻辑 | `DCCBridge.import_asset(asset)` 统一接口，Bridge 内部处理 DCC 差异 |
| **UI 交互** | Qt 界面和领取逻辑耦合，只能人工操作 | UI 和逻辑分离：Web UI 供人操作，同一套逻辑 Agent 也能调 |
| **跨环节上下文** | `task_entity` 提供上下文，但 TD 必须手写如何利用这个上下文 | Pipeline Context 自动携带全链路上下文，节点直接查询上游产出 |
| **换项目** | 改 template_key / task_structure / fallback / 资产类型映射 | Asset Resolver 换项目配置文件，节点代码零修改 |
| **LLM 介入** | 无法介入 | Agent 可以执行完整的领取-处理-发布链 |

#### 示例对比 — "特效环节领取上游资产"

**传统流程（TD 工作量巨大）：**

1. TD 编写 `RecIG` 类，构造 `cacheListTree`（`cache/scene/cam_usd/cam_abc/asset` 五种类型）
2. 对每种类型手写路径模板和 task_structure：
   - `cam_usd`: `{'task': 'animation', 'variant': 'main', 'task_state': 'ok'}` + template `'shot_cam_usd'`
   - `cache/ani_usd`: `{'step': 'ani_cache', 'task': 'animation', 'asset_name': xxx}` + template `'vfx_ani_usd_cache'`
   - `scene`: `{'step': 'assembly', 'task': 'scene'}` + template `'assembly_usd_cache'`
3. 写 fallback：动画缓存不存在 → 尝试 layout 缓存
4. 写 UI：Qt AssetBaseItem 展示每个资产的每种缓存类型，用户勾选
5. 写导入逻辑：`usd_nodes.SopNode().setData(data)` + `setTempNodeParm()`
6. 换项目 → 以上可能全部需要调整

**AI Pipeline：**

```python
# 特效节点的声明 —— 这就是全部代码
class HoudiniFXNode(NodeExecutor):
    descriptor = NodeDescriptor(
        id="hou-fx",
        input_ports=[
            Port("scene", AssetType.SCENE, tags=["layout", "assembly"]),
            Port("anim_cache", AssetType.USD_STAGE, tags=["animation"], multiple=True),
            Port("camera", AssetType.CAMERA),
        ],
        output_ports=[
            Port("fx_scene", AssetType.SCENE, tags=["fx"]),
        ],
        execution_target="dcc:houdini",
    )
```

Pipeline 自动处理：
1. 根据 `input_ports` 的类型和 tags，从 Asset Store 查到上游发布的 USD/ABC/Camera
2. fallback 策略在 Asset Store 配置层声明（`animation` 不存在 → 查 `layout`）
3. 版本自动取最新
4. Houdini Bridge 自动导入
5. 换项目 → 节点代码不变，Asset Store 的项目配置不同而已
6. Agent 可以直接调用这个节点 —— 因为它有标准化的描述

**示例对比 — "从照片到场景散布"：**

传统流程（需要 ~15 分钟人工操作）：
1. 打开 SAM3 工具，手动选择图片，点击分割
2. 分割结果保存到桌面某文件夹
3. 打开 3D 生成工具，手动选择刚才的 mask 图片
4. 等待生成，找到输出的 GLB 文件
5. 打开 Houdini，File > Import 手动导入 GLB
6. 手动创建 scatter 节点，配参数

AI Pipeline（人点一下或 Agent 自动执行）：
1. 提交 DAG：`sam3-segment → 3d-gen → hou-scatter`，指定输入图片
2. 自动执行：每步的输出自动成为下一步的输入
3. 结果自动出现在 Houdini 里

### 3.2 AI 工具接入

| 维度 | 传统流程 | AI Pipeline |
|------|---------|-------------|
| AI 工具运行方式 | 独立运行，手动操作 | 注册为节点，标准化输入输出 |
| ComfyUI 集成 | 在浏览器里手动跑，结果手动拷贝 | Sidecar Bridge 自动触发 workflow、回收结果 |
| 新 AI 工具接入 | 每个工具写独立集成代码 | 实现 NodeExecutor 接口 + 声明 Port 即可 |
| AI 结果复用 | 手动管理文件 | 自动进入 Asset Store + 知识库索引 |

### 3.3 DCC 集成

| 维度 | 传统流程 (USD + ftrack + Rez) | AI Pipeline |
|------|------------------------------|-------------|
| 跨 DCC 数据格式 | USD 已解决格式互通 | 保持 USD 为核心交换格式，Pipeline Asset 原生支持 USD |
| DCC 角色 | 必须人坐在面前操作 | DCC 操作也是节点，可远程调用（人工复杂操作仍保留） |
| 跨 DCC 衔接逻辑 | 数据能通，但"选什么/配什么/接什么"靠人 | Port 协议自动匹配上下游，Agent 辅助配参 |
| DCC 操作复用 | HDA/脚本可复用，但 LLM 无法调用 | HDA 自动注册为 pipeline 节点，LLM 可编排 |
| 环境管理 | TD 手写 Rez 配置 | Agent 辅助生成 Rez package，自动诊断依赖冲突 |
| 项目进度 | ftrack 看任务状态 | ftrack 双向联动 + 实时可视化 Dashboard |

### 3.4 AI Agent 编排

| 维度 | 传统流程 | AI Pipeline |
|------|---------|-------------|
| 流程编排方式 | 纯人工决策和执行 | 人工 / AI Agent 都能驱动 |
| Agent 能力 | 无法接入（没有标准化工具描述） | 通过 MCP 看到所有节点，自主选择和串联 |
| Agent 辅助 | 无 | Agent 建议下一步、自动配参数、检查质量 |
| 混合模式 | 不存在 | Agent 建议 DAG → 人审批 → 自动执行，关键步骤人工确认 |

### 3.5 错误处理与运维

| 维度 | 传统流程 | AI Pipeline |
|------|---------|-------------|
| 错误发现 | 人盯着看，或者等到下游发现 | Sentinel 守护 Agent 实时监控全部事件 |
| 错误处理 | 人手动排查、重试 | 规则引擎自动重试 → 小模型决策 → 大模型升级，三级自愈 |
| DCC 断连 | 人发现后手动重连 | 自动检测、自动重连、通知用户 |
| 知识沉淀 | 口口相传 | 错误模式自动入库，下次遇到同类问题自动应用历史方案 |

### 3.6 知识管理

| 维度 | 传统流程 | AI Pipeline |
|------|---------|-------------|
| 参考资料查找 | 翻文件夹、问同事 | KB 检索节点：输入描述，返回相似资产和历史方案 |
| 经验沉淀 | 无系统化方式 | 每次产出的资产自动入库索引，带标签和元数据 |
| 跨项目复用 | 手动查找旧项目文件 | 知识库向量检索：找到类似风格/类型的历史资产 |

---

## 4. 核心优势总结

### 4.1 效率提升

- **消除人工搬运数据的时间**：节点间数据自动流转，估计可减少 40-60% 的非创作性操作时间
- **工具串联零等待**：不需要人找文件、选文件、配格式
- **批量自动化**：同一个 DAG 可以跑 100 张图，不需要人逐张操作

### 4.2 AI 赋能

- **Agent 可以编排一切**：因为所有工具都有标准描述，Agent 知道能做什么、该怎么接
- **人 + AI 协作**：不是取代人，是让人专注于创意决策，AI 处理重复性衔接工作
- **持续学习**：Sentinel + KB 让系统越用越聪明

### 4.3 可扩展性

- **新工具即插即用**：实现 NodeExecutor + 声明 Port，注册完毕
- **新 DCC 一个 Bridge**：实现 DCCBridge 接口即可
- **节点可组合**：任意节点可以自由组合成新的 DAG

### 4.4 可靠性

- **Sentinel 自愈**：90% 的故障自动处理，不需要人值守
- **三级决策**：规则 → 小模型 → 大模型，成本和能力分级匹配
- **全程记录**：每一步的输入、输出、参数、耗时全部记录，完全可追溯

---

## 5. 能解决的具体业务问题

### 场景 1：概念图到 3D 场景

**传统**：概念图 →（人工）→ SAM3 分割 →（人工拷贝 mask）→ 3D 生成 →（人工导入 Houdini）→ 散布 →（人工导入 Katana）→ 灯光渲染

**Pipeline**：概念图 → `sam3-segment` → `3d-gen` → `hou-scatter` → `katana-lighting` → `render-submit`，一条 DAG 自动跑完

### 场景 2：批量资产生成

**传统**：100 个道具，每个手动走一遍 AI 生成 + DCC 调整

**Pipeline**：配好一个 DAG 模板，喂入 100 张参考图，自动并行执行，Sentinel 监控质量

### 场景 3：AI 辅助场景搭建

**传统**：艺术总监口述需求，TD 手动操作各个工具

**Pipeline**：艺术总监对 Agent 说"我需要一个中世纪城堡场景，参考这张图"，Agent 自动规划 DAG → KB 检索类似资产 → AI 生成缺失资产 → Houdini 搭建场景

### 场景 4：夜间无人值守生产

**传统**：下班后所有任务停止，或者只能跑渲染

**Pipeline**：提交一批 DAG，Sentinel 守护运行，失败自动重试，遇到需要人工决策的暂停并发通知，第二天早上查看结果

---

## 6. 未来长远规划

### Phase 1-7（近期，6-12 个月）

见架构流程图文档。核心框架 + DCC + KB + ComfyUI + Agent + Sentinel + Web UI。

### 中期规划（12-18 个月）

#### 6.1 大数据可视化 — 生产驾驶舱

核心目标：让制片人、总监、TD 在一块屏幕上看到整个项目的实时全貌。

**流程维度可视化：**

- **Pipeline 实时拓扑图**：所有正在运行的 DAG 以节点图形式实时展示，每个节点显示执行状态（排队/运行中/完成/失败）、耗时、资源占用
- **数据流热力图**：哪些节点之间的数据流量最大、哪些 Bridge 通信最频繁、哪里是瓶颈
- **节点执行时间线**：甘特图式展示每个节点的开始/结束时间、并行度、等待时间
- **Sentinel 事件流**：实时滚动展示所有事件、Sentinel 的决策和动作

**项目维度可视化：**

- **ftrack/Jira 双向联动**：pipeline 的执行进度实时回写到 ftrack task 状态，可视化面板同步展示
- **Shot 进度看板**：每个 Shot 的各环节（建模/绑定/动画/特效/灯光/渲染）完成百分比，颜色编码一目了然
- **资产健康度仪表盘**：每个资产的版本数、使用频率、质量评分、最后更新时间
- **团队工作负载**：每位艺术家当前在处理什么任务、DCC 工作站的使用状态
- **项目里程碑燃尽图**：基于 pipeline 实际执行数据自动生成，不需要人工填报

**镜头维度可视化：**

- **USD Stage 实时预览**：通过 Hydra 渲染器在 Web 端直接预览当前 USD Stage 的最新状态，不需要打开 DCC
- **镜头资产依赖图**：每个 Shot 引用了哪些 Asset、哪些 Asset 被多少个 Shot 共享、修改影响范围
- **镜头时间线**：每个 Shot 的各 Layer（模型/动画/FX/灯光）的 USD sublayer 堆叠状态，直接在 Web 端可视化 USD 组合结构
- **版本对比**：同一镜头不同版本的 USD Stage 差异可视化（新增/修改/删除了哪些 prim）

**技术指标可视化：**

- **GPU/CPU 资源监控**：AI 服务器、ComfyUI、渲染农场的实时资源使用
- **节点可靠性排行**：按失败率、平均耗时排序，自动标记需要优化的节点
- **成本追踪**：每个 DAG/Shot/项目消耗的 GPU 时长、API 调用成本

#### 6.2 Rez 配置 AI 化

- Agent 辅助生成和维护 Rez 配置——TD 描述需求，Agent 生成 `package.py`
- Rez 环境冲突自动诊断：Agent 分析依赖树，找出版本冲突并建议解决方案
- 新工具/插件接入时，Agent 自动生成对应的 Rez package

#### 6.3 多站点/分布式部署

- Pipeline Server 支持集群部署
- 多个工作室之间的资产和任务共享
- 渲染农场节点与 pipeline 节点统一调度
- 通过 S3/NAS 实现跨站点 Asset Store

#### 6.4 生产管理系统深度集成

- 与 ftrack/Jira 双向同步：Task 状态变更自动触发 pipeline DAG，pipeline 执行进度回写 Task
- 资产发布流程标准化：pipeline 产出直接走 publish 审批流
- 时间线跟踪：每个 Shot 的各环节耗时自动统计，生成效率报告

#### 6.5 质量检查自动化

- 视觉质量检查节点（用 VLM 评估渲染结果质量）
- 技术规范检查节点（面数、UV、命名规范自动验证）
- A/B 对比节点（两种方案自动对比，Agent 评估推荐）

#### 6.6 实时协作

- 多人同时操作同一个 DAG
- 艺术家在 DCC 中的操作实时反映到 pipeline 面板
- Agent 和人的操作互相可见

### 远期规划（18-36 个月）

#### 6.7 自优化 Pipeline

- Sentinel 长期记忆积累足够后，自动发现效率瓶颈
- 根据历史数据，自动推荐最优节点参数
- 预测性调度：基于历史耗时预测整个 DAG 的完成时间
- 节点可靠性排名：自动替换低质量节点
- 自动生成效率报告：哪些环节可以优化、哪些 DCC 脚本可以被 AI 替代

#### 6.8 USD 深度融合

- Pipeline 的 Asset Store 原生支持 USD Asset Resolver：pipeline 管理的资产可以通过 USD 自定义 resolver 直接在任何 DCC 中引用（`asset://pipeline/character_v3`）
- USD Stage 组装节点：在 pipeline 中组装 USD Layer 堆叠，替代手动在 Katana/Houdini 中操作
- USD 变体集 (Variant Sets) 管理：通过 pipeline 控制 LOD/材质变体选择
- USD 实时同步：多人编辑同一个 USD Stage 时，pipeline 管理 Layer 锁和合并

#### 6.9 Pipeline 即服务（PaaS）

- 多租户支持：不同项目组独立的 pipeline 实例
- 计费系统：按节点执行次数/GPU 时长计费
- 模板市场：分享和复用 DAG 模板
- 第三方节点商店：外部开发者发布自定义节点

#### 6.10 端到端 AI 导演

- 从文字描述到最终渲染的全自动流水线
- Agent 具备完整的影视制作知识（通过 KB 沉淀）
- 人的角色从"操作者"变成"审批者和创意指导"
- AI 和人之间的边界由策略控制（哪些步骤必须人工，哪些可以全自动）

#### 6.11 大数据可视化进阶

- **预测性分析**：基于历史数据预测项目延期风险、资源瓶颈
- **AI 建议面板**：Sentinel 根据实时数据主动推送优化建议（"Shot 032 的特效节点连续失败，建议检查 Houdini 内存配置"）
- **3D 可视化**：USD Stage 的依赖关系用 3D 图谱展示，可以像游戏一样"飞"进去查看每个节点
- **移动端 Dashboard**：制片人在手机上实时查看项目进度和关键告警

#### 6.12 开放生态

- 开源核心框架
- 插件/节点市场
- MCP 标准化，任何支持 MCP 的 Agent 都能接入
- 与 OpenUSD 生态深度融合：USD 作为跨 DCC 的通用数据格式
- 与 ACES 色彩管理集成

---

## 7. 风险与挑战

| 风险 | 缓解策略 |
|------|---------|
| DCC 内部操作难以完全远程化 | 先覆盖高频自动化操作，复杂操作保留人工模式 |
| Agent 编排质量不稳定 | 混合模式——Agent 建议，人审批；逐步放开自动化比例 |
| 小模型 Sentinel 决策能力有限 | 三级升级机制 + 规则引擎兜底 |
| 新工具接入有学习成本 | NodeExecutor 接口保持极简，提供脚手架和示例 |
| 多 DCC 版本兼容 | Bridge 层隔离，每个 DCC 版本一个 adapter 变体 |
