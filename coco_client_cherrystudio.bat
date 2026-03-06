@echo off
rem set COCO_PACKAGE=//pss01/Code_Public/packages
rem ping pss01
rem ping fk01.ccc.net
title COCO Client Localhost.
set FTRACK_COCO=1
set FTRACK_SERVER=http://fk01.ccc.net
set FTRACK_API_KEY=ODA0MTU5N2EtZTBiMS00Mzc3LTljMTAtZWZkOTJmNDIzNmMzOjo1NzU5NDhlMi0xMDc3LTQ5MGQtYmRjYy1iM2RkOWQ5MGZjMDk
set COCO=D:\PyCharmProjects\COCO

rem 初始化 PYTHONPATH
set PYTHONPATH=%COCO%

rem 使用续行符拆分长行，追加路径
set PYTHONPATH=%PYTHONPATH%;//pss01/Code_Public/packages/annotated_types/0.7.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/anyio/4.12.0/16ea2bb5230fab669e843d672e84fabcb9d65f43/python;^
//pss01/Code_Public/packages/attrs/25.4.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/authlib/1.6.6/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/beartype/0.22.9/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/cachetools/6.2.4/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/certifi/2025.11.12/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/cffi/2.0.0/f8ef12a783a853b3bdc47abe6fe5a27ecbc92f84/python;^
//pss01/Code_Public/packages/charset_normalizer/3.4.4/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/click/8.3.1/a15a0f64eab0091e8880d5038044d12f646d1b05/python;^
//pss01/Code_Public/packages/cloudpickle/3.1.2/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/colorama/0.4.6/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/cryptography/46.0.3/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/cyclopts/4.4.3/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/diskcache/5.6.3/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/dnspython/2.8.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/docstring_parser/0.17.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/docutils/0.22.4/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/email_validator/2.3.0/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/exceptiongroup/1.3.1/17ab639fcdcad7d2fa7e357505ede705dcb96caa/python;^
//pss01/Code_Public/packages/fakeredis/2.33.0/573077d1a9a2e9b2b2de8d13b5e93f4e1018f954/python;^
//pss01/Code_Public/packages/fastmcp/2.14.1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/h11/0.16.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/httpcore/1.0.9/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/httpx/0.28.1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/httpx_sse/0.4.3/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/idna/3.11/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/importlib_metadata/8.7.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/jaraco.classes/3.4.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/jaraco.context/6.0.2/5b6e39358d3c906adf12a150be994f2cb858d94b/python;^
//pss01/Code_Public/packages/jaraco.functools/4.4.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/jsonschema/4.25.1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/jsonschema_path/0.3.4/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/jsonschema_specifications/2025.9.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/keyring/25.7.0/94a7fb312761e2cc26d4da3068a82e51c9802003/python;^
//pss01/Code_Public/packages/lupa/2.6/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/markdown_it_py/4.0.0/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/mcp/1.25.0/872c841b95c9a86d0247d346ad80477a40752e0f/python;^
//pss01/Code_Public/packages/mdurl/0.1.2/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/more_itertools/10.8.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/openapi_pydantic/0.5.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/opentelemetry_api/1.39.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/opentelemetry_exporter_prometheus/0.60.b1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/opentelemetry_instrumentation/0.60.b1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/opentelemetry_sdk/1.39.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/opentelemetry_semantic_conventions/0.60.b1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/packaging/25.0/b821b6f8a3d04be07cae976a50d84283e2a305ef/python;^
//pss01/Code_Public/packages/packaging/25.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pathable/0.4.4/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pathvalidate/3.3.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/platformdirs/4.5.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/prometheus_client/0.23.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/py_key_value_aio/0.3.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/py_key_value_shared/0.3.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pycparser/2.23/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pydantic/2.12.5/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pydantic_core/2.41.5/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/pydantic_settings/2.12.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pydocket/0.16.3/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/pygments/2.19.2/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/pyjwt/2.10.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pyperclip/1.11.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pyside6/6.10.1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/pyside6_addons/6.10.1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/pyside6_essentials/6.10.1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/python_dotenv/1.2.1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/python_json_logger/4.0.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/python_multipart/0.0.21/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pywin32/311/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/pywin32/311/247f3b5108d93bbbcc44654ee6739345e36d27bd/python/win32;^
//pss01/Code_Public/packages/pywin32/311/247f3b5108d93bbbcc44654ee6739345e36d27bd/python/win32/lib;^
//pss01/Code_Public/packages/pywin32/311/247f3b5108d93bbbcc44654ee6739345e36d27bd/python/win32comext/shell;^
//pss01/Code_Public/packages/pywin32_ctypes/0.2.3/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/pyyaml/6.0.3/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/redis/7.1.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/referencing/0.36.2/d63a527f615451444a62ca2c97d5a00e0465b16e/python;^
//pss01/Code_Public/packages/requests/2.32.5/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/rich/14.2.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/rich_rst/1.3.2/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/rpds_py/0.30.0/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/shellingham/1.5.4/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/shiboken6/6.10.1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/sortedcontainers/2.4.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/sse_starlette/3.1.1/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/starlette/0.50.0/f70652b833749dadec162c93e598a5e79f87e1d0/python;^
//pss01/Code_Public/packages/typer/0.21.0/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/typing_extensions/4.15.0/b821b6f8a3d04be07cae976a50d84283e2a305ef/python;^
//pss01/Code_Public/packages/typing_extensions/4.15.0/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/typing_inspection/0.4.2/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/urllib3/2.6.2/b99a49e4ec48ad4d9833734782ee775813473768/python;^
//pss01/Code_Public/packages/uvicorn/0.40.0/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/websockets/15.0.1/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/wrapt/1.17.3/247f3b5108d93bbbcc44654ee6739345e36d27bd/python;^
//pss01/Code_Public/packages/zipp/3.23.0/b99a49e4ec48ad4d9833734782ee775813473768/python

set PATH=J:/PortableGit/bin;J:/PortableGit/usr/bin;//pss01/Code_Public/packages/pywin32/311/247f3b5108d93bbbcc44654ee6739345e36d27bd/python/pywin32_system32;//pss01/Code_Public/packages/pywin32/311/247f3b5108d93bbbcc44654ee6739345e36d27bd/python/win32;%PATH%
set OPENSSL_ia32cap=:~0x20000000

\\pss01\Code_Public\packages\python\3.11.10\platform-windows\arch-AMD64\python.exe %COCO%/cocoApplication/bin/client/cocoClient.py
pause