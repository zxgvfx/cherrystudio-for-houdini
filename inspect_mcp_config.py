import json
import os

path = os.path.join(os.path.expanduser("~"), ".cherrystudio", "localStorage.json")

try:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'persist:cherry-studio' in data:
        persist_data = json.loads(data['persist:cherry-studio'])
        if 'mcp' in persist_data:
            mcp_data = json.loads(persist_data['mcp'])
            print(json.dumps(mcp_data, indent=2, ensure_ascii=False))
        else:
            print("No 'mcp' key in persist:cherry-studio")
    else:
        print("No 'persist:cherry-studio' key in localStorage.json")

except Exception as e:
    print(f"Error: {e}")

