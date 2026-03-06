import os
import json
import uuid
import logging
from typing import List, Dict, Any, Union
from urllib import request
import concurrent.futures
from PySide6.QtWidgets import QApplication

# Configure logger
logger = logging.getLogger(__name__)

class KnowledgeBaseService:
    def __init__(self, data_path: str):
        self.data_path = data_path
        self.vectors_path = os.path.join(data_path, "vectors")
        os.makedirs(self.vectors_path, exist_ok=True)
        
    def _get_vectors_file(self, kb_id: str) -> str:
        return os.path.join(self.vectors_path, f"{kb_id}.json")

    def _load_centralized_config(self) -> Dict[str, Any]:
        """加载中心化配置文件"""
        try:
            config_path = os.environ.get("CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH")
            
            if not config_path:
                current_dir = os.path.dirname(os.path.abspath(__file__))
                project_root = os.path.dirname(current_dir)
                config_path = os.path.join(project_root, "resources", "centralized-config.json")
            
            if config_path and os.path.exists(config_path):
                with open(config_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            logger.error(f"Failed to load centralized config: {e}")
        return {}

    def _read_file_content(self, path: str) -> str:
        """根据文件类型读取内容，支持 PDF 和文本文件"""
        if not path or not os.path.exists(path):
            raise FileNotFoundError(f"File not found: {path}")

        _, ext = os.path.splitext(path)
        ext = ext.lower()
        
        print(f"[DEBUG KB] _read_file_content called, path={path}, ext={ext}")

        # 处理 PDF
        if ext == '.pdf':
            text_content = []
            
            # 方法1: 尝试使用 PyMuPDF (fitz) - 效果最好
            try:
                import fitz  # PyMuPDF
                print(f"[DEBUG KB] Using PyMuPDF to read PDF: {path}")
                doc = fitz.open(path)
                total_pages = len(doc)
                print(f"[DEBUG KB] PDF has {total_pages} pages")
                
                for i, page in enumerate(doc):
                    if i % 5 == 0:
                        app = QApplication.instance()
                        if app: app.processEvents()
                    
                    text = page.get_text()
                    if text and text.strip():
                        text_content.append(text)
                        
                doc.close()
                
                if text_content:
                    result = "\n".join(text_content)
                    print(f"[DEBUG KB] PyMuPDF extracted {len(result)} characters")
                    return result
                else:
                    print("[DEBUG KB] PyMuPDF: No text found (possibly scanned PDF)")
                    
            except ImportError:
                print("[DEBUG KB] PyMuPDF (fitz) not installed, trying pypdf...")
            except Exception as e:
                print(f"[DEBUG KB] PyMuPDF error: {e}, trying pypdf...")
            
            # 方法2: 尝试使用 pypdf
            try:
                import pypdf
                print(f"[DEBUG KB] Using pypdf to read PDF: {path}")
                with open(path, 'rb') as f:
                    pdf = pypdf.PdfReader(f)
                    total_pages = len(pdf.pages)
                    print(f"[DEBUG KB] PDF has {total_pages} pages")
                    
                    for i, page in enumerate(pdf.pages):
                        if i % 5 == 0:
                            app = QApplication.instance()
                            if app: app.processEvents()
                            
                        text = page.extract_text()
                        if text and text.strip():
                            text_content.append(text)
                
                if text_content:
                    result = "\n".join(text_content)
                    print(f"[DEBUG KB] pypdf extracted {len(result)} characters")
                    return result
                else:
                    print("[DEBUG KB] pypdf: No text found (possibly scanned PDF)")
                    
            except ImportError:
                print("[DEBUG KB] pypdf not installed")
            except Exception as e:
                print(f"[DEBUG KB] pypdf error: {e}")
            
            # 方法3: 尝试使用 pdfplumber
            try:
                import pdfplumber
                print(f"[DEBUG KB] Using pdfplumber to read PDF: {path}")
                with pdfplumber.open(path) as pdf:
                    total_pages = len(pdf.pages)
                    print(f"[DEBUG KB] PDF has {total_pages} pages")
                    
                    for i, page in enumerate(pdf.pages):
                        if i % 5 == 0:
                            app = QApplication.instance()
                            if app: app.processEvents()
                            
                        text = page.extract_text()
                        if text and text.strip():
                            text_content.append(text)
                
                if text_content:
                    result = "\n".join(text_content)
                    print(f"[DEBUG KB] pdfplumber extracted {len(result)} characters")
                    return result
                else:
                    print("[DEBUG KB] pdfplumber: No text found")
                    
            except ImportError:
                print("[DEBUG KB] pdfplumber not installed")
            except Exception as e:
                print(f"[DEBUG KB] pdfplumber error: {e}")
            
            # 如果所有方法都失败
            if not text_content:
                raise ImportError(
                    "无法读取 PDF 文件。请安装以下任一库:\n"
                    "  pip install pymupdf  (推荐，效果最好)\n"
                    "  pip install pypdf\n"
                    "  pip install pdfplumber\n"
                    "如果 PDF 是扫描版图片，需要安装 OCR 工具。"
                )

        # 处理 DOCX
        if ext == '.docx':
            try:
                import docx
                print(f"[DEBUG KB] Using python-docx to read DOCX: {path}")
                doc = docx.Document(path)
                text_content = []
                for para in doc.paragraphs:
                    if para.text.strip():
                        text_content.append(para.text)
                result = "\n".join(text_content)
                print(f"[DEBUG KB] Extracted {len(result)} characters from DOCX")
                return result
            except ImportError:
                raise ImportError("读取 DOCX 需要 python-docx 库: pip install python-docx")
            except Exception as e:
                print(f"[DEBUG KB] DOCX read error: {e}")
                raise e

        # 处理普通文本
        print(f"[DEBUG KB] Reading as plain text: {path}")
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                print(f"[DEBUG KB] Read {len(content)} characters as text")
                return content
        except Exception as e:
            raise Exception(f"Failed to read text file: {e}")

    def remove_item(self, kb_id: str, item_id: str):
        """Remove vectors for a specific item"""
        vectors = self._load_vectors(kb_id)
        # Filter out vectors belonging to this item
        new_vectors = [v for v in vectors if v.get("itemId") != item_id]
        self._save_vectors(kb_id, new_vectors)
        return True

    def reset(self, kb_id: str):
        """Delete all vectors for a knowledge base"""
        try:
            file_path = self._get_vectors_file(kb_id)
            if os.path.exists(file_path):
                os.remove(file_path)
            
            # Also remove meta file
            meta_path = os.path.join(self.vectors_path, f"{kb_id}.meta.json")
            if os.path.exists(meta_path):
                os.remove(meta_path)
                
            return True
        except Exception as e:
            logger.error(f"Failed to reset KB {kb_id}: {e}")
            return False

    def save_kb_metadata(self, kb_info: Dict[str, Any]):
        """Save knowledge base metadata to a companion file"""
        kb_id = kb_info.get("id")
        if not kb_id:
            return
            
        os.makedirs(self.vectors_path, exist_ok=True)
        meta_path = os.path.join(self.vectors_path, f"{kb_id}.meta.json")
        try:
            with open(meta_path, 'w', encoding='utf-8') as f:
                json.dump(kb_info, f, ensure_ascii=False, indent=2)
            logger.info(f"Saved KB metadata: {kb_info.get('name')} ({kb_id})")
        except Exception as e:
            logger.error(f"Failed to save KB metadata {kb_id}: {e}")

    def sync_from_central_source(self, source_path: str) -> Dict[str, Any]:
        """从中心化源同步知识库文件到本地"""
        result = {"synced": 0, "updated": 0, "failed": 0, "needsRefresh": False}
        
        if not source_path or not os.path.exists(source_path):
            return result
        
        os.makedirs(self.vectors_path, exist_ok=True)
        
        try:
            source_files = os.listdir(source_path)
            meta_files = [f for f in source_files if f.endswith(".meta.json")]
            
            for meta_filename in meta_files:
                try:
                    kb_id = meta_filename.replace(".meta.json", "")
                    source_meta_path = os.path.join(source_path, meta_filename)
                    source_vector_path = os.path.join(source_path, f"{kb_id}.json")
                    
                    local_meta_path = os.path.join(self.vectors_path, meta_filename)
                    local_vector_path = os.path.join(self.vectors_path, f"{kb_id}.json")
                    
                    with open(source_meta_path, 'r', encoding='utf-8') as f:
                        source_meta = json.load(f)
                    
                    source_version = source_meta.get("version", 0)
                    source_updated = source_meta.get("updated_at", 0)
                    
                    need_update = True
                    if os.path.exists(local_meta_path):
                        try:
                            with open(local_meta_path, 'r', encoding='utf-8') as f:
                                local_meta = json.load(f)
                            local_version = local_meta.get("version", 0)
                            local_updated = local_meta.get("updated_at", 0)
                            
                            if source_version <= local_version and source_updated <= local_updated:
                                need_update = False
                        except Exception:
                            pass
                    
                    if need_update:
                        import shutil
                        shutil.copy2(source_meta_path, local_meta_path)
                        
                        if os.path.exists(source_vector_path):
                            shutil.copy2(source_vector_path, local_vector_path)
                        
                        source_meta["isCentralized"] = True
                        with open(local_meta_path, 'w', encoding='utf-8') as f:
                            json.dump(source_meta, f, ensure_ascii=False, indent=2)
                        
                        if os.path.exists(local_vector_path):
                            result["updated"] += 1
                        else:
                            result["synced"] += 1
                        
                        result["needsRefresh"] = True
                        
                except Exception as e:
                    logger.error(f"Failed to sync {meta_filename}: {e}")
                    result["failed"] += 1
                    
        except Exception as e:
            logger.error(f"Central sync error: {e}")
            
        if result["synced"] > 0 or result["updated"] > 0:
            logger.info(f"KB sync: synced={result['synced']}, updated={result['updated']}")
        return result

    def scan_knowledge_bases(self) -> List[Dict[str, Any]]:
        """Scan local folder for knowledge base metadata files"""
        kbs = []
        if not os.path.exists(self.vectors_path):
            return []
        
        try:
            files = os.listdir(self.vectors_path)
            meta_files = [f for f in files if f.endswith(".meta.json")]
            
            for filename in meta_files:
                try:
                    path = os.path.join(self.vectors_path, filename)
                    with open(path, 'r', encoding='utf-8') as f:
                        kb_info = json.load(f)
                        
                    kb_id = kb_info.get("id")
                    if not kb_id:
                        continue
                    
                    kbs.append(kb_info)
                        
                except Exception as e:
                    logger.error(f"Error reading KB meta {filename}: {e}")
        except Exception as e:
            logger.error(f"KB scan error: {e}")
             
        logger.info(f"Scanned {len(kbs)} knowledge bases")
        return kbs

    def add_item(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a single item (file/note) and add to KB.
        payload: { base: {...}, item: {...}, userId: ... }
        """
        logger.info(f"[KB] add_item called")
        
        # 保持界面响应
        app = QApplication.instance()
        if app: app.processEvents()

        base_params = payload.get("base", {})
        kb_id = base_params.get("id")
        item = payload.get("item", {})
        
        logger.info(f"[KB] kb_id: {kb_id}, item_type: {item.get('type')}")
        
        if not kb_id:
            logger.error("[KB] Missing knowledge base ID")
            return {"status": "failed", "message": "Missing knowledge base ID"}
            
        embed_config = base_params.get("embedApiClient", {})
        if not embed_config:
             logger.error("[KB] Missing embedding configuration")
             return {"status": "failed", "message": "Missing embedding configuration"}

        item_type = item.get("type")
        content = item.get("content")
        item_id = item.get("id")
        
        text_content = ""
        metadata = {
            "item_id": item_id,
            "type": item_type,
            "created_at": item.get("created_at")
        }

        try:
            if item_type == 'file':
                path = ""
                if isinstance(content, dict):
                    path = content.get("path", "")
                else:
                    path = content
                
                if path and os.path.exists(path):
                    # 使用新的读取方法，支持 PDF
                    try:
                        text_content = self._read_file_content(path)
                        metadata["source"] = path
                    except ImportError as ie:
                         return {"status": "failed", "message": str(ie)}
                    except Exception as e:
                        return {"status": "failed", "message": f"Failed to read file: {e}"}
                else:
                     return {"status": "failed", "message": f"File not found: {path}"}
            
            elif item_type == 'note':
                text_content = content
                metadata["source"] = "note"
            
            if not text_content:
                 return {"status": "failed", "message": "Empty content"}

            logger.info(f"[KB] Content length: {len(text_content)} chars")

            # Chunking
            chunk_size = base_params.get("chunkSize", 500)
            chunks = self._chunk_text(text_content, chunk_size=chunk_size)
            logger.info(f"[KB] Created {len(chunks)} chunks with size {chunk_size}")
            
            # Embedding
            # 保持界面响应
            if app: app.processEvents()

            logger.info(f"[KB] Starting embedding for {len(chunks)} chunks...")
            import time as _time
            _start = _time.time()
            embeddings = self._get_embeddings(chunks, embed_config)
            logger.info(f"[KB] Embedding completed in {_time.time() - _start:.2f}s, got {len(embeddings) if embeddings else 0} embeddings")
            
            if not embeddings:
                 return {"status": "failed", "message": "Failed to generate embeddings", "messageSource": "embedding"}
            
            if len(embeddings) != len(chunks):
                 # Truncate to match
                 min_len = min(len(chunks), len(embeddings))
                 chunks = chunks[:min_len]
                 embeddings = embeddings[:min_len]

            # Save vectors
            new_vectors = []
            for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
                vector_entry = {
                    "id": str(uuid.uuid4()),
                    "values": embedding,
                    "metadata": {
                        **metadata,
                        "text": chunk,
                        "chunk_index": i
                    }
                }
                new_vectors.append(vector_entry)
            
            current_vectors = self._load_vectors(kb_id)
            # Remove old vectors for this item if any
            current_vectors = [v for v in current_vectors if v.get("metadata", {}).get("item_id") != item_id]
            current_vectors.extend(new_vectors)
            self._save_vectors(kb_id, current_vectors)
            
            return {
                "status": "completed",
                "uniqueId": item_id,
                "uniqueIds": [v["id"] for v in new_vectors]
            }

        except Exception as e:
            logger.error(f"[KB] ADD_ITEM EXCEPTION: {e}")
            import traceback
            logger.error(traceback.format_exc())
            return {"status": "failed", "message": str(e)}

    def _load_vectors(self, kb_id: str) -> List[Dict]:
        file_path = self._get_vectors_file(kb_id)
        if not os.path.exists(file_path):
            return []
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []

    def _save_vectors(self, kb_id: str, vectors: List[Dict]):
        file_path = self._get_vectors_file(kb_id)
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(vectors, f, ensure_ascii=False)

    def search(self, params: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        在知识库中搜索相关内容
        params: {
            search: str,           # 搜索查询
            base: {...},           # 单个知识库（前端格式）
            bases: [...],          # 知识库列表（兼容格式）
            topK: int              # 返回的结果数量
        }
        """
        print(f"[DEBUG KB] ========== SEARCH START ==========")
        query = params.get("search", "")
        
        # 兼容前端传递的 base（单个）和 bases（数组）两种格式
        bases = params.get("bases", [])
        single_base = params.get("base")
        if single_base and not bases:
            bases = [single_base]
            
        top_k = params.get("topK", 5)
        
        print(f"[DEBUG KB] Query: {query[:100]}...")
        print(f"[DEBUG KB] Searching in {len(bases)} knowledge bases, topK={top_k}")
        if bases:
            for i, b in enumerate(bases):
                print(f"[DEBUG KB] Base {i}: id={b.get('id')}, has embedApiClient={bool(b.get('embedApiClient'))}")
        
        if not query or not bases:
            print("[DEBUG KB] Empty query or no bases")
            return []
        
        all_results = []
        
        for base in bases:
            kb_id = base.get("id")
            embed_config = base.get("embedApiClient", {})
            
            if not kb_id or not embed_config:
                print(f"[DEBUG KB] Skipping base with missing id or config")
                continue
            
            print(f"[DEBUG KB] Searching in base: {kb_id}")
            
            # 加载该知识库的向量
            vectors = self._load_vectors(kb_id)
            if not vectors:
                print(f"[DEBUG KB] No vectors found for base {kb_id}")
                continue
            
            print(f"[DEBUG KB] Loaded {len(vectors)} vectors")
            
            # 获取查询的嵌入向量
            query_embeddings = self._get_embeddings([query], embed_config)
            if not query_embeddings:
                print(f"[DEBUG KB] Failed to get query embedding")
                continue
            
            query_embedding = query_embeddings[0]
            print(f"[DEBUG KB] Got query embedding with {len(query_embedding)} dimensions")
            
            # 计算相似度并排序
            scored_vectors = []
            for vec in vectors:
                vec_values = vec.get("values", [])
                if not vec_values:
                    continue
                
                # 计算余弦相似度
                similarity = self._cosine_similarity(query_embedding, vec_values)
                scored_vectors.append({
                    "vector": vec,
                    "score": similarity
                })
            
            # 按相似度排序
            scored_vectors.sort(key=lambda x: x["score"], reverse=True)
            
            # 取前 top_k 个结果
            for item in scored_vectors[:top_k]:
                vec = item["vector"]
                metadata = vec.get("metadata", {})
                
                # 返回格式需要与前端 KnowledgeSearchResult 匹配
                result = {
                    "pageContent": metadata.get("text", ""),  # 前端期望 pageContent
                    "score": item["score"],
                    "metadata": {
                        "source": metadata.get("source", ""),
                        "type": metadata.get("type", "file"),
                        "item_id": metadata.get("item_id", ""),
                        "uniqueId": vec.get("id", ""),  # 用于去重
                        "chunk_index": metadata.get("chunk_index", 0)
                    }
                }
                all_results.append(result)
        
        # 按分数排序所有结果，返回前 top_k 个
        all_results.sort(key=lambda x: x.get("score", 0), reverse=True)
        final_results = all_results[:top_k]
        
        print(f"[DEBUG KB] Returning {len(final_results)} results")
        if final_results:
            print(f"[DEBUG KB] Top result score: {final_results[0].get('score', 0):.4f}")
            print(f"[DEBUG KB] Top result content preview: {final_results[0].get('pageContent', '')[:100]}...")
        print(f"[DEBUG KB] ========== SEARCH END ==========")
        
        return final_results

    def _cosine_similarity(self, vec1: List[float], vec2: List[float]) -> float:
        """计算两个向量的余弦相似度"""
        if len(vec1) != len(vec2):
            # 维度不匹配，返回 0
            return 0.0
        
        dot_product = sum(a * b for a, b in zip(vec1, vec2))
        norm1 = sum(a * a for a in vec1) ** 0.5
        norm2 = sum(b * b for b in vec2) ** 0.5
        
        if norm1 == 0 or norm2 == 0:
            return 0.0
        
        return dot_product / (norm1 * norm2)

    def _chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        """Simple text chunking with overlap"""
        if not text:
            return []
        
        chunks = []
        start = 0
        text_len = len(text)
        
        app = QApplication.instance()

        while start < text_len:
            # 保持界面响应
            if len(chunks) % 10 == 0 and app:
                app.processEvents()

            end = start + chunk_size
            chunk = text[start:end]
            chunks.append(chunk)
            start += chunk_size - overlap
            
        return [c.strip() for c in chunks if c.strip()]

    def _get_embeddings(self, texts: List[str], config: Dict[str, Any]) -> List[List[float]]:
        """Call the embedding API with concurrency."""
        if not texts:
            return []
            
        base_url = config.get("baseURL", "").rstrip('/')
        api_key = config.get("apiKey", "")
        model = config.get("model", "")
        provider = config.get("provider", "").lower()
        
        # Fallback: 如果 baseURL 为空，尝试从中心化配置中查找
        if not base_url:
            centralized_config = self._load_centralized_config()
            if centralized_config:
                for prov in centralized_config.get("providers", []):
                    for m in prov.get("models", []):
                        if m.get("id") == model or m.get("modelId") == model:
                            base_url = prov.get("apiHost", "").rstrip('/')
                            api_key = prov.get("apiKey", "") or api_key
                            provider = prov.get("type", "openai").lower()
                            break
                    if base_url:
                        break
        
        if not base_url:
            logger.error(f"No base_url for embedding model: {model}")
            return []

        is_ollama = provider == "ollama" or "ollama" in base_url.lower() or ":11434" in base_url
        
        if is_ollama:
            url = f"{base_url}/api/embed"
        else:
            if "/v1" in base_url:
                url = f"{base_url}/embeddings"
            else:
                url = f"{base_url}/v1/embeddings"
        
        headers = {
            "Content-Type": "application/json",
        }
        if api_key and api_key != "secret":
            headers["Authorization"] = f"Bearer {api_key}"
        
        all_embeddings = [None] * len(texts)
        app = QApplication.instance()
        
        # 使用线程池并发请求
        max_workers = 4 if is_ollama else 10

        def fetch_single_ollama(index, text):
            try:
                logger.info(f"[KB] Embedding request {index} to {url[:50]}...")
                data = {"model": model, "input": text}
                req = request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
                with request.urlopen(req, timeout=30) as response:  # 减少超时到 30 秒
                    result = json.loads(response.read().decode('utf-8'))
                    logger.info(f"[KB] Embedding request {index} completed")
                    if "embeddings" in result and result["embeddings"]:
                        return index, result["embeddings"][0]
                    elif "embedding" in result:
                        return index, result["embedding"]
            except Exception as e:
                logger.error(f"[KB] Embedding request {index} failed: {e}")
            return index, None

        def fetch_batch_openai(start_idx, batch_texts):
            try:
                logger.info(f"[KB] Batch embedding request starting at {start_idx} to {url[:50]}...")
                data = {"input": batch_texts, "model": model}
                req = request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
                with request.urlopen(req, timeout=30) as response:  # 减少超时到 30 秒
                    result = json.loads(response.read().decode('utf-8'))
                    logger.info(f"[KB] Batch embedding request completed")
                    if "data" in result:
                        return start_idx, [item["embedding"] for item in result["data"]]
            except Exception as e:
                logger.error(f"[KB] Batch embedding request failed: {e}")
            return start_idx, None

        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = []
            
            if is_ollama:
                # Ollama 并发单条请求
                for i, text in enumerate(texts):
                    futures.append(executor.submit(fetch_single_ollama, i, text))
            else:
                # OpenAI 兼容接口使用 Batch + 并发
                batch_size = 10
                for i in range(0, len(texts), batch_size):
                    batch_texts = texts[i:i+batch_size]
                    futures.append(executor.submit(fetch_batch_openai, i, batch_texts))
            
            # 等待结果并刷新界面
            completed_count = 0
            for future in concurrent.futures.as_completed(futures):
                completed_count += 1
                if completed_count % 2 == 0 and app:
                     app.processEvents() # 防止界面卡死
                
                try:
                    idx, result = future.result()
                    if result is not None:
                        if is_ollama:
                            all_embeddings[idx] = result
                        else:
                            for offset, emb in enumerate(result):
                                if idx + offset < len(all_embeddings):
                                    all_embeddings[idx + offset] = emb
                except Exception:
                    pass

        valid_embeddings = [e for e in all_embeddings if e is not None]
        return valid_embeddings
