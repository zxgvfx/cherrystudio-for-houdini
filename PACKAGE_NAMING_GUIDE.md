# Python 包命名规范和映射指南

## 🔍 问题背景

Python 包生态系统中存在包名不一致的问题：

- **PyPI 规范**: 使用连字符 `-` 的标准化名称（如 `jaraco-classes`）
- **文件系统存储**: 可能使用点号 `.`、下划线 `_` 或连字符 `-`
- **导入名称**: 在代码中使用的名称（如 `import jaraco.classes`）

## 📊 常见命名模式

### 1. **命名空间包（Namespace Packages）**

使用点号分隔命名空间：

| PyPI 名称 | 文件系统路径 | 导入名称 |
|-----------|-------------|---------|
| `jaraco-classes` | `jaraco.classes/3.4.0/` | `jaraco.classes` |
| `jaraco-context` | `jaraco.context/6.0.2/` | `jaraco.context` |
| `jaraco-functools` | `jaraco.functools/4.4.0/` | `jaraco.functools` |
| `zope-interface` | `zope.interface/5.0.0/` | `zope.interface` |
| `backports-functools-lru-cache` | `backports.functools_lru_cache/` | `backports.functools_lru_cache` |

**规则**: 
- 前缀: `jaraco-`, `zope-`, `backports-`, `ruamel-`
- 分隔符: `.` (点号)

### 2. **下划线包（Underscore Packages）**

某些包在文件系统中使用下划线：

| PyPI 名称 | 文件系统路径 | 导入名称 |
|-----------|-------------|---------|
| `opentelemetry-api` | `opentelemetry_api/1.0.0/` | `opentelemetry.api` |
| `opentelemetry-sdk` | `opentelemetry_sdk/1.0.0/` | `opentelemetry.sdk` |
| `opentelemetry-exporter-prometheus` | `opentelemetry_exporter_prometheus/0.60.b1/` | `opentelemetry.exporter.prometheus` |

**规则**:
- 前缀: `opentelemetry-`
- 分隔符: `_` (下划线)

### 3. **版本号格式差异**

Beta/Alpha/RC 版本可能有不同格式：

| PyPI 版本 | 文件系统版本 |
|-----------|-------------|
| `0.60b1` | `0.60.b1` |
| `1.0a1` | `1.0.a1` |
| `2.0rc1` | `2.0.rc1` |
| `1.0.post1` | `1.0.post1` |

**规则**:
- Beta: `b` → `.b`
- Alpha: `a` → `.a`
- RC: `rc` → `.rc`

## 🔧 配置映射规则

### 方法1: 使用 `package_name_mappings.json`

编辑配置文件添加特殊映射：

```json
{
  "mappings": {
    "jaraco-classes": "jaraco.classes",
    "jaraco-context": "jaraco.context",
    "opentelemetry-exporter-prometheus": "opentelemetry_exporter_prometheus"
  },
  "version_mappings": {
    "0.60b1": "0.60.b1"
  },
  "rules": {
    "namespace_packages": {
      "prefixes": ["jaraco", "zope", "backports", "ruamel"],
      "separator": "."
    },
    "underscore_packages": {
      "prefixes": ["opentelemetry"],
      "separator": "_"
    }
  }
}
```

### 方法2: 自动规则

脚本会自动尝试以下变体：

1. **包名变体**:
   - 原始名称
   - 小写
   - 替换 `-` 为 `_`
   - 替换 `-` 为 `.`
   - 替换 `_` 为 `.`

2. **版本号变体**:
   - 原始版本
   - Beta/Alpha/RC 加点号版本

## 🧪 测试方法

### 1. 快速测试特殊包

```bash
python test_special_packages.py
```

这会测试已知的问题包并显示它们的实际路径。

### 2. 手动检查

在文件浏览器中查看：

```
\\pss01\Code_Public\packages\
├── jaraco.classes\
│   └── 3.4.0\
├── jaraco.context\
│   └── 6.0.2\
├── opentelemetry_exporter_prometheus\
│   └── 0.60.b1\
```

### 3. 运行主脚本

```bash
python setup_pythonpath.py
```

查看输出中的映射信息：

