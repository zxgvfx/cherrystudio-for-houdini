import os
import json
import logging
import datetime
from PySide6.QtCore import QStandardPaths

# 配置日志
_log = logging.getLogger('ConfigManager')

class ConfigManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ConfigManager, cls).__new__(cls)
            cls._instance._init()
        return cls._instance

    def _init(self):
        # 使用用户主目录下的 .cherrystudio 目录
        base_dir = os.path.join(os.path.expanduser("~"), ".cherrystudio")
        # 修改为使用 localStorage.json
        self._user_config_path = os.path.join(base_dir, "localStorage.json")
        
        print(f"[ConfigManager] User Config Path (localStorage): {self._user_config_path}")

        # 中心化配置路径
        # 1. 尝试环境变量
        self._centralized_config_path = os.environ.get("CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH")

        # 2. 如果没有环境变量，尝试默认位置 resources/centralized-config.json
        if not self._centralized_config_path:
            # 获取当前文件所在目录: cherrystudio/core
            current_dir = os.path.dirname(os.path.abspath(__file__))
            # 项目根目录 (假设结构为 root/cherrystudio/core)
            project_root = os.path.dirname(os.path.dirname(current_dir))
            
            # 使用项目根目录下的 resources 目录
            potential_path = os.path.join(project_root, "resources", "centralized-config.json")
            
            if os.path.exists(potential_path):
                self._centralized_config_path = potential_path
        
        _log.info(f"User config path: {self._user_config_path}")
        _log.info(f"Centralized config path: {self._centralized_config_path}")
        
        self._config = None
        
        # 初始化时立即加载，以便确认逻辑执行
        self.load()

    def load(self):
        """加载并合并配置"""
        # 1. 加载中心化配置 (只读)
        centralized = {"models": [], "mcpServers": [], "version": "1.0.0", "providers": []}
        if self._centralized_config_path and os.path.exists(self._centralized_config_path):
            try:
                with open(self._centralized_config_path, 'r', encoding='utf-8') as f:
                    centralized = json.load(f)
                    # 标记为只读
                    for m in centralized.get("models", []):
                        m["isCentralized"] = True
                    for s in centralized.get("mcpServers", []):
                        s["isCentralized"] = True
                _log.info(f"Loaded centralized config from {self._centralized_config_path}")
            except Exception as e:
                _log.error(f"Failed to load centralized config: {e}")

        # 2. 加载用户配置 (localStorage 格式)
        # localStorage.json 是 Redux Persist 格式，主要关注 'persist:cherry-studio'
        user_models = []
        user_servers = []
        user_version = "1.0.0"
        
        if os.path.exists(self._user_config_path):
            try:
                with open(self._user_config_path, 'r', encoding='utf-8') as f:
                    # localStorage.json 存储的是 key-value 对，值通常是序列化的 JSON 字符串
                    local_storage_data = json.load(f)
                    
                    # 尝试解析 models (通常在 llm 或 providers 相关的 slice 中)
                    # 根据 Redux store 结构，models 可能存储在 'llm' 或其他 slice 中
                    # 这里我们需要具体分析 Redux state 结构
                    # 假设 'llm' slice 包含 models，或者有一个专门的 providers slice
                    
                    # 暂时为了兼容，我们先只读取，不写入回 localStorage，避免破坏 Redux 结构
                    # 真正的合并可能需要在前端进行，或者这里做非常小心的处理
                    
                    # 2023-12-23: 由于 localStorage 结构复杂，且主要由前端管理
                    # Python 端主要负责提供"中心化配置"，让前端去合并
                    # 所以这里我们暂时返回空的用户配置，让前端只看到中心化配置 + 前端自己的缓存
                    # 但为了支持 Python 端获取合并后的配置，我们需要解析一下
                    pass
                    
            except Exception as e:
                _log.error(f"Failed to load user config from localStorage: {e}")
        
        # 3. 合并配置
        # 获取中心化配置的 IDs
        centralized_model_ids = {m["id"] for m in centralized.get("models", []) if "id" in m}
        centralized_server_ids = {s["id"] for s in centralized.get("mcpServers", []) if "id" in s}
        
        # 返回配置给前端
        # 注意：前端会接收这个 _config，并将其中的 centralizedModels/Servers 合并到 Redux store 中
        # 所以这里我们主要负责传递 centralized 数据
        
        self._config = {
            "models": [], # 前端负责合并
            "mcpServers": centralized.get("mcpServers", []),
            "centralizedProviders": centralized.get("providers", []),
            "centralizedMcpServers": centralized.get("mcpServers", []),
            "userModels": [], 
            "userMcpServers": [],
            "version": "1.0.0",
            "lastUpdated": datetime.datetime.now().isoformat()
        }
        
        return self._config

    def reload(self):
        """重新加载配置"""
        return self.load()

    def update_user_models(self, models):
        """更新用户模型配置 - 已弃用"""
        # 由于我们现在依赖 localStorage.json，且该文件由前端直接管理
        # Python 端不再负责写入用户模型配置，以免损坏 Redux 状态
        # 此方法保留是为了兼容 API 调用，但不会执行写操作
        _log.warning("update_user_models is deprecated. User models are managed by frontend localStorage.")
        return self.load()

    def update_user_mcp_servers(self, servers):
        """更新用户 MCP 服务器配置 - 已弃用"""
        _log.warning("update_user_mcp_servers is deprecated. User MCP servers are managed by frontend localStorage.")
        return self.load()

    def _save_user_config(self, config):
        """保存用户配置文件 - 已弃用"""
        # 不再写入文件
        pass

# 全局单例
config_manager = ConfigManager()

