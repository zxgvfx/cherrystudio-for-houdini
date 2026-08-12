"""Browser-facing SSE relay for events emitted by the headless Electron backend."""

import json
import queue
import uuid

from ...api.headless_electron_manager import HeadlessEventBroker
from ...utils.logger import network_logger as _log
from ..server import STREAMING_HANDLED, route


@route("/api/v1/headless/events", methods=["GET"])
def headless_events(ctx):
    handler = ctx["_handler"]
    subscriber = HeadlessEventBroker.instance().subscribe()
    conn_id = uuid.uuid4().hex[:8]
    try:
        handler.send_response(200)
        handler.send_header("Access-Control-Allow-Origin", "*")
        handler.send_header("Content-Type", "text/event-stream; charset=utf-8")
        handler.send_header("Cache-Control", "no-cache")
        handler.send_header("Connection", "keep-alive")
        handler.end_headers()
        handler.wfile.write(b": connected\n\n")
        handler.wfile.flush()

        while True:
            try:
                item = subscriber.get(timeout=20)
                frame = f"data: {json.dumps(item, ensure_ascii=False)}\n\n".encode("utf-8")
            except queue.Empty:
                frame = b": ping\n\n"
            handler.wfile.write(frame)
            handler.wfile.flush()
    except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError, OSError) as exc:
        _log(f"[HeadlessEvents] id={conn_id} connection error: {exc!r}")
    except Exception as exc:  # noqa: BLE001 - must not crash the request handler silently
        _log(f"[HeadlessEvents] id={conn_id} UNEXPECTED error: {exc!r}")
    finally:
        HeadlessEventBroker.instance().unsubscribe(subscriber)
    return STREAMING_HANDLED
