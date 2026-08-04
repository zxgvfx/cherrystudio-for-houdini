import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { B as Loading3QuartersOutlined_default, Dt as DeleteOutlined_default, n as init_es, ni as CloseOutlined_default, tn as EyeInvisibleOutlined_default, vn as EyeOutlined_default, yo as useTranslation } from "./es-LrIJRimU.js";
import { Jd as spin_default, Xd as input_default, ef as flex_default, xi as TopView } from "./store-C-c3oU9G.js";
import "./dayjs.min-A7WN91xd.js";
import { t as require_react } from "./react-1FqkuScD.js";
import "./stylis-BaN_JEhW.js";
import { Wt as button_default } from "./ImageViewer-CMgPavjY.js";
import "./Component-Dt1EU58G.js";
import { t as Plus } from "./plus-BxHq6YCG.js";
import { n as dt } from "./styled-components.browser.esm-CWwHPchJ.js";
import "./dist-B0d1CYLd.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BEUwrBtJ.js";
import "./dist-B1WQMAJb.js";
import "./katex-BYiF-YTA.js";
import "./dist-NDLMieGj.js";
import "./purify.es-CkyOJxeY.js";
import "./markdown-it-BOysPDJQ.js";
import "./EventStreamCodec-DE3dEgH1.js";
init_es();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var LAYER_COLORS_HEX = [
	"#ff0080",
	"#00ffb4",
	"#ffc800",
	"#6464ff",
	"#00ff00"
];
function getLayerColor(index) {
	return LAYER_COLORS_HEX[index % LAYER_COLORS_HEX.length];
}
var SAM3Canvas = import_react.forwardRef(({ imageDataUrl, imageWidth, imageHeight, layers, clickMode, onCanvasClick, onCanvasRightClick }, ref) => {
	const containerRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const [scale, setScale] = (0, import_react.useState)(1);
	const [offset, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [panning, setPanning] = (0, import_react.useState)(false);
	const lastMouseRef = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const imageRef = (0, import_react.useRef)(null);
	const maskImagesRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const fitToView = (0, import_react.useCallback)(() => {
		if (!containerRef.current || !imageWidth || !imageHeight) return;
		const cw = containerRef.current.clientWidth - 40;
		const ch = containerRef.current.clientHeight - 40;
		const s = Math.min(cw / imageWidth, ch / imageHeight, 1);
		setScale(s);
		setOffset({
			x: (containerRef.current.clientWidth - imageWidth * s) / 2,
			y: (containerRef.current.clientHeight - imageHeight * s) / 2
		});
	}, [imageWidth, imageHeight]);
	(0, import_react.useImperativeHandle)(ref, () => ({ fitToView }), [fitToView]);
	(0, import_react.useEffect)(() => {
		if (!imageDataUrl) return;
		const img = new Image();
		img.onload = () => {
			imageRef.current = img;
			fitToView();
		};
		img.src = imageDataUrl;
	}, [imageDataUrl, fitToView]);
	(0, import_react.useEffect)(() => {
		for (const layer of layers) if (layer.maskDataUrl) {
			if (!maskImagesRef.current.has(layer.id) || maskImagesRef.current.get(layer.id).src !== layer.maskDataUrl) {
				const img = new Image();
				img.onload = () => {
					maskImagesRef.current.set(layer.id, img);
					draw();
				};
				img.src = layer.maskDataUrl;
			}
		} else maskImagesRef.current.delete(layer.id);
		draw();
	}, [
		layers,
		scale,
		offset
	]);
	const draw = (0, import_react.useCallback)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const dpr = window.devicePixelRatio || 1;
		const cw = canvas.clientWidth;
		const ch = canvas.clientHeight;
		canvas.width = cw * dpr;
		canvas.height = ch * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.fillStyle = "#0a0a0c";
		ctx.fillRect(0, 0, cw, ch);
		drawGrid(ctx, cw, ch);
		if (!imageRef.current) {
			ctx.fillStyle = "#3c3c3c";
			ctx.font = "14px Consolas, monospace";
			ctx.textAlign = "center";
			ctx.fillText("[ WAITING FOR SOURCE ]", cw / 2, ch / 2);
			return;
		}
		ctx.drawImage(imageRef.current, offset.x, offset.y, imageWidth * scale, imageHeight * scale);
		for (const layer of layers) {
			if (!layer.visible) continue;
			const maskImg = maskImagesRef.current.get(layer.id);
			if (maskImg) {
				ctx.save();
				ctx.globalAlpha = .5;
				ctx.drawImage(maskImg, offset.x, offset.y, imageWidth * scale, imageHeight * scale);
				ctx.restore();
			}
			for (const pt of layer.points) {
				const sx = pt.x * scale + offset.x;
				const sy = pt.y * scale + offset.y;
				if (pt.label === 1) {
					ctx.beginPath();
					ctx.arc(sx, sy, 5, 0, Math.PI * 2);
					ctx.fillStyle = layer.color;
					ctx.fill();
					const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12);
					grad.addColorStop(0, layer.color + "80");
					grad.addColorStop(1, "transparent");
					ctx.beginPath();
					ctx.arc(sx, sy, 12, 0, Math.PI * 2);
					ctx.fillStyle = grad;
					ctx.fill();
				} else {
					ctx.strokeStyle = "#ff4444";
					ctx.lineWidth = 2;
					const hs = 5;
					ctx.beginPath();
					ctx.moveTo(sx - hs, sy - hs);
					ctx.lineTo(sx + hs, sy + hs);
					ctx.moveTo(sx - hs, sy + hs);
					ctx.lineTo(sx + hs, sy - hs);
					ctx.stroke();
				}
			}
		}
		drawHUD(ctx, cw);
	}, [
		scale,
		offset,
		layers,
		imageWidth,
		imageHeight
	]);
	const drawGrid = (ctx, w, h) => {
		ctx.strokeStyle = "rgba(255,255,255,0.04)";
		ctx.lineWidth = 1;
		const gap = 50;
		for (let x = 0; x < w; x += gap) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
			ctx.stroke();
		}
		for (let y = 0; y < h; y += gap) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
			ctx.stroke();
		}
	};
	const drawHUD = (ctx, w) => {
		ctx.fillStyle = "rgba(120,130,150,0.6)";
		ctx.font = "10px Consolas, monospace";
		ctx.textAlign = "right";
		ctx.fillText(`ZOOM: ${(scale * 100).toFixed(0)}%`, w - 10, 20);
	};
	const screenToImage = (clientX, clientY) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const sx = clientX - rect.left;
		const sy = clientY - rect.top;
		return {
			x: (sx - offset.x) / scale,
			y: (sy - offset.y) / scale
		};
	};
	const handleMouseDown = (e) => {
		if (e.button === 1 || e.button === 0 && e.altKey) {
			setPanning(true);
			lastMouseRef.current = {
				x: e.clientX,
				y: e.clientY
			};
			e.preventDefault();
		} else if (e.button === 0 && imageRef.current) {
			const { x, y } = screenToImage(e.clientX, e.clientY);
			if (x >= 0 && y >= 0 && x < imageWidth && y < imageHeight) onCanvasClick(x, y);
		}
	};
	const handleMouseMove = (e) => {
		if (panning) {
			const dx = e.clientX - lastMouseRef.current.x;
			const dy = e.clientY - lastMouseRef.current.y;
			setOffset((prev) => ({
				x: prev.x + dx,
				y: prev.y + dy
			}));
			lastMouseRef.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
	};
	const handleMouseUp = () => {
		setPanning(false);
	};
	const handleWheel = (e) => {
		e.preventDefault();
		const rect = canvasRef.current.getBoundingClientRect();
		const mx = e.clientX - rect.left;
		const my = e.clientY - rect.top;
		const factor = e.deltaY < 0 ? 1.15 : .85;
		const newScale = Math.max(.05, Math.min(scale * factor, 50));
		const ratio = newScale / scale;
		setOffset((prev) => ({
			x: mx - (mx - prev.x) * ratio,
			y: my - (my - prev.y) * ratio
		}));
		setScale(newScale);
	};
	const handleContextMenu = (e) => {
		e.preventDefault();
		if (!imageRef.current) return;
		const { x, y } = screenToImage(e.clientX, e.clientY);
		if (x >= 0 && y >= 0 && x < imageWidth && y < imageHeight) onCanvasRightClick(x, y);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container$2, {
		ref: containerRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledCanvas, {
			ref: canvasRef,
			$cursor: panning ? "grabbing" : clickMode === 1 ? "crosshair" : "not-allowed",
			onMouseDown: handleMouseDown,
			onMouseMove: handleMouseMove,
			onMouseUp: handleMouseUp,
			onMouseLeave: handleMouseUp,
			onWheel: handleWheel,
			onContextMenu: handleContextMenu
		})
	});
});
SAM3Canvas.displayName = "SAM3Canvas";
var Container$2 = dt.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #0a0a0c;
`;
var StyledCanvas = dt.canvas`
  width: 100%;
  height: 100%;
  display: block;
  cursor: ${(p) => p.$cursor};
