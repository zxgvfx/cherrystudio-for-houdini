"""测试重构后的功能"""

import sys
import os

# 添加当前目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

def test_imports():
    """测试所有模块的导入"""
    print("🧪 Testing imports...")
    
    try:
        from utils import is_running_inside_houdini, ensure_qtwebengine_initialized, create_app
        print("✅ Utils imports successful")
    except Exception as e:
        print(f"❌ Utils import failed: {e}")
        return False
    
    try:
        from api import ElectronAPI, FileAPI, AppAPI, SelectionAPI, StoreSyncAPI, NetworkAPI
        print("✅ API imports successful")
    except Exception as e:
        print(f"❌ API import failed: {e}")
        return False
    
    try:
        from bridge import HostBridge, WebContainer
        print("✅ Bridge imports successful")
    except Exception as e:
        print(f"❌ Bridge import failed: {e}")
        return False
    
    try:
        from injection import get_injection_scripts
        print("✅ Injection imports successful")
    except Exception as e:
        print(f"❌ Injection import failed: {e}")
        return False
    
    try:
        from window import create_window
        print("✅ Window imports successful")
    except Exception as e:
        print(f"❌ Window import failed: {e}")
        return False
    
    return True


def test_api_creation():
    """测试API对象的创建"""
    print("\n🧪 Testing API object creation...")
    
    try:
        from api import ElectronAPI, FileAPI, AppAPI, SelectionAPI, StoreSyncAPI, NetworkAPI
        
        electron_api = ElectronAPI()
        file_api = FileAPI()
        app_api = AppAPI()
        selection_api = SelectionAPI()
        store_api = StoreSyncAPI()
        network_api = NetworkAPI()
        
        print("✅ All API objects created successfully")
        return True
    except Exception as e:
        print(f"❌ API object creation failed: {e}")
        return False


def test_injection_scripts():
    """测试JavaScript注入脚本"""
    print("\n🧪 Testing injection scripts...")
    
    try:
        from injection import get_injection_scripts
        
        scripts = get_injection_scripts()
        print(f"✅ Got {len(scripts)} injection scripts")
        
        # 检查脚本内容
        for i, script in enumerate(scripts):
            if len(script) > 100:  # 基本的长度检查
                print(f"✅ Script {i+1}: {len(script)} chars")
            else:
                print(f"⚠️  Script {i+1}: {len(script)} chars (might be too short)")
        
        return True
    except Exception as e:
        print(f"❌ Injection scripts test failed: {e}")
        return False


def test_utils():
    """测试工具函数"""
    print("\n🧪 Testing utility functions...")
    
    try:
        from utils import is_running_inside_houdini, ensure_qtwebengine_initialized
        
        houdini_check = is_running_inside_houdini()
        print(f"✅ is_running_inside_houdini: {houdini_check}")
        
        qt_check = ensure_qtwebengine_initialized()
        print(f"✅ ensure_qtwebengine_initialized: {qt_check}")
        
        return True
    except Exception as e:
        print(f"❌ Utils test failed: {e}")
        return False


def main():
    """主测试函数"""
    print("🚀 Starting refactored code tests...\n")
    
    tests = [
        test_imports,
        test_api_creation,
        test_injection_scripts,
        test_utils
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            if test():
                passed += 1
        except Exception as e:
            print(f"❌ Test {test.__name__} crashed: {e}")
    
    print(f"\n📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Refactoring successful!")
        return True
    else:
        print("⚠️  Some tests failed. Please check the issues above.")
        return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
