# Tasks Document

- [-] 1. Stabilize WebChannel bootstrap in `houdini_plugin/main.py`
  - File: `houdini_plugin/main.py`
  - Ensure WebChannel initialization emits ping/ready signals, retries gracefully, and avoids crashes.
  - _Leverage: existing `create_window` setup, `HostBridge`, `AppAPI`_
  - _Requirements: 1.1, 1.2, 3.1_
  - _Prompt: Role: PySide6 Developer focusing on Qt WebEngine integration | Task: Implement reliable WebChannel bootstrap with ping handshake and retry logic per requirements 1.1, 1.2, and 3.1 in `houdini_plugin/main.py`, ensuring Houdini does not crash on failure | Restrictions: Do not remove existing API stubs, avoid blocking loops, maintain compatibility with current logging hooks | _Leverage: use `QWebEngineScript`, existing `HostBridge` signals, logging helpers | Requirements: 1.1, 1.2, 3.1 | Success: WebChannel ready is logged, ping returns "pong", failures log descriptive warnings without crashing._

- [ ] 2. Implement Python-side Ollama proxy endpoints
  - File: `houdini_plugin/main.py`
  - Extend `NetworkAPI` with `openaiFetch` wrapper, structured logging, and resilient error handling for `/api/tags` and `/v1/models`.
  - _Leverage: current `ollamaListModels`, `fetchProxy` implementation_
  - _Requirements: 2.1, 2.2, 3.2_
  - _Prompt: Role: Python Backend Engineer specializing in REST proxies | Task: Implement `NetworkAPI.openaiFetch` and enhance existing Ollama slots per requirements 2.1, 2.2, 3.2, returning structured JSON and logging requests/responses | Restrictions: Only allow localhost targets, sanitize input, preserve backwards compatibility with current callers | _Leverage: urllib, logging helper, existing slot signatures | Requirements: 2.1, 2.2, 3.2 | Success: `/api/tags` and `/v1/models` calls succeed via proxy, errors return structured payloads, logs capture URL/method/status._

- [ ] 3. Add diagnostics helper and structured logging utilities
  - File: `houdini_plugin/main.py` (new helper section)
  - Create reusable functions to log WebChannel/object states and proxy outcomes; ensure all paths use them.
  - _Leverage: existing print-based logs_
  - _Requirements: 3.1, 3.2, 3.3_
  - _Prompt: Role: Observability Engineer with Python expertise | Task: Build structured logging helpers per requirements 3.1–3.3, ensuring all WebChannel and network operations use consistent logging format | Restrictions: Keep helper pure (no side effects beyond logging), do not spam excessive logs; maintain Houdini stability | _Leverage: Python logging/print wrappers | Requirements: 3.1, 3.2, 3.3 | Success: Logs include object exposure, retry attempts, URL/method/status, and error stack traces._

- [ ] 4. Update frontend Ollama adapter to use Qt slots
  - File: `web/src/renderer/src/aiCore/legacy/clients/openai/OpenAIBaseClient.ts`
  - Refactor Ollama branch to call new `qt.network` slots with fallback handling and improved warnings.
  - _Leverage: existing `OpenAIBaseClient` Ollama branch, logger service_
  - _Requirements: 2.1, 2.3_
  - _Prompt: Role: TypeScript Developer with Cherry Studio familiarity | Task: Refactor the Ollama branch to prefer Qt slot calls, handle fallback to window.api, and surface informative logs per requirements 2.1 and 2.3 | Restrictions: Do not break other providers, maintain typings, avoid introducing new dependencies | _Leverage: loggerService, window.qt typings | Requirements: 2.1, 2.3 | Success: Frontend displays model list when proxy works, warns gracefully when offline, no `Connection error` regressions._

- [ ] 5. Document and verify diagnostics workflow
  - File: `docs/houdini-ollama-troubleshooting.md` (new)
  - Write troubleshooting guide outlining logs, ping checks, and retry steps; verify by running manual test plan.
  - _Leverage: new logging outputs, existing README patterns_
  - _Requirements: 3.3, Reliability, Usability_
  - _Prompt: Role: Technical Writer with QA background | Task: Document diagnostics workflow and execute manual verification per requirements 3.3 and non-functional goals, creating `docs/houdini-ollama-troubleshooting.md` | Restrictions: Keep documentation concise (<2 pages), include command snippets, ensure instructions reflect actual implementation | _Leverage: current logs, manual test results | Requirements: 3.3, Reliability, Usability | Success: Document explains how to confirm WebChannel readiness, interpret logs, and recover from failures; manual test checklist completed._