`;
var SAM3Canvas_default = import_react.memo(SAM3Canvas);
var SAM3Sidebar = ({ layers, activeLayerId, clickMode, loading, statusText, onSetMode, onAddLayer, onSelectLayer, onToggleLayer, onDeleteLayer, onRenameLayer, onClearPoints, onClearAll, onGenerate3D, onExportMasks }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container$1, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "CONTROLS" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(flex_default, {
			gap: 8,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
				$active: clickMode === 1,
				onClick: () => onSetMode(1),
				children: "FOREGROUND"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
				$active: clickMode === 0,
				$danger: true,
				onClick: () => onSetMode(0),
				children: "BACKGROUND"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(flex_default, {
			gap: 8,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ActionButton, {
				onClick: onAddLayer,
				disabled: loading,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 }), " NEW OBJ"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
				onClick: onClearPoints,
				disabled: loading,
				children: "CLEAR PTS"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionLabel, {
			style: { marginTop: 16 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DETECTED OBJECTS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetButton, {
				onClick: onClearAll,
				disabled: loading,
				children: "RESET"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LayerList, { children: [layers.slice().reverse().map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LayerCard, {
			$active: layer.id === activeLayerId,
			$color: layer.color,
			onClick: () => onSelectLayer(layer.id),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LayerInfo, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(input_default, {
				size: "small",
				variant: "borderless",
				value: layer.name,
				onChange: (e) => onRenameLayer(layer.id, e.target.value),
				onClick: (e) => e.stopPropagation(),
				style: {
					color: "#fff",
					fontWeight: 600,
					fontSize: 13,
					padding: "0 2px",
					background: "transparent"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PointCount, { children: [layer.points.length, " PTS"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(flex_default, {
				gap: 2,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
					onClick: (e) => {
						e.stopPropagation();
						onToggleLayer(layer.id);
					},
					children: layer.visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOutlined_default, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeInvisibleOutlined_default, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
					$danger: true,
					onClick: (e) => {
						e.stopPropagation();
						onDeleteLayer(layer.id);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteOutlined_default, {})
				})]
			})]
		}, layer.id)), layers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyHint, { children: t("sam3.no_objects", "Click on the image to start annotating") })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
			style: { marginTop: 16 },
			children: "3D RECONSTRUCTION"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
			$primary: true,
			onClick: onGenerate3D,
			disabled: loading || layers.length === 0,
			children: "GENERATE MODEL"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
			onClick: onExportMasks,
			disabled: loading || layers.length === 0,
			children: "EXPORT MASKS"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, { children: statusText })
	] });
};
var Container$1 = dt.div`
  width: 300px;
  min-width: 300px;
  background: rgba(20, 22, 28, 0.94);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;
