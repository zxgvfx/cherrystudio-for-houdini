# NewAPI Provisioning 服务 — 设计与交接文档

> 用途：把"客户端持有 NewAPI 管理员凭据"这一安全隐患，改为由内网服务代持。
> 本文档同时作为**新项目的交接文档**：新项目的 AI/开发者读本文件即可获得完整上下文。

## 0. 背景（从 cherrystudio-for-houdini 对话迁移而来）

CherryStudio(Houdini/COCO 客户端) 需要给每个员工分配独立的 NewAPI `sk-` key，
以便按人统计用量。此前的实现是在启动 `.bat` 里设置：

```bat
set "NEWAPI_ADMIN_USERNAME=admin"
set "NEWAPI_ADMIN_PASSWORD=admin8849!"
```

客户端进程直接用管理员账号登录 NewAPI 建用户/建 token。**问题：任何能看到 bat /
进程环境 / 部署目录的人都能拿到管理员账号**，安全边界错误。

客户端侧（`cherrystudio/core/newapi_provisioning.py`）已经排障通过并稳定运行，
关键经验：

1. NewAPI 登录响应是**旧版格式**：`data` 里只有扁平 user 对象、**无 JSON token**，
   会话靠响应头 `Set-Cookie` 维持 → 必须用 CookieJar 贯穿后续请求。
2. `User.Password` 有 **max=20** 校验，自动生成的密码要 ≤20 字符。
3. `unlimited_quota=true` 只让 **Token 不限额**，不给"用户账户余额"；
   用户余额来自 `quota` 字段，需用 `/api/user/manage` `add_quota` 充值。
4. `.bat` 里 `set X="v"` 会把引号写进值；密码含 `!` 在 delayed expansion 下会被吞。

客户端**已经预留了走内网服务的分支**：`provisioning.endpoint` 一旦配置，
客户端就 POST 到该 endpoint 拿 key，**完全不读 `NEWAPI_ADMIN_*`**。
本服务就是要实现这个 endpoint。

相关文件（源仓库 `d:\python\cherrystudio-for-houdini`）：

- `cherrystudio/core/newapi_provisioning.py` — 客户端 provisioning（含 endpoint 分支 `_provision_via_endpoint`）
- `cherrystudio/resources/centralized-config.json` — 中心化配置，provider `centralized-openai`
- `test_newapi_login.py` — admin 登录连通性自测脚本

## 1. 目标

- 客户端**零管理员凭据**：bat 里只保留一个非机密的 endpoint URL。
- 管理员凭据只存在于**服务端环境**（部署在 NewAPI 同机或运维可控主机）。
- 服务端 provisioning **幂等**：同一 username 多次调用结果一致（复用用户/ token，余额为 0 才补）。
- 服务端校验调用方，避免有人伪造 `username` 领他人 key。

## 2. 架构

```
CocoClient ──POST /provision {username}──▶ provisioning-svc（本服务）
  （无 admin 凭据，                              │  持有 NEWAPI_ADMIN_* (仅服务端 env)
   仅 endpoint URL + 共享密钥）                  │  依赖 newapi-api 包
                                                 ▼
                                           NewAPI  (建用户/建 token/充值)
  ◀──────── {apiKey,userId,tokenId,tokenName} ───┘
```

## 3. 服务端 HTTP 契约

### POST /provision

请求头：
- `Content-Type: application/json`
- `X-Provision-Secret: <共享密钥>`（服务间鉴权）

请求体：

```json
{
  "providerId": "centralized-openai",
  "apiHost": "http://new-api.ccc.net:3000",
  "username": "zhangxugang",
  "tokenName": "cherrystudio-default",
  "group": "default"
}
```

成功响应（与客户端 `_provision_via_endpoint` 解析一致）：

```json
{
  "success": true,
  "data": {
    "userId": 42,
    "tokenId": 7,
    "tokenName": "cherrystudio-default",
    "apiKey": "sk-xxxxxxxx"
  }
}
```

失败响应：

```json
{ "success": false, "message": "reason" }
```

> 注意：客户端把 `apiHost` 一并传来，但**生产上服务端应忽略请求里的 apiHost**，
> 使用服务端自己配置的 `NEWAPI_BASE_URL`，避免被客户端引导到伪造地址。

### GET /healthz

返回 `{"status":"ok"}`，供 Docker healthcheck。

## 4. 鉴权与额度策略

- **共享密钥**：`PROVISION_SHARED_SECRET`（服务端 env）。请求头不匹配 → 401。
- **内网白名单**（可选）：只接受内网网段来源 IP。
- **额度**：服务端 env `PROVISION_TOPUP_USD`（默认 100）。仅当用户 `quota == 0` 时补一次。
- **用户名可信度**：当前 `username` 来自客户端本机 `newapi-user.json`。
  后续接入 LDAP/SSO 后，应改为服务端用会话/令牌反解 username，不再信任客户端传入。

