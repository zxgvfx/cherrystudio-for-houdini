import os
import sys
from pathlib import Path

def ensure_package_manager_configs():
    """
    Ensure npm (.npmrc) and uv (uv.toml) configurations are set up correctly on startup.
    """
    try:
        print("[Cherry Studio] Checking package manager configurations...")
        _ensure_npm_config()
        _ensure_uv_config()
    except Exception as e:
        print(f"[Cherry Studio] Error checking package manager configs: {e}")

def _ensure_npm_config():
    """Ensure ~/.npmrc exists with correct registry."""
    try:
        home = Path.home()
        npmrc = home / ".npmrc"
        
        # Check if file exists
        if not npmrc.exists():
            content = "registry=http://nexus.ccc.net:8081/repository/npm-group/\nalways-auth=true"
            npmrc.write_text(content, encoding='utf-8')
            print(f"[Cherry Studio] Created .npmrc at {npmrc}")
        else:
            # Should we validate content? User only said "if not exists". 
            # I will stick to the instruction.
            pass
            
    except Exception as e:
        print(f"[Cherry Studio] Failed to setup .npmrc: {e}")

def _ensure_uv_config():
    """Ensure uv.toml exists in user AppData/Roaming/uv (Windows) or ~/.config/uv (Others)."""
    try:
        uv_dir = None
        if sys.platform == 'win32':
            # Use os.environ['APPDATA'] which usually points to C:\Users\<User>\AppData\Roaming
            appdata = os.environ.get('APPDATA')
            if appdata:
                uv_dir = Path(appdata) / "uv"
        else:
            # Standard XDG for Linux/Mac
            uv_dir = Path.home() / ".config" / "uv"
            
        if not uv_dir:
            print("[Cherry Studio] Could not determine uv config directory.")
            return

        uv_config = uv_dir / "uv.toml"
        
        if not uv_config.exists():
            content = '[[index]]\nurl = "https://pkg.ccc.net/repository/pypl_group/simple"\ndefault = true'
            
            # Ensure directory exists
            uv_dir.mkdir(parents=True, exist_ok=True)
            
            uv_config.write_text(content, encoding='utf-8')
            print(f"[Cherry Studio] Created uv.toml at {uv_config}")
            
    except Exception as e:
        print(f"[Cherry Studio] Failed to setup uv.toml: {e}")