var SectionLabel = dt.div`
  color: #00ffb4;
  font-family: 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
var ModeButton = dt.button`
  flex: 1;
  height: 34px;
  border: 1px solid ${(p) => p.$danger ? "#ff4444" : "#00ffb4"};
  border-radius: 6px;
  background: ${(p) => p.$active ? p.$danger ? "rgba(255,68,68,0.4)" : "rgba(0,255,180,0.4)" : "rgba(255,255,255,0.05)"};
  color: ${(p) => p.$danger ? "#ff4444" : p.$active ? "#00ffb4" : "#ccc"};
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: ${(p) => p.$danger ? "rgba(255,68,68,0.3)" : "rgba(0,255,180,0.3)"};
  }
`;
var ActionButton = dt.button`
  flex: 1;
  height: 34px;
  border: 1px solid ${(p) => p.$primary ? "#00ffb4" : "#444"};
  border-radius: 6px;
  background: ${(p) => p.$primary ? "rgba(0,255,180,0.15)" : "rgba(255,255,255,0.05)"};
  color: ${(p) => p.$primary ? "#00ffb4" : "#ccc"};
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  &:hover {
    background: ${(p) => p.$primary ? "rgba(0,255,180,0.3)" : "rgba(255,255,255,0.1)"};
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
var ResetButton = dt.button`
  background: none;
  border: none;
  color: #ff4444;
  font-weight: 700;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.3;
  }
`;
var LayerList = dt.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 80px;
`;
var LayerCard = dt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 4px;
  border-left: 3px solid ${(p) => p.$active ? "#00ffb4" : p.$color};
  background: ${(p) => p.$active ? "rgba(50,52,60,0.8)" : "rgba(30,32,40,0.6)"};
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: rgba(60, 62, 70, 0.9);
  }
`;
var LayerInfo = dt.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;
var PointCount = dt.span`
  color: #666;
  font-family: 'Consolas', monospace;
  font-size: 10px;
  padding-left: 4px;
`;
var IconBtn = dt.button`
  background: none;
  border: none;
  color: ${(p) => p.$danger ? "#ff4444" : "#555"};
  font-size: 14px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #fff;
  }
`;
var EmptyHint = dt.div`
  color: #555;
  font-size: 12px;
  text-align: center;
  padding: 20px 0;
`;
var StatusBar = dt.div`
  color: #666;
  font-family: 'Consolas', monospace;
  font-size: 10px;
  margin-top: auto;
  padding-top: 8px;
`;
var SAM3Sidebar_default = import_react.memo(SAM3Sidebar);
function getBackendBaseUrl() {
	return window.location.origin;
}
async function generate3D(imagePath, maskPath, format = "glb") {
	return (await fetch(`${getBackendBaseUrl()}/api/v1/plugins/sam3-segmentation/generate-3d`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			image_path: imagePath,
			mask_path: maskPath,
			format
		})
	})).json();
}
async function setImage(imagePath, sessionId) {
	return (await fetch(`${getBackendBaseUrl()}/api/v1/plugins/sam3-segmentation/set-image`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			image_path: imagePath,
			session_id: sessionId
		})
	})).json();
}
async function predict(points, labels) {
	return (await fetch(`${getBackendBaseUrl()}/api/v1/plugins/sam3-segmentation/predict`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			points,
			labels
		})
	})).json();
}
async function serveImage(imagePath) {
	return (await fetch(`${getBackendBaseUrl()}/api/v1/plugins/sam3-segmentation/serve-image?path=${encodeURIComponent(imagePath)}`)).json();
}
async function saveMasks(masks, sessionId) {
	return (await fetch(`${getBackendBaseUrl()}/api/v1/plugins/sam3-segmentation/save-masks`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			masks,
			session_id: sessionId
		})
	})).json();
}
init_es();
var SAM3Annotator = ({ imagePath, onComplete }) => {
	const canvasRef = (0, import_react.useRef)(null);
	const [imageDataUrl, setImageDataUrl] = (0, import_react.useState)();
	const [imageSize, setImageSize] = (0, import_react.useState)({
		w: 0,
		h: 0
	});
	const [layers, setLayers] = (0, import_react.useState)([]);
	const [activeLayerId, setActiveLayerId] = (0, import_react.useState)();
	const [clickMode, setClickMode] = (0, import_react.useState)(1);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [statusText, setStatusText] = (0, import_react.useState)("SYS >> INITIALIZING...");
	const [sessionId, setSessionId] = (0, import_react.useState)();
	const layerCounter = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const init = async () => {
			setStatusText("SYS >> LOADING IMAGE...");
			try {
				const imgResult = await serveImage(imagePath);
				if (imgResult.error || !imgResult.data_url) {
					setStatusText(`SYS >> ERROR: ${imgResult.error || "Failed to load image"}`);
					return;
				}
				setImageDataUrl(imgResult.data_url);
				setImageSize({
					w: imgResult.width || 0,
					h: imgResult.height || 0
				});
				setStatusText("SYS >> COMPUTING EMBEDDINGS...");
				const setResult = await setImage(imagePath);
				if (setResult.error) {
					setStatusText(`SYS >> ERROR: ${setResult.error}`);
					return;
				}
				setSessionId(setResult.session_id);
				setStatusText("SYS >> READY TO SEGMENT.");
				setLoading(false);
			} catch (e) {
				setStatusText(`SYS >> ERROR: ${e.message}`);
			}
		};
		init();
	}, [imagePath]);
	const createLayer = (0, import_react.useCallback)(() => {
		layerCounter.current += 1;
		const id = String(layerCounter.current);
		const newLayer = {
			id,
			name: `object_${layerCounter.current}`,
			color: getLayerColor(layers.length),
			points: [],
			visible: true
		};
		setLayers((prev) => [...prev, newLayer]);
		setActiveLayerId(id);
		return id;
	}, [layers.length]);
	const handleCanvasClick = (0, import_react.useCallback)(async (imgX, imgY) => {
		if (loading) return;
		let currentActiveId = activeLayerId;
		if (!currentActiveId) currentActiveId = createLayer();
		const point = {
			x: imgX,
			y: imgY,
			label: clickMode
		};
		setLayers((prev) => {
			const next = prev.map((l) => {
				if (l.id !== currentActiveId) return l;
				return {
					...l,
					points: [...l.points, point]
				};
			});
			runPredict(next.find((l) => l.id === currentActiveId));
			return next;
		});
	}, [
		activeLayerId,
		clickMode,
		loading,
		createLayer
	]);
	const handleCanvasRightClick = (0, import_react.useCallback)((imgX, imgY) => {
		if (!activeLayerId) return;
		setLayers((prev) => {
			const layer = prev.find((l) => l.id === activeLayerId);
			if (!layer || layer.points.length === 0) return prev;
			const threshold = 15;
			let closestIdx = -1;
			let minDist = Infinity;
			for (let i = 0; i < layer.points.length; i++) {
				const dx = layer.points[i].x - imgX;
				const dy = layer.points[i].y - imgY;
				const dist = dx * dx + dy * dy;
				if (dist < minDist) {
					minDist = dist;
					closestIdx = i;
				}
			}
			if (closestIdx === -1 || minDist > threshold * threshold) return prev;
			const newPoints = [...layer.points];
			newPoints.splice(closestIdx, 1);
			const updated = prev.map((l) => l.id === activeLayerId ? {
				...l,
				points: newPoints
			} : l);
			const updatedLayer = updated.find((l) => l.id === activeLayerId);
			if (updatedLayer.points.length > 0) runPredict(updatedLayer);
			else setLayers((p) => p.map((l) => l.id === activeLayerId ? {
				...l,
				maskDataUrl: void 0
			} : l));
			return updated;
		});
	}, [activeLayerId]);
	const runPredict = async (layer) => {
		if (layer.points.length === 0) return;
		setStatusText("SYS >> UPDATING MASK...");
		const points = layer.points.map((p) => [p.x, p.y]);
		const labels = layer.points.map((p) => p.label);
		try {
			const result = await predict(points, labels);
			if (result.error) {
				setStatusText(`SYS >> PREDICT ERROR: ${result.error}`);
				return;
			}
			if (result.mask_b64) {
				const maskImg = new Image();
				const rawDataUrl = `data:image/png;base64,${result.mask_b64}`;
				maskImg.onload = () => {
					const canvas = document.createElement("canvas");
					canvas.width = maskImg.width;
					canvas.height = maskImg.height;
					const ctx = canvas.getContext("2d");
					ctx.drawImage(maskImg, 0, 0);
					const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					const data = imgData.data;
					const hexToRgb = (hex) => {
						return {
							r: parseInt(hex.slice(1, 3), 16),
							g: parseInt(hex.slice(3, 5), 16),
							b: parseInt(hex.slice(5, 7), 16)
						};
					};
					const { r, g, b } = hexToRgb(layer.color);
					for (let i = 0; i < data.length; i += 4) if (data[i] > 127) {
						data[i] = r;
						data[i + 1] = g;
						data[i + 2] = b;
						data[i + 3] = 160;
					} else data[i + 3] = 0;
					ctx.putImageData(imgData, 0, 0);
					const coloredUrl = canvas.toDataURL("image/png");
					setLayers((prev) => prev.map((l) => l.id === layer.id ? {
						...l,
						maskDataUrl: coloredUrl,
						_rawMaskB64: result.mask_b64
					} : l));
					setStatusText(`SYS >> MASK UPDATED. IoU=${(result.iou || 0).toFixed(3)}`);
				};
				maskImg.src = rawDataUrl;
			}
		} catch (e) {
			setStatusText(`SYS >> ERROR: ${e.message}`);
		}
	};
	const handleGenerate3D = (0, import_react.useCallback)(async () => {
		const visibleWithMask = layers.filter((l) => l.visible && l._rawMaskB64);
		if (visibleWithMask.length === 0) return;
		setLoading(true);
		setStatusText("SYS >> SAVING MASKS...");
		try {
			const saveResult = await saveMasks(visibleWithMask.map((l) => ({
				name: l.name,
				mask_b64: l._rawMaskB64
			})), sessionId);
			if (saveResult.error || !saveResult.masks) {
				setStatusText(`SYS >> ERROR: ${saveResult.error}`);
				setLoading(false);
				return;
			}
			setStatusText(`SYS >> GENERATING 3D (${saveResult.masks.length} objects)...`);
			const results = [];
			for (let i = 0; i < saveResult.masks.length; i++) {
				const mask = saveResult.masks[i];
				setStatusText(`SYS >> [${i + 1}/${saveResult.masks.length}] Generating ${mask.name}...`);
				const gen = await generate3D(imagePath, mask.path, "glb");
				if (gen.error) {
					setStatusText(`SYS >> ERROR: ${gen.error}`);
					setLoading(false);
					return;
				}
				if (gen.file) results.push(gen.file);
			}
			setStatusText("SYS >> GENERATION COMPLETE.");
			setLoading(false);
			onComplete?.(results);
		} catch (e) {
			setStatusText(`SYS >> ERROR: ${e.message}`);
			setLoading(false);
		}
	}, [
		layers,
		sessionId,
		imagePath,
		onComplete
	]);
	const handleExportMasks = (0, import_react.useCallback)(async () => {
		const withMask = layers.filter((l) => l._rawMaskB64);
		if (withMask.length === 0) return;
		setStatusText("SYS >> EXPORTING MASKS...");
		const masksToSave = withMask.map((l) => ({
			name: l.name,
			mask_b64: l._rawMaskB64
		}));
		try {
			const result = await saveMasks(masksToSave, sessionId);
			if (result.error) setStatusText(`SYS >> ERROR: ${result.error}`);
			else setStatusText(`SYS >> EXPORTED ${result.masks?.length || 0} MASKS.`);
		} catch (e) {
			setStatusText(`SYS >> ERROR: ${e.message}`);
		}
	}, [layers, sessionId]);
	const handleClearPoints = (0, import_react.useCallback)(() => {
		if (!activeLayerId) return;
		setLayers((prev) => prev.map((l) => l.id === activeLayerId ? {
			...l,
			points: [],
			maskDataUrl: void 0
		} : l));
	}, [activeLayerId]);
	const handleClearAll = (0, import_react.useCallback)(() => {
		setLayers([]);
		setActiveLayerId(void 0);
	}, []);
	const handleDeleteLayer = (0, import_react.useCallback)((id) => {
		setLayers((prev) => prev.filter((l) => l.id !== id));
		if (activeLayerId === id) setActiveLayerId(void 0);
	}, [activeLayerId]);
	const handleRenameLayer = (0, import_react.useCallback)((id, name) => {
		setLayers((prev) => prev.map((l) => l.id === id ? {
			...l,
			name
		} : l));
	}, []);
	const handleToggleLayer = (0, import_react.useCallback)((id) => {
		setLayers((prev) => prev.map((l) => l.id === id ? {
			...l,
			visible: !l.visible
		} : l));
	}, []);
	if (!imageDataUrl && loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LoadingContainer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(spin_default, { indicator: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading3QuartersOutlined_default, {
		spin: true,
		style: {
			fontSize: 24,
			color: "#00ffb4"
		}
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingText, { children: statusText })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnnotatorContainer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SAM3Canvas_default, {
		ref: canvasRef,
		imageDataUrl,
		imageWidth: imageSize.w,
		imageHeight: imageSize.h,
		layers,
		clickMode,
		onCanvasClick: handleCanvasClick,
		onCanvasRightClick: handleCanvasRightClick
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SAM3Sidebar_default, {
		layers,
		activeLayerId,
		clickMode,
		loading,
		statusText,
		onSetMode: setClickMode,
		onAddLayer: createLayer,
		onSelectLayer: setActiveLayerId,
		onToggleLayer: handleToggleLayer,
		onDeleteLayer: handleDeleteLayer,
		onRenameLayer: handleRenameLayer,
		onClearPoints: handleClearPoints,
		onClearAll: handleClearAll,
		onGenerate3D: handleGenerate3D,
		onExportMasks: handleExportMasks
	})] });
};
var AnnotatorContainer = dt.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #0a0a0c;
  border-radius: 8px;
  overflow: hidden;
