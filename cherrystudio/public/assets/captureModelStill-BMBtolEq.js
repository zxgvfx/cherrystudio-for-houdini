import { B as PerspectiveCamera, E as HemisphereLight, J as SRGBColorSpace, Y as Scene, a as PMREMGenerator, b as DirectionalLight, c as AmbientLight, f as Box3, g as Color, i as RoomEnvironment, n as DRACOLoader, o as WebGLRenderer, r as draco_decoder_default, s as ACESFilmicToneMapping, st as Vector3, t as GLTFLoader } from "./GLTFLoader-DwrZnGvj.js";
var STILL_SIZE = 256;
var cache = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
var queue = Promise.resolve();
function canCaptureModelStill(name) {
	return /\.(glb|gltf)(\?|#|$)/i.test(name);
}
function dracoDecoderDirectory() {
	try {
		return new URL(".", draco_decoder_default).href;
	} catch {
		return "https://www.gstatic.com/draco/versioned/decoders/1.5.6/";
	}
}
function cherryBackendOrigin() {
	try {
		return (window.__CHERRY_BACKEND_URL || "").replace(/\/$/, "");
	} catch {
		return "";
	}
}
function fileUrlToServePath(src) {
	if (!src.startsWith("file:")) return null;
	try {
		const parsed = new URL(src);
		let pathname = decodeURIComponent(parsed.pathname);
		if (/^\/[A-Za-z]:/.test(pathname)) pathname = pathname.slice(1);
		return pathname.replace(/\//g, "\\");
	} catch {
		return null;
	}
}
async function fetchGlbBytes(src, signal) {
	const urls = [src];
	const localPath = fileUrlToServePath(src);
	const origin = cherryBackendOrigin();
	if (localPath) {
		const query = `path=${encodeURIComponent(localPath)}`;
		urls.push(origin ? `${origin}/api/v1/files/serve?${query}` : `/api/v1/files/serve?${query}`);
	} else if (src.startsWith("/api/v1/files/serve") && origin) urls.unshift(`${origin}${src}`);
	let lastError = "无法下载 GLB";
	for (const url of urls) try {
		const response = await fetch(url, { signal });
		if (!response.ok) {
			lastError = `下载失败 HTTP ${response.status}`;
			continue;
		}
		const bytes = await response.arrayBuffer();
		if (bytes.byteLength < 16) {
			lastError = "文件为空";
			continue;
		}
		return bytes;
	} catch (error) {
		if (signal.aborted) throw error;
		lastError = error instanceof Error ? error.message : "无法下载 GLB";
	}
	throw new Error(lastError);
}
function disposeObject3D(root) {
	root.traverse((obj) => {
		const mesh = obj;
		if (mesh.geometry) mesh.geometry.dispose();
		const material = mesh.material;
		if (!material) return;
		const materials = Array.isArray(material) ? material : [material];
		for (const item of materials) {
			for (const value of Object.values(item)) if (value && typeof value === "object" && "dispose" in value && typeof value.dispose === "function") value.dispose();
			item.dispose();
		}
	});
}
function parseGltf(bytes) {
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath(dracoDecoderDirectory());
	dracoLoader.decoderConfig = { type: "js" };
	const loader = new GLTFLoader();
	loader.setDRACOLoader(dracoLoader);
	return new Promise((resolve, reject) => {
		loader.parse(bytes, "", (gltf) => {
			dracoLoader.dispose();
			resolve({ scene: gltf.scene });
		}, (err) => {
			dracoLoader.dispose();
			reject(err instanceof Error ? err : new Error(String(err)));
		});
	});
}
function frameModel(model, camera) {
	const box = new Box3().setFromObject(model);
	const center = box.getCenter(new Vector3());
	const maxDim = Math.max(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z);
	const scale = maxDim > 0 ? 2 / maxDim : 1;
	model.scale.setScalar(scale);
	model.position.sub(center.multiplyScalar(scale));
	const framed = Math.max(maxDim * scale * 1.6, 1.4);
	camera.position.set(framed * .7, framed * .45, framed);
	camera.lookAt(0, 0, 0);
}
async function renderStill(src) {
	const { scene: model } = await parseGltf(await fetchGlbBytes(src, new AbortController().signal));
	const canvas = document.createElement("canvas");
	canvas.width = STILL_SIZE;
	canvas.height = STILL_SIZE;
	canvas.style.cssText = "position:fixed;left:-9999px;top:0;width:256px;height:256px;opacity:0;pointer-events:none";
	document.body.appendChild(canvas);
	let renderer;
	try {
		renderer = new WebGLRenderer({
			canvas,
			antialias: false,
			alpha: false,
			preserveDrawingBuffer: true,
			powerPreference: "low-power",
			failIfMajorPerformanceCaveat: false
		});
	} catch {
		canvas.remove();
		disposeObject3D(model);
		throw new Error("WebGL not available");
	}
	renderer.setSize(STILL_SIZE, STILL_SIZE, false);
	renderer.setPixelRatio(1);
	renderer.outputColorSpace = SRGBColorSpace;
	renderer.toneMapping = 4;
	renderer.toneMappingExposure = 1.65;
	const scene = new Scene();
	scene.background = new Color(3816002);
	scene.add(new HemisphereLight(16777215, 4868693, 2.2));
	const keyLight = new DirectionalLight(16774890, 3.4);
	keyLight.position.set(4, 8, 6);
	scene.add(keyLight);
	const fillLight = new DirectionalLight(13162751, 1.6);
	fillLight.position.set(-6, 3, -2);
	scene.add(fillLight);
	const rimLight = new DirectionalLight(16777215, 1.2);
	rimLight.position.set(0, 4, -6);
	scene.add(rimLight);
	const camera = new PerspectiveCamera(45, 1, .01, 1e3);
	const pmrem = new PMREMGenerator(renderer);
	let envTexture;
	try {
		const room = new RoomEnvironment();
		envTexture = pmrem.fromScene(room, .04).texture;
		scene.environment = envTexture;
		scene.environmentIntensity = 1.15;
		room.traverse((obj) => {
			const mesh = obj;
			if (mesh.geometry) mesh.geometry.dispose();
		});
	} catch {
		scene.add(new AmbientLight(16777215, 1.4));
	}
	frameModel(model, camera);
	scene.add(model);
	renderer.render(scene, camera);
	renderer.render(scene, camera);
	const dataUrl = canvas.toDataURL("image/jpeg", .84);
	envTexture?.dispose();
	pmrem.dispose();
	disposeObject3D(scene);
	scene.clear();
	try {
		renderer.forceContextLoss();
	} catch {}
	renderer.dispose();
	canvas.remove();
	return dataUrl;
}
function captureModelStill(src) {
	const hit = cache.get(src);
	if (hit) return Promise.resolve(hit);
	const pending = inflight.get(src);
	if (pending) return pending;
	const job = new Promise((resolve, reject) => {
		queue = queue.then(() => renderStill(src)).then((url) => {
			cache.set(src, url);
			resolve(url);
		}).catch(reject).then(() => void 0);
	});
	inflight.set(src, job);
	job.finally(() => inflight.delete(src));
	return job;
}
export { canCaptureModelStill, captureModelStill };