```
[1/89] jaraco-classes 3.4.0
  ℹ 使用映射: jaraco-classes → jaraco.classes
  ✓ 找到: \\pss01\...\jaraco.classes\3.4.0\...\python

[2/89] opentelemetry-exporter-prometheus 0.60b1
  ℹ 使用映射: opentelemetry-exporter-prometheus → opentelemetry_exporter_prometheus
  ℹ 使用版本映射: 0.60b1 → 0.60.b1
  ✓ 找到: \\pss01\...\opentelemetry_exporter_prometheus\0.60.b1\...\python
```

## 📝 添加新的映射

### 当发现新的特殊包时

1. **运行主脚本看到错误**:
   ```
   ✗ 未找到: some-package == 1.0.0
   ```

2. **手动检查文件系统**:
   ```bash
   dir \\pss01\Code_Public\packages\some*
   ```

3. **找到实际路径**:
   ```
   \\pss01\Code_Public\packages\some_package\1.0.0\
   ```

4. **添加映射**:
   编辑 `package_name_mappings.json`:
   ```json
   {
     "mappings": {
       "some-package": "some_package"
     }
   }
   ```

5. **重新运行**:
   ```bash
   python setup_pythonpath.py
   ```

## 🎯 常见包命名模式总结

### 按前缀分类

| 前缀 | 分隔符 | 示例 |
|------|--------|------|
| `jaraco-*` | `.` | `jaraco-classes` → `jaraco.classes` |
| `zope-*` | `.` | `zope-interface` → `zope.interface` |
| `backports-*` | `.` | `backports-functools-lru-cache` → `backports.functools_lru_cache` |
| `ruamel-*` | `.` | `ruamel-yaml` → `ruamel.yaml` |
| `opentelemetry-*` | `_` | `opentelemetry-api` → `opentelemetry_api` |
| `python-*` | `_` | `python-dateutil` → `python_dateutil` (有时) |

### 特殊情况

- **大小写**: PyPI 不区分大小写，但文件系统区分
  - `PyYAML` → `pyyaml` 或 `PyYAML`
  - `Pillow` → `pillow` 或 `Pillow`

- **名称完全不同**:
  - `Pillow` → `PIL` (导入时)
  - `opencv-python` → `cv2` (导入时)
  - `beautifulsoup4` → `bs4` (导入时)

## 🔄 自动化更新

### 生成映射配置

可以扫描包仓库自动生成映射：

```bash
# 扫描所有 jaraco 开头的包
dir \\pss01\Code_Public\packages\jaraco* /B

# 扫描所有 opentelemetry 开头的包  
dir \\pss01\Code_Public\packages\opentelemetry* /B
```

### 批量添加映射

创建脚本批量生成映射配置：

```python
# 扫描 packages 目录
packages_dir = Path(r"\\pss01\Code_Public\packages")

mappings = {}
for pkg_dir in packages_dir.iterdir():
    if pkg_dir.is_dir():
        fs_name = pkg_dir.name
        
        # 生成可能的 PyPI 名称
        pypi_name = fs_name.replace('.', '-').replace('_', '-')
        
        if fs_name != pypi_name:
            mappings[pypi_name] = fs_name

print(json.dumps(mappings, indent=2))
```

## 🐛 故障排除

### 问题1: 找不到包

```
✗ 未找到: some-package == 1.0.0
```

**解决步骤**:
1. 检查包是否真的存在
2. 检查包名格式（点/下划线/连字符）
3. 检查版本号格式
4. 添加到映射配置
5. 重新运行

### 问题2: 找到多个版本

```
✓ 找到: path1/python
✓ 找到: path2/python
```

**说明**: 这是正常的，同一个版本可能有多个 hash（不同平台/Python版本）

### 问题3: 映射不生效

**检查**:
1. `package_name_mappings.json` 格式是否正确
2. 文件是否在脚本同目录
3. 查看日志输出是否有"已加载 X 个映射规则"

## 📚 参考资料

- [PEP 503 - Simple Repository API](https://peps.python.org/pep-0503/)
- [PEP 440 - Version Identification](https://peps.python.org/pep-0440/)
- [PEP 420 - Namespace Packages](https://peps.python.org/pep-0420/)
- [Packaging User Guide](https://packaging.python.org/)

## 🎓 最佳实践

1. **保持映射配置更新**: 发现新的特殊包及时添加
2. **使用规则而不是硬编码**: 优先使用 `rules` 配置
3. **测试优先**: 修改后先测试再大规模应用
4. **文档化**: 记录特殊包的映射原因
5. **版本控制**: 将映射配置纳入版本控制

---

最后更新: 2025-01-29