`;
var LoadingContainer = dt.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 400px;
  background: #0a0a0c;
  border-radius: 8px;
`;
var LoadingText = dt.div`
  color: #00ffb4;
  font-family: 'Consolas', monospace;
  font-size: 12px;
`;
var SAM3Annotator_default = import_react.memo(SAM3Annotator);
var SAM3ManualFlow = ({ imagePath, onComplete, onCancel }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SAM3Annotator_default, {
		imagePath,
		onComplete: (0, import_react.useCallback)((files) => {
			if (files.length > 0) onComplete(files[0]);
		}, [onComplete]),
		onCancel
	}) });
};
var FlowContainer = dt.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
`;
var SAM3ManualFlow_default = import_react.memo(SAM3ManualFlow);
await init_es();
var TopViewKey = "SAM3ManualPopup";
var PopupContainer = ({ imagePath, resolve }) => {
	const { t } = useTranslation();
	const [resultFile, setResultFile] = (0, import_react.useState)(null);
	const handleComplete = (0, import_react.useCallback)((modelFile) => {
		setResultFile(modelFile);
		resolve(modelFile);
	}, [resolve]);
	const handleCancel = (0, import_react.useCallback)(() => {
		resolve(null);
	}, [resolve]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {
		onClick: handleCancel,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: t("sam3.manual_mode", "SAM3 Annotation") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
				type: "text",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseOutlined_default, {}),
				onClick: handleCancel,
				style: { color: "#999" }
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, { children: resultFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoneMessage, { children: t("sam3.complete", "3D model generation complete") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SAM3ManualFlow_default, {
				imagePath,
				onComplete: handleComplete,
				onCancel: handleCancel
			}) })]
		})
	});
};
var Backdrop = dt.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
var Container = dt.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 1300px;
  height: 80vh;
  background: #0a0a0c;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;
var Header = dt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(20, 22, 28, 0.95);
`;
var Title = dt.span`
  font-size: 14px;
  font-weight: 600;
  color: #00ffb4;
  font-family: 'Segoe UI', sans-serif;
  letter-spacing: 0.5px;
`;
var Content = dt.div`
  flex: 1;
  overflow: hidden;
`;
var DoneMessage = dt.div`
  text-align: center;
  font-size: 14px;
  color: #00ffb4;
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
var SAM3ManualPopup = class {
	static hide() {
		TopView.hide(TopViewKey);
	}
	static show(imagePath) {
		return new Promise((resolve) => {
			TopView.show(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopupContainer, {
				imagePath,
				resolve: (v) => {
					resolve(v);
					TopView.hide(TopViewKey);
				}
			}), TopViewKey);
		});
	}
};
export { SAM3ManualPopup as default };
