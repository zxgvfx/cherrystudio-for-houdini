# -*- coding: utf-8 -*-
"""Normalize Data API payloads before they hit headless Electron."""

from __future__ import annotations


def normalize_data_api_request(req: dict) -> dict:
    """POST /agent-sessions 必须带 workspace，DCC 面板以前只传了 name。"""
    if not isinstance(req, dict):
        return req
    path = str(req.get("path") or "").split("?")[0].rstrip("/")
    method = str(req.get("method") or "").upper()
    if method == "POST" and path == "/agent-sessions":
        body = req.get("body")
        if not isinstance(body, dict):
            body = {}
            req["body"] = body
        if not body.get("workspace"):
            body["workspace"] = {"type": "system"}
    return req
