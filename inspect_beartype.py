import re
from pathlib import Path
import email.parser

def inspect_beartype(bat_path):
    # 提取 beartype 路径
    with open(bat_path, 'r', encoding='gbk', errors='ignore') as f:
        content = f.read()
    
    match = re.search(r'(//pss01/[^;\s"\^]*beartype[^;\s"\^]*)', content, re.IGNORECASE)
    if not match:
        print("未找到 beartype 路径")
        return

    path_str = match.group(1).strip().rstrip('\\')
    print(f"beartype 路径: {path_str}")
    
    path_obj = Path(path_str)
    dist_infos = list(path_obj.glob('*.dist-info'))
    if dist_infos:
        meta_file = dist_infos[0] / 'METADATA'
        print(f"正在读取: {meta_file.name}")
        with open(meta_file, 'r', encoding='utf-8') as f:
             msg = email.parser.Parser().parse(f)
             print("-" * 20)
             print(f"Name: {msg.get('Name')}")
             print("Requires-Dist:")
             for req in msg.get_all('Requires-Dist') or []:
                 print(f"  {req}")
             print("-" * 20)
    else:
        print("未找到 .dist-info")

if __name__ == "__main__":
    inspect_beartype(r"cherrystudio/start_coco.bat")