## 5. `newapi-api` 包需要补充的内容

在 `d:\python\newapi-api` 增加一个幂等高层方法（建议放 `admin.py` 或新文件 `provisioning.py`）：

```python
# newapi/provisioning.py (新增)
from __future__ import annotations

import secrets
from dataclasses import dataclass

from newapi.admin import AdminClient
from newapi.users import UserClient, build_email
from newapi.quota import usd_to_quota

_PASSWORD_MAX_LEN = 20


def _gen_password() -> str:
    # 2 + 18 = 20，满足 NewAPI User.Password max=20
    return ("cs" + secrets.token_hex(9))[:_PASSWORD_MAX_LEN]


@dataclass
class ProvisionOutput:
    user_id: int
    token_id: int
    token_name: str
    api_key: str


def provision_or_reuse(
    admin: AdminClient,
    *,
    username: str,
    token_name: str = "cherrystudio-default",
    group: str = "default",
    topup_usd: float = 100.0,
) -> ProvisionOutput:
    """幂等：存在则复用，不存在则创建；余额为 0 才充值；返回 sk- key。

    admin 需已 login()。复用 admin 的底层 httpx client 以共享 cookie 会话。
    """
    password = _gen_password()

    page = admin.search_users(keyword=username, page_size=50)
    user = next((u for u in page.items if u.username == username), None)

    if user is None:
        user = admin.create_user({
            "username": username,
            "password": password,
            "email": build_email(username),
            "group": group,
            "quota": 0,
        })
    else:
        # 复用现有用户：重置为临时密码，仅用于服务端内部登录，不下发
        admin.update_user({"id": user.id, "username": user.username, "password": password})

    # 余额为 0 才补
    if (user.quota or 0) <= 0 and topup_usd > 0:
        user = admin.add_user_quota(user.id, usd_to_quota(topup_usd))

    # 用该用户身份登录（复用 admin 的 httpx client 但独立 cookie —— 见下方说明）
    user_client = UserClient(base_url=admin.base_url)
    user_client.login(username, password)

    # 幂等 token：先找同名，找不到再建
    existing = None
    for t in user_client.search_tokens(keyword=token_name).items:
        if t.name == token_name and t.status != 0:
            existing = t
            break
    if existing:
        token_id = existing.id
        api_key = user_client.get_token_key(token_id)
    else:
        token_id, api_key = user_client.create_token_and_get_key(
            token_name, unlimited_quota=True, group=group,
        )

    user_client.close()
    return ProvisionOutput(
        user_id=user.id, token_id=token_id, token_name=token_name, api_key=api_key,
    )
```

> Cookie 说明：`UserClient(base_url=...)` 会新建独立 `httpx.Client`（独立 cookie jar），
> 与 admin 会话互不污染。不要传 `client=admin._client._client` 复用同一 client，
> 否则 admin 与 user 的 cookie/`New-Api-User` 头会互相覆盖。

同时给包补：

- 单测（respx mock）：`provision_or_reuse` 的"新建 / 复用 / 余额为0补充 / token 复用"四条路径。
- `__init__.py` 导出 `provision_or_reuse`、`ProvisionOutput`。
- 版本号 bump 到 `0.2.0`，README 增加用法。

## 6. 服务端实现草案（FastAPI 单文件）

```python
# app.py
import os
from fastapi import FastAPI, Header, HTTPException, Request
from pydantic import BaseModel
from newapi import AdminClient
from newapi.provisioning import provision_or_reuse

NEWAPI_BASE_URL = os.environ["NEWAPI_BASE_URL"]
ADMIN_USERNAME = os.environ["NEWAPI_ADMIN_USERNAME"]
ADMIN_PASSWORD = os.environ["NEWAPI_ADMIN_PASSWORD"]
SHARED_SECRET = os.environ["PROVISION_SHARED_SECRET"]
TOPUP_USD = float(os.environ.get("PROVISION_TOPUP_USD", "100"))
ALLOW_CIDRS = os.environ.get("PROVISION_ALLOW_CIDRS", "")  # 逗号分隔，可空

app = FastAPI()


class ProvisionReq(BaseModel):
    providerId: str | None = None
    apiHost: str | None = None          # 生产忽略，用服务端 NEWAPI_BASE_URL
    username: str
    tokenName: str = "cherrystudio-default"
    group: str = "default"


@app.get("/healthz")
def healthz():
    return {"status": "ok"}


@app.post("/provision")
def provision(req: ProvisionReq, request: Request,
              x_provision_secret: str = Header(default="")):
    if x_provision_secret != SHARED_SECRET:
        raise HTTPException(status_code=401, detail="bad secret")
    # 可选：校验 request.client.host 是否落在 ALLOW_CIDRS

    if not req.username.strip():
        raise HTTPException(status_code=400, detail="username required")

    admin = AdminClient(NEWAPI_BASE_URL)
    try:
        admin.login(ADMIN_USERNAME, ADMIN_PASSWORD)
        out = provision_or_reuse(
            admin,
            username=req.username.strip(),
            token_name=req.tokenName,
            group=req.group,
            topup_usd=TOPUP_USD,
        )
    except Exception as exc:  # noqa: BLE001
        return {"success": False, "message": str(exc)}
    finally:
        admin.close()

    return {
        "success": True,
        "data": {
            "userId": out.user_id,
            "tokenId": out.token_id,
            "tokenName": out.token_name,
            "apiKey": out.api_key,
        },
    }
```

