# -*- coding: utf-8 -*-
"""HTTP 客户端中途掐连接是正常现象，不要把 WinError 10053 打到 BAT 黑框。"""

from __future__ import annotations

import sys
from socketserver import BaseServer

_DISCONNECT = (
    ConnectionAbortedError,  # WinError 10053
    ConnectionResetError,  # WinError 10054
    BrokenPipeError,
    TimeoutError,
)
_WINERRORS = {10053, 10054, 10058}


def is_client_disconnect(exc: BaseException | None = None) -> bool:
    if exc is None:
        exc = sys.exc_info()[1]
    if exc is None:
        return False
    if isinstance(exc, _DISCONNECT):
        return True
    if isinstance(exc, OSError):
        winerror = getattr(exc, "winerror", None)
        errno = getattr(exc, "errno", None)
        return winerror in _WINERRORS or errno in (_WINERRORS | {32, 54, 104})
    return False


class DisconnectQuietMixIn:
    """给 ThreadingHTTPServer 用：handle_error 不再把断连 traceback 打到 stderr。"""

    def handle_error(self, request, client_address):  # noqa: ARG002
        if is_client_disconnect():
            return
        BaseServer.handle_error(self, request, client_address)


class DisconnectQuietHandlerMixIn:
    """给 BaseHTTPRequestHandler 用：读请求行时对端已断开则静默关连接。"""

    def handle_one_request(self):
        try:
            super().handle_one_request()
        except Exception as exc:  # noqa: BLE001
            if is_client_disconnect(exc):
                self.close_connection = True
                return
            raise

    def handle(self):
        try:
            super().handle()
        except Exception as exc:  # noqa: BLE001
            if is_client_disconnect(exc):
                self.close_connection = True
                return
            raise
