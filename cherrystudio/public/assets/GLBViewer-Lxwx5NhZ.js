import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Layers } from "./layers-NDPqGWlN.js";
import { t as RotateCcw } from "./rotate-ccw-CnP2I1zC.js";
import { t as RELEASE_INLINE_WEBGL_EVENT } from "./qtWebEngineStability-D3nZUfHK.js";
import { $ as Spherical, B as PerspectiveCamera, E as HemisphereLight, F as Mesh, J as SRGBColorSpace, K as Ray, M as MathUtils, V as Plane, W as Quaternion, Y as Scene, a as PMREMGenerator, b as DirectionalLight, c as AmbientLight, f as Box3, g as Color, i as RoomEnvironment, it as Timer, j as MOUSE, m as BufferGeometry, n as DRACOLoader, o as WebGLRenderer, ot as Vector2, p as BufferAttribute, r as draco_decoder_default, s as ACESFilmicToneMapping, st as Vector3, t as GLTFLoader, tt as TOUCH, u as AnimationMixer, v as Controls } from "./GLTFLoader-DwrZnGvj.js";
var _changeEvent = { type: "change" };
var _startEvent = { type: "start" };
var _endEvent = { type: "end" };
var _ray = new Ray();
var _plane = new Plane();
var _TILT_LIMIT = Math.cos(70 * MathUtils.DEG2RAD);
var _v = new Vector3();
var _twoPI = 2 * Math.PI;
var _STATE = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
};
var _EPS = 1e-6;
var OrbitControls = class extends Controls {
	constructor(object, domElement = null) {
		super(object, domElement);
		this.state = _STATE.NONE;
		this.target = new Vector3();
		this.cursor = new Vector3();
		this.minDistance = 0;
		this.maxDistance = Infinity;
		this.minZoom = 0;
		this.maxZoom = Infinity;
		this.minTargetRadius = 0;
		this.maxTargetRadius = Infinity;
		this.minPolarAngle = 0;
		this.maxPolarAngle = Math.PI;
		this.minAzimuthAngle = -Infinity;
		this.maxAzimuthAngle = Infinity;
		this.enableDamping = false;
		this.dampingFactor = .05;
		this.enableZoom = true;
		this.zoomSpeed = 1;
		this.enableRotate = true;
		this.rotateSpeed = 1;
		this.keyRotateSpeed = 1;
		this.enablePan = true;
		this.panSpeed = 1;
		this.screenSpacePanning = true;
		this.keyPanSpeed = 7;
		this.zoomToCursor = false;
		this.autoRotate = false;
		this.autoRotateSpeed = 2;
		this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		};
		this.mouseButtons = {
			LEFT: MOUSE.ROTATE,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.PAN
		};
		this.touches = {
			ONE: TOUCH.ROTATE,
			TWO: TOUCH.DOLLY_PAN
		};
		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.zoom0 = this.object.zoom;
		this._cursorStyle = "auto";
		this._domElementKeyEvents = null;
		this._lastPosition = new Vector3();
		this._lastQuaternion = new Quaternion();
		this._lastTargetPosition = new Vector3();
		this._quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
		this._quatInverse = this._quat.clone().invert();
		this._spherical = new Spherical();
		this._sphericalDelta = new Spherical();
		this._scale = 1;
		this._panOffset = new Vector3();
		this._rotateStart = new Vector2();
		this._rotateEnd = new Vector2();
		this._rotateDelta = new Vector2();
		this._panStart = new Vector2();
		this._panEnd = new Vector2();
		this._panDelta = new Vector2();
		this._dollyStart = new Vector2();
		this._dollyEnd = new Vector2();
		this._dollyDelta = new Vector2();
		this._dollyDirection = new Vector3();
		this._mouse = new Vector2();
		this._performCursorZoom = false;
		this._pointers = [];
		this._pointerPositions = {};
		this._controlActive = false;
		this._onPointerMove = onPointerMove.bind(this);
		this._onPointerDown = onPointerDown.bind(this);
		this._onPointerUp = onPointerUp.bind(this);
		this._onContextMenu = onContextMenu.bind(this);
		this._onMouseWheel = onMouseWheel.bind(this);
		this._onKeyDown = onKeyDown.bind(this);
		this._onTouchStart = onTouchStart.bind(this);
		this._onTouchMove = onTouchMove.bind(this);
		this._onMouseDown = onMouseDown.bind(this);
		this._onMouseMove = onMouseMove.bind(this);
		this._interceptControlDown = interceptControlDown.bind(this);
		this._interceptControlUp = interceptControlUp.bind(this);
		if (this.domElement !== null) this.connect(this.domElement);
		this.update();
	}
	set cursorStyle(type) {
		this._cursorStyle = type;
		if (type === "grab") this.domElement.style.cursor = "grab";
		else this.domElement.style.cursor = "auto";
	}
	get cursorStyle() {
		return this._cursorStyle;
	}
	connect(element) {
		super.connect(element);
		this.domElement.addEventListener("pointerdown", this._onPointerDown);
		this.domElement.addEventListener("pointercancel", this._onPointerUp);
		this.domElement.addEventListener("contextmenu", this._onContextMenu);
		this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: false });
		this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, {
			passive: true,
			capture: true
		});
		this.domElement.style.touchAction = "none";
	}
	disconnect() {
		this.domElement.removeEventListener("pointerdown", this._onPointerDown);
		this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove);
		this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp);
		this.domElement.removeEventListener("pointercancel", this._onPointerUp);
		this.domElement.removeEventListener("wheel", this._onMouseWheel);
		this.domElement.removeEventListener("contextmenu", this._onContextMenu);
		this.stopListenToKeyEvents();
		this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: true });
		this.domElement.style.touchAction = "";
	}
	dispose() {
		this.disconnect();
	}
	getPolarAngle() {
		return this._spherical.phi;
	}
	getAzimuthalAngle() {
		return this._spherical.theta;
	}
	getDistance() {
		return this.object.position.distanceTo(this.target);
	}
	listenToKeyEvents(domElement) {
		domElement.addEventListener("keydown", this._onKeyDown);
		this._domElementKeyEvents = domElement;
	}
	stopListenToKeyEvents() {
		if (this._domElementKeyEvents !== null) {
			this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown);
			this._domElementKeyEvents = null;
		}
	}
	saveState() {
		this.target0.copy(this.target);
		this.position0.copy(this.object.position);
		this.zoom0 = this.object.zoom;
	}
	reset() {
		this.target.copy(this.target0);
		this.object.position.copy(this.position0);
		this.object.zoom = this.zoom0;
		this.object.updateProjectionMatrix();
		this.dispatchEvent(_changeEvent);
		this.update();
		this.state = _STATE.NONE;
	}
	pan(deltaX, deltaY) {
		this._pan(deltaX, deltaY);
		this.update();
	}
	dollyIn(dollyScale) {
		this._dollyIn(dollyScale);
		this.update();
	}
	dollyOut(dollyScale) {
		this._dollyOut(dollyScale);
		this.update();
	}
	rotateLeft(angle) {
		this._rotateLeft(angle);
		this.update();
	}
	rotateUp(angle) {
		this._rotateUp(angle);
		this.update();
	}
	update(deltaTime = null) {
		const position = this.object.position;
		_v.copy(position).sub(this.target);
		_v.applyQuaternion(this._quat);
		this._spherical.setFromVector3(_v);
		if (this.autoRotate && this.state === _STATE.NONE) this._rotateLeft(this._getAutoRotationAngle(deltaTime));
		if (this.enableDamping) {
			this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor;
			this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor;
		} else {
			this._spherical.theta += this._sphericalDelta.theta;
			this._spherical.phi += this._sphericalDelta.phi;
		}
		let min = this.minAzimuthAngle;
		let max = this.maxAzimuthAngle;
		if (isFinite(min) && isFinite(max)) {
			if (min < -Math.PI) min += _twoPI;
			else if (min > Math.PI) min -= _twoPI;
			if (max < -Math.PI) max += _twoPI;
			else if (max > Math.PI) max -= _twoPI;
			if (min <= max) this._spherical.theta = Math.max(min, Math.min(max, this._spherical.theta));
			else this._spherical.theta = this._spherical.theta > (min + max) / 2 ? Math.max(min, this._spherical.theta) : Math.min(max, this._spherical.theta);
		}
		this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi));
		this._spherical.makeSafe();
		if (this.enableDamping === true) this.target.addScaledVector(this._panOffset, this.dampingFactor);
		else this.target.add(this._panOffset);
		this.target.sub(this.cursor);
		this.target.clampLength(this.minTargetRadius, this.maxTargetRadius);
		this.target.add(this.cursor);
		let zoomChanged = false;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			const prevRadius = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale);
			zoomChanged = prevRadius != this._spherical.radius;
		}
		_v.setFromSpherical(this._spherical);
		_v.applyQuaternion(this._quatInverse);
		position.copy(this.target).add(_v);
		this.object.lookAt(this.target);
		if (this.enableDamping === true) {
			this._sphericalDelta.theta *= 1 - this.dampingFactor;
			this._sphericalDelta.phi *= 1 - this.dampingFactor;
			this._panOffset.multiplyScalar(1 - this.dampingFactor);
		} else {
			this._sphericalDelta.set(0, 0, 0);
			this._panOffset.set(0, 0, 0);
		}
		if (this.zoomToCursor && this._performCursorZoom) {
			let newRadius = null;
			if (this.object.isPerspectiveCamera) {
				const prevRadius = _v.length();
				newRadius = this._clampDistance(prevRadius * this._scale);
				const radiusDelta = prevRadius - newRadius;
				this.object.position.addScaledVector(this._dollyDirection, radiusDelta);
				this.object.updateMatrixWorld();
				zoomChanged = !!radiusDelta;
			} else if (this.object.isOrthographicCamera) {
				const mouseBefore = new Vector3(this._mouse.x, this._mouse.y, 0);
				mouseBefore.unproject(this.object);
				const prevZoom = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
				this.object.updateProjectionMatrix();
				zoomChanged = prevZoom !== this.object.zoom;
				const mouseAfter = new Vector3(this._mouse.x, this._mouse.y, 0);
				mouseAfter.unproject(this.object);
				this.object.position.sub(mouseAfter).add(mouseBefore);
				this.object.updateMatrixWorld();
				newRadius = _v.length();
			} else {
				console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
				this.zoomToCursor = false;
			}
			if (newRadius !== null) if (this.screenSpacePanning) this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(newRadius).add(this.object.position);
			else {
				_ray.origin.copy(this.object.position);
				_ray.direction.set(0, 0, -1).transformDirection(this.object.matrix);
				if (Math.abs(this.object.up.dot(_ray.direction)) < _TILT_LIMIT) this.object.lookAt(this.target);
				else {
					_plane.setFromNormalAndCoplanarPoint(this.object.up, this.target);
					_ray.intersectPlane(_plane, this.target);
				}
			}
		} else if (this.object.isOrthographicCamera) {
			const prevZoom = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
			if (prevZoom !== this.object.zoom) {
				this.object.updateProjectionMatrix();
				zoomChanged = true;
			}
		}
		this._scale = 1;
		this._performCursorZoom = false;
		if (zoomChanged || this._lastPosition.distanceToSquared(this.object.position) > _EPS || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > _EPS || this._lastTargetPosition.distanceToSquared(this.target) > _EPS) {
			this.dispatchEvent(_changeEvent);
			this._lastPosition.copy(this.object.position);
			this._lastQuaternion.copy(this.object.quaternion);
			this._lastTargetPosition.copy(this.target);
			return true;
		}
		return false;
	}
	_getAutoRotationAngle(deltaTime) {
		if (deltaTime !== null) return _twoPI / 60 * this.autoRotateSpeed * deltaTime;
		else return _twoPI / 60 / 60 * this.autoRotateSpeed;
	}
	_getZoomScale(delta) {
		const normalizedDelta = Math.abs(delta * .01);
		return Math.pow(.95, this.zoomSpeed * normalizedDelta);
	}
	_rotateLeft(angle) {
		this._sphericalDelta.theta -= angle;
	}
	_rotateUp(angle) {
		this._sphericalDelta.phi -= angle;
	}
	_panLeft(distance, objectMatrix) {
		_v.setFromMatrixColumn(objectMatrix, 0);
		_v.multiplyScalar(-distance);
		this._panOffset.add(_v);
	}
	_panUp(distance, objectMatrix) {
		if (this.screenSpacePanning === true) _v.setFromMatrixColumn(objectMatrix, 1);
		else {
			_v.setFromMatrixColumn(objectMatrix, 0);
			_v.crossVectors(this.object.up, _v);
		}
		_v.multiplyScalar(distance);
		this._panOffset.add(_v);
	}
	_pan(deltaX, deltaY) {
		const element = this.domElement;
		if (this.object.isPerspectiveCamera) {
			const position = this.object.position;
			_v.copy(position).sub(this.target);
			let targetDistance = _v.length();
			targetDistance *= Math.tan(this.object.fov / 2 * Math.PI / 180);
			this._panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
			this._panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
		} else if (this.object.isOrthographicCamera) {
			this._panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
			this._panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
		} else {
			console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
			this.enablePan = false;
		}
	}
	_dollyOut(dollyScale) {
		if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) this._scale /= dollyScale;
		else {
			console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
			this.enableZoom = false;
		}
	}
	_dollyIn(dollyScale) {
		if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) this._scale *= dollyScale;
		else {
			console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
			this.enableZoom = false;
		}
	}
	_updateZoomParameters(x, y) {
		if (!this.zoomToCursor) return;
		this._performCursorZoom = true;
		const rect = this.domElement.getBoundingClientRect();
		const dx = x - rect.left;
		const dy = y - rect.top;
		const w = rect.width;
		const h = rect.height;
		this._mouse.x = dx / w * 2 - 1;
		this._mouse.y = -(dy / h) * 2 + 1;
		this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
	}
	_clampDistance(dist) {
		return Math.max(this.minDistance, Math.min(this.maxDistance, dist));
	}
	_handleMouseDownRotate(event) {
		this._rotateStart.set(event.clientX, event.clientY);
	}
	_handleMouseDownDolly(event) {
		this._updateZoomParameters(event.clientX, event.clientX);
		this._dollyStart.set(event.clientX, event.clientY);
	}
	_handleMouseDownPan(event) {
		this._panStart.set(event.clientX, event.clientY);
	}
	_handleMouseMoveRotate(event) {
		this._rotateEnd.set(event.clientX, event.clientY);
		this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		const element = this.domElement;
		this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
		this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
		this._rotateStart.copy(this._rotateEnd);
		this.update();
	}
	_handleMouseMoveDolly(event) {
		this._dollyEnd.set(event.clientX, event.clientY);
		this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart);
		if (this._dollyDelta.y > 0) this._dollyOut(this._getZoomScale(this._dollyDelta.y));
		else if (this._dollyDelta.y < 0) this._dollyIn(this._getZoomScale(this._dollyDelta.y));
		this._dollyStart.copy(this._dollyEnd);
		this.update();
	}
	_handleMouseMovePan(event) {
		this._panEnd.set(event.clientX, event.clientY);
		this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
		this._pan(this._panDelta.x, this._panDelta.y);
		this._panStart.copy(this._panEnd);
		this.update();
	}
	_handleMouseWheel(event) {
		this._updateZoomParameters(event.clientX, event.clientY);
		if (event.deltaY < 0) this._dollyIn(this._getZoomScale(event.deltaY));
		else if (event.deltaY > 0) this._dollyOut(this._getZoomScale(event.deltaY));
		this.update();
	}
	_handleKeyDown(event) {
		let needsUpdate = false;
		switch (event.code) {
			case this.keys.UP:
				if (event.ctrlKey || event.metaKey || event.shiftKey) {
					if (this.enableRotate) this._rotateUp(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
				} else if (this.enablePan) this._pan(0, this.keyPanSpeed);
				needsUpdate = true;
				break;
			case this.keys.BOTTOM:
				if (event.ctrlKey || event.metaKey || event.shiftKey) {
					if (this.enableRotate) this._rotateUp(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
				} else if (this.enablePan) this._pan(0, -this.keyPanSpeed);
				needsUpdate = true;
				break;
			case this.keys.LEFT:
				if (event.ctrlKey || event.metaKey || event.shiftKey) {
					if (this.enableRotate) this._rotateLeft(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
				} else if (this.enablePan) this._pan(this.keyPanSpeed, 0);
				needsUpdate = true;
				break;
			case this.keys.RIGHT:
				if (event.ctrlKey || event.metaKey || event.shiftKey) {
					if (this.enableRotate) this._rotateLeft(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
				} else if (this.enablePan) this._pan(-this.keyPanSpeed, 0);
				needsUpdate = true;
				break;
		}
		if (needsUpdate) {
			event.preventDefault();
			this.update();
		}
	}
	_handleTouchStartRotate(event) {
		if (this._pointers.length === 1) this._rotateStart.set(event.pageX, event.pageY);
		else {
			const position = this._getSecondPointerPosition(event);
			const x = .5 * (event.pageX + position.x);
			const y = .5 * (event.pageY + position.y);
			this._rotateStart.set(x, y);
		}
	}
	_handleTouchStartPan(event) {
		if (this._pointers.length === 1) this._panStart.set(event.pageX, event.pageY);
		else {
			const position = this._getSecondPointerPosition(event);
			const x = .5 * (event.pageX + position.x);
			const y = .5 * (event.pageY + position.y);
			this._panStart.set(x, y);
		}
	}
	_handleTouchStartDolly(event) {
		const position = this._getSecondPointerPosition(event);
		const dx = event.pageX - position.x;
		const dy = event.pageY - position.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		this._dollyStart.set(0, distance);
	}
	_handleTouchStartDollyPan(event) {
		if (this.enableZoom) this._handleTouchStartDolly(event);
		if (this.enablePan) this._handleTouchStartPan(event);
	}
	_handleTouchStartDollyRotate(event) {
		if (this.enableZoom) this._handleTouchStartDolly(event);
		if (this.enableRotate) this._handleTouchStartRotate(event);
	}
	_handleTouchMoveRotate(event) {
		if (this._pointers.length == 1) this._rotateEnd.set(event.pageX, event.pageY);
		else {
			const position = this._getSecondPointerPosition(event);
			const x = .5 * (event.pageX + position.x);
			const y = .5 * (event.pageY + position.y);
			this._rotateEnd.set(x, y);
		}
		this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		const element = this.domElement;
		this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
		this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
		this._rotateStart.copy(this._rotateEnd);
	}
	_handleTouchMovePan(event) {
		if (this._pointers.length === 1) this._panEnd.set(event.pageX, event.pageY);
		else {
			const position = this._getSecondPointerPosition(event);
			const x = .5 * (event.pageX + position.x);
			const y = .5 * (event.pageY + position.y);
			this._panEnd.set(x, y);
		}
		this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
		this._pan(this._panDelta.x, this._panDelta.y);
		this._panStart.copy(this._panEnd);
	}
	_handleTouchMoveDolly(event) {
		const position = this._getSecondPointerPosition(event);
		const dx = event.pageX - position.x;
		const dy = event.pageY - position.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		this._dollyEnd.set(0, distance);
		this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed));
		this._dollyOut(this._dollyDelta.y);
		this._dollyStart.copy(this._dollyEnd);
		const centerX = (event.pageX + position.x) * .5;
		const centerY = (event.pageY + position.y) * .5;
		this._updateZoomParameters(centerX, centerY);
	}
	_handleTouchMoveDollyPan(event) {
		if (this.enableZoom) this._handleTouchMoveDolly(event);
		if (this.enablePan) this._handleTouchMovePan(event);
	}
	_handleTouchMoveDollyRotate(event) {
		if (this.enableZoom) this._handleTouchMoveDolly(event);
		if (this.enableRotate) this._handleTouchMoveRotate(event);
	}
	_addPointer(event) {
		this._pointers.push(event.pointerId);
	}
	_removePointer(event) {
		delete this._pointerPositions[event.pointerId];
		for (let i = 0; i < this._pointers.length; i++) if (this._pointers[i] == event.pointerId) {
			this._pointers.splice(i, 1);
			return;
		}
	}
	_isTrackingPointer(event) {
		for (let i = 0; i < this._pointers.length; i++) if (this._pointers[i] == event.pointerId) return true;
		return false;
	}
	_trackPointer(event) {
		let position = this._pointerPositions[event.pointerId];
		if (position === void 0) {
			position = new Vector2();
			this._pointerPositions[event.pointerId] = position;
		}
		position.set(event.pageX, event.pageY);
	}
	_getSecondPointerPosition(event) {
		const pointerId = event.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
		return this._pointerPositions[pointerId];
	}
	_customWheelEvent(event) {
		const mode = event.deltaMode;
		const newEvent = {
			clientX: event.clientX,
			clientY: event.clientY,
			deltaY: event.deltaY
		};
		switch (mode) {
			case 1:
				newEvent.deltaY *= 16;
				break;
			case 2:
				newEvent.deltaY *= 100;
				break;
		}
		if (event.ctrlKey && !this._controlActive) newEvent.deltaY *= 10;
		return newEvent;
	}
};
function onPointerDown(event) {
	if (this.enabled === false) return;
	if (this._pointers.length === 0) {
		this.domElement.setPointerCapture(event.pointerId);
		this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove);
		this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp);
	}
	if (this._isTrackingPointer(event)) return;
	this._addPointer(event);
	if (event.pointerType === "touch") this._onTouchStart(event);
	else this._onMouseDown(event);
	if (this._cursorStyle === "grab") this.domElement.style.cursor = "grabbing";
}
function onPointerMove(event) {
	if (this.enabled === false) return;
	if (event.pointerType === "touch") this._onTouchMove(event);
	else this._onMouseMove(event);
}
function onPointerUp(event) {
	this._removePointer(event);
	switch (this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(event.pointerId);
			this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove);
			this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp);
			this.dispatchEvent(_endEvent);
			this.state = _STATE.NONE;
			if (this._cursorStyle === "grab") this.domElement.style.cursor = "grab";
			break;
		case 1:
			const pointerId = this._pointers[0];
			const position = this._pointerPositions[pointerId];
			this._onTouchStart({
				pointerId,
				pageX: position.x,
				pageY: position.y
			});
			break;
	}
}
function onMouseDown(event) {
	let mouseAction;
	switch (event.button) {
		case 0:
			mouseAction = this.mouseButtons.LEFT;
			break;
		case 1:
			mouseAction = this.mouseButtons.MIDDLE;
			break;
		case 2:
			mouseAction = this.mouseButtons.RIGHT;
			break;
		default: mouseAction = -1;
	}
	switch (mouseAction) {
		case MOUSE.DOLLY:
			if (this.enableZoom === false) return;
			this._handleMouseDownDolly(event);
			this.state = _STATE.DOLLY;
			break;
		case MOUSE.ROTATE:
			if (event.ctrlKey || event.metaKey || event.shiftKey) {
				if (this.enablePan === false) return;
				this._handleMouseDownPan(event);
				this.state = _STATE.PAN;
			} else {
				if (this.enableRotate === false) return;
				this._handleMouseDownRotate(event);
				this.state = _STATE.ROTATE;
			}
			break;
		case MOUSE.PAN:
			if (event.ctrlKey || event.metaKey || event.shiftKey) {
				if (this.enableRotate === false) return;
				this._handleMouseDownRotate(event);
				this.state = _STATE.ROTATE;
			} else {
				if (this.enablePan === false) return;
				this._handleMouseDownPan(event);
				this.state = _STATE.PAN;
			}
			break;
		default: this.state = _STATE.NONE;
	}
	if (this.state !== _STATE.NONE) this.dispatchEvent(_startEvent);
}
function onMouseMove(event) {
	switch (this.state) {
		case _STATE.ROTATE:
			if (this.enableRotate === false) return;
			this._handleMouseMoveRotate(event);
			break;
		case _STATE.DOLLY:
			if (this.enableZoom === false) return;
			this._handleMouseMoveDolly(event);
			break;
		case _STATE.PAN:
			if (this.enablePan === false) return;
			this._handleMouseMovePan(event);
			break;
	}
}
function onMouseWheel(event) {
	if (this.enabled === false || this.enableZoom === false || this.state !== _STATE.NONE) return;
	event.preventDefault();
	this.dispatchEvent(_startEvent);
	this._handleMouseWheel(this._customWheelEvent(event));
	this.dispatchEvent(_endEvent);
}
function onKeyDown(event) {
	if (this.enabled === false) return;
	this._handleKeyDown(event);
}
function onTouchStart(event) {
	this._trackPointer(event);
	switch (this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case TOUCH.ROTATE:
					if (this.enableRotate === false) return;
					this._handleTouchStartRotate(event);
					this.state = _STATE.TOUCH_ROTATE;
					break;
				case TOUCH.PAN:
					if (this.enablePan === false) return;
					this._handleTouchStartPan(event);
					this.state = _STATE.TOUCH_PAN;
					break;
				default: this.state = _STATE.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case TOUCH.DOLLY_PAN:
					if (this.enableZoom === false && this.enablePan === false) return;
					this._handleTouchStartDollyPan(event);
					this.state = _STATE.TOUCH_DOLLY_PAN;
					break;
				case TOUCH.DOLLY_ROTATE:
					if (this.enableZoom === false && this.enableRotate === false) return;
					this._handleTouchStartDollyRotate(event);
					this.state = _STATE.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = _STATE.NONE;
			}
			break;
		default: this.state = _STATE.NONE;
	}
	if (this.state !== _STATE.NONE) this.dispatchEvent(_startEvent);
}
function onTouchMove(event) {
	this._trackPointer(event);
	switch (this.state) {
		case _STATE.TOUCH_ROTATE:
			if (this.enableRotate === false) return;
			this._handleTouchMoveRotate(event);
			this.update();
			break;
		case _STATE.TOUCH_PAN:
			if (this.enablePan === false) return;
			this._handleTouchMovePan(event);
			this.update();
			break;
		case _STATE.TOUCH_DOLLY_PAN:
			if (this.enableZoom === false && this.enablePan === false) return;
			this._handleTouchMoveDollyPan(event);
			this.update();
			break;
		case _STATE.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === false && this.enableRotate === false) return;
			this._handleTouchMoveDollyRotate(event);
			this.update();
			break;
		default: this.state = _STATE.NONE;
	}
}
function onContextMenu(event) {
	if (this.enabled === false) return;
	event.preventDefault();
}
function interceptControlDown(event) {
	if (event.key === "Control") {
		this._controlActive = true;
		this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
			passive: true,
			capture: true
		});
	}
}
function interceptControlUp(event) {
	if (event.key === "Control") {
		this._controlActive = false;
		this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
			passive: true,
			capture: true
		});
	}
}
var MAX_ISLAND_TRIANGLES = 4e5;
function isMesh(obj) {
	return obj.isMesh === true;
}
function collectMeshes(root) {
	const meshes = [];
	root.traverse((obj) => {
		if (isMesh(obj) && obj.visible) meshes.push(obj);
	});
	return meshes;
}
function triangleCount(geometry) {
	if (geometry.index) return Math.floor(geometry.index.count / 3);
	const pos = geometry.getAttribute("position");
	return pos ? Math.floor(pos.count / 3) : 0;
}
function find(parent, i) {
	let a = i;
	while (parent[a] !== a) {
		parent[a] = parent[parent[a]];
		a = parent[a];
	}
	return a;
}
function union(parent, a, b) {
	const ra = find(parent, a);
	const rb = find(parent, b);
	if (ra !== rb) parent[ra] = rb;
}
function weldByPosition(geometry) {
	const pos = geometry.getAttribute("position");
	const map = /* @__PURE__ */ new Map();
	const remap = new Int32Array(pos.count);
	for (let i = 0; i < pos.count; i++) {
		const key = `${pos.getX(i).toFixed(5)},${pos.getY(i).toFixed(5)},${pos.getZ(i).toFixed(5)}`;
		const existing = map.get(key);
		if (existing == null) {
			map.set(key, i);
			remap[i] = i;
		} else remap[i] = existing;
	}
	return remap;
}
function splitGeometryIslands(geometry) {
	const pos = geometry.getAttribute("position");
	if (!pos || pos.count < 6) return [];
	const tris = triangleCount(geometry);
	if (tris < 2 || tris > MAX_ISLAND_TRIANGLES) return [];
	const weld = weldByPosition(geometry);
	const parent = new Int32Array(pos.count);
	for (let i = 0; i < pos.count; i++) parent[i] = i;
	for (let i = 0; i < pos.count; i++) union(parent, i, weld[i]);
	const index = geometry.index;
	const triVertex = (tri, corner) => {
		if (index) return index.getX(tri * 3 + corner);
		return tri * 3 + corner;
	};
	for (let t = 0; t < tris; t++) {
		const a = triVertex(t, 0);
		const b = triVertex(t, 1);
		const c = triVertex(t, 2);
		union(parent, a, b);
		union(parent, b, c);
	}
	const islandOf = new Int32Array(pos.count);
	const islandIds = [];
	const seen = /* @__PURE__ */ new Map();
	for (let i = 0; i < pos.count; i++) {
		const root = find(parent, i);
		let id = seen.get(root);
		if (id == null) {
			id = islandIds.length;
			seen.set(root, id);
			islandIds.push(root);
		}
		islandOf[i] = id;
	}
	if (islandIds.length < 2) return [];
	const triIslands = islandIds.map(() => []);
	for (let t = 0; t < tris; t++) triIslands[islandOf[triVertex(t, 0)]].push(t);
	return triIslands.flatMap((trisInIsland) => {
		if (trisInIsland.length === 0) return [];
		return [extractTriangles(geometry, trisInIsland)];
	});
}
function extractTriangles(geometry, triIndices) {
	const srcIndex = geometry.index;
	const out = new BufferGeometry();
	const newIndex = [];
	const remap = /* @__PURE__ */ new Map();
	const takeVertex = (oldIndex) => {
		const existing = remap.get(oldIndex);
		if (existing != null) return existing;
		const next = remap.size;
		remap.set(oldIndex, next);
		return next;
	};
	for (const tri of triIndices) for (let c = 0; c < 3; c++) {
		const old = srcIndex ? srcIndex.getX(tri * 3 + c) : tri * 3 + c;
		newIndex.push(takeVertex(old));
	}
	for (const name of Object.keys(geometry.attributes)) {
		const attr = geometry.getAttribute(name);
		const itemSize = attr.itemSize;
		const array = new Float32Array(remap.size * itemSize);
		remap.forEach((newI, oldI) => {
			for (let k = 0; k < itemSize; k++) array[newI * itemSize + k] = attr.getComponent(oldI, k);
		});
		out.setAttribute(name, new BufferAttribute(array, itemSize, attr.normalized));
	}
	out.setIndex(newIndex);
	if (geometry.morphAttributes) {}
	out.computeVertexNormals();
	return out;
}
function splitMeshByGroups(mesh) {
	const groups = mesh.geometry.groups;
	if (!groups || groups.length < 2) return [];
	return groups.flatMap((group) => {
		if (group.count <= 0) return [];
		const startTri = Math.floor(group.start / 3);
		const triCount = Math.floor(group.count / 3);
		const tris = Array.from({ length: triCount }, (_, i) => startTri + i);
		return [extractTriangles(mesh.geometry, tris)];
	});
}
function replaceMeshWithPieces(mesh, geos) {
	const parent = mesh.parent;
	if (!parent) return [];
	const pieces = geos.map((geo, index) => {
		const piece = new Mesh(geo, mesh.material);
		piece.name = `${mesh.name || "island"}_${index}`;
		piece.position.copy(mesh.position);
		piece.quaternion.copy(mesh.quaternion);
		piece.scale.copy(mesh.scale);
		parent.add(piece);
		return piece;
	});
	mesh.visible = false;
	return pieces;
}
function prepareExplodePieces(root) {
	let meshes = collectMeshes(root);
	if (meshes.length <= 1) {
		const mesh = meshes[0];
		if (mesh) {
			const byGroup = splitMeshByGroups(mesh);
			if (byGroup.length >= 2) replaceMeshWithPieces(mesh, byGroup);
			else {
				const islands = splitGeometryIslands(mesh.geometry);
				if (islands.length >= 2) replaceMeshWithPieces(mesh, islands);
			}
		}
		meshes = collectMeshes(root);
	}
	const objects = meshes.length >= 2 ? meshes : root.children.filter((child) => child.visible && collectMeshes(child).length > 0);
	if (objects.length < 2) return [];
	const modelCenter = new Box3().setFromObject(root).getCenter(new Vector3());
	return objects.map((object) => {
		const centroid = new Box3().setFromObject(object).getCenter(new Vector3());
		const dirWorld = centroid.clone().sub(modelCenter);
		if (dirWorld.lengthSq() < 1e-10) dirWorld.set(object.id % 5 - 2, 1, object.id % 3 - 1).normalize();
		const parent = object.parent;
		let explodeDir = dirWorld;
		if (parent) {
			const localFrom = parent.worldToLocal(centroid.clone());
			explodeDir = parent.worldToLocal(centroid.clone().add(dirWorld)).sub(localFrom);
		}
		return {
			object,
			origin: object.position.clone(),
			explodeDir
		};
	});
}
function applyExplode(pieces, amount) {
	for (const piece of pieces) piece.object.position.copy(piece.origin).addScaledVector(piece.explodeDir, amount);
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("GLBViewer");
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
function filesServeUrl(localPath) {
	const origin = cherryBackendOrigin();
	const query = `path=${encodeURIComponent(localPath)}`;
	return origin ? `${origin}/api/v1/files/serve?${query}` : `/api/v1/files/serve?${query}`;
}
async function fetchGlbBytes(src, signal) {
	const urls = [src];
	const localPath = fileUrlToServePath(src);
	if (localPath) urls.push(filesServeUrl(localPath));
	else if (src.startsWith("/api/v1/files/serve")) {
		const origin = cherryBackendOrigin();
		if (origin) urls.unshift(`${origin}${src}`);
	}
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
		const material = obj.material;
		if (!material) return;
		const materials = Array.isArray(material) ? material : [material];
		for (const item of materials) {
			for (const value of Object.values(item)) if (value && typeof value === "object" && "dispose" in value && typeof value.dispose === "function") value.dispose();
			item.dispose();
		}
	});
}
function GLBViewer({ src, onLoad, onError }) {
	const { t } = useTranslation();
	const containerRef = (0, import_react.useRef)(null);
	const [held, setHeld] = (0, import_react.useState)(true);
	const [explode, setExplode] = (0, import_react.useState)(0);
	const [canExplode, setCanExplode] = (0, import_react.useState)(false);
	const explodeRef = (0, import_react.useRef)(0);
	const applyExplodeRef = (0, import_react.useRef)(() => void 0);
	const onLoadRef = (0, import_react.useRef)(onLoad);
	onLoadRef.current = onLoad;
	const onErrorRef = (0, import_react.useRef)(onError);
	onErrorRef.current = onError;
	(0, import_react.useEffect)(() => {
		setHeld(true);
		setExplode(0);
		explodeRef.current = 0;
		setCanExplode(false);
		const onRelease = () => setHeld(false);
		window.addEventListener(RELEASE_INLINE_WEBGL_EVENT, onRelease);
		return () => window.removeEventListener(RELEASE_INLINE_WEBGL_EVENT, onRelease);
	}, [src]);
	(0, import_react.useEffect)(() => {
		const container = containerRef.current;
		if (!src || !container || !held) return;
		let disposed = false;
		const scene = new Scene();
		scene.background = new Color(3816002);
		const camera = new PerspectiveCamera(45, container.clientWidth / Math.max(container.clientHeight, 1), .01, 1e3);
		camera.position.set(0, 1, 3);
		let renderer;
		try {
			renderer = new WebGLRenderer({
				antialias: false,
				alpha: false,
				powerPreference: "low-power",
				failIfMajorPerformanceCaveat: false
			});
		} catch {
			logger.error("WebGL context creation failed");
			onErrorRef.current?.("WebGL not available in this environment");
			return;
		}
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(1);
		renderer.shadowMap.enabled = false;
		renderer.outputColorSpace = SRGBColorSpace;
		renderer.toneMapping = 4;
		renderer.toneMappingExposure = 1.65;
		container.appendChild(renderer.domElement);
		renderer.domElement.draggable = false;
		renderer.domElement.style.touchAction = "none";
		renderer.domElement.style.cursor = "grab";
		const onContextLost = (event) => {
			event.preventDefault();
			if (disposed) return;
			disposed = true;
			onErrorRef.current?.("WebGL context lost");
		};
		const stopNativeDrag = (event) => {
			event.preventDefault();
			event.stopPropagation();
		};
		const stopPointerBubble = (event) => {
			event.stopPropagation();
		};
		const preventContextMenu = (event) => {
			event.preventDefault();
		};
		const grabCursor = () => {
			renderer.domElement.style.cursor = "grabbing";
		};
		const releaseCursor = () => {
			renderer.domElement.style.cursor = "grab";
		};
		renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);
		renderer.domElement.addEventListener("dragstart", stopNativeDrag);
		renderer.domElement.addEventListener("pointerdown", stopPointerBubble);
		renderer.domElement.addEventListener("pointerdown", grabCursor);
		renderer.domElement.addEventListener("pointerup", releaseCursor);
		renderer.domElement.addEventListener("pointerleave", releaseCursor);
		renderer.domElement.addEventListener("contextmenu", preventContextMenu);
		const hemi = new HemisphereLight(16777215, 4868693, 2.2);
		scene.add(hemi);
		const keyLight = new DirectionalLight(16774890, 3.4);
		keyLight.position.set(4, 8, 6);
		scene.add(keyLight);
		const fillLight = new DirectionalLight(13162751, 1.6);
		fillLight.position.set(-6, 3, -2);
		scene.add(fillLight);
		const rimLight = new DirectionalLight(16777215, 1.2);
		rimLight.position.set(0, 4, -6);
		scene.add(rimLight);
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
			const ambient = new AmbientLight(16777215, 1.4);
			scene.add(ambient);
		}
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = .12;
		controls.rotateSpeed = .95;
		controls.zoomSpeed = 1.15;
		controls.panSpeed = .9;
		controls.screenSpacePanning = true;
		controls.enablePan = true;
		controls.enableZoom = true;
		controls.enableRotate = true;
		controls.minDistance = .15;
		controls.maxDistance = 80;
		controls.mouseButtons = {
			LEFT: MOUSE.ROTATE,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.PAN
		};
		let mixer = null;
		let animationId = 0;
		const timer = new Timer();
		timer.connect(document);
		const abort = new AbortController();
		const animate = () => {
			if (disposed) return;
			animationId = requestAnimationFrame(animate);
			timer.update();
			mixer?.update(timer.getDelta());
			controls.update();
			renderer.render(scene, camera);
		};
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath(dracoDecoderDirectory());
		dracoLoader.decoderConfig = { type: "js" };
		const loader = new GLTFLoader();
		loader.setDRACOLoader(dracoLoader);
		animate();
		const onGltf = (gltf) => {
			if (disposed) {
				disposeObject3D(gltf.scene);
				return;
			}
			const model = gltf.scene;
			const box = new Box3().setFromObject(model);
			const center = box.getCenter(new Vector3());
			const maxDim = Math.max(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z);
			const scale = maxDim > 0 ? 2 / maxDim : 1;
			model.scale.setScalar(scale);
			model.position.sub(center.multiplyScalar(scale));
			model.traverse((obj) => {
				const material = obj.material;
				if (!material) return;
				const materials = Array.isArray(material) ? material : [material];
				for (const item of materials) {
					const std = item;
					if ("envMapIntensity" in std) std.envMapIntensity = 1.25;
					item.needsUpdate = true;
				}
			});
			scene.add(model);
			const pieces = prepareExplodePieces(model);
			applyExplodeRef.current = (amount) => applyExplode(pieces, amount);
			setCanExplode(pieces.length >= 2);
			applyExplode(pieces, explodeRef.current);
			const framed = Math.max(maxDim * scale * 1.6, 1.4);
			camera.position.set(framed * .7, framed * .45, framed);
			camera.lookAt(0, 0, 0);
			controls.target.set(0, 0, 0);
			controls.minDistance = Math.max(framed * .25, .2);
			controls.maxDistance = Math.max(framed * 8, 12);
			controls.update();
			if (gltf.animations && gltf.animations.length > 0) {
				mixer = new AnimationMixer(model);
				gltf.animations.forEach((clip) => {
					mixer.clipAction(clip).play();
				});
			}
			onLoadRef.current?.();
		};
		fetchGlbBytes(src, abort.signal).then((bytes) => {
			if (disposed) return;
			loader.parse(bytes, "", onGltf, (err) => {
				if (disposed) return;
				logger.error("Failed to parse model", err instanceof Error ? err : new Error(String(err)));
				onErrorRef.current?.("GLB 解析失败");
			});
		}).catch((err) => {
			if (disposed || abort.signal.aborted) return;
			logger.error("Failed to load model", err instanceof Error ? err : new Error(String(err)));
			onErrorRef.current?.(err instanceof Error ? err.message : "GLB 加载失败");
		});
		const resizeObserver = new ResizeObserver(() => {
			if (disposed || !container.clientWidth || !container.clientHeight) return;
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		});
		resizeObserver.observe(container);
		return () => {
			disposed = true;
			applyExplodeRef.current = () => void 0;
			abort.abort();
			resizeObserver.disconnect();
			cancelAnimationFrame(animationId);
			renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
			renderer.domElement.removeEventListener("dragstart", stopNativeDrag);
			renderer.domElement.removeEventListener("pointerdown", stopPointerBubble);
			renderer.domElement.removeEventListener("pointerdown", grabCursor);
			renderer.domElement.removeEventListener("pointerup", releaseCursor);
			renderer.domElement.removeEventListener("pointerleave", releaseCursor);
			renderer.domElement.removeEventListener("contextmenu", preventContextMenu);
			controls.dispose();
			mixer?.stopAllAction();
			mixer = null;
			timer.dispose();
			dracoLoader.dispose();
			envTexture?.dispose();
			pmrem.dispose();
			disposeObject3D(scene);
			scene.clear();
			try {
				renderer.forceContextLoss();
			} catch {}
			renderer.dispose();
			renderer.domElement.remove();
		};
	}, [held, src]);
	(0, import_react.useEffect)(() => {
		explodeRef.current = explode;
		applyExplodeRef.current(explode);
	}, [explode]);
	const explodePercent = Math.round(explode / 2 * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.glb-viewer",
		className: "relative h-full min-h-[240px] w-full overflow-hidden bg-[#3a3a42]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: containerRef,
			draggable: false,
			onDragStart: (event) => {
				event.preventDefault();
				event.stopPropagation();
			},
			onPointerDown: (event) => event.stopPropagation(),
			className: "[&>canvas]:!h-full [&>canvas]:!w-full absolute inset-0 z-0 [&>canvas]:block"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "ui.glb-viewer.glb-explode-slider",
			"data-testid": "glb-explode-slider",
			className: "-translate-x-1/2 absolute bottom-4 left-1/2 z-30 grid min-h-12 w-[min(410px,calc(100%-32px))] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-white/10 bg-[#16171c]/90 px-2.5 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.28),inset_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl",
			onPointerDown: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-7 place-items-center rounded-lg bg-[#35c8a0]/[0.12] text-[#35c8a0]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
							"aria-hidden": true,
							size: 15,
							strokeWidth: 1.8
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-white",
						children: t("file_preview.explode")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex min-w-0 flex-1 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute inset-x-0 h-1 overflow-hidden rounded-full bg-white/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-full rounded-full bg-[#35c8a0]",
								style: { width: `${explodePercent}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 2,
							step: .01,
							value: explode,
							disabled: !canExplode,
							"aria-label": t("file_preview.explode_hint"),
							title: canExplode ? t("file_preview.explode_hint") : t("file_preview.explode_unavailable"),
							onChange: (event) => setExplode(Number(event.target.value)),
							className: "relative h-5 min-w-0 flex-1 cursor-pointer appearance-none bg-transparent accent-[#35c8a0] disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#16171c] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
						className: "w-8 text-right text-[11px] text-white/60 tabular-nums",
						children: [explodePercent, "%"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": t("file_preview.explode_reset"),
					title: t("file_preview.explode_reset"),
					disabled: !canExplode || explode === 0,
					onClick: () => setExplode(0),
					className: "grid size-7 place-items-center rounded-lg border-0 bg-transparent text-white/55 transition-colors hover:bg-white/[0.08] hover:text-white disabled:pointer-events-none disabled:opacity-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
						"aria-hidden": true,
						size: 14,
						strokeWidth: 1.8
					})
				})
			]
		})]
	});
}
export { OrbitControls as n, GLBViewer as t };