`requirements.txt`（或用 uv/pyproject）：

```text
fastapi
uvicorn[standard]
newapi-api   # 发布后从内网 index 安装；本机测试用 editable 安装
```

## 7. 本机测试步骤（部署到 NewAPI 前）

1. 在 `d:\python\newapi-api` 里补 `provision_or_reuse` + 单测：
   ```powershell
   cd d:\python\newapi-api
   .\.venv\Scripts\activate
   pytest
   ```
2. 新项目里 editable 安装本地包：
   ```powershell
   uv pip install -e d:\python\newapi-api
   ```
3. 起服务（本机指向测试 NewAPI）：
   ```powershell
   $env:NEWAPI_BASE_URL="http://new-api.ccc.net:3000"
   $env:NEWAPI_ADMIN_USERNAME="admin"
   $env:NEWAPI_ADMIN_PASSWORD="admin8849!"
   $env:PROVISION_SHARED_SECRET="dev-secret"
   uvicorn app:app --host 127.0.0.1 --port 8080
   ```
4. 手测：
   ```powershell
   curl -X POST http://127.0.0.1:8080/provision `
     -H "Content-Type: application/json" `
     -H "X-Provision-Secret: dev-secret" `
     -d '{"username":"zhangxugang","tokenName":"cherrystudio-default","group":"default"}'
   ```
   期望返回 `success:true` 且带 `apiKey`；NewAPI 后台能看到用户+token+余额。
5. 客户端联调：改中心化配置（见第 8 节），启动客户端确认日志出现
   `[NewAPI Provisioning] success ...`，且不再读 admin 环境变量。

## 8. 客户端配置改动（联调通过后）

`cherrystudio/resources/centralized-config.json` 的 provider `centralized-openai`：

```json
"provisioning": {
  "provider": "newapi",
  "endpoint": "http://<provision-svc 内网地址>/provision",
  "tokenName": "cherrystudio-default",
  "group": "default",
  "usernameSource": "local-config"
}
```

- 配了 `endpoint` 后，客户端只 POST endpoint，不再需要 `NEWAPI_ADMIN_*`。
- bat 里删除 `set NEWAPI_ADMIN_*`，无需再放任何机密。
- 客户端如需带共享密钥，可在 `_provision_via_endpoint` 里加请求头
  （当前实现未带 header，联调时按需补一行）。

> TODO（客户端侧小改）：`_provision_via_endpoint` 目前不发送 `X-Provision-Secret`，
> 也不发送 apiHost 之外的鉴权信息。若启用共享密钥，需要在客户端读取一个
> 非机密渠道下发的 secret 或改用内网 IP 白名单。二选一，建议先用 IP 白名单最省事。

## 9. 发布包 + Docker（测试通过后）

1. **发布 `newapi-api`**：bump 版本 → build → 传内网 PyPI / 私有 index：
   ```powershell
   cd d:\python\newapi-api
   uv build            # 产出 dist/*.whl
   # twine upload --repository <内网index> dist/*
   ```
2. **服务 Docker 化**（新项目里）：
   ```dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   COPY app.py .
   EXPOSE 8080
   HEALTHCHECK --interval=30s --timeout=3s CMD python -c "import urllib.request;urllib.request.urlopen('http://127.0.0.1:8080/healthz')"
   CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
   ```
   `docker run` 时用 `-e` 注入 `NEWAPI_ADMIN_*` / `PROVISION_SHARED_SECRET`
   （或用 docker secret / compose env_file，勿写进镜像）。
3. 部署到 NewAPI 同机，客户端 endpoint 指向它。

## 10. 待办清单

- [ ] `newapi-api`：新增 `provision_or_reuse` + 单测 + 导出 + bump 0.2.0
- [ ] 新项目：FastAPI 服务 `app.py` + requirements + Dockerfile
- [ ] 本机联调（服务 + 客户端 endpoint 模式）
- [ ] 客户端：`_provision_via_endpoint` 视鉴权方式补 header（可选）
- [ ] 发布 `newapi-api` 到内网 index
- [ ] 打 Docker 镜像并部署到 NewAPI 机器
- [ ] 中心化配置切到 endpoint，bat 移除 `NEWAPI_ADMIN_*`
- [ ] 回归：多用户、余额为 0 补充、token 复用、限流/异常
