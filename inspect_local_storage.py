import json
import os

path = os.path.join(os.path.expanduser("~"), ".cherrystudio", "localStorage.json")

try:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'persist:cherry-studio' in data:
        persist_data = json.loads(data['persist:cherry-studio'])
        if 'minapps' in persist_data:
            minapps = json.loads(persist_data['minapps'])
            if 'enabled' in minapps:
                for app in minapps['enabled']:
                    if app.get('name') == 'v' or app.get('id') == 'v':
                         print(f"Found 'v' in minapps!")
                         if 'logo' in app:
                             print(f"Has logo. Length: {len(app['logo'])}")
                             with open('v_icon.txt', 'w') as f:
                                 f.write(app['logo'])
                             print("Saved logo to v_icon.txt")
                         else:
                             print("No logo in v app")
            
            # Also check 'all' or other keys in minapps?
            # print(f"Keys in minapps: {list(minapps.keys())}")

except Exception as e:
    print(f"Error: {e}")
