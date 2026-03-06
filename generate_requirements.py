import re
import os
from pathlib import Path
import email.parser

def generate_requirements_txt(bat_path, output_file="requirements_generated.txt"):
    # 1. 提取所有路径
    paths = []
    with open(bat_path, 'r', encoding='gbk', errors='ignore') as f:
        content = f.read()
    
    matches = re.finditer(r'(//pss01/[^;\s"\^]+)', content)
    for match in matches:
        p = match.group(1).strip().rstrip('\\')
        if 'python.exe' not in p.lower() and not p.endswith('.bat'):
            paths.append(p)
            
    paths = list(set(paths))
    print(f"从 BAT 文件提取到 {len(paths)} 个包路径")

    # 2. 读取元数据并构建映射
    pkg_map = {} # name -> {deps: [], path: str, version: str}
    
    print("正在分析依赖关系 (已忽略 extra 可选依赖)...")
    for p in paths:
        path_obj = Path(p)
        if not path_obj.exists(): continue
            
        dist_infos = list(path_obj.glob('*.dist-info'))
        if not dist_infos: continue
            
        meta_file = dist_infos[0] / 'METADATA'
        if not meta_file.exists(): continue
            
        try:
            with open(meta_file, 'r', encoding='utf-8', errors='ignore') as f:
                msg = email.parser.Parser().parse(f)
                name = msg.get('Name')
                version = msg.get('Version')
                key = name.lower().replace('-', '_').replace('.', '_')
                
                requires = []
                for req in msg.get_all('Requires-Dist') or []:
                    if 'extra ==' in req:
                        continue
                    req_name = re.split(r'[ ;(<>=!~\[]', req.strip())[0]
                    requires.append(req_name.lower().replace('-', '_').replace('.', '_'))
                
                pkg_map[key] = {'name': name, 'version': version, 'deps': requires}
        except:
            pass

    # 3. 找出依赖关系
    all_dependencies = set()
    for info in pkg_map.values():
        for dep in info['deps']:
            all_dependencies.add(dep)

    # 4. 筛选根包并生成文件
    roots = []
    for key, info in pkg_map.items():
        if key not in all_dependencies:
            roots.append(info)
            
    # 按名称排序
    roots.sort(key=lambda x: x['name'].lower())
    
    print(f"\n找到 {len(roots)} 个最外层包，正在写入 {output_file} ...")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# 自动生成的 requirements.txt\n")
        f.write(f"# 基于 {bat_path} 分析生成\n")
        f.write("# 仅包含推断出的最外层包 (Root Packages)\n\n")
        
        for pkg in roots:
            line = f"{pkg['name']}=={pkg['version']}\n"
            f.write(line)
            print(f"  {line.strip()}")
            
    print(f"\n✓ 已生成: {output_file}")

if __name__ == "__main__":
    generate_requirements_txt(r"cherrystudio/start_coco.bat")

