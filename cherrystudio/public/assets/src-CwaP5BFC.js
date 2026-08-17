import { n as __esmMin, o as __toCommonJS, r as __export, t as __commonJSMin } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_extend } from "./extend-CpT6M6LO.js";
import { t as require___vite_browser_external } from "./__vite-browser-external-B6Ia6fcU.js";
var require_bail = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = bail$1;
	function bail$1(err) {
		if (err) throw err;
	}
}));
var require_is_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function isBuffer(obj) {
		return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
	};
}));
var require_is_plain_obj = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (value) => {
		if (Object.prototype.toString.call(value) !== "[object Object]") return false;
		const prototype = Object.getPrototypeOf(value);
		return prototype === null || prototype === Object.prototype;
	};
}));
var require_wrap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var slice$2 = [].slice;
	module.exports = wrap$1;
	function wrap$1(fn, callback) {
		var invoked;
		return wrapped;
		function wrapped() {
			var params = slice$2.call(arguments, 0);
			var callback$1 = fn.length > params.length;
			var result;
			if (callback$1) params.push(done);
			try {
				result = fn.apply(null, params);
			} catch (error) {
				if (callback$1 && invoked) throw error;
				return done(error);
			}
			if (!callback$1) if (result && typeof result.then === "function") result.then(then, done);
			else if (result instanceof Error) done(result);
			else then(result);
		}
		function done() {
			if (!invoked) {
				invoked = true;
				callback.apply(null, arguments);
			}
		}
		function then(value) {
			done(null, value);
		}
	}
}));
var require_trough = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var wrap = require_wrap();
	module.exports = trough$1;
	trough$1.wrap = wrap;
	var slice$1 = [].slice;
	function trough$1() {
		var fns = [];
		var middleware = {};
		middleware.run = run;
		middleware.use = use;
		return middleware;
		function run() {
			var index$1 = -1;
			var input = slice$1.call(arguments, 0, -1);
			var done = arguments[arguments.length - 1];
			if (typeof done !== "function") throw new Error("Expected function as last argument, not " + done);
			next.apply(null, [null].concat(input));
			function next(err) {
				var fn = fns[++index$1];
				var values = slice$1.call(arguments, 0).slice(1);
				var length = input.length;
				var pos = -1;
				if (err) {
					done(err);
					return;
				}
				while (++pos < length) if (values[pos] === null || values[pos] === void 0) values[pos] = input[pos];
				input = values;
				if (fn) wrap(fn, next).apply(null, input);
				else done.apply(null, [null].concat(input));
			}
		}
		function use(fn) {
			if (typeof fn !== "function") throw new Error("Expected `fn` to be a function, not " + fn);
			fns.push(fn);
			return middleware;
		}
	}
}));
var require_unist_util_stringify_position = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var own$5 = {}.hasOwnProperty;
	module.exports = stringify$1;
	function stringify$1(value) {
		if (!value || typeof value !== "object") return "";
		if (own$5.call(value, "position") || own$5.call(value, "type")) return position(value.position);
		if (own$5.call(value, "start") || own$5.call(value, "end")) return position(value);
		if (own$5.call(value, "line") || own$5.call(value, "column")) return point(value);
		return "";
	}
	function point(point$1) {
		if (!point$1 || typeof point$1 !== "object") point$1 = {};
		return index(point$1.line) + ":" + index(point$1.column);
	}
	function position(pos) {
		if (!pos || typeof pos !== "object") pos = {};
		return point(pos.start) + "-" + point(pos.end);
	}
	function index(value) {
		return value && typeof value === "number" ? value : 1;
	}
}));
var require_vfile_message = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var stringify = require_unist_util_stringify_position();
	module.exports = VMessage$1;
	function VMessagePrototype() {}
	VMessagePrototype.prototype = Error.prototype;
	VMessage$1.prototype = new VMessagePrototype();
	var proto = VMessage$1.prototype;
	proto.file = "";
	proto.name = "";
	proto.reason = "";
	proto.message = "";
	proto.stack = "";
	proto.fatal = null;
	proto.column = null;
	proto.line = null;
	function VMessage$1(reason, position$1, origin) {
		var parts;
		var range;
		var location;
		if (typeof position$1 === "string") {
			origin = position$1;
			position$1 = null;
		}
		parts = parseOrigin(origin);
		range = stringify(position$1) || "1:1";
		location = {
			start: {
				line: null,
				column: null
			},
			end: {
				line: null,
				column: null
			}
		};
		if (position$1 && position$1.position) position$1 = position$1.position;
		if (position$1) if (position$1.start) {
			location = position$1;
			position$1 = position$1.start;
		} else location.start = position$1;
		if (reason.stack) {
			this.stack = reason.stack;
			reason = reason.message;
		}
		this.message = reason;
		this.name = range;
		this.reason = reason;
		this.line = position$1 ? position$1.line : null;
		this.column = position$1 ? position$1.column : null;
		this.location = location;
		this.source = parts[0];
		this.ruleId = parts[1];
	}
	function parseOrigin(origin) {
		var result = [null, null];
		var index$1;
		if (typeof origin === "string") {
			index$1 = origin.indexOf(":");
			if (index$1 === -1) result[1] = origin;
			else {
				result[0] = origin.slice(0, index$1);
				result[1] = origin.slice(index$1 + 1);
			}
		}
		return result;
	}
}));
var require_minpath_browser = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.basename = basename;
	exports.dirname = dirname;
	exports.extname = extname;
	exports.join = join;
	exports.sep = "/";
	function basename(path$1, ext) {
		var start = 0;
		var end = -1;
		var index$1;
		var firstNonSlashEnd;
		var seenNonSlash;
		var extIndex;
		if (ext !== void 0 && typeof ext !== "string") throw new TypeError("\"ext\" argument must be a string");
		assertPath$1(path$1);
		index$1 = path$1.length;
		if (ext === void 0 || !ext.length || ext.length > path$1.length) {
			while (index$1--) if (path$1.charCodeAt(index$1) === 47) {
				if (seenNonSlash) {
					start = index$1 + 1;
					break;
				}
			} else if (end < 0) {
				seenNonSlash = true;
				end = index$1 + 1;
			}
			return end < 0 ? "" : path$1.slice(start, end);
		}
		if (ext === path$1) return "";
		firstNonSlashEnd = -1;
		extIndex = ext.length - 1;
		while (index$1--) if (path$1.charCodeAt(index$1) === 47) {
			if (seenNonSlash) {
				start = index$1 + 1;
				break;
			}
		} else {
			if (firstNonSlashEnd < 0) {
				seenNonSlash = true;
				firstNonSlashEnd = index$1 + 1;
			}
			if (extIndex > -1) if (path$1.charCodeAt(index$1) === ext.charCodeAt(extIndex--)) {
				if (extIndex < 0) end = index$1;
			} else {
				extIndex = -1;
				end = firstNonSlashEnd;
			}
		}
		if (start === end) end = firstNonSlashEnd;
		else if (end < 0) end = path$1.length;
		return path$1.slice(start, end);
	}
	function dirname(path$1) {
		var end;
		var unmatchedSlash;
		var index$1;
		assertPath$1(path$1);
		if (!path$1.length) return ".";
		end = -1;
		index$1 = path$1.length;
		while (--index$1) if (path$1.charCodeAt(index$1) === 47) {
			if (unmatchedSlash) {
				end = index$1;
				break;
			}
		} else if (!unmatchedSlash) unmatchedSlash = true;
		return end < 0 ? path$1.charCodeAt(0) === 47 ? "/" : "." : end === 1 && path$1.charCodeAt(0) === 47 ? "//" : path$1.slice(0, end);
	}
	function extname(path$1) {
		var startDot = -1;
		var startPart = 0;
		var end = -1;
		var preDotState = 0;
		var unmatchedSlash;
		var code$2;
		var index$1;
		assertPath$1(path$1);
		index$1 = path$1.length;
		while (index$1--) {
			code$2 = path$1.charCodeAt(index$1);
			if (code$2 === 47) {
				if (unmatchedSlash) {
					startPart = index$1 + 1;
					break;
				}
				continue;
			}
			if (end < 0) {
				unmatchedSlash = true;
				end = index$1 + 1;
			}
			if (code$2 === 46) {
				if (startDot < 0) startDot = index$1;
				else if (preDotState !== 1) preDotState = 1;
			} else if (startDot > -1) preDotState = -1;
		}
		if (startDot < 0 || end < 0 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return "";
		return path$1.slice(startDot, end);
	}
	function join() {
		var index$1 = -1;
		var joined;
		while (++index$1 < arguments.length) {
			assertPath$1(arguments[index$1]);
			if (arguments[index$1]) joined = joined === void 0 ? arguments[index$1] : joined + "/" + arguments[index$1];
		}
		return joined === void 0 ? "." : normalize(joined);
	}
	function normalize(path$1) {
		var absolute;
		var value;
		assertPath$1(path$1);
		absolute = path$1.charCodeAt(0) === 47;
		value = normalizeString(path$1, !absolute);
		if (!value.length && !absolute) value = ".";
		if (value.length && path$1.charCodeAt(path$1.length - 1) === 47) value += "/";
		return absolute ? "/" + value : value;
	}
	function normalizeString(path$1, allowAboveRoot) {
		var result = "";
		var lastSegmentLength = 0;
		var lastSlash = -1;
		var dots = 0;
		var index$1 = -1;
		var code$2;
		var lastSlashIndex;
		while (++index$1 <= path$1.length) {
			if (index$1 < path$1.length) code$2 = path$1.charCodeAt(index$1);
			else if (code$2 === 47) break;
			else code$2 = 47;
			if (code$2 === 47) {
				if (lastSlash === index$1 - 1 || dots === 1) {} else if (lastSlash !== index$1 - 1 && dots === 2) {
					if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46 || result.charCodeAt(result.length - 2) !== 46) {
						if (result.length > 2) {
							lastSlashIndex = result.lastIndexOf("/");
							/* istanbul ignore else - No clue how to cover it. */
							if (lastSlashIndex !== result.length - 1) {
								if (lastSlashIndex < 0) {
									result = "";
									lastSegmentLength = 0;
								} else {
									result = result.slice(0, lastSlashIndex);
									lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
								}
								lastSlash = index$1;
								dots = 0;
								continue;
							}
						} else if (result.length) {
							result = "";
							lastSegmentLength = 0;
							lastSlash = index$1;
							dots = 0;
							continue;
						}
					}
					if (allowAboveRoot) {
						result = result.length ? result + "/.." : "..";
						lastSegmentLength = 2;
					}
				} else {
					if (result.length) result += "/" + path$1.slice(lastSlash + 1, index$1);
					else result = path$1.slice(lastSlash + 1, index$1);
					lastSegmentLength = index$1 - lastSlash - 1;
				}
				lastSlash = index$1;
				dots = 0;
			} else if (code$2 === 46 && dots > -1) dots++;
			else dots = -1;
		}
		return result;
	}
	function assertPath$1(path$1) {
		if (typeof path$1 !== "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(path$1));
	}
}));
var require_minproc_browser = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.cwd = cwd;
	function cwd() {
		return "/";
	}
}));
var require_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var p = require_minpath_browser();
	var proc = require_minproc_browser();
	var buffer$1 = require_is_buffer();
	module.exports = VFile$1;
	var own$4 = {}.hasOwnProperty;
	var order = [
		"history",
		"path",
		"basename",
		"stem",
		"extname",
		"dirname"
	];
	VFile$1.prototype.toString = toString$2;
	Object.defineProperty(VFile$1.prototype, "path", {
		get: getPath,
		set: setPath
	});
	Object.defineProperty(VFile$1.prototype, "dirname", {
		get: getDirname,
		set: setDirname
	});
	Object.defineProperty(VFile$1.prototype, "basename", {
		get: getBasename,
		set: setBasename
	});
	Object.defineProperty(VFile$1.prototype, "extname", {
		get: getExtname,
		set: setExtname
	});
	Object.defineProperty(VFile$1.prototype, "stem", {
		get: getStem,
		set: setStem
	});
	function VFile$1(options) {
		var prop;
		var index$1;
		if (!options) options = {};
		else if (typeof options === "string" || buffer$1(options)) options = { contents: options };
		else if ("message" in options && "messages" in options) return options;
		if (!(this instanceof VFile$1)) return new VFile$1(options);
		this.data = {};
		this.messages = [];
		this.history = [];
		this.cwd = proc.cwd();
		index$1 = -1;
		while (++index$1 < order.length) {
			prop = order[index$1];
			if (own$4.call(options, prop)) this[prop] = options[prop];
		}
		for (prop in options) if (order.indexOf(prop) < 0) this[prop] = options[prop];
	}
	function getPath() {
		return this.history[this.history.length - 1];
	}
	function setPath(path$1) {
		assertNonEmpty(path$1, "path");
		if (this.path !== path$1) this.history.push(path$1);
	}
	function getDirname() {
		return typeof this.path === "string" ? p.dirname(this.path) : void 0;
	}
	function setDirname(dirname$1) {
		assertPath(this.path, "dirname");
		this.path = p.join(dirname$1 || "", this.basename);
	}
	function getBasename() {
		return typeof this.path === "string" ? p.basename(this.path) : void 0;
	}
	function setBasename(basename$1) {
		assertNonEmpty(basename$1, "basename");
		assertPart(basename$1, "basename");
		this.path = p.join(this.dirname || "", basename$1);
	}
	function getExtname() {
		return typeof this.path === "string" ? p.extname(this.path) : void 0;
	}
	function setExtname(extname$1) {
		assertPart(extname$1, "extname");
		assertPath(this.path, "extname");
		if (extname$1) {
			if (extname$1.charCodeAt(0) !== 46) throw new Error("`extname` must start with `.`");
			if (extname$1.indexOf(".", 1) > -1) throw new Error("`extname` cannot contain multiple dots");
		}
		this.path = p.join(this.dirname, this.stem + (extname$1 || ""));
	}
	function getStem() {
		return typeof this.path === "string" ? p.basename(this.path, this.extname) : void 0;
	}
	function setStem(stem) {
		assertNonEmpty(stem, "stem");
		assertPart(stem, "stem");
		this.path = p.join(this.dirname || "", stem + (this.extname || ""));
	}
	function toString$2(encoding) {
		return (this.contents || "").toString(encoding);
	}
	function assertPart(part, name) {
		if (part && part.indexOf(p.sep) > -1) throw new Error("`" + name + "` cannot be a path: did not expect `" + p.sep + "`");
	}
	function assertNonEmpty(part, name) {
		if (!part) throw new Error("`" + name + "` cannot be empty");
	}
	function assertPath(path$1, name) {
		if (!path$1) throw new Error("Setting `" + name + "` requires `path` to be set too");
	}
}));
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var VMessage = require_vfile_message();
	var VFile = require_core();
	module.exports = VFile;
	VFile.prototype.message = message;
	VFile.prototype.info = info;
	VFile.prototype.fail = fail;
	function message(reason, position$1, origin) {
		var message$1 = new VMessage(reason, position$1, origin);
		if (this.path) {
			message$1.name = this.path + ":" + message$1.name;
			message$1.file = this.path;
		}
		message$1.fatal = false;
		this.messages.push(message$1);
		return message$1;
	}
	function fail() {
		var message$1 = this.message.apply(this, arguments);
		message$1.fatal = true;
		throw message$1;
	}
	function info() {
		var message$1 = this.message.apply(this, arguments);
		message$1.fatal = null;
		return message$1;
	}
}));
var require_vfile = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_lib();
}));
var require_unified = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bail = require_bail();
	var buffer = require_is_buffer();
	var extend = require_extend();
	var plain = require_is_plain_obj();
	var trough = require_trough();
	var vfile = require_vfile();
	module.exports = unified().freeze();
	var slice = [].slice;
	var own$3 = {}.hasOwnProperty;
	var pipeline = trough().use(pipelineParse).use(pipelineRun).use(pipelineStringify);
	function pipelineParse(p$1, ctx) {
		ctx.tree = p$1.parse(ctx.file);
	}
	function pipelineRun(p$1, ctx, next) {
		p$1.run(ctx.tree, ctx.file, done);
		function done(error, tree, file) {
			if (error) next(error);
			else {
				ctx.tree = tree;
				ctx.file = file;
				next();
			}
		}
	}
	function pipelineStringify(p$1, ctx) {
		var result = p$1.stringify(ctx.tree, ctx.file);
		if (result === void 0 || result === null) {} else if (typeof result === "string" || buffer(result)) {
			if ("value" in ctx.file) ctx.file.value = result;
			ctx.file.contents = result;
		} else ctx.file.result = result;
	}
	function unified() {
		var attachers = [];
		var transformers = trough();
		var namespace = {};
		var freezeIndex = -1;
		var frozen;
		processor.data = data;
		processor.freeze = freeze;
		processor.attachers = attachers;
		processor.use = use;
		processor.parse = parse$2;
		processor.stringify = stringify$2;
		processor.run = run;
		processor.runSync = runSync;
		processor.process = process;
		processor.processSync = processSync;
		return processor;
		function processor() {
			var destination = unified();
			var index$1 = -1;
			while (++index$1 < attachers.length) destination.use.apply(null, attachers[index$1]);
			destination.data(extend(true, {}, namespace));
			return destination;
		}
		function freeze() {
			var values;
			var transformer;
			if (frozen) return processor;
			while (++freezeIndex < attachers.length) {
				values = attachers[freezeIndex];
				if (values[1] === false) continue;
				if (values[1] === true) values[1] = void 0;
				transformer = values[0].apply(processor, values.slice(1));
				if (typeof transformer === "function") transformers.use(transformer);
			}
			frozen = true;
			freezeIndex = Infinity;
			return processor;
		}
		function data(key, value) {
			if (typeof key === "string") {
				if (arguments.length === 2) {
					assertUnfrozen("data", frozen);
					namespace[key] = value;
					return processor;
				}
				return own$3.call(namespace, key) && namespace[key] || null;
			}
			if (key) {
				assertUnfrozen("data", frozen);
				namespace = key;
				return processor;
			}
			return namespace;
		}
		function use(value) {
			var settings;
			assertUnfrozen("use", frozen);
			if (value === null || value === void 0) {} else if (typeof value === "function") addPlugin.apply(null, arguments);
			else if (typeof value === "object") if ("length" in value) addList(value);
			else addPreset(value);
			else throw new Error("Expected usable value, not `" + value + "`");
			if (settings) namespace.settings = extend(namespace.settings || {}, settings);
			return processor;
			function addPreset(result) {
				addList(result.plugins);
				if (result.settings) settings = extend(settings || {}, result.settings);
			}
			function add(value$1) {
				if (typeof value$1 === "function") addPlugin(value$1);
				else if (typeof value$1 === "object") if ("length" in value$1) addPlugin.apply(null, value$1);
				else addPreset(value$1);
				else throw new Error("Expected usable value, not `" + value$1 + "`");
			}
			function addList(plugins) {
				var index$1 = -1;
				if (plugins === null || plugins === void 0) {} else if (typeof plugins === "object" && "length" in plugins) while (++index$1 < plugins.length) add(plugins[index$1]);
				else throw new Error("Expected a list of plugins, not `" + plugins + "`");
			}
			function addPlugin(plugin, value$1) {
				var entry = find(plugin);
				if (entry) {
					if (plain(entry[1]) && plain(value$1)) value$1 = extend(true, entry[1], value$1);
					entry[1] = value$1;
				} else attachers.push(slice.call(arguments));
			}
		}
		function find(plugin) {
			var index$1 = -1;
			while (++index$1 < attachers.length) if (attachers[index$1][0] === plugin) return attachers[index$1];
		}
		function parse$2(doc) {
			var file = vfile(doc);
			var Parser;
			freeze();
			Parser = processor.Parser;
			assertParser("parse", Parser);
			if (newable(Parser, "parse")) return new Parser(String(file), file).parse();
			return Parser(String(file), file);
		}
		function run(node$1, file, cb) {
			assertNode(node$1);
			freeze();
			if (!cb && typeof file === "function") {
				cb = file;
				file = null;
			}
			if (!cb) return new Promise(executor);
			executor(null, cb);
			function executor(resolve, reject) {
				transformers.run(node$1, vfile(file), done);
				function done(error, tree, file$1) {
					tree = tree || node$1;
					if (error) reject(error);
					else if (resolve) resolve(tree);
					else cb(null, tree, file$1);
				}
			}
		}
		function runSync(node$1, file) {
			var result;
			var complete;
			run(node$1, file, done);
			assertDone("runSync", "run", complete);
			return result;
			function done(error, tree) {
				complete = true;
				result = tree;
				bail(error);
			}
		}
		function stringify$2(node$1, doc) {
			var file = vfile(doc);
			var Compiler;
			freeze();
			Compiler = processor.Compiler;
			assertCompiler("stringify", Compiler);
			assertNode(node$1);
			if (newable(Compiler, "compile")) return new Compiler(node$1, file).compile();
			return Compiler(node$1, file);
		}
		function process(doc, cb) {
			freeze();
			assertParser("process", processor.Parser);
			assertCompiler("process", processor.Compiler);
			if (!cb) return new Promise(executor);
			executor(null, cb);
			function executor(resolve, reject) {
				var file = vfile(doc);
				pipeline.run(processor, { file }, done);
				function done(error) {
					if (error) reject(error);
					else if (resolve) resolve(file);
					else cb(null, file);
				}
			}
		}
		function processSync(doc) {
			var file;
			var complete;
			freeze();
			assertParser("processSync", processor.Parser);
			assertCompiler("processSync", processor.Compiler);
			file = vfile(doc);
			process(file, done);
			assertDone("processSync", "process", complete);
			return file;
			function done(error) {
				complete = true;
				bail(error);
			}
		}
	}
	function newable(value, name) {
		return typeof value === "function" && value.prototype && (keys(value.prototype) || name in value.prototype);
	}
	function keys(value) {
		var key;
		for (key in value) return true;
		return false;
	}
	function assertParser(name, Parser) {
		if (typeof Parser !== "function") throw new Error("Cannot `" + name + "` without `Parser`");
	}
	function assertCompiler(name, Compiler) {
		if (typeof Compiler !== "function") throw new Error("Cannot `" + name + "` without `Compiler`");
	}
	function assertUnfrozen(name, frozen) {
		if (frozen) throw new Error("Cannot invoke `" + name + "` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.");
	}
	function assertNode(node$1) {
		if (!node$1 || typeof node$1.type !== "string") throw new Error("Expected node, got `" + node$1 + "`");
	}
	function assertDone(name, asyncName, complete) {
		if (!complete) throw new Error("`" + name + "` finished async. Use `" + asyncName + "` instead");
	}
}));
var require_mdast_util_to_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = toString$1;
	function toString$1(node$1) {
		return node$1 && (node$1.value || node$1.alt || node$1.title || "children" in node$1 && all(node$1.children) || "length" in node$1 && all(node$1)) || "";
	}
	function all(values) {
		var result = [];
		var index$1 = -1;
		while (++index$1 < values.length) result[index$1] = toString$1(values[index$1]);
		return result.join("");
	}
}));
var require_assign = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Object.assign;
}));
var require_has_own_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {}.hasOwnProperty;
}));
var require_normalize_identifier = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function normalizeIdentifier$3(value) {
		return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
	}
	module.exports = normalizeIdentifier$3;
}));
var require_from_char_code = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = String.fromCharCode;
}));
var require_safe_from_int = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fromCharCode$3 = require_from_char_code();
	function safeFromInt$1(value, base) {
		var code$2 = parseInt(value, base);
		if (code$2 < 9 || code$2 === 11 || code$2 > 13 && code$2 < 32 || code$2 > 126 && code$2 < 160 || code$2 > 55295 && code$2 < 57344 || code$2 > 64975 && code$2 < 65008 || (code$2 & 65535) === 65535 || (code$2 & 65535) === 65534 || code$2 > 1114111) return "�";
		return fromCharCode$3(code$2);
	}
	module.exports = safeFromInt$1;
}));
var require_markdown_line_ending = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function markdownLineEnding$20(code$2) {
		return code$2 < -2;
	}
	module.exports = markdownLineEnding$20;
}));
var require_markdown_space = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function markdownSpace$9(code$2) {
		return code$2 === -2 || code$2 === -1 || code$2 === 32;
	}
	module.exports = markdownSpace$9;
}));
var require_factory_space = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownSpace$8 = require_markdown_space();
	function spaceFactory$1(effects, ok$1, type, max) {
		var limit = max ? max - 1 : Infinity;
		var size = 0;
		return start;
		function start(code$2) {
			if (markdownSpace$8(code$2)) {
				effects.enter(type);
				return prefix(code$2);
			}
			return ok$1(code$2);
		}
		function prefix(code$2) {
			if (markdownSpace$8(code$2) && size++ < limit) {
				effects.consume(code$2);
				return prefix;
			}
			effects.exit(type);
			return ok$1(code$2);
		}
	}
	module.exports = spaceFactory$1;
}));
var require_content$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var markdownLineEnding$19 = require_markdown_line_ending();
	var factorySpace$16 = require_factory_space();
	var tokenize$2 = initializeContent;
	function initializeContent(effects) {
		var contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
		var previous$4;
		return contentStart;
		function afterContentStartConstruct(code$2) {
			if (code$2 === null) {
				effects.consume(code$2);
				return;
			}
			effects.enter("lineEnding");
			effects.consume(code$2);
			effects.exit("lineEnding");
			return factorySpace$16(effects, contentStart, "linePrefix");
		}
		function paragraphInitial(code$2) {
			effects.enter("paragraph");
			return lineStart(code$2);
		}
		function lineStart(code$2) {
			var token = effects.enter("chunkText", {
				contentType: "text",
				previous: previous$4
			});
			if (previous$4) previous$4.next = token;
			previous$4 = token;
			return data(code$2);
		}
		function data(code$2) {
			if (code$2 === null) {
				effects.exit("chunkText");
				effects.exit("paragraph");
				effects.consume(code$2);
				return;
			}
			if (markdownLineEnding$19(code$2)) {
				effects.consume(code$2);
				effects.exit("chunkText");
				return lineStart;
			}
			effects.consume(code$2);
			return data;
		}
	}
	exports.tokenize = tokenize$2;
}));
var require_partial_blank_line = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$18 = require_markdown_line_ending();
	var factorySpace$15 = require_factory_space();
	var partialBlankLine$4 = {
		tokenize: tokenizePartialBlankLine,
		partial: true
	};
	function tokenizePartialBlankLine(effects, ok$1, nok) {
		return factorySpace$15(effects, afterWhitespace, "linePrefix");
		function afterWhitespace(code$2) {
			return code$2 === null || markdownLineEnding$18(code$2) ? ok$1(code$2) : nok(code$2);
		}
	}
	module.exports = partialBlankLine$4;
}));
var require_document = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var markdownLineEnding$17 = require_markdown_line_ending();
	var factorySpace$14 = require_factory_space();
	var partialBlankLine$3 = require_partial_blank_line();
	var tokenize$1 = initializeDocument;
	var containerConstruct = { tokenize: tokenizeContainer };
	var lazyFlowConstruct = { tokenize: tokenizeLazyFlow };
	function initializeDocument(effects) {
		var self = this;
		var stack = [];
		var continued = 0;
		var inspectConstruct = {
			tokenize: tokenizeInspect,
			partial: true
		};
		var inspectResult;
		var childFlow;
		var childToken;
		return start;
		function start(code$2) {
			if (continued < stack.length) {
				self.containerState = stack[continued][1];
				return effects.attempt(stack[continued][0].continuation, documentContinue, documentContinued)(code$2);
			}
			return documentContinued(code$2);
		}
		function documentContinue(code$2) {
			continued++;
			return start(code$2);
		}
		function documentContinued(code$2) {
			if (inspectResult && inspectResult.flowContinue) return flowStart(code$2);
			self.interrupt = childFlow && childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
			self.containerState = {};
			return effects.attempt(containerConstruct, containerContinue, flowStart)(code$2);
		}
		function containerContinue(code$2) {
			stack.push([self.currentConstruct, self.containerState]);
			self.containerState = void 0;
			return documentContinued(code$2);
		}
		function flowStart(code$2) {
			if (code$2 === null) {
				exitContainers(0, true);
				effects.consume(code$2);
				return;
			}
			childFlow = childFlow || self.parser.flow(self.now());
			effects.enter("chunkFlow", {
				contentType: "flow",
				previous: childToken,
				_tokenizer: childFlow
			});
			return flowContinue(code$2);
		}
		function flowContinue(code$2) {
			if (code$2 === null) {
				continueFlow(effects.exit("chunkFlow"));
				return flowStart(code$2);
			}
			if (markdownLineEnding$17(code$2)) {
				effects.consume(code$2);
				continueFlow(effects.exit("chunkFlow"));
				return effects.check(inspectConstruct, documentAfterPeek);
			}
			effects.consume(code$2);
			return flowContinue;
		}
		function documentAfterPeek(code$2) {
			exitContainers(inspectResult.continued, inspectResult && inspectResult.flowEnd);
			continued = 0;
			return start(code$2);
		}
		function continueFlow(token) {
			if (childToken) childToken.next = token;
			childToken = token;
			childFlow.lazy = inspectResult && inspectResult.lazy;
			childFlow.defineSkip(token.start);
			childFlow.write(self.sliceStream(token));
		}
		function exitContainers(size, end) {
			var index$1 = stack.length;
			if (childFlow && end) {
				childFlow.write([null]);
				childToken = childFlow = void 0;
			}
			while (index$1-- > size) {
				self.containerState = stack[index$1][1];
				stack[index$1][0].exit.call(self, effects);
			}
			stack.length = size;
		}
		function tokenizeInspect(effects$1, ok$1) {
			var subcontinued = 0;
			inspectResult = {};
			return inspectStart;
			function inspectStart(code$2) {
				if (subcontinued < stack.length) {
					self.containerState = stack[subcontinued][1];
					return effects$1.attempt(stack[subcontinued][0].continuation, inspectContinue, inspectLess)(code$2);
				}
				if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
					inspectResult.flowContinue = true;
					return inspectDone(code$2);
				}
				self.interrupt = childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
				self.containerState = {};
				return effects$1.attempt(containerConstruct, inspectFlowEnd, inspectDone)(code$2);
			}
			function inspectContinue(code$2) {
				subcontinued++;
				return self.containerState._closeFlow ? inspectFlowEnd(code$2) : inspectStart(code$2);
			}
			function inspectLess(code$2) {
				if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
					self.containerState = {};
					return effects$1.attempt(containerConstruct, inspectFlowEnd, effects$1.attempt(lazyFlowConstruct, inspectFlowEnd, effects$1.check(partialBlankLine$3, inspectFlowEnd, inspectLazy)))(code$2);
				}
				return inspectFlowEnd(code$2);
			}
			function inspectLazy(code$2) {
				subcontinued = stack.length;
				inspectResult.lazy = true;
				inspectResult.flowContinue = true;
				return inspectDone(code$2);
			}
			function inspectFlowEnd(code$2) {
				inspectResult.flowEnd = true;
				return inspectDone(code$2);
			}
			function inspectDone(code$2) {
				inspectResult.continued = subcontinued;
				self.interrupt = self.containerState = void 0;
				return ok$1(code$2);
			}
		}
	}
	function tokenizeContainer(effects, ok$1, nok) {
		return factorySpace$14(effects, effects.attempt(this.parser.constructs.document, ok$1, nok), "linePrefix", this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
	}
	function tokenizeLazyFlow(effects, ok$1, nok) {
		return factorySpace$14(effects, effects.lazy(this.parser.constructs.flow, ok$1, nok), "linePrefix", this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
	}
	exports.tokenize = tokenize$1;
}));
var require_size_chunks = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function sizeChunks$2(chunks) {
		var index$1 = -1;
		var size = 0;
		while (++index$1 < chunks.length) size += typeof chunks[index$1] === "string" ? chunks[index$1].length : 1;
		return size;
	}
	module.exports = sizeChunks$2;
}));
var require_prefix_size = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var sizeChunks$1 = require_size_chunks();
	function prefixSize$6(events, type) {
		var tail = events[events.length - 1];
		if (!tail || tail[1].type !== type) return 0;
		return sizeChunks$1(tail[2].sliceStream(tail[1]));
	}
	module.exports = prefixSize$6;
}));
var require_splice = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = [].splice;
}));
var require_chunked_splice = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var splice$1 = require_splice();
	function chunkedSplice$9(list$2, start, remove, items) {
		var end = list$2.length;
		var chunkStart = 0;
		var parameters;
		if (start < 0) start = -start > end ? 0 : end + start;
		else start = start > end ? end : start;
		remove = remove > 0 ? remove : 0;
		if (items.length < 1e4) {
			parameters = Array.from(items);
			parameters.unshift(start, remove);
			splice$1.apply(list$2, parameters);
		} else {
			if (remove) splice$1.apply(list$2, [start, remove]);
			while (chunkStart < items.length) {
				parameters = items.slice(chunkStart, chunkStart + 1e4);
				parameters.unshift(start, 0);
				splice$1.apply(list$2, parameters);
				chunkStart += 1e4;
				start += 1e4;
			}
		}
	}
	module.exports = chunkedSplice$9;
}));
var require_shallow = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assign$4 = require_assign();
	function shallow$7(object) {
		return assign$4({}, object);
	}
	module.exports = shallow$7;
}));
var require_subtokenize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assign$3 = require_assign();
	var chunkedSplice$8 = require_chunked_splice();
	var shallow$6 = require_shallow();
	function subtokenize$2(events) {
		var jumps = {};
		var index$1 = -1;
		var event;
		var lineIndex;
		var otherIndex;
		var otherEvent;
		var parameters;
		var subevents;
		var more;
		while (++index$1 < events.length) {
			while (index$1 in jumps) index$1 = jumps[index$1];
			event = events[index$1];
			if (index$1 && event[1].type === "chunkFlow" && events[index$1 - 1][1].type === "listItemPrefix") {
				subevents = event[1]._tokenizer.events;
				otherIndex = 0;
				if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") otherIndex += 2;
				if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") while (++otherIndex < subevents.length) {
					if (subevents[otherIndex][1].type === "content") break;
					if (subevents[otherIndex][1].type === "chunkText") {
						subevents[otherIndex][1].isInFirstContentOfListItem = true;
						otherIndex++;
					}
				}
			}
			if (event[0] === "enter") {
				if (event[1].contentType) {
					assign$3(jumps, subcontent(events, index$1));
					index$1 = jumps[index$1];
					more = true;
				}
			} else if (event[1]._container || event[1]._movePreviousLineEndings) {
				otherIndex = index$1;
				lineIndex = void 0;
				while (otherIndex--) {
					otherEvent = events[otherIndex];
					if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
						if (otherEvent[0] === "enter") {
							if (lineIndex) events[lineIndex][1].type = "lineEndingBlank";
							otherEvent[1].type = "lineEnding";
							lineIndex = otherIndex;
						}
					} else break;
				}
				if (lineIndex) {
					event[1].end = shallow$6(events[lineIndex][1].start);
					parameters = events.slice(lineIndex, index$1);
					parameters.unshift(event);
					chunkedSplice$8(events, lineIndex, index$1 - lineIndex + 1, parameters);
				}
			}
		}
		return !more;
	}
	function subcontent(events, eventIndex) {
		var token = events[eventIndex][1];
		var context = events[eventIndex][2];
		var startPosition = eventIndex - 1;
		var startPositions = [];
		var tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
		var childEvents = tokenizer.events;
		var jumps = [];
		var gaps = {};
		var stream;
		var previous$4;
		var index$1;
		var entered;
		var end;
		var adjust;
		while (token) {
			while (events[++startPosition][1] !== token);
			startPositions.push(startPosition);
			if (!token._tokenizer) {
				stream = context.sliceStream(token);
				if (!token.next) stream.push(null);
				if (previous$4) tokenizer.defineSkip(token.start);
				if (token.isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = true;
				tokenizer.write(stream);
				if (token.isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = void 0;
			}
			previous$4 = token;
			token = token.next;
		}
		token = previous$4;
		index$1 = childEvents.length;
		while (index$1--) if (childEvents[index$1][0] === "enter") entered = true;
		else if (entered && childEvents[index$1][1].type === childEvents[index$1 - 1][1].type && childEvents[index$1][1].start.line !== childEvents[index$1][1].end.line) {
			add(childEvents.slice(index$1 + 1, end));
			token._tokenizer = token.next = void 0;
			token = token.previous;
			end = index$1 + 1;
		}
		tokenizer.events = token._tokenizer = token.next = void 0;
		add(childEvents.slice(0, end));
		index$1 = -1;
		adjust = 0;
		while (++index$1 < jumps.length) {
			gaps[adjust + jumps[index$1][0]] = adjust + jumps[index$1][1];
			adjust += jumps[index$1][1] - jumps[index$1][0] - 1;
		}
		return gaps;
		function add(slice$3) {
			var start = startPositions.pop();
			jumps.unshift([start, start + slice$3.length - 1]);
			chunkedSplice$8(events, start, 2, slice$3);
		}
	}
	module.exports = subtokenize$2;
}));
var require_content = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$16 = require_markdown_line_ending();
	var prefixSize$5 = require_prefix_size();
	var subtokenize$1 = require_subtokenize();
	var factorySpace$13 = require_factory_space();
	var content$2 = {
		tokenize: tokenizeContent,
		resolve: resolveContent,
		interruptible: true,
		lazy: true
	};
	var continuationConstruct = {
		tokenize: tokenizeContinuation,
		partial: true
	};
	function resolveContent(events) {
		subtokenize$1(events);
		return events;
	}
	function tokenizeContent(effects, ok$1) {
		var previous$4;
		return start;
		function start(code$2) {
			effects.enter("content");
			previous$4 = effects.enter("chunkContent", { contentType: "content" });
			return data(code$2);
		}
		function data(code$2) {
			if (code$2 === null) return contentEnd(code$2);
			if (markdownLineEnding$16(code$2)) return effects.check(continuationConstruct, contentContinue, contentEnd)(code$2);
			effects.consume(code$2);
			return data;
		}
		function contentEnd(code$2) {
			effects.exit("chunkContent");
			effects.exit("content");
			return ok$1(code$2);
		}
		function contentContinue(code$2) {
			effects.consume(code$2);
			effects.exit("chunkContent");
			previous$4 = previous$4.next = effects.enter("chunkContent", {
				contentType: "content",
				previous: previous$4
			});
			return data;
		}
	}
	function tokenizeContinuation(effects, ok$1, nok) {
		var self = this;
		return startLookahead;
		function startLookahead(code$2) {
			effects.enter("lineEnding");
			effects.consume(code$2);
			effects.exit("lineEnding");
			return factorySpace$13(effects, prefixed, "linePrefix");
		}
		function prefixed(code$2) {
			if (code$2 === null || markdownLineEnding$16(code$2)) return nok(code$2);
			if (self.parser.constructs.disable.null.indexOf("codeIndented") > -1 || prefixSize$5(self.events, "linePrefix") < 4) return effects.interrupt(self.parser.constructs.flow, nok, ok$1)(code$2);
			return ok$1(code$2);
		}
	}
	module.exports = content$2;
}));
var require_flow = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var content$1 = require_content();
	var factorySpace$12 = require_factory_space();
	var partialBlankLine$2 = require_partial_blank_line();
	var tokenize = initializeFlow;
	function initializeFlow(effects) {
		var self = this;
		var initial = effects.attempt(partialBlankLine$2, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace$12(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content$1, afterConstruct)), "linePrefix")));
		return initial;
		function atBlankEnding(code$2) {
			if (code$2 === null) {
				effects.consume(code$2);
				return;
			}
			effects.enter("lineEndingBlank");
			effects.consume(code$2);
			effects.exit("lineEndingBlank");
			self.currentConstruct = void 0;
			return initial;
		}
		function afterConstruct(code$2) {
			if (code$2 === null) {
				effects.consume(code$2);
				return;
			}
			effects.enter("lineEnding");
			effects.consume(code$2);
			effects.exit("lineEnding");
			self.currentConstruct = void 0;
			return initial;
		}
	}
	exports.tokenize = tokenize;
}));
var require_text = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var assign$2 = require_assign();
	var shallow$5 = require_shallow();
	var text$4 = initializeFactory("text");
	var string$1 = initializeFactory("string");
	var resolver = { resolveAll: createResolver() };
	function initializeFactory(field) {
		return {
			tokenize: initializeText,
			resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0)
		};
		function initializeText(effects) {
			var self = this;
			var constructs$2 = this.parser.constructs[field];
			var text$5 = effects.attempt(constructs$2, start, notText);
			return start;
			function start(code$2) {
				return atBreak(code$2) ? text$5(code$2) : notText(code$2);
			}
			function notText(code$2) {
				if (code$2 === null) {
					effects.consume(code$2);
					return;
				}
				effects.enter("data");
				effects.consume(code$2);
				return data;
			}
			function data(code$2) {
				if (atBreak(code$2)) {
					effects.exit("data");
					return text$5(code$2);
				}
				effects.consume(code$2);
				return data;
			}
			function atBreak(code$2) {
				var list$2 = constructs$2[code$2];
				var index$1 = -1;
				if (code$2 === null) return true;
				if (list$2) {
					while (++index$1 < list$2.length) if (!list$2[index$1].previous || list$2[index$1].previous.call(self, self.previous)) return true;
				}
			}
		}
	}
	function createResolver(extraResolver) {
		return resolveAllText;
		function resolveAllText(events, context) {
			var index$1 = -1;
			var enter;
			while (++index$1 <= events.length) if (enter === void 0) {
				if (events[index$1] && events[index$1][1].type === "data") {
					enter = index$1;
					index$1++;
				}
			} else if (!events[index$1] || events[index$1][1].type !== "data") {
				if (index$1 !== enter + 2) {
					events[enter][1].end = events[index$1 - 1][1].end;
					events.splice(enter + 2, index$1 - enter - 2);
					index$1 = enter + 2;
				}
				enter = void 0;
			}
			return extraResolver ? extraResolver(events, context) : events;
		}
	}
	function resolveAllLineSuffixes(events, context) {
		var eventIndex = -1;
		var chunks;
		var data;
		var chunk;
		var index$1;
		var bufferIndex;
		var size;
		var tabs;
		var token;
		while (++eventIndex <= events.length) if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
			data = events[eventIndex - 1][1];
			chunks = context.sliceStream(data);
			index$1 = chunks.length;
			bufferIndex = -1;
			size = 0;
			tabs = void 0;
			while (index$1--) {
				chunk = chunks[index$1];
				if (typeof chunk === "string") {
					bufferIndex = chunk.length;
					while (chunk.charCodeAt(bufferIndex - 1) === 32) {
						size++;
						bufferIndex--;
					}
					if (bufferIndex) break;
					bufferIndex = -1;
				} else if (chunk === -2) {
					tabs = true;
					size++;
				} else if (chunk === -1);
				else {
					index$1++;
					break;
				}
			}
			if (size) {
				token = {
					type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
					start: {
						line: data.end.line,
						column: data.end.column - size,
						offset: data.end.offset - size,
						_index: data.start._index + index$1,
						_bufferIndex: index$1 ? bufferIndex : data.start._bufferIndex + bufferIndex
					},
					end: shallow$5(data.end)
				};
				data.end = shallow$5(token.start);
				if (data.start.offset === data.end.offset) assign$2(data, token);
				else {
					events.splice(eventIndex, 0, [
						"enter",
						token,
						context
					], [
						"exit",
						token,
						context
					]);
					eventIndex += 2;
				}
			}
			eventIndex++;
		}
		return events;
	}
	exports.resolver = resolver;
	exports.string = string$1;
	exports.text = text$4;
}));
var require_miniflat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function miniflat$3(value) {
		return value === null || value === void 0 ? [] : "length" in value ? value : [value];
	}
	module.exports = miniflat$3;
}));
var require_combine_extensions = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasOwnProperty = require_has_own_property();
	var chunkedSplice$7 = require_chunked_splice();
	var miniflat$2 = require_miniflat();
	function combineExtensions$1(extensions) {
		var all$1 = {};
		var index$1 = -1;
		while (++index$1 < extensions.length) extension$2(all$1, extensions[index$1]);
		return all$1;
	}
	function extension$2(all$1, extension$3) {
		var hook;
		var left;
		var right;
		var code$2;
		for (hook in extension$3) {
			left = hasOwnProperty.call(all$1, hook) ? all$1[hook] : all$1[hook] = {};
			right = extension$3[hook];
			for (code$2 in right) left[code$2] = constructs$1(miniflat$2(right[code$2]), hasOwnProperty.call(left, code$2) ? left[code$2] : []);
		}
	}
	function constructs$1(list$2, existing) {
		var index$1 = -1;
		var before = [];
		while (++index$1 < list$2.length) (list$2[index$1].add === "after" ? existing : before).push(list$2[index$1]);
		chunkedSplice$7(existing, 0, 0, before);
		return existing;
	}
	module.exports = combineExtensions$1;
}));
var require_chunked_push = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var chunkedSplice$6 = require_chunked_splice();
	function chunkedPush$3(list$2, items) {
		if (list$2.length) {
			chunkedSplice$6(list$2, list$2.length, 0, items);
			return list$2;
		}
		return items;
	}
	module.exports = chunkedPush$3;
}));
var require_resolve_all = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function resolveAll$4(constructs$2, events, context) {
		var called = [];
		var index$1 = -1;
		var resolve;
		while (++index$1 < constructs$2.length) {
			resolve = constructs$2[index$1].resolveAll;
			if (resolve && called.indexOf(resolve) < 0) {
				events = resolve(events, context);
				called.push(resolve);
			}
		}
		return events;
	}
	module.exports = resolveAll$4;
}));
var require_serialize_chunks = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fromCharCode$2 = require_from_char_code();
	function serializeChunks$1(chunks) {
		var index$1 = -1;
		var result = [];
		var chunk;
		var value;
		var atTab;
		while (++index$1 < chunks.length) {
			chunk = chunks[index$1];
			if (typeof chunk === "string") value = chunk;
			else if (chunk === -5) value = "\r";
			else if (chunk === -4) value = "\n";
			else if (chunk === -3) value = "\r\n";
			else if (chunk === -2) value = "	";
			else if (chunk === -1) {
				if (atTab) continue;
				value = " ";
			} else value = fromCharCode$2(chunk);
			atTab = chunk === -2;
			result.push(value);
		}
		return result.join("");
	}
	module.exports = serializeChunks$1;
}));
var require_slice_chunks = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function sliceChunks$1(chunks, token) {
		var startIndex = token.start._index;
		var startBufferIndex = token.start._bufferIndex;
		var endIndex = token.end._index;
		var endBufferIndex = token.end._bufferIndex;
		var view;
		if (startIndex === endIndex) view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
		else {
			view = chunks.slice(startIndex, endIndex);
			if (startBufferIndex > -1) view[0] = view[0].slice(startBufferIndex);
			if (endBufferIndex > 0) view.push(chunks[endIndex].slice(0, endBufferIndex));
		}
		return view;
	}
	module.exports = sliceChunks$1;
}));
var require_create_tokenizer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assign$1 = require_assign();
	var markdownLineEnding$15 = require_markdown_line_ending();
	var chunkedPush$2 = require_chunked_push();
	var chunkedSplice$5 = require_chunked_splice();
	var miniflat$1 = require_miniflat();
	var resolveAll$3 = require_resolve_all();
	var serializeChunks = require_serialize_chunks();
	var shallow$4 = require_shallow();
	var sliceChunks = require_slice_chunks();
	function createTokenizer$1(parser$1, initialize, from) {
		var point$1 = from ? shallow$4(from) : {
			line: 1,
			column: 1,
			offset: 0
		};
		var columnStart = {};
		var resolveAllConstructs = [];
		var chunks = [];
		var stack = [];
		var effects = {
			consume,
			enter,
			exit: exit$2,
			attempt: constructFactory(onsuccessfulconstruct),
			check: constructFactory(onsuccessfulcheck),
			interrupt: constructFactory(onsuccessfulcheck, { interrupt: true }),
			lazy: constructFactory(onsuccessfulcheck, { lazy: true })
		};
		var context = {
			previous: null,
			events: [],
			parser: parser$1,
			sliceStream,
			sliceSerialize,
			now,
			defineSkip: skip,
			write
		};
		var state = initialize.tokenize.call(context, effects);
		if (initialize.resolveAll) resolveAllConstructs.push(initialize);
		point$1._index = 0;
		point$1._bufferIndex = -1;
		return context;
		function write(slice$3) {
			chunks = chunkedPush$2(chunks, slice$3);
			main();
			if (chunks[chunks.length - 1] !== null) return [];
			addResult(initialize, 0);
			context.events = resolveAll$3(resolveAllConstructs, context.events, context);
			return context.events;
		}
		function sliceSerialize(token) {
			return serializeChunks(sliceStream(token));
		}
		function sliceStream(token) {
			return sliceChunks(chunks, token);
		}
		function now() {
			return shallow$4(point$1);
		}
		function skip(value) {
			columnStart[value.line] = value.column;
			accountForPotentialSkip();
		}
		function main() {
			var chunkIndex;
			var chunk;
			while (point$1._index < chunks.length) {
				chunk = chunks[point$1._index];
				if (typeof chunk === "string") {
					chunkIndex = point$1._index;
					if (point$1._bufferIndex < 0) point$1._bufferIndex = 0;
					while (point$1._index === chunkIndex && point$1._bufferIndex < chunk.length) go(chunk.charCodeAt(point$1._bufferIndex));
				} else go(chunk);
			}
		}
		function go(code$2) {
			state = state(code$2);
		}
		function consume(code$2) {
			if (markdownLineEnding$15(code$2)) {
				point$1.line++;
				point$1.column = 1;
				point$1.offset += code$2 === -3 ? 2 : 1;
				accountForPotentialSkip();
			} else if (code$2 !== -1) {
				point$1.column++;
				point$1.offset++;
			}
			if (point$1._bufferIndex < 0) point$1._index++;
			else {
				point$1._bufferIndex++;
				if (point$1._bufferIndex === chunks[point$1._index].length) {
					point$1._bufferIndex = -1;
					point$1._index++;
				}
			}
			context.previous = code$2;
		}
		function enter(type, fields) {
			var token = fields || {};
			token.type = type;
			token.start = now();
			context.events.push([
				"enter",
				token,
				context
			]);
			stack.push(token);
			return token;
		}
		function exit$2(type) {
			var token = stack.pop();
			token.end = now();
			context.events.push([
				"exit",
				token,
				context
			]);
			return token;
		}
		function onsuccessfulconstruct(construct, info$1) {
			addResult(construct, info$1.from);
		}
		function onsuccessfulcheck(construct, info$1) {
			info$1.restore();
		}
		function constructFactory(onreturn, fields) {
			return hook;
			function hook(constructs$2, returnState, bogusState) {
				var listOfConstructs;
				var constructIndex;
				var currentConstruct;
				var info$1;
				return constructs$2.tokenize || "length" in constructs$2 ? handleListOfConstructs(miniflat$1(constructs$2)) : handleMapOfConstructs;
				function handleMapOfConstructs(code$2) {
					if (code$2 in constructs$2 || null in constructs$2) return handleListOfConstructs(constructs$2.null ? miniflat$1(constructs$2[code$2]).concat(miniflat$1(constructs$2.null)) : constructs$2[code$2])(code$2);
					return bogusState(code$2);
				}
				function handleListOfConstructs(list$2) {
					listOfConstructs = list$2;
					constructIndex = 0;
					return handleConstruct(list$2[constructIndex]);
				}
				function handleConstruct(construct) {
					return start;
					function start(code$2) {
						info$1 = store();
						currentConstruct = construct;
						if (!construct.partial) context.currentConstruct = construct;
						if (construct.name && context.parser.constructs.disable.null.indexOf(construct.name) > -1) return nok();
						return construct.tokenize.call(fields ? assign$1({}, context, fields) : context, effects, ok$1, nok)(code$2);
					}
				}
				function ok$1(code$2) {
					onreturn(currentConstruct, info$1);
					return returnState;
				}
				function nok(code$2) {
					info$1.restore();
					if (++constructIndex < listOfConstructs.length) return handleConstruct(listOfConstructs[constructIndex]);
					return bogusState;
				}
			}
		}
		function addResult(construct, from$1) {
			if (construct.resolveAll && resolveAllConstructs.indexOf(construct) < 0) resolveAllConstructs.push(construct);
			if (construct.resolve) chunkedSplice$5(context.events, from$1, context.events.length - from$1, construct.resolve(context.events.slice(from$1), context));
			if (construct.resolveTo) context.events = construct.resolveTo(context.events, context);
		}
		function store() {
			var startPoint = now();
			var startPrevious = context.previous;
			var startCurrentConstruct = context.currentConstruct;
			var startEventsIndex = context.events.length;
			var startStack = Array.from(stack);
			return {
				restore,
				from: startEventsIndex
			};
			function restore() {
				point$1 = startPoint;
				context.previous = startPrevious;
				context.currentConstruct = startCurrentConstruct;
				context.events.length = startEventsIndex;
				stack = startStack;
				accountForPotentialSkip();
			}
		}
		function accountForPotentialSkip() {
			if (point$1.line in columnStart && point$1.column < 2) {
				point$1.column = columnStart[point$1.line];
				point$1.offset += columnStart[point$1.line] - 1;
			}
		}
	}
	module.exports = createTokenizer$1;
}));
var require_markdown_line_ending_or_space = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function markdownLineEndingOrSpace$9(code$2) {
		return code$2 < 0 || code$2 === 32;
	}
	module.exports = markdownLineEndingOrSpace$9;
}));
var require_unicode_punctuation_regex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
}));
var require_regex_check = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fromCharCode$1 = require_from_char_code();
	function regexCheck(regex) {
		return check;
		function check(code$2) {
			return regex.test(fromCharCode$1(code$2));
		}
	}
	module.exports = regexCheck;
}));
var require_unicode_punctuation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var unicodePunctuationRegex = require_unicode_punctuation_regex();
	module.exports = require_regex_check()(unicodePunctuationRegex);
}));
var require_unicode_whitespace = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_regex_check()(/\s/);
}));
var require_classify_character = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEndingOrSpace$8 = require_markdown_line_ending_or_space();
	var unicodePunctuation$2 = require_unicode_punctuation();
	var unicodeWhitespace$2 = require_unicode_whitespace();
	function classifyCharacter$2(code$2) {
		if (code$2 === null || markdownLineEndingOrSpace$8(code$2) || unicodeWhitespace$2(code$2)) return 1;
		if (unicodePunctuation$2(code$2)) return 2;
	}
	module.exports = classifyCharacter$2;
}));
var require_move_point = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function movePoint$1(point$1, offset) {
		point$1.column += offset;
		point$1.offset += offset;
		point$1._bufferIndex += offset;
		return point$1;
	}
	module.exports = movePoint$1;
}));
var require_attention = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var chunkedPush$1 = require_chunked_push();
	var chunkedSplice$4 = require_chunked_splice();
	var classifyCharacter$1 = require_classify_character();
	var movePoint = require_move_point();
	var resolveAll$2 = require_resolve_all();
	var shallow$3 = require_shallow();
	var attention$1 = {
		name: "attention",
		tokenize: tokenizeAttention,
		resolveAll: resolveAllAttention
	};
	function resolveAllAttention(events, context) {
		var index$1 = -1;
		var open;
		var group;
		var text$5;
		var openingSequence;
		var closingSequence;
		var use;
		var nextEvents;
		var offset;
		while (++index$1 < events.length) if (events[index$1][0] === "enter" && events[index$1][1].type === "attentionSequence" && events[index$1][1]._close) {
			open = index$1;
			while (open--) if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index$1][1]).charCodeAt(0)) {
				if ((events[open][1]._close || events[index$1][1]._open) && (events[index$1][1].end.offset - events[index$1][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index$1][1].end.offset - events[index$1][1].start.offset) % 3)) continue;
				use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index$1][1].end.offset - events[index$1][1].start.offset > 1 ? 2 : 1;
				openingSequence = {
					type: use > 1 ? "strongSequence" : "emphasisSequence",
					start: movePoint(shallow$3(events[open][1].end), -use),
					end: shallow$3(events[open][1].end)
				};
				closingSequence = {
					type: use > 1 ? "strongSequence" : "emphasisSequence",
					start: shallow$3(events[index$1][1].start),
					end: movePoint(shallow$3(events[index$1][1].start), use)
				};
				text$5 = {
					type: use > 1 ? "strongText" : "emphasisText",
					start: shallow$3(events[open][1].end),
					end: shallow$3(events[index$1][1].start)
				};
				group = {
					type: use > 1 ? "strong" : "emphasis",
					start: shallow$3(openingSequence.start),
					end: shallow$3(closingSequence.end)
				};
				events[open][1].end = shallow$3(openingSequence.start);
				events[index$1][1].start = shallow$3(closingSequence.end);
				nextEvents = [];
				if (events[open][1].end.offset - events[open][1].start.offset) nextEvents = chunkedPush$1(nextEvents, [[
					"enter",
					events[open][1],
					context
				], [
					"exit",
					events[open][1],
					context
				]]);
				nextEvents = chunkedPush$1(nextEvents, [
					[
						"enter",
						group,
						context
					],
					[
						"enter",
						openingSequence,
						context
					],
					[
						"exit",
						openingSequence,
						context
					],
					[
						"enter",
						text$5,
						context
					]
				]);
				nextEvents = chunkedPush$1(nextEvents, resolveAll$2(context.parser.constructs.insideSpan.null, events.slice(open + 1, index$1), context));
				nextEvents = chunkedPush$1(nextEvents, [
					[
						"exit",
						text$5,
						context
					],
					[
						"enter",
						closingSequence,
						context
					],
					[
						"exit",
						closingSequence,
						context
					],
					[
						"exit",
						group,
						context
					]
				]);
				if (events[index$1][1].end.offset - events[index$1][1].start.offset) {
					offset = 2;
					nextEvents = chunkedPush$1(nextEvents, [[
						"enter",
						events[index$1][1],
						context
					], [
						"exit",
						events[index$1][1],
						context
					]]);
				} else offset = 0;
				chunkedSplice$4(events, open - 1, index$1 - open + 3, nextEvents);
				index$1 = open + nextEvents.length - offset - 2;
				break;
			}
		}
		index$1 = -1;
		while (++index$1 < events.length) if (events[index$1][1].type === "attentionSequence") events[index$1][1].type = "data";
		return events;
	}
	function tokenizeAttention(effects, ok$1) {
		var before = classifyCharacter$1(this.previous);
		var marker;
		return start;
		function start(code$2) {
			effects.enter("attentionSequence");
			marker = code$2;
			return sequence(code$2);
		}
		function sequence(code$2) {
			var token;
			var after;
			var open;
			var close;
			if (code$2 === marker) {
				effects.consume(code$2);
				return sequence;
			}
			token = effects.exit("attentionSequence");
			after = classifyCharacter$1(code$2);
			open = !after || after === 2 && before;
			close = !before || before === 2 && after;
			token._open = marker === 42 ? open : open && (before || !close);
			token._close = marker === 42 ? close : close && (after || !open);
			return ok$1(code$2);
		}
	}
	module.exports = attention$1;
}));
var require_ascii_alpha = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_regex_check()(/[A-Za-z]/);
}));
var require_ascii_alphanumeric = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_regex_check()(/[\dA-Za-z]/);
}));
var require_ascii_atext = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_regex_check()(/[#-'*+\--9=?A-Z^-~]/);
}));
var require_ascii_control = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function asciiControl$3(code$2) {
		return code$2 < 32 || code$2 === 127;
	}
	module.exports = asciiControl$3;
}));
var require_autolink = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var asciiAlpha$3 = require_ascii_alpha();
	var asciiAlphanumeric$4 = require_ascii_alphanumeric();
	var asciiAtext = require_ascii_atext();
	var asciiControl$2 = require_ascii_control();
	var autolink$2 = {
		name: "autolink",
		tokenize: tokenizeAutolink
	};
	function tokenizeAutolink(effects, ok$1, nok) {
		var size = 1;
		return start;
		function start(code$2) {
			effects.enter("autolink");
			effects.enter("autolinkMarker");
			effects.consume(code$2);
			effects.exit("autolinkMarker");
			effects.enter("autolinkProtocol");
			return open;
		}
		function open(code$2) {
			if (asciiAlpha$3(code$2)) {
				effects.consume(code$2);
				return schemeOrEmailAtext;
			}
			return asciiAtext(code$2) ? emailAtext(code$2) : nok(code$2);
		}
		function schemeOrEmailAtext(code$2) {
			return code$2 === 43 || code$2 === 45 || code$2 === 46 || asciiAlphanumeric$4(code$2) ? schemeInsideOrEmailAtext(code$2) : emailAtext(code$2);
		}
		function schemeInsideOrEmailAtext(code$2) {
			if (code$2 === 58) {
				effects.consume(code$2);
				return urlInside;
			}
			if ((code$2 === 43 || code$2 === 45 || code$2 === 46 || asciiAlphanumeric$4(code$2)) && size++ < 32) {
				effects.consume(code$2);
				return schemeInsideOrEmailAtext;
			}
			return emailAtext(code$2);
		}
		function urlInside(code$2) {
			if (code$2 === 62) {
				effects.exit("autolinkProtocol");
				return end(code$2);
			}
			if (code$2 === 32 || code$2 === 60 || asciiControl$2(code$2)) return nok(code$2);
			effects.consume(code$2);
			return urlInside;
		}
		function emailAtext(code$2) {
			if (code$2 === 64) {
				effects.consume(code$2);
				size = 0;
				return emailAtSignOrDot;
			}
			if (asciiAtext(code$2)) {
				effects.consume(code$2);
				return emailAtext;
			}
			return nok(code$2);
		}
		function emailAtSignOrDot(code$2) {
			return asciiAlphanumeric$4(code$2) ? emailLabel(code$2) : nok(code$2);
		}
		function emailLabel(code$2) {
			if (code$2 === 46) {
				effects.consume(code$2);
				size = 0;
				return emailAtSignOrDot;
			}
			if (code$2 === 62) {
				effects.exit("autolinkProtocol").type = "autolinkEmail";
				return end(code$2);
			}
			return emailValue(code$2);
		}
		function emailValue(code$2) {
			if ((code$2 === 45 || asciiAlphanumeric$4(code$2)) && size++ < 63) {
				effects.consume(code$2);
				return code$2 === 45 ? emailValue : emailLabel;
			}
			return nok(code$2);
		}
		function end(code$2) {
			effects.enter("autolinkMarker");
			effects.consume(code$2);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok$1;
		}
	}
	module.exports = autolink$2;
}));
var require_block_quote = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownSpace$7 = require_markdown_space();
	var factorySpace$11 = require_factory_space();
	var blockQuote$1 = {
		name: "blockQuote",
		tokenize: tokenizeBlockQuoteStart,
		continuation: { tokenize: tokenizeBlockQuoteContinuation },
		exit: exit$1
	};
	function tokenizeBlockQuoteStart(effects, ok$1, nok) {
		var self = this;
		return start;
		function start(code$2) {
			if (code$2 === 62) {
				if (!self.containerState.open) {
					effects.enter("blockQuote", { _container: true });
					self.containerState.open = true;
				}
				effects.enter("blockQuotePrefix");
				effects.enter("blockQuoteMarker");
				effects.consume(code$2);
				effects.exit("blockQuoteMarker");
				return after;
			}
			return nok(code$2);
		}
		function after(code$2) {
			if (markdownSpace$7(code$2)) {
				effects.enter("blockQuotePrefixWhitespace");
				effects.consume(code$2);
				effects.exit("blockQuotePrefixWhitespace");
				effects.exit("blockQuotePrefix");
				return ok$1;
			}
			effects.exit("blockQuotePrefix");
			return ok$1(code$2);
		}
	}
	function tokenizeBlockQuoteContinuation(effects, ok$1, nok) {
		return factorySpace$11(effects, effects.attempt(blockQuote$1, ok$1, nok), "linePrefix", this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
	}
	function exit$1(effects) {
		effects.exit("blockQuote");
	}
	module.exports = blockQuote$1;
}));
var require_ascii_punctuation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_regex_check()(/[!-/:-@[-`{-~]/);
}));
var require_character_escape = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var asciiPunctuation = require_ascii_punctuation();
	var characterEscape$1 = {
		name: "characterEscape",
		tokenize: tokenizeCharacterEscape
	};
	function tokenizeCharacterEscape(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			effects.enter("characterEscape");
			effects.enter("escapeMarker");
			effects.consume(code$2);
			effects.exit("escapeMarker");
			return open;
		}
		function open(code$2) {
			if (asciiPunctuation(code$2)) {
				effects.enter("characterEscapeValue");
				effects.consume(code$2);
				effects.exit("characterEscapeValue");
				effects.exit("characterEscape");
				return ok$1;
			}
			return nok(code$2);
		}
	}
	module.exports = characterEscape$1;
}));
var require_decode_entity_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var el;
	var semicolon = 59;
	module.exports = decodeEntity$1;
	function decodeEntity$1(characters) {
		var entity = "&" + characters + ";";
		var char;
		el = el || document.createElement("i");
		el.innerHTML = entity;
		char = el.textContent;
		if (char.charCodeAt(char.length - 1) === semicolon && characters !== "semi") return false;
		return char === entity ? false : char;
	}
}));
var require_ascii_digit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_regex_check()(/\d/);
}));
var require_ascii_hex_digit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_regex_check()(/[\dA-Fa-f]/);
}));
var require_character_reference = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var decodeEntity = require_decode_entity_browser();
	var asciiAlphanumeric$3 = require_ascii_alphanumeric();
	var asciiDigit$1 = require_ascii_digit();
	var asciiHexDigit = require_ascii_hex_digit();
	function _interopDefaultLegacy(e) {
		return e && typeof e === "object" && "default" in e ? e : { default: e };
	}
	var decodeEntity__default = /* @__PURE__ */ _interopDefaultLegacy(decodeEntity);
	var characterReference$1 = {
		name: "characterReference",
		tokenize: tokenizeCharacterReference
	};
	function tokenizeCharacterReference(effects, ok$1, nok) {
		var self = this;
		var size = 0;
		var max;
		var test;
		return start;
		function start(code$2) {
			effects.enter("characterReference");
			effects.enter("characterReferenceMarker");
			effects.consume(code$2);
			effects.exit("characterReferenceMarker");
			return open;
		}
		function open(code$2) {
			if (code$2 === 35) {
				effects.enter("characterReferenceMarkerNumeric");
				effects.consume(code$2);
				effects.exit("characterReferenceMarkerNumeric");
				return numeric;
			}
			effects.enter("characterReferenceValue");
			max = 31;
			test = asciiAlphanumeric$3;
			return value(code$2);
		}
		function numeric(code$2) {
			if (code$2 === 88 || code$2 === 120) {
				effects.enter("characterReferenceMarkerHexadecimal");
				effects.consume(code$2);
				effects.exit("characterReferenceMarkerHexadecimal");
				effects.enter("characterReferenceValue");
				max = 6;
				test = asciiHexDigit;
				return value;
			}
			effects.enter("characterReferenceValue");
			max = 7;
			test = asciiDigit$1;
			return value(code$2);
		}
		function value(code$2) {
			var token;
			if (code$2 === 59 && size) {
				token = effects.exit("characterReferenceValue");
				if (test === asciiAlphanumeric$3 && !decodeEntity__default["default"](self.sliceSerialize(token))) return nok(code$2);
				effects.enter("characterReferenceMarker");
				effects.consume(code$2);
				effects.exit("characterReferenceMarker");
				effects.exit("characterReference");
				return ok$1;
			}
			if (test(code$2) && size++ < max) {
				effects.consume(code$2);
				return value;
			}
			return nok(code$2);
		}
	}
	module.exports = characterReference$1;
}));
var require_code_fenced = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$14 = require_markdown_line_ending();
	var markdownLineEndingOrSpace$7 = require_markdown_line_ending_or_space();
	var prefixSize$4 = require_prefix_size();
	var factorySpace$10 = require_factory_space();
	var codeFenced$1 = {
		name: "codeFenced",
		tokenize: tokenizeCodeFenced,
		concrete: true
	};
	function tokenizeCodeFenced(effects, ok$1, nok) {
		var self = this;
		var closingFenceConstruct = {
			tokenize: tokenizeClosingFence,
			partial: true
		};
		var initialPrefix = prefixSize$4(this.events, "linePrefix");
		var sizeOpen = 0;
		var marker;
		return start;
		function start(code$2) {
			effects.enter("codeFenced");
			effects.enter("codeFencedFence");
			effects.enter("codeFencedFenceSequence");
			marker = code$2;
			return sequenceOpen(code$2);
		}
		function sequenceOpen(code$2) {
			if (code$2 === marker) {
				effects.consume(code$2);
				sizeOpen++;
				return sequenceOpen;
			}
			effects.exit("codeFencedFenceSequence");
			return sizeOpen < 3 ? nok(code$2) : factorySpace$10(effects, infoOpen, "whitespace")(code$2);
		}
		function infoOpen(code$2) {
			if (code$2 === null || markdownLineEnding$14(code$2)) return openAfter(code$2);
			effects.enter("codeFencedFenceInfo");
			effects.enter("chunkString", { contentType: "string" });
			return info$1(code$2);
		}
		function info$1(code$2) {
			if (code$2 === null || markdownLineEndingOrSpace$7(code$2)) {
				effects.exit("chunkString");
				effects.exit("codeFencedFenceInfo");
				return factorySpace$10(effects, infoAfter, "whitespace")(code$2);
			}
			if (code$2 === 96 && code$2 === marker) return nok(code$2);
			effects.consume(code$2);
			return info$1;
		}
		function infoAfter(code$2) {
			if (code$2 === null || markdownLineEnding$14(code$2)) return openAfter(code$2);
			effects.enter("codeFencedFenceMeta");
			effects.enter("chunkString", { contentType: "string" });
			return meta(code$2);
		}
		function meta(code$2) {
			if (code$2 === null || markdownLineEnding$14(code$2)) {
				effects.exit("chunkString");
				effects.exit("codeFencedFenceMeta");
				return openAfter(code$2);
			}
			if (code$2 === 96 && code$2 === marker) return nok(code$2);
			effects.consume(code$2);
			return meta;
		}
		function openAfter(code$2) {
			effects.exit("codeFencedFence");
			return self.interrupt ? ok$1(code$2) : content$3(code$2);
		}
		function content$3(code$2) {
			if (code$2 === null) return after(code$2);
			if (markdownLineEnding$14(code$2)) {
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				return effects.attempt(closingFenceConstruct, after, initialPrefix ? factorySpace$10(effects, content$3, "linePrefix", initialPrefix + 1) : content$3);
			}
			effects.enter("codeFlowValue");
			return contentContinue(code$2);
		}
		function contentContinue(code$2) {
			if (code$2 === null || markdownLineEnding$14(code$2)) {
				effects.exit("codeFlowValue");
				return content$3(code$2);
			}
			effects.consume(code$2);
			return contentContinue;
		}
		function after(code$2) {
			effects.exit("codeFenced");
			return ok$1(code$2);
		}
		function tokenizeClosingFence(effects$1, ok$2, nok$1) {
			var size = 0;
			return factorySpace$10(effects$1, closingSequenceStart, "linePrefix", this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
			function closingSequenceStart(code$2) {
				effects$1.enter("codeFencedFence");
				effects$1.enter("codeFencedFenceSequence");
				return closingSequence(code$2);
			}
			function closingSequence(code$2) {
				if (code$2 === marker) {
					effects$1.consume(code$2);
					size++;
					return closingSequence;
				}
				if (size < sizeOpen) return nok$1(code$2);
				effects$1.exit("codeFencedFenceSequence");
				return factorySpace$10(effects$1, closingSequenceEnd, "whitespace")(code$2);
			}
			function closingSequenceEnd(code$2) {
				if (code$2 === null || markdownLineEnding$14(code$2)) {
					effects$1.exit("codeFencedFence");
					return ok$2(code$2);
				}
				return nok$1(code$2);
			}
		}
	}
	module.exports = codeFenced$1;
}));
var require_code_indented = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$13 = require_markdown_line_ending();
	var chunkedSplice$3 = require_chunked_splice();
	var prefixSize$3 = require_prefix_size();
	var factorySpace$9 = require_factory_space();
	var codeIndented$1 = {
		name: "codeIndented",
		tokenize: tokenizeCodeIndented,
		resolve: resolveCodeIndented
	};
	var indentedContentConstruct = {
		tokenize: tokenizeIndentedContent,
		partial: true
	};
	function resolveCodeIndented(events, context) {
		var code$2 = {
			type: "codeIndented",
			start: events[0][1].start,
			end: events[events.length - 1][1].end
		};
		chunkedSplice$3(events, 0, 0, [[
			"enter",
			code$2,
			context
		]]);
		chunkedSplice$3(events, events.length, 0, [[
			"exit",
			code$2,
			context
		]]);
		return events;
	}
	function tokenizeCodeIndented(effects, ok$1, nok) {
		return effects.attempt(indentedContentConstruct, afterPrefix, nok);
		function afterPrefix(code$2) {
			if (code$2 === null) return ok$1(code$2);
			if (markdownLineEnding$13(code$2)) return effects.attempt(indentedContentConstruct, afterPrefix, ok$1)(code$2);
			effects.enter("codeFlowValue");
			return content$3(code$2);
		}
		function content$3(code$2) {
			if (code$2 === null || markdownLineEnding$13(code$2)) {
				effects.exit("codeFlowValue");
				return afterPrefix(code$2);
			}
			effects.consume(code$2);
			return content$3;
		}
	}
	function tokenizeIndentedContent(effects, ok$1, nok) {
		var self = this;
		return factorySpace$9(effects, afterPrefix, "linePrefix", 5);
		function afterPrefix(code$2) {
			if (markdownLineEnding$13(code$2)) {
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				return factorySpace$9(effects, afterPrefix, "linePrefix", 5);
			}
			return prefixSize$3(self.events, "linePrefix") < 4 ? nok(code$2) : ok$1(code$2);
		}
	}
	module.exports = codeIndented$1;
}));
var require_code_text = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$12 = require_markdown_line_ending();
	var codeText$1 = {
		name: "codeText",
		tokenize: tokenizeCodeText,
		resolve: resolveCodeText,
		previous: previous$3
	};
	function resolveCodeText(events) {
		var tailExitIndex = events.length - 4;
		var headEnterIndex = 3;
		var index$1;
		var enter;
		if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
			index$1 = headEnterIndex;
			while (++index$1 < tailExitIndex) if (events[index$1][1].type === "codeTextData") {
				events[tailExitIndex][1].type = events[headEnterIndex][1].type = "codeTextPadding";
				headEnterIndex += 2;
				tailExitIndex -= 2;
				break;
			}
		}
		index$1 = headEnterIndex - 1;
		tailExitIndex++;
		while (++index$1 <= tailExitIndex) if (enter === void 0) {
			if (index$1 !== tailExitIndex && events[index$1][1].type !== "lineEnding") enter = index$1;
		} else if (index$1 === tailExitIndex || events[index$1][1].type === "lineEnding") {
			events[enter][1].type = "codeTextData";
			if (index$1 !== enter + 2) {
				events[enter][1].end = events[index$1 - 1][1].end;
				events.splice(enter + 2, index$1 - enter - 2);
				tailExitIndex -= index$1 - enter - 2;
				index$1 = enter + 2;
			}
			enter = void 0;
		}
		return events;
	}
	function previous$3(code$2) {
		return code$2 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
	}
	function tokenizeCodeText(effects, ok$1, nok) {
		var sizeOpen = 0;
		var size;
		var token;
		return start;
		function start(code$2) {
			effects.enter("codeText");
			effects.enter("codeTextSequence");
			return openingSequence(code$2);
		}
		function openingSequence(code$2) {
			if (code$2 === 96) {
				effects.consume(code$2);
				sizeOpen++;
				return openingSequence;
			}
			effects.exit("codeTextSequence");
			return gap(code$2);
		}
		function gap(code$2) {
			if (code$2 === null) return nok(code$2);
			if (code$2 === 96) {
				token = effects.enter("codeTextSequence");
				size = 0;
				return closingSequence(code$2);
			}
			if (code$2 === 32) {
				effects.enter("space");
				effects.consume(code$2);
				effects.exit("space");
				return gap;
			}
			if (markdownLineEnding$12(code$2)) {
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				return gap;
			}
			effects.enter("codeTextData");
			return data(code$2);
		}
		function data(code$2) {
			if (code$2 === null || code$2 === 32 || code$2 === 96 || markdownLineEnding$12(code$2)) {
				effects.exit("codeTextData");
				return gap(code$2);
			}
			effects.consume(code$2);
			return data;
		}
		function closingSequence(code$2) {
			if (code$2 === 96) {
				effects.consume(code$2);
				size++;
				return closingSequence;
			}
			if (size === sizeOpen) {
				effects.exit("codeTextSequence");
				effects.exit("codeText");
				return ok$1(code$2);
			}
			token.type = "codeTextData";
			return data(code$2);
		}
	}
	module.exports = codeText$1;
}));
var require_factory_destination = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var asciiControl$1 = require_ascii_control();
	var markdownLineEndingOrSpace$6 = require_markdown_line_ending_or_space();
	var markdownLineEnding$11 = require_markdown_line_ending();
	function destinationFactory(effects, ok$1, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
		var limit = max || Infinity;
		var balance = 0;
		return start;
		function start(code$2) {
			if (code$2 === 60) {
				effects.enter(type);
				effects.enter(literalType);
				effects.enter(literalMarkerType);
				effects.consume(code$2);
				effects.exit(literalMarkerType);
				return destinationEnclosedBefore;
			}
			if (asciiControl$1(code$2) || code$2 === 41) return nok(code$2);
			effects.enter(type);
			effects.enter(rawType);
			effects.enter(stringType);
			effects.enter("chunkString", { contentType: "string" });
			return destinationRaw(code$2);
		}
		function destinationEnclosedBefore(code$2) {
			if (code$2 === 62) {
				effects.enter(literalMarkerType);
				effects.consume(code$2);
				effects.exit(literalMarkerType);
				effects.exit(literalType);
				effects.exit(type);
				return ok$1;
			}
			effects.enter(stringType);
			effects.enter("chunkString", { contentType: "string" });
			return destinationEnclosed(code$2);
		}
		function destinationEnclosed(code$2) {
			if (code$2 === 62) {
				effects.exit("chunkString");
				effects.exit(stringType);
				return destinationEnclosedBefore(code$2);
			}
			if (code$2 === null || code$2 === 60 || markdownLineEnding$11(code$2)) return nok(code$2);
			effects.consume(code$2);
			return code$2 === 92 ? destinationEnclosedEscape : destinationEnclosed;
		}
		function destinationEnclosedEscape(code$2) {
			if (code$2 === 60 || code$2 === 62 || code$2 === 92) {
				effects.consume(code$2);
				return destinationEnclosed;
			}
			return destinationEnclosed(code$2);
		}
		function destinationRaw(code$2) {
			if (code$2 === 40) {
				if (++balance > limit) return nok(code$2);
				effects.consume(code$2);
				return destinationRaw;
			}
			if (code$2 === 41) {
				if (!balance--) {
					effects.exit("chunkString");
					effects.exit(stringType);
					effects.exit(rawType);
					effects.exit(type);
					return ok$1(code$2);
				}
				effects.consume(code$2);
				return destinationRaw;
			}
			if (code$2 === null || markdownLineEndingOrSpace$6(code$2)) {
				if (balance) return nok(code$2);
				effects.exit("chunkString");
				effects.exit(stringType);
				effects.exit(rawType);
				effects.exit(type);
				return ok$1(code$2);
			}
			if (asciiControl$1(code$2)) return nok(code$2);
			effects.consume(code$2);
			return code$2 === 92 ? destinationRawEscape : destinationRaw;
		}
		function destinationRawEscape(code$2) {
			if (code$2 === 40 || code$2 === 41 || code$2 === 92) {
				effects.consume(code$2);
				return destinationRaw;
			}
			return destinationRaw(code$2);
		}
	}
	module.exports = destinationFactory;
}));
var require_factory_label = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$10 = require_markdown_line_ending();
	var markdownSpace$6 = require_markdown_space();
	function labelFactory(effects, ok$1, nok, type, markerType, stringType) {
		var self = this;
		var size = 0;
		var data;
		return start;
		function start(code$2) {
			effects.enter(type);
			effects.enter(markerType);
			effects.consume(code$2);
			effects.exit(markerType);
			effects.enter(stringType);
			return atBreak;
		}
		function atBreak(code$2) {
			if (code$2 === null || code$2 === 91 || code$2 === 93 && !data || code$2 === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs || size > 999) return nok(code$2);
			if (code$2 === 93) {
				effects.exit(stringType);
				effects.enter(markerType);
				effects.consume(code$2);
				effects.exit(markerType);
				effects.exit(type);
				return ok$1;
			}
			if (markdownLineEnding$10(code$2)) {
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				return atBreak;
			}
			effects.enter("chunkString", { contentType: "string" });
			return label(code$2);
		}
		function label(code$2) {
			if (code$2 === null || code$2 === 91 || code$2 === 93 || markdownLineEnding$10(code$2) || size++ > 999) {
				effects.exit("chunkString");
				return atBreak(code$2);
			}
			effects.consume(code$2);
			data = data || !markdownSpace$6(code$2);
			return code$2 === 92 ? labelEscape : label;
		}
		function labelEscape(code$2) {
			if (code$2 === 91 || code$2 === 92 || code$2 === 93) {
				effects.consume(code$2);
				size++;
				return label;
			}
			return label(code$2);
		}
	}
	module.exports = labelFactory;
}));
var require_factory_whitespace = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$9 = require_markdown_line_ending();
	var markdownSpace$5 = require_markdown_space();
	var factorySpace$8 = require_factory_space();
	function whitespaceFactory(effects, ok$1) {
		var seen;
		return start;
		function start(code$2) {
			if (markdownLineEnding$9(code$2)) {
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				seen = true;
				return start;
			}
			if (markdownSpace$5(code$2)) return factorySpace$8(effects, start, seen ? "linePrefix" : "lineSuffix")(code$2);
			return ok$1(code$2);
		}
	}
	module.exports = whitespaceFactory;
}));
var require_factory_title = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$8 = require_markdown_line_ending();
	var factorySpace$7 = require_factory_space();
	function titleFactory(effects, ok$1, nok, type, markerType, stringType) {
		var marker;
		return start;
		function start(code$2) {
			effects.enter(type);
			effects.enter(markerType);
			effects.consume(code$2);
			effects.exit(markerType);
			marker = code$2 === 40 ? 41 : code$2;
			return atFirstTitleBreak;
		}
		function atFirstTitleBreak(code$2) {
			if (code$2 === marker) {
				effects.enter(markerType);
				effects.consume(code$2);
				effects.exit(markerType);
				effects.exit(type);
				return ok$1;
			}
			effects.enter(stringType);
			return atTitleBreak(code$2);
		}
		function atTitleBreak(code$2) {
			if (code$2 === marker) {
				effects.exit(stringType);
				return atFirstTitleBreak(marker);
			}
			if (code$2 === null) return nok(code$2);
			if (markdownLineEnding$8(code$2)) {
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				return factorySpace$7(effects, atTitleBreak, "linePrefix");
			}
			effects.enter("chunkString", { contentType: "string" });
			return title(code$2);
		}
		function title(code$2) {
			if (code$2 === marker || code$2 === null || markdownLineEnding$8(code$2)) {
				effects.exit("chunkString");
				return atTitleBreak(code$2);
			}
			effects.consume(code$2);
			return code$2 === 92 ? titleEscape : title;
		}
		function titleEscape(code$2) {
			if (code$2 === marker || code$2 === 92) {
				effects.consume(code$2);
				return title;
			}
			return title(code$2);
		}
	}
	module.exports = titleFactory;
}));
var require_definition = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$7 = require_markdown_line_ending();
	var markdownLineEndingOrSpace$5 = require_markdown_line_ending_or_space();
	var normalizeIdentifier$2 = require_normalize_identifier();
	var factoryDestination$1 = require_factory_destination();
	var factoryLabel$1 = require_factory_label();
	var factorySpace$6 = require_factory_space();
	var factoryWhitespace$1 = require_factory_whitespace();
	var factoryTitle$1 = require_factory_title();
	var definition$1 = {
		name: "definition",
		tokenize: tokenizeDefinition
	};
	var titleConstruct = {
		tokenize: tokenizeTitle,
		partial: true
	};
	function tokenizeDefinition(effects, ok$1, nok) {
		var self = this;
		var identifier;
		return start;
		function start(code$2) {
			effects.enter("definition");
			return factoryLabel$1.call(self, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code$2);
		}
		function labelAfter(code$2) {
			identifier = normalizeIdentifier$2(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
			if (code$2 === 58) {
				effects.enter("definitionMarker");
				effects.consume(code$2);
				effects.exit("definitionMarker");
				return factoryWhitespace$1(effects, factoryDestination$1(effects, effects.attempt(titleConstruct, factorySpace$6(effects, after, "whitespace"), factorySpace$6(effects, after, "whitespace")), nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString"));
			}
			return nok(code$2);
		}
		function after(code$2) {
			if (code$2 === null || markdownLineEnding$7(code$2)) {
				effects.exit("definition");
				if (self.parser.defined.indexOf(identifier) < 0) self.parser.defined.push(identifier);
				return ok$1(code$2);
			}
			return nok(code$2);
		}
	}
	function tokenizeTitle(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			return markdownLineEndingOrSpace$5(code$2) ? factoryWhitespace$1(effects, before)(code$2) : nok(code$2);
		}
		function before(code$2) {
			if (code$2 === 34 || code$2 === 39 || code$2 === 40) return factoryTitle$1(effects, factorySpace$6(effects, after, "whitespace"), nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code$2);
			return nok(code$2);
		}
		function after(code$2) {
			return code$2 === null || markdownLineEnding$7(code$2) ? ok$1(code$2) : nok(code$2);
		}
	}
	module.exports = definition$1;
}));
var require_hard_break_escape = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$6 = require_markdown_line_ending();
	var hardBreakEscape$1 = {
		name: "hardBreakEscape",
		tokenize: tokenizeHardBreakEscape
	};
	function tokenizeHardBreakEscape(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			effects.enter("hardBreakEscape");
			effects.enter("escapeMarker");
			effects.consume(code$2);
			return open;
		}
		function open(code$2) {
			if (markdownLineEnding$6(code$2)) {
				effects.exit("escapeMarker");
				effects.exit("hardBreakEscape");
				return ok$1(code$2);
			}
			return nok(code$2);
		}
	}
	module.exports = hardBreakEscape$1;
}));
var require_heading_atx = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$5 = require_markdown_line_ending();
	var markdownLineEndingOrSpace$4 = require_markdown_line_ending_or_space();
	var markdownSpace$4 = require_markdown_space();
	var chunkedSplice$2 = require_chunked_splice();
	var factorySpace$5 = require_factory_space();
	var headingAtx$1 = {
		name: "headingAtx",
		tokenize: tokenizeHeadingAtx,
		resolve: resolveHeadingAtx
	};
	function resolveHeadingAtx(events, context) {
		var contentEnd = events.length - 2;
		var contentStart = 3;
		var content$3;
		var text$5;
		if (events[contentStart][1].type === "whitespace") contentStart += 2;
		if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") contentEnd -= 2;
		if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
		if (contentEnd > contentStart) {
			content$3 = {
				type: "atxHeadingText",
				start: events[contentStart][1].start,
				end: events[contentEnd][1].end
			};
			text$5 = {
				type: "chunkText",
				start: events[contentStart][1].start,
				end: events[contentEnd][1].end,
				contentType: "text"
			};
			chunkedSplice$2(events, contentStart, contentEnd - contentStart + 1, [
				[
					"enter",
					content$3,
					context
				],
				[
					"enter",
					text$5,
					context
				],
				[
					"exit",
					text$5,
					context
				],
				[
					"exit",
					content$3,
					context
				]
			]);
		}
		return events;
	}
	function tokenizeHeadingAtx(effects, ok$1, nok) {
		var self = this;
		var size = 0;
		return start;
		function start(code$2) {
			effects.enter("atxHeading");
			effects.enter("atxHeadingSequence");
			return fenceOpenInside(code$2);
		}
		function fenceOpenInside(code$2) {
			if (code$2 === 35 && size++ < 6) {
				effects.consume(code$2);
				return fenceOpenInside;
			}
			if (code$2 === null || markdownLineEndingOrSpace$4(code$2)) {
				effects.exit("atxHeadingSequence");
				return self.interrupt ? ok$1(code$2) : headingBreak(code$2);
			}
			return nok(code$2);
		}
		function headingBreak(code$2) {
			if (code$2 === 35) {
				effects.enter("atxHeadingSequence");
				return sequence(code$2);
			}
			if (code$2 === null || markdownLineEnding$5(code$2)) {
				effects.exit("atxHeading");
				return ok$1(code$2);
			}
			if (markdownSpace$4(code$2)) return factorySpace$5(effects, headingBreak, "whitespace")(code$2);
			effects.enter("atxHeadingText");
			return data(code$2);
		}
		function sequence(code$2) {
			if (code$2 === 35) {
				effects.consume(code$2);
				return sequence;
			}
			effects.exit("atxHeadingSequence");
			return headingBreak(code$2);
		}
		function data(code$2) {
			if (code$2 === null || code$2 === 35 || markdownLineEndingOrSpace$4(code$2)) {
				effects.exit("atxHeadingText");
				return headingBreak(code$2);
			}
			effects.consume(code$2);
			return data;
		}
	}
	module.exports = headingAtx$1;
}));
var require_html_block_names = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = [
		"address",
		"article",
		"aside",
		"base",
		"basefont",
		"blockquote",
		"body",
		"caption",
		"center",
		"col",
		"colgroup",
		"dd",
		"details",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"frame",
		"frameset",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hr",
		"html",
		"iframe",
		"legend",
		"li",
		"link",
		"main",
		"menu",
		"menuitem",
		"nav",
		"noframes",
		"ol",
		"optgroup",
		"option",
		"p",
		"param",
		"section",
		"source",
		"summary",
		"table",
		"tbody",
		"td",
		"tfoot",
		"th",
		"thead",
		"title",
		"tr",
		"track",
		"ul"
	];
}));
var require_html_raw_names = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = [
		"pre",
		"script",
		"style",
		"textarea"
	];
}));
var require_html_flow = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var asciiAlpha$2 = require_ascii_alpha();
	var asciiAlphanumeric$2 = require_ascii_alphanumeric();
	var markdownLineEnding$4 = require_markdown_line_ending();
	var markdownLineEndingOrSpace$3 = require_markdown_line_ending_or_space();
	var markdownSpace$3 = require_markdown_space();
	var fromCharCode = require_from_char_code();
	var htmlBlockNames = require_html_block_names();
	var htmlRawNames = require_html_raw_names();
	var partialBlankLine$1 = require_partial_blank_line();
	var htmlFlow$1 = {
		name: "htmlFlow",
		tokenize: tokenizeHtmlFlow,
		resolveTo: resolveToHtmlFlow,
		concrete: true
	};
	var nextBlankConstruct = {
		tokenize: tokenizeNextBlank,
		partial: true
	};
	function resolveToHtmlFlow(events) {
		var index$1 = events.length;
		while (index$1--) if (events[index$1][0] === "enter" && events[index$1][1].type === "htmlFlow") break;
		if (index$1 > 1 && events[index$1 - 2][1].type === "linePrefix") {
			events[index$1][1].start = events[index$1 - 2][1].start;
			events[index$1 + 1][1].start = events[index$1 - 2][1].start;
			events.splice(index$1 - 2, 2);
		}
		return events;
	}
	function tokenizeHtmlFlow(effects, ok$1, nok) {
		var self = this;
		var kind;
		var startTag;
		var buffer$2;
		var index$1;
		var marker;
		return start;
		function start(code$2) {
			effects.enter("htmlFlow");
			effects.enter("htmlFlowData");
			effects.consume(code$2);
			return open;
		}
		function open(code$2) {
			if (code$2 === 33) {
				effects.consume(code$2);
				return declarationStart;
			}
			if (code$2 === 47) {
				effects.consume(code$2);
				return tagCloseStart;
			}
			if (code$2 === 63) {
				effects.consume(code$2);
				kind = 3;
				return self.interrupt ? ok$1 : continuationDeclarationInside;
			}
			if (asciiAlpha$2(code$2)) {
				effects.consume(code$2);
				buffer$2 = fromCharCode(code$2);
				startTag = true;
				return tagName;
			}
			return nok(code$2);
		}
		function declarationStart(code$2) {
			if (code$2 === 45) {
				effects.consume(code$2);
				kind = 2;
				return commentOpenInside;
			}
			if (code$2 === 91) {
				effects.consume(code$2);
				kind = 5;
				buffer$2 = "CDATA[";
				index$1 = 0;
				return cdataOpenInside;
			}
			if (asciiAlpha$2(code$2)) {
				effects.consume(code$2);
				kind = 4;
				return self.interrupt ? ok$1 : continuationDeclarationInside;
			}
			return nok(code$2);
		}
		function commentOpenInside(code$2) {
			if (code$2 === 45) {
				effects.consume(code$2);
				return self.interrupt ? ok$1 : continuationDeclarationInside;
			}
			return nok(code$2);
		}
		function cdataOpenInside(code$2) {
			if (code$2 === buffer$2.charCodeAt(index$1++)) {
				effects.consume(code$2);
				return index$1 === buffer$2.length ? self.interrupt ? ok$1 : continuation : cdataOpenInside;
			}
			return nok(code$2);
		}
		function tagCloseStart(code$2) {
			if (asciiAlpha$2(code$2)) {
				effects.consume(code$2);
				buffer$2 = fromCharCode(code$2);
				return tagName;
			}
			return nok(code$2);
		}
		function tagName(code$2) {
			if (code$2 === null || code$2 === 47 || code$2 === 62 || markdownLineEndingOrSpace$3(code$2)) {
				if (code$2 !== 47 && startTag && htmlRawNames.indexOf(buffer$2.toLowerCase()) > -1) {
					kind = 1;
					return self.interrupt ? ok$1(code$2) : continuation(code$2);
				}
				if (htmlBlockNames.indexOf(buffer$2.toLowerCase()) > -1) {
					kind = 6;
					if (code$2 === 47) {
						effects.consume(code$2);
						return basicSelfClosing;
					}
					return self.interrupt ? ok$1(code$2) : continuation(code$2);
				}
				kind = 7;
				return self.interrupt ? nok(code$2) : startTag ? completeAttributeNameBefore(code$2) : completeClosingTagAfter(code$2);
			}
			if (code$2 === 45 || asciiAlphanumeric$2(code$2)) {
				effects.consume(code$2);
				buffer$2 += fromCharCode(code$2);
				return tagName;
			}
			return nok(code$2);
		}
		function basicSelfClosing(code$2) {
			if (code$2 === 62) {
				effects.consume(code$2);
				return self.interrupt ? ok$1 : continuation;
			}
			return nok(code$2);
		}
		function completeClosingTagAfter(code$2) {
			if (markdownSpace$3(code$2)) {
				effects.consume(code$2);
				return completeClosingTagAfter;
			}
			return completeEnd(code$2);
		}
		function completeAttributeNameBefore(code$2) {
			if (code$2 === 47) {
				effects.consume(code$2);
				return completeEnd;
			}
			if (code$2 === 58 || code$2 === 95 || asciiAlpha$2(code$2)) {
				effects.consume(code$2);
				return completeAttributeName;
			}
			if (markdownSpace$3(code$2)) {
				effects.consume(code$2);
				return completeAttributeNameBefore;
			}
			return completeEnd(code$2);
		}
		function completeAttributeName(code$2) {
			if (code$2 === 45 || code$2 === 46 || code$2 === 58 || code$2 === 95 || asciiAlphanumeric$2(code$2)) {
				effects.consume(code$2);
				return completeAttributeName;
			}
			return completeAttributeNameAfter(code$2);
		}
		function completeAttributeNameAfter(code$2) {
			if (code$2 === 61) {
				effects.consume(code$2);
				return completeAttributeValueBefore;
			}
			if (markdownSpace$3(code$2)) {
				effects.consume(code$2);
				return completeAttributeNameAfter;
			}
			return completeAttributeNameBefore(code$2);
		}
		function completeAttributeValueBefore(code$2) {
			if (code$2 === null || code$2 === 60 || code$2 === 61 || code$2 === 62 || code$2 === 96) return nok(code$2);
			if (code$2 === 34 || code$2 === 39) {
				effects.consume(code$2);
				marker = code$2;
				return completeAttributeValueQuoted;
			}
			if (markdownSpace$3(code$2)) {
				effects.consume(code$2);
				return completeAttributeValueBefore;
			}
			marker = void 0;
			return completeAttributeValueUnquoted(code$2);
		}
		function completeAttributeValueQuoted(code$2) {
			if (code$2 === marker) {
				effects.consume(code$2);
				return completeAttributeValueQuotedAfter;
			}
			if (code$2 === null || markdownLineEnding$4(code$2)) return nok(code$2);
			effects.consume(code$2);
			return completeAttributeValueQuoted;
		}
		function completeAttributeValueUnquoted(code$2) {
			if (code$2 === null || code$2 === 34 || code$2 === 39 || code$2 === 60 || code$2 === 61 || code$2 === 62 || code$2 === 96 || markdownLineEndingOrSpace$3(code$2)) return completeAttributeNameAfter(code$2);
			effects.consume(code$2);
			return completeAttributeValueUnquoted;
		}
		function completeAttributeValueQuotedAfter(code$2) {
			if (code$2 === 47 || code$2 === 62 || markdownSpace$3(code$2)) return completeAttributeNameBefore(code$2);
			return nok(code$2);
		}
		function completeEnd(code$2) {
			if (code$2 === 62) {
				effects.consume(code$2);
				return completeAfter;
			}
			return nok(code$2);
		}
		function completeAfter(code$2) {
			if (markdownSpace$3(code$2)) {
				effects.consume(code$2);
				return completeAfter;
			}
			return code$2 === null || markdownLineEnding$4(code$2) ? continuation(code$2) : nok(code$2);
		}
		function continuation(code$2) {
			if (code$2 === 45 && kind === 2) {
				effects.consume(code$2);
				return continuationCommentInside;
			}
			if (code$2 === 60 && kind === 1) {
				effects.consume(code$2);
				return continuationRawTagOpen;
			}
			if (code$2 === 62 && kind === 4) {
				effects.consume(code$2);
				return continuationClose;
			}
			if (code$2 === 63 && kind === 3) {
				effects.consume(code$2);
				return continuationDeclarationInside;
			}
			if (code$2 === 93 && kind === 5) {
				effects.consume(code$2);
				return continuationCharacterDataInside;
			}
			if (markdownLineEnding$4(code$2) && (kind === 6 || kind === 7)) return effects.check(nextBlankConstruct, continuationClose, continuationAtLineEnding)(code$2);
			if (code$2 === null || markdownLineEnding$4(code$2)) return continuationAtLineEnding(code$2);
			effects.consume(code$2);
			return continuation;
		}
		function continuationAtLineEnding(code$2) {
			effects.exit("htmlFlowData");
			return htmlContinueStart(code$2);
		}
		function htmlContinueStart(code$2) {
			if (code$2 === null) return done(code$2);
			if (markdownLineEnding$4(code$2)) {
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				return htmlContinueStart;
			}
			effects.enter("htmlFlowData");
			return continuation(code$2);
		}
		function continuationCommentInside(code$2) {
			if (code$2 === 45) {
				effects.consume(code$2);
				return continuationDeclarationInside;
			}
			return continuation(code$2);
		}
		function continuationRawTagOpen(code$2) {
			if (code$2 === 47) {
				effects.consume(code$2);
				buffer$2 = "";
				return continuationRawEndTag;
			}
			return continuation(code$2);
		}
		function continuationRawEndTag(code$2) {
			if (code$2 === 62 && htmlRawNames.indexOf(buffer$2.toLowerCase()) > -1) {
				effects.consume(code$2);
				return continuationClose;
			}
			if (asciiAlpha$2(code$2) && buffer$2.length < 8) {
				effects.consume(code$2);
				buffer$2 += fromCharCode(code$2);
				return continuationRawEndTag;
			}
			return continuation(code$2);
		}
		function continuationCharacterDataInside(code$2) {
			if (code$2 === 93) {
				effects.consume(code$2);
				return continuationDeclarationInside;
			}
			return continuation(code$2);
		}
		function continuationDeclarationInside(code$2) {
			if (code$2 === 62) {
				effects.consume(code$2);
				return continuationClose;
			}
			return continuation(code$2);
		}
		function continuationClose(code$2) {
			if (code$2 === null || markdownLineEnding$4(code$2)) {
				effects.exit("htmlFlowData");
				return done(code$2);
			}
			effects.consume(code$2);
			return continuationClose;
		}
		function done(code$2) {
			effects.exit("htmlFlow");
			return ok$1(code$2);
		}
	}
	function tokenizeNextBlank(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			effects.exit("htmlFlowData");
			effects.enter("lineEndingBlank");
			effects.consume(code$2);
			effects.exit("lineEndingBlank");
			return effects.attempt(partialBlankLine$1, ok$1, nok);
		}
	}
	module.exports = htmlFlow$1;
}));
var require_html_text = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var asciiAlpha$1 = require_ascii_alpha();
	var asciiAlphanumeric$1 = require_ascii_alphanumeric();
	var markdownLineEnding$3 = require_markdown_line_ending();
	var markdownLineEndingOrSpace$2 = require_markdown_line_ending_or_space();
	var markdownSpace$2 = require_markdown_space();
	var factorySpace$4 = require_factory_space();
	var htmlText$1 = {
		name: "htmlText",
		tokenize: tokenizeHtmlText
	};
	function tokenizeHtmlText(effects, ok$1, nok) {
		var self = this;
		var marker;
		var buffer$2;
		var index$1;
		var returnState;
		return start;
		function start(code$2) {
			effects.enter("htmlText");
			effects.enter("htmlTextData");
			effects.consume(code$2);
			return open;
		}
		function open(code$2) {
			if (code$2 === 33) {
				effects.consume(code$2);
				return declarationOpen;
			}
			if (code$2 === 47) {
				effects.consume(code$2);
				return tagCloseStart;
			}
			if (code$2 === 63) {
				effects.consume(code$2);
				return instruction;
			}
			if (asciiAlpha$1(code$2)) {
				effects.consume(code$2);
				return tagOpen;
			}
			return nok(code$2);
		}
		function declarationOpen(code$2) {
			if (code$2 === 45) {
				effects.consume(code$2);
				return commentOpen;
			}
			if (code$2 === 91) {
				effects.consume(code$2);
				buffer$2 = "CDATA[";
				index$1 = 0;
				return cdataOpen;
			}
			if (asciiAlpha$1(code$2)) {
				effects.consume(code$2);
				return declaration;
			}
			return nok(code$2);
		}
		function commentOpen(code$2) {
			if (code$2 === 45) {
				effects.consume(code$2);
				return commentStart;
			}
			return nok(code$2);
		}
		function commentStart(code$2) {
			if (code$2 === null || code$2 === 62) return nok(code$2);
			if (code$2 === 45) {
				effects.consume(code$2);
				return commentStartDash;
			}
			return comment(code$2);
		}
		function commentStartDash(code$2) {
			if (code$2 === null || code$2 === 62) return nok(code$2);
			return comment(code$2);
		}
		function comment(code$2) {
			if (code$2 === null) return nok(code$2);
			if (code$2 === 45) {
				effects.consume(code$2);
				return commentClose;
			}
			if (markdownLineEnding$3(code$2)) {
				returnState = comment;
				return atLineEnding(code$2);
			}
			effects.consume(code$2);
			return comment;
		}
		function commentClose(code$2) {
			if (code$2 === 45) {
				effects.consume(code$2);
				return end;
			}
			return comment(code$2);
		}
		function cdataOpen(code$2) {
			if (code$2 === buffer$2.charCodeAt(index$1++)) {
				effects.consume(code$2);
				return index$1 === buffer$2.length ? cdata : cdataOpen;
			}
			return nok(code$2);
		}
		function cdata(code$2) {
			if (code$2 === null) return nok(code$2);
			if (code$2 === 93) {
				effects.consume(code$2);
				return cdataClose;
			}
			if (markdownLineEnding$3(code$2)) {
				returnState = cdata;
				return atLineEnding(code$2);
			}
			effects.consume(code$2);
			return cdata;
		}
		function cdataClose(code$2) {
			if (code$2 === 93) {
				effects.consume(code$2);
				return cdataEnd;
			}
			return cdata(code$2);
		}
		function cdataEnd(code$2) {
			if (code$2 === 62) return end(code$2);
			if (code$2 === 93) {
				effects.consume(code$2);
				return cdataEnd;
			}
			return cdata(code$2);
		}
		function declaration(code$2) {
			if (code$2 === null || code$2 === 62) return end(code$2);
			if (markdownLineEnding$3(code$2)) {
				returnState = declaration;
				return atLineEnding(code$2);
			}
			effects.consume(code$2);
			return declaration;
		}
		function instruction(code$2) {
			if (code$2 === null) return nok(code$2);
			if (code$2 === 63) {
				effects.consume(code$2);
				return instructionClose;
			}
			if (markdownLineEnding$3(code$2)) {
				returnState = instruction;
				return atLineEnding(code$2);
			}
			effects.consume(code$2);
			return instruction;
		}
		function instructionClose(code$2) {
			return code$2 === 62 ? end(code$2) : instruction(code$2);
		}
		function tagCloseStart(code$2) {
			if (asciiAlpha$1(code$2)) {
				effects.consume(code$2);
				return tagClose;
			}
			return nok(code$2);
		}
		function tagClose(code$2) {
			if (code$2 === 45 || asciiAlphanumeric$1(code$2)) {
				effects.consume(code$2);
				return tagClose;
			}
			return tagCloseBetween(code$2);
		}
		function tagCloseBetween(code$2) {
			if (markdownLineEnding$3(code$2)) {
				returnState = tagCloseBetween;
				return atLineEnding(code$2);
			}
			if (markdownSpace$2(code$2)) {
				effects.consume(code$2);
				return tagCloseBetween;
			}
			return end(code$2);
		}
		function tagOpen(code$2) {
			if (code$2 === 45 || asciiAlphanumeric$1(code$2)) {
				effects.consume(code$2);
				return tagOpen;
			}
			if (code$2 === 47 || code$2 === 62 || markdownLineEndingOrSpace$2(code$2)) return tagOpenBetween(code$2);
			return nok(code$2);
		}
		function tagOpenBetween(code$2) {
			if (code$2 === 47) {
				effects.consume(code$2);
				return end;
			}
			if (code$2 === 58 || code$2 === 95 || asciiAlpha$1(code$2)) {
				effects.consume(code$2);
				return tagOpenAttributeName;
			}
			if (markdownLineEnding$3(code$2)) {
				returnState = tagOpenBetween;
				return atLineEnding(code$2);
			}
			if (markdownSpace$2(code$2)) {
				effects.consume(code$2);
				return tagOpenBetween;
			}
			return end(code$2);
		}
		function tagOpenAttributeName(code$2) {
			if (code$2 === 45 || code$2 === 46 || code$2 === 58 || code$2 === 95 || asciiAlphanumeric$1(code$2)) {
				effects.consume(code$2);
				return tagOpenAttributeName;
			}
			return tagOpenAttributeNameAfter(code$2);
		}
		function tagOpenAttributeNameAfter(code$2) {
			if (code$2 === 61) {
				effects.consume(code$2);
				return tagOpenAttributeValueBefore;
			}
			if (markdownLineEnding$3(code$2)) {
				returnState = tagOpenAttributeNameAfter;
				return atLineEnding(code$2);
			}
			if (markdownSpace$2(code$2)) {
				effects.consume(code$2);
				return tagOpenAttributeNameAfter;
			}
			return tagOpenBetween(code$2);
		}
		function tagOpenAttributeValueBefore(code$2) {
			if (code$2 === null || code$2 === 60 || code$2 === 61 || code$2 === 62 || code$2 === 96) return nok(code$2);
			if (code$2 === 34 || code$2 === 39) {
				effects.consume(code$2);
				marker = code$2;
				return tagOpenAttributeValueQuoted;
			}
			if (markdownLineEnding$3(code$2)) {
				returnState = tagOpenAttributeValueBefore;
				return atLineEnding(code$2);
			}
			if (markdownSpace$2(code$2)) {
				effects.consume(code$2);
				return tagOpenAttributeValueBefore;
			}
			effects.consume(code$2);
			marker = void 0;
			return tagOpenAttributeValueUnquoted;
		}
		function tagOpenAttributeValueQuoted(code$2) {
			if (code$2 === marker) {
				effects.consume(code$2);
				return tagOpenAttributeValueQuotedAfter;
			}
			if (code$2 === null) return nok(code$2);
			if (markdownLineEnding$3(code$2)) {
				returnState = tagOpenAttributeValueQuoted;
				return atLineEnding(code$2);
			}
			effects.consume(code$2);
			return tagOpenAttributeValueQuoted;
		}
		function tagOpenAttributeValueQuotedAfter(code$2) {
			if (code$2 === 62 || code$2 === 47 || markdownLineEndingOrSpace$2(code$2)) return tagOpenBetween(code$2);
			return nok(code$2);
		}
		function tagOpenAttributeValueUnquoted(code$2) {
			if (code$2 === null || code$2 === 34 || code$2 === 39 || code$2 === 60 || code$2 === 61 || code$2 === 96) return nok(code$2);
			if (code$2 === 62 || markdownLineEndingOrSpace$2(code$2)) return tagOpenBetween(code$2);
			effects.consume(code$2);
			return tagOpenAttributeValueUnquoted;
		}
		function atLineEnding(code$2) {
			effects.exit("htmlTextData");
			effects.enter("lineEnding");
			effects.consume(code$2);
			effects.exit("lineEnding");
			return factorySpace$4(effects, afterPrefix, "linePrefix", self.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
		}
		function afterPrefix(code$2) {
			effects.enter("htmlTextData");
			return returnState(code$2);
		}
		function end(code$2) {
			if (code$2 === 62) {
				effects.consume(code$2);
				effects.exit("htmlTextData");
				effects.exit("htmlText");
				return ok$1;
			}
			return nok(code$2);
		}
	}
	module.exports = htmlText$1;
}));
var require_label_end = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEndingOrSpace$1 = require_markdown_line_ending_or_space();
	var chunkedPush = require_chunked_push();
	var chunkedSplice$1 = require_chunked_splice();
	var normalizeIdentifier$1 = require_normalize_identifier();
	var resolveAll$1 = require_resolve_all();
	var shallow$2 = require_shallow();
	var factoryDestination = require_factory_destination();
	var factoryLabel = require_factory_label();
	var factoryTitle = require_factory_title();
	var factoryWhitespace = require_factory_whitespace();
	var labelEnd$1 = {
		name: "labelEnd",
		tokenize: tokenizeLabelEnd,
		resolveTo: resolveToLabelEnd,
		resolveAll: resolveAllLabelEnd
	};
	var resourceConstruct = { tokenize: tokenizeResource };
	var fullReferenceConstruct = { tokenize: tokenizeFullReference };
	var collapsedReferenceConstruct = { tokenize: tokenizeCollapsedReference };
	function resolveAllLabelEnd(events) {
		var index$1 = -1;
		var token;
		while (++index$1 < events.length) {
			token = events[index$1][1];
			if (!token._used && (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd")) {
				events.splice(index$1 + 1, token.type === "labelImage" ? 4 : 2);
				token.type = "data";
				index$1++;
			}
		}
		return events;
	}
	function resolveToLabelEnd(events, context) {
		var index$1 = events.length;
		var offset = 0;
		var group;
		var label;
		var text$5;
		var token;
		var open;
		var close;
		var media;
		while (index$1--) {
			token = events[index$1][1];
			if (open) {
				if (token.type === "link" || token.type === "labelLink" && token._inactive) break;
				if (events[index$1][0] === "enter" && token.type === "labelLink") token._inactive = true;
			} else if (close) {
				if (events[index$1][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
					open = index$1;
					if (token.type !== "labelLink") {
						offset = 2;
						break;
					}
				}
			} else if (token.type === "labelEnd") close = index$1;
		}
		group = {
			type: events[open][1].type === "labelLink" ? "link" : "image",
			start: shallow$2(events[open][1].start),
			end: shallow$2(events[events.length - 1][1].end)
		};
		label = {
			type: "label",
			start: shallow$2(events[open][1].start),
			end: shallow$2(events[close][1].end)
		};
		text$5 = {
			type: "labelText",
			start: shallow$2(events[open + offset + 2][1].end),
			end: shallow$2(events[close - 2][1].start)
		};
		media = [[
			"enter",
			group,
			context
		], [
			"enter",
			label,
			context
		]];
		media = chunkedPush(media, events.slice(open + 1, open + offset + 3));
		media = chunkedPush(media, [[
			"enter",
			text$5,
			context
		]]);
		media = chunkedPush(media, resolveAll$1(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
		media = chunkedPush(media, [
			[
				"exit",
				text$5,
				context
			],
			events[close - 2],
			events[close - 1],
			[
				"exit",
				label,
				context
			]
		]);
		media = chunkedPush(media, events.slice(close + 1));
		media = chunkedPush(media, [[
			"exit",
			group,
			context
		]]);
		chunkedSplice$1(events, open, events.length, media);
		return events;
	}
	function tokenizeLabelEnd(effects, ok$1, nok) {
		var self = this;
		var index$1 = self.events.length;
		var labelStart;
		var defined;
		while (index$1--) if ((self.events[index$1][1].type === "labelImage" || self.events[index$1][1].type === "labelLink") && !self.events[index$1][1]._balanced) {
			labelStart = self.events[index$1][1];
			break;
		}
		return start;
		function start(code$2) {
			if (!labelStart) return nok(code$2);
			if (labelStart._inactive) return balanced(code$2);
			defined = self.parser.defined.indexOf(normalizeIdentifier$1(self.sliceSerialize({
				start: labelStart.end,
				end: self.now()
			}))) > -1;
			effects.enter("labelEnd");
			effects.enter("labelMarker");
			effects.consume(code$2);
			effects.exit("labelMarker");
			effects.exit("labelEnd");
			return afterLabelEnd;
		}
		function afterLabelEnd(code$2) {
			if (code$2 === 40) return effects.attempt(resourceConstruct, ok$1, defined ? ok$1 : balanced)(code$2);
			if (code$2 === 91) return effects.attempt(fullReferenceConstruct, ok$1, defined ? effects.attempt(collapsedReferenceConstruct, ok$1, balanced) : balanced)(code$2);
			return defined ? ok$1(code$2) : balanced(code$2);
		}
		function balanced(code$2) {
			labelStart._balanced = true;
			return nok(code$2);
		}
	}
	function tokenizeResource(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			effects.enter("resource");
			effects.enter("resourceMarker");
			effects.consume(code$2);
			effects.exit("resourceMarker");
			return factoryWhitespace(effects, open);
		}
		function open(code$2) {
			if (code$2 === 41) return end(code$2);
			return factoryDestination(effects, destinationAfter, nok, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 3)(code$2);
		}
		function destinationAfter(code$2) {
			return markdownLineEndingOrSpace$1(code$2) ? factoryWhitespace(effects, between)(code$2) : end(code$2);
		}
		function between(code$2) {
			if (code$2 === 34 || code$2 === 39 || code$2 === 40) return factoryTitle(effects, factoryWhitespace(effects, end), nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code$2);
			return end(code$2);
		}
		function end(code$2) {
			if (code$2 === 41) {
				effects.enter("resourceMarker");
				effects.consume(code$2);
				effects.exit("resourceMarker");
				effects.exit("resource");
				return ok$1;
			}
			return nok(code$2);
		}
	}
	function tokenizeFullReference(effects, ok$1, nok) {
		var self = this;
		return start;
		function start(code$2) {
			return factoryLabel.call(self, effects, afterLabel, nok, "reference", "referenceMarker", "referenceString")(code$2);
		}
		function afterLabel(code$2) {
			return self.parser.defined.indexOf(normalizeIdentifier$1(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) < 0 ? nok(code$2) : ok$1(code$2);
		}
	}
	function tokenizeCollapsedReference(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			effects.enter("reference");
			effects.enter("referenceMarker");
			effects.consume(code$2);
			effects.exit("referenceMarker");
			return open;
		}
		function open(code$2) {
			if (code$2 === 93) {
				effects.enter("referenceMarker");
				effects.consume(code$2);
				effects.exit("referenceMarker");
				effects.exit("reference");
				return ok$1;
			}
			return nok(code$2);
		}
	}
	module.exports = labelEnd$1;
}));
var require_label_start_image = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var labelStartImage$1 = {
		name: "labelStartImage",
		tokenize: tokenizeLabelStartImage,
		resolveAll: require_label_end().resolveAll
	};
	function tokenizeLabelStartImage(effects, ok$1, nok) {
		var self = this;
		return start;
		function start(code$2) {
			effects.enter("labelImage");
			effects.enter("labelImageMarker");
			effects.consume(code$2);
			effects.exit("labelImageMarker");
			return open;
		}
		function open(code$2) {
			if (code$2 === 91) {
				effects.enter("labelMarker");
				effects.consume(code$2);
				effects.exit("labelMarker");
				effects.exit("labelImage");
				return after;
			}
			return nok(code$2);
		}
		function after(code$2) {
			/* c8 ignore next */
			return code$2 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code$2) : ok$1(code$2);
		}
	}
	module.exports = labelStartImage$1;
}));
var require_label_start_link = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var labelStartLink$1 = {
		name: "labelStartLink",
		tokenize: tokenizeLabelStartLink,
		resolveAll: require_label_end().resolveAll
	};
	function tokenizeLabelStartLink(effects, ok$1, nok) {
		var self = this;
		return start;
		function start(code$2) {
			effects.enter("labelLink");
			effects.enter("labelMarker");
			effects.consume(code$2);
			effects.exit("labelMarker");
			effects.exit("labelLink");
			return after;
		}
		function after(code$2) {
			/* c8 ignore next */
			return code$2 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code$2) : ok$1(code$2);
		}
	}
	module.exports = labelStartLink$1;
}));
var require_line_ending = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var factorySpace$3 = require_factory_space();
	var lineEnding$1 = {
		name: "lineEnding",
		tokenize: tokenizeLineEnding
	};
	function tokenizeLineEnding(effects, ok$1) {
		return start;
		function start(code$2) {
			effects.enter("lineEnding");
			effects.consume(code$2);
			effects.exit("lineEnding");
			return factorySpace$3(effects, ok$1, "linePrefix");
		}
	}
	module.exports = lineEnding$1;
}));
var require_thematic_break = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$2 = require_markdown_line_ending();
	var markdownSpace$1 = require_markdown_space();
	var factorySpace$2 = require_factory_space();
	var thematicBreak$2 = {
		name: "thematicBreak",
		tokenize: tokenizeThematicBreak
	};
	function tokenizeThematicBreak(effects, ok$1, nok) {
		var size = 0;
		var marker;
		return start;
		function start(code$2) {
			effects.enter("thematicBreak");
			marker = code$2;
			return atBreak(code$2);
		}
		function atBreak(code$2) {
			if (code$2 === marker) {
				effects.enter("thematicBreakSequence");
				return sequence(code$2);
			}
			if (markdownSpace$1(code$2)) return factorySpace$2(effects, atBreak, "whitespace")(code$2);
			if (size < 3 || code$2 !== null && !markdownLineEnding$2(code$2)) return nok(code$2);
			effects.exit("thematicBreak");
			return ok$1(code$2);
		}
		function sequence(code$2) {
			if (code$2 === marker) {
				effects.consume(code$2);
				size++;
				return sequence;
			}
			effects.exit("thematicBreakSequence");
			return atBreak(code$2);
		}
	}
	module.exports = thematicBreak$2;
}));
var require_list = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var asciiDigit = require_ascii_digit();
	var markdownSpace = require_markdown_space();
	var prefixSize$2 = require_prefix_size();
	var sizeChunks = require_size_chunks();
	var factorySpace$1 = require_factory_space();
	var partialBlankLine = require_partial_blank_line();
	var thematicBreak$1 = require_thematic_break();
	var list$1 = {
		name: "list",
		tokenize: tokenizeListStart,
		continuation: { tokenize: tokenizeListContinuation },
		exit: tokenizeListEnd
	};
	var listItemPrefixWhitespaceConstruct = {
		tokenize: tokenizeListItemPrefixWhitespace,
		partial: true
	};
	var indentConstruct = {
		tokenize: tokenizeIndent,
		partial: true
	};
	function tokenizeListStart(effects, ok$1, nok) {
		var self = this;
		var initialSize = prefixSize$2(self.events, "linePrefix");
		var size = 0;
		return start;
		function start(code$2) {
			var kind = self.containerState.type || (code$2 === 42 || code$2 === 43 || code$2 === 45 ? "listUnordered" : "listOrdered");
			if (kind === "listUnordered" ? !self.containerState.marker || code$2 === self.containerState.marker : asciiDigit(code$2)) {
				if (!self.containerState.type) {
					self.containerState.type = kind;
					effects.enter(kind, { _container: true });
				}
				if (kind === "listUnordered") {
					effects.enter("listItemPrefix");
					return code$2 === 42 || code$2 === 45 ? effects.check(thematicBreak$1, nok, atMarker)(code$2) : atMarker(code$2);
				}
				if (!self.interrupt || code$2 === 49) {
					effects.enter("listItemPrefix");
					effects.enter("listItemValue");
					return inside(code$2);
				}
			}
			return nok(code$2);
		}
		function inside(code$2) {
			if (asciiDigit(code$2) && ++size < 10) {
				effects.consume(code$2);
				return inside;
			}
			if ((!self.interrupt || size < 2) && (self.containerState.marker ? code$2 === self.containerState.marker : code$2 === 41 || code$2 === 46)) {
				effects.exit("listItemValue");
				return atMarker(code$2);
			}
			return nok(code$2);
		}
		function atMarker(code$2) {
			effects.enter("listItemMarker");
			effects.consume(code$2);
			effects.exit("listItemMarker");
			self.containerState.marker = self.containerState.marker || code$2;
			return effects.check(partialBlankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
		}
		function onBlank(code$2) {
			self.containerState.initialBlankLine = true;
			initialSize++;
			return endOfPrefix(code$2);
		}
		function otherPrefix(code$2) {
			if (markdownSpace(code$2)) {
				effects.enter("listItemPrefixWhitespace");
				effects.consume(code$2);
				effects.exit("listItemPrefixWhitespace");
				return endOfPrefix;
			}
			return nok(code$2);
		}
		function endOfPrefix(code$2) {
			self.containerState.size = initialSize + sizeChunks(self.sliceStream(effects.exit("listItemPrefix")));
			return ok$1(code$2);
		}
	}
	function tokenizeListContinuation(effects, ok$1, nok) {
		var self = this;
		self.containerState._closeFlow = void 0;
		return effects.check(partialBlankLine, onBlank, notBlank);
		function onBlank(code$2) {
			self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
			return factorySpace$1(effects, ok$1, "listItemIndent", self.containerState.size + 1)(code$2);
		}
		function notBlank(code$2) {
			if (self.containerState.furtherBlankLines || !markdownSpace(code$2)) {
				self.containerState.furtherBlankLines = self.containerState.initialBlankLine = void 0;
				return notInCurrentItem(code$2);
			}
			self.containerState.furtherBlankLines = self.containerState.initialBlankLine = void 0;
			return effects.attempt(indentConstruct, ok$1, notInCurrentItem)(code$2);
		}
		function notInCurrentItem(code$2) {
			self.containerState._closeFlow = true;
			self.interrupt = void 0;
			return factorySpace$1(effects, effects.attempt(list$1, ok$1, nok), "linePrefix", self.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4)(code$2);
		}
	}
	function tokenizeIndent(effects, ok$1, nok) {
		var self = this;
		return factorySpace$1(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
		function afterPrefix(code$2) {
			return prefixSize$2(self.events, "listItemIndent") === self.containerState.size ? ok$1(code$2) : nok(code$2);
		}
	}
	function tokenizeListEnd(effects) {
		effects.exit(this.containerState.type);
	}
	function tokenizeListItemPrefixWhitespace(effects, ok$1, nok) {
		var self = this;
		return factorySpace$1(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 5);
		function afterPrefix(code$2) {
			return markdownSpace(code$2) || !prefixSize$2(self.events, "listItemPrefixWhitespace") ? nok(code$2) : ok$1(code$2);
		}
	}
	module.exports = list$1;
}));
var require_setext_underline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var markdownLineEnding$1 = require_markdown_line_ending();
	var shallow$1 = require_shallow();
	var factorySpace = require_factory_space();
	var setextUnderline$1 = {
		name: "setextUnderline",
		tokenize: tokenizeSetextUnderline,
		resolveTo: resolveToSetextUnderline
	};
	function resolveToSetextUnderline(events, context) {
		var index$1 = events.length;
		var content$3;
		var text$5;
		var definition$2;
		var heading;
		while (index$1--) if (events[index$1][0] === "enter") {
			if (events[index$1][1].type === "content") {
				content$3 = index$1;
				break;
			}
			if (events[index$1][1].type === "paragraph") text$5 = index$1;
		} else {
			if (events[index$1][1].type === "content") events.splice(index$1, 1);
			if (!definition$2 && events[index$1][1].type === "definition") definition$2 = index$1;
		}
		heading = {
			type: "setextHeading",
			start: shallow$1(events[text$5][1].start),
			end: shallow$1(events[events.length - 1][1].end)
		};
		events[text$5][1].type = "setextHeadingText";
		if (definition$2) {
			events.splice(text$5, 0, [
				"enter",
				heading,
				context
			]);
			events.splice(definition$2 + 1, 0, [
				"exit",
				events[content$3][1],
				context
			]);
			events[content$3][1].end = shallow$1(events[definition$2][1].end);
		} else events[content$3][1] = heading;
		events.push([
			"exit",
			heading,
			context
		]);
		return events;
	}
	function tokenizeSetextUnderline(effects, ok$1, nok) {
		var self = this;
		var index$1 = self.events.length;
		var marker;
		var paragraph$1;
		while (index$1--) if (self.events[index$1][1].type !== "lineEnding" && self.events[index$1][1].type !== "linePrefix" && self.events[index$1][1].type !== "content") {
			paragraph$1 = self.events[index$1][1].type === "paragraph";
			break;
		}
		return start;
		function start(code$2) {
			if (!self.lazy && (self.interrupt || paragraph$1)) {
				effects.enter("setextHeadingLine");
				effects.enter("setextHeadingLineSequence");
				marker = code$2;
				return closingSequence(code$2);
			}
			return nok(code$2);
		}
		function closingSequence(code$2) {
			if (code$2 === marker) {
				effects.consume(code$2);
				return closingSequence;
			}
			effects.exit("setextHeadingLineSequence");
			return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code$2);
		}
		function closingSequenceEnd(code$2) {
			if (code$2 === null || markdownLineEnding$1(code$2)) {
				effects.exit("setextHeadingLine");
				return ok$1(code$2);
			}
			return nok(code$2);
		}
	}
	module.exports = setextUnderline$1;
}));
var require_constructs = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var text$1$1 = require_text();
	var attention = require_attention();
	var autolink$1 = require_autolink();
	var blockQuote = require_block_quote();
	var characterEscape = require_character_escape();
	var characterReference = require_character_reference();
	var codeFenced = require_code_fenced();
	var codeIndented = require_code_indented();
	var codeText = require_code_text();
	var definition = require_definition();
	var hardBreakEscape = require_hard_break_escape();
	var headingAtx = require_heading_atx();
	var htmlFlow = require_html_flow();
	var htmlText = require_html_text();
	var labelEnd = require_label_end();
	var labelStartImage = require_label_start_image();
	var labelStartLink = require_label_start_link();
	var lineEnding = require_line_ending();
	var list = require_list();
	var setextUnderline = require_setext_underline();
	var thematicBreak = require_thematic_break();
	var document$2 = {
		42: list,
		43: list,
		45: list,
		48: list,
		49: list,
		50: list,
		51: list,
		52: list,
		53: list,
		54: list,
		55: list,
		56: list,
		57: list,
		62: blockQuote
	};
	var contentInitial = { 91: definition };
	var flowInitial = {
		"-2": codeIndented,
		"-1": codeIndented,
		32: codeIndented
	};
	var flow$3 = {
		35: headingAtx,
		42: thematicBreak,
		45: [setextUnderline, thematicBreak],
		60: htmlFlow,
		61: setextUnderline,
		95: thematicBreak,
		96: codeFenced,
		126: codeFenced
	};
	var string = {
		38: characterReference,
		92: characterEscape
	};
	var text$3 = {
		"-5": lineEnding,
		"-4": lineEnding,
		"-3": lineEnding,
		33: labelStartImage,
		38: characterReference,
		42: attention,
		60: [autolink$1, htmlText],
		91: labelStartLink,
		92: [hardBreakEscape, characterEscape],
		93: labelEnd,
		95: attention,
		96: codeText
	};
	var insideSpan = { null: [attention, text$1$1.resolver] };
	var disable = { null: [] };
	exports.contentInitial = contentInitial;
	exports.disable = disable;
	exports.document = document$2;
	exports.flow = flow$3;
	exports.flowInitial = flowInitial;
	exports.insideSpan = insideSpan;
	exports.string = string;
	exports.text = text$3;
}));
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var content = require_content$1();
	var document$1 = require_document();
	var flow$2 = require_flow();
	var text$2 = require_text();
	var combineExtensions = require_combine_extensions();
	var createTokenizer = require_create_tokenizer();
	var miniflat = require_miniflat();
	var constructs = require_constructs();
	function parse$1(options) {
		var settings = options || {};
		var parser$1 = {
			defined: [],
			constructs: combineExtensions([constructs].concat(miniflat(settings.extensions))),
			content: create$2(content),
			document: create$2(document$1),
			flow: create$2(flow$2),
			string: create$2(text$2.string),
			text: create$2(text$2.text)
		};
		return parser$1;
		function create$2(initializer) {
			return creator;
			function creator(from) {
				return createTokenizer(parser$1, initializer, from);
			}
		}
	}
	module.exports = parse$1;
}));
var require_preprocess = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var search$1 = /[\0\t\n\r]/g;
	function preprocess() {
		var start = true;
		var column = 1;
		var buffer$2 = "";
		var atCarriageReturn;
		return preprocessor$1;
		function preprocessor$1(value, encoding, end) {
			var chunks = [];
			var match;
			var next;
			var startPosition;
			var endPosition;
			var code$2;
			value = buffer$2 + value.toString(encoding);
			startPosition = 0;
			buffer$2 = "";
			if (start) {
				if (value.charCodeAt(0) === 65279) startPosition++;
				start = void 0;
			}
			while (startPosition < value.length) {
				search$1.lastIndex = startPosition;
				match = search$1.exec(value);
				endPosition = match ? match.index : value.length;
				code$2 = value.charCodeAt(endPosition);
				if (!match) {
					buffer$2 = value.slice(startPosition);
					break;
				}
				if (code$2 === 10 && startPosition === endPosition && atCarriageReturn) {
					chunks.push(-3);
					atCarriageReturn = void 0;
				} else {
					if (atCarriageReturn) {
						chunks.push(-5);
						atCarriageReturn = void 0;
					}
					if (startPosition < endPosition) {
						chunks.push(value.slice(startPosition, endPosition));
						column += endPosition - startPosition;
					}
					if (code$2 === 0) {
						chunks.push(65533);
						column++;
					} else if (code$2 === 9) {
						next = Math.ceil(column / 4) * 4;
						chunks.push(-2);
						while (column++ < next) chunks.push(-1);
					} else if (code$2 === 10) {
						chunks.push(-4);
						column = 1;
					} else {
						atCarriageReturn = true;
						column = 1;
					}
				}
				startPosition = endPosition + 1;
			}
			if (end) {
				if (atCarriageReturn) chunks.push(-5);
				if (buffer$2) chunks.push(buffer$2);
				chunks.push(null);
			}
			return chunks;
		}
	}
	module.exports = preprocess;
}));
var require_postprocess = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var subtokenize = require_subtokenize();
	function postprocess$1(events) {
		while (!subtokenize(events));
		return events;
	}
	module.exports = postprocess$1;
}));
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = fromMarkdown$3;
	var toString = require_mdast_util_to_string();
	var assign = require_assign();
	var own$1 = require_has_own_property();
	var normalizeIdentifier = require_normalize_identifier();
	var safeFromInt = require_safe_from_int();
	var parser = require_parse();
	var preprocessor = require_preprocess();
	var postprocess = require_postprocess();
	var decode = require_decode_entity_browser();
	var stringifyPosition = require_unist_util_stringify_position();
	function fromMarkdown$3(value, encoding, options) {
		if (typeof encoding !== "string") {
			options = encoding;
			encoding = void 0;
		}
		return compiler(options)(postprocess(parser(options).document().write(preprocessor()(value, encoding, true))));
	}
	function compiler(options) {
		var settings = options || {};
		var config = configure$3({
			transforms: [],
			canContainEols: [
				"emphasis",
				"fragment",
				"heading",
				"paragraph",
				"strong"
			],
			enter: {
				autolink: opener(link),
				autolinkProtocol: onenterdata,
				autolinkEmail: onenterdata,
				atxHeading: opener(heading),
				blockQuote: opener(blockQuote$2),
				characterEscape: onenterdata,
				characterReference: onenterdata,
				codeFenced: opener(codeFlow),
				codeFencedFenceInfo: buffer$2,
				codeFencedFenceMeta: buffer$2,
				codeIndented: opener(codeFlow, buffer$2),
				codeText: opener(codeText$2, buffer$2),
				codeTextData: onenterdata,
				data: onenterdata,
				codeFlowValue: onenterdata,
				definition: opener(definition$2),
				definitionDestinationString: buffer$2,
				definitionLabelString: buffer$2,
				definitionTitleString: buffer$2,
				emphasis: opener(emphasis),
				hardBreakEscape: opener(hardBreak),
				hardBreakTrailing: opener(hardBreak),
				htmlFlow: opener(html$1, buffer$2),
				htmlFlowData: onenterdata,
				htmlText: opener(html$1, buffer$2),
				htmlTextData: onenterdata,
				image: opener(image$1),
				label: buffer$2,
				link: opener(link),
				listItem: opener(listItem$1),
				listItemValue: onenterlistitemvalue,
				listOrdered: opener(list$2, onenterlistordered),
				listUnordered: opener(list$2),
				paragraph: opener(paragraph$1),
				reference: onenterreference,
				referenceString: buffer$2,
				resourceDestinationString: buffer$2,
				resourceTitleString: buffer$2,
				setextHeading: opener(heading),
				strong: opener(strong),
				thematicBreak: opener(thematicBreak$3)
			},
			exit: {
				atxHeading: closer(),
				atxHeadingSequence: onexitatxheadingsequence,
				autolink: closer(),
				autolinkEmail: onexitautolinkemail,
				autolinkProtocol: onexitautolinkprotocol,
				blockQuote: closer(),
				characterEscapeValue: onexitdata,
				characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
				characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
				characterReferenceValue: onexitcharacterreferencevalue,
				codeFenced: closer(onexitcodefenced),
				codeFencedFence: onexitcodefencedfence,
				codeFencedFenceInfo: onexitcodefencedfenceinfo,
				codeFencedFenceMeta: onexitcodefencedfencemeta,
				codeFlowValue: onexitdata,
				codeIndented: closer(onexitcodeindented),
				codeText: closer(onexitcodetext),
				codeTextData: onexitdata,
				data: onexitdata,
				definition: closer(),
				definitionDestinationString: onexitdefinitiondestinationstring,
				definitionLabelString: onexitdefinitionlabelstring,
				definitionTitleString: onexitdefinitiontitlestring,
				emphasis: closer(),
				hardBreakEscape: closer(onexithardbreak),
				hardBreakTrailing: closer(onexithardbreak),
				htmlFlow: closer(onexithtmlflow),
				htmlFlowData: onexitdata,
				htmlText: closer(onexithtmltext),
				htmlTextData: onexitdata,
				image: closer(onexitimage),
				label: onexitlabel,
				labelText: onexitlabeltext,
				lineEnding: onexitlineending,
				link: closer(onexitlink),
				listItem: closer(),
				listOrdered: closer(),
				listUnordered: closer(),
				paragraph: closer(),
				referenceString: onexitreferencestring,
				resourceDestinationString: onexitresourcedestinationstring,
				resourceTitleString: onexitresourcetitlestring,
				resource: onexitresource,
				setextHeading: closer(onexitsetextheading),
				setextHeadingLineSequence: onexitsetextheadinglinesequence,
				setextHeadingText: onexitsetextheadingtext,
				strong: closer(),
				thematicBreak: closer()
			}
		}, settings.mdastExtensions || []);
		var data = {};
		return compile;
		function compile(events) {
			var tree = {
				type: "root",
				children: []
			};
			var stack = [tree];
			var tokenStack = [];
			var listStack = [];
			var index$1 = -1;
			var handler;
			var listStart;
			var context = {
				stack,
				tokenStack,
				config,
				enter,
				exit: exit$2,
				buffer: buffer$2,
				resume,
				setData,
				getData
			};
			while (++index$1 < events.length) if (events[index$1][1].type === "listOrdered" || events[index$1][1].type === "listUnordered") if (events[index$1][0] === "enter") listStack.push(index$1);
			else {
				listStart = listStack.pop(index$1);
				index$1 = prepareList(events, listStart, index$1);
			}
			index$1 = -1;
			while (++index$1 < events.length) {
				handler = config[events[index$1][0]];
				if (own$1.call(handler, events[index$1][1].type)) handler[events[index$1][1].type].call(assign({ sliceSerialize: events[index$1][2].sliceSerialize }, context), events[index$1][1]);
			}
			if (tokenStack.length) throw new Error("Cannot close document, a token (`" + tokenStack[tokenStack.length - 1].type + "`, " + stringifyPosition({
				start: tokenStack[tokenStack.length - 1].start,
				end: tokenStack[tokenStack.length - 1].end
			}) + ") is still open");
			tree.position = {
				start: point$1(events.length ? events[0][1].start : {
					line: 1,
					column: 1,
					offset: 0
				}),
				end: point$1(events.length ? events[events.length - 2][1].end : {
					line: 1,
					column: 1,
					offset: 0
				})
			};
			index$1 = -1;
			while (++index$1 < config.transforms.length) tree = config.transforms[index$1](tree) || tree;
			return tree;
		}
		function prepareList(events, start, length) {
			var index$1 = start - 1;
			var containerBalance = -1;
			var listSpread = false;
			var listItem$2;
			var tailIndex;
			var lineIndex;
			var tailEvent;
			var event;
			var firstBlankLineIndex;
			var atMarker;
			while (++index$1 <= length) {
				event = events[index$1];
				if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
					if (event[0] === "enter") containerBalance++;
					else containerBalance--;
					atMarker = void 0;
				} else if (event[1].type === "lineEndingBlank") {
					if (event[0] === "enter") {
						if (listItem$2 && !atMarker && !containerBalance && !firstBlankLineIndex) firstBlankLineIndex = index$1;
						atMarker = void 0;
					}
				} else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace") {} else atMarker = void 0;
				if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
					if (listItem$2) {
						tailIndex = index$1;
						lineIndex = void 0;
						while (tailIndex--) {
							tailEvent = events[tailIndex];
							if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
								if (tailEvent[0] === "exit") continue;
								if (lineIndex) {
									events[lineIndex][1].type = "lineEndingBlank";
									listSpread = true;
								}
								tailEvent[1].type = "lineEnding";
								lineIndex = tailIndex;
							} else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {} else break;
						}
						if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) listItem$2._spread = true;
						listItem$2.end = point$1(lineIndex ? events[lineIndex][1].start : event[1].end);
						events.splice(lineIndex || index$1, 0, [
							"exit",
							listItem$2,
							event[2]
						]);
						index$1++;
						length++;
					}
					if (event[1].type === "listItemPrefix") {
						listItem$2 = {
							type: "listItem",
							_spread: false,
							start: point$1(event[1].start)
						};
						events.splice(index$1, 0, [
							"enter",
							listItem$2,
							event[2]
						]);
						index$1++;
						length++;
						firstBlankLineIndex = void 0;
						atMarker = true;
					}
				}
			}
			events[start][1]._spread = listSpread;
			return length;
		}
		function setData(key, value) {
			data[key] = value;
		}
		function getData(key) {
			return data[key];
		}
		function point$1(d) {
			return {
				line: d.line,
				column: d.column,
				offset: d.offset
			};
		}
		function opener(create$2, and) {
			return open;
			function open(token) {
				enter.call(this, create$2(token), token);
				if (and) and.call(this, token);
			}
		}
		function buffer$2() {
			this.stack.push({
				type: "fragment",
				children: []
			});
		}
		function enter(node$1, token) {
			this.stack[this.stack.length - 1].children.push(node$1);
			this.stack.push(node$1);
			this.tokenStack.push(token);
			node$1.position = { start: point$1(token.start) };
			return node$1;
		}
		function closer(and) {
			return close;
			function close(token) {
				if (and) and.call(this, token);
				exit$2.call(this, token);
			}
		}
		function exit$2(token) {
			var node$1 = this.stack.pop();
			var open = this.tokenStack.pop();
			if (!open) throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
				start: token.start,
				end: token.end
			}) + "): it’s not open");
			else if (open.type !== token.type) throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
				start: token.start,
				end: token.end
			}) + "): a different token (`" + open.type + "`, " + stringifyPosition({
				start: open.start,
				end: open.end
			}) + ") is open");
			node$1.position.end = point$1(token.end);
			return node$1;
		}
		function resume() {
			return toString(this.stack.pop());
		}
		function onenterlistordered() {
			setData("expectingFirstListItemValue", true);
		}
		function onenterlistitemvalue(token) {
			if (getData("expectingFirstListItemValue")) {
				this.stack[this.stack.length - 2].start = parseInt(this.sliceSerialize(token), 10);
				setData("expectingFirstListItemValue");
			}
		}
		function onexitcodefencedfenceinfo() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].lang = data$1;
		}
		function onexitcodefencedfencemeta() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].meta = data$1;
		}
		function onexitcodefencedfence() {
			if (getData("flowCodeInside")) return;
			this.buffer();
			setData("flowCodeInside", true);
		}
		function onexitcodefenced() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].value = data$1.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
			setData("flowCodeInside");
		}
		function onexitcodeindented() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].value = data$1;
		}
		function onexitdefinitionlabelstring(token) {
			var label = this.resume();
			this.stack[this.stack.length - 1].label = label;
			this.stack[this.stack.length - 1].identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		}
		function onexitdefinitiontitlestring() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].title = data$1;
		}
		function onexitdefinitiondestinationstring() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].url = data$1;
		}
		function onexitatxheadingsequence(token) {
			if (!this.stack[this.stack.length - 1].depth) this.stack[this.stack.length - 1].depth = this.sliceSerialize(token).length;
		}
		function onexitsetextheadingtext() {
			setData("setextHeadingSlurpLineEnding", true);
		}
		function onexitsetextheadinglinesequence(token) {
			this.stack[this.stack.length - 1].depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
		}
		function onexitsetextheading() {
			setData("setextHeadingSlurpLineEnding");
		}
		function onenterdata(token) {
			var siblings = this.stack[this.stack.length - 1].children;
			var tail = siblings[siblings.length - 1];
			if (!tail || tail.type !== "text") {
				tail = text$5();
				tail.position = { start: point$1(token.start) };
				this.stack[this.stack.length - 1].children.push(tail);
			}
			this.stack.push(tail);
		}
		function onexitdata(token) {
			var tail = this.stack.pop();
			tail.value += this.sliceSerialize(token);
			tail.position.end = point$1(token.end);
		}
		function onexitlineending(token) {
			var context = this.stack[this.stack.length - 1];
			if (getData("atHardBreak")) {
				context.children[context.children.length - 1].position.end = point$1(token.end);
				setData("atHardBreak");
				return;
			}
			if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.indexOf(context.type) > -1) {
				onenterdata.call(this, token);
				onexitdata.call(this, token);
			}
		}
		function onexithardbreak() {
			setData("atHardBreak", true);
		}
		function onexithtmlflow() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].value = data$1;
		}
		function onexithtmltext() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].value = data$1;
		}
		function onexitcodetext() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].value = data$1;
		}
		function onexitlink() {
			var context = this.stack[this.stack.length - 1];
			if (getData("inReference")) {
				context.type += "Reference";
				context.referenceType = getData("referenceType") || "shortcut";
				delete context.url;
				delete context.title;
			} else {
				delete context.identifier;
				delete context.label;
				delete context.referenceType;
			}
			setData("referenceType");
		}
		function onexitimage() {
			var context = this.stack[this.stack.length - 1];
			if (getData("inReference")) {
				context.type += "Reference";
				context.referenceType = getData("referenceType") || "shortcut";
				delete context.url;
				delete context.title;
			} else {
				delete context.identifier;
				delete context.label;
				delete context.referenceType;
			}
			setData("referenceType");
		}
		function onexitlabeltext(token) {
			this.stack[this.stack.length - 2].identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		}
		function onexitlabel() {
			var fragment = this.stack[this.stack.length - 1];
			var value = this.resume();
			this.stack[this.stack.length - 1].label = value;
			setData("inReference", true);
			if (this.stack[this.stack.length - 1].type === "link") this.stack[this.stack.length - 1].children = fragment.children;
			else this.stack[this.stack.length - 1].alt = value;
		}
		function onexitresourcedestinationstring() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].url = data$1;
		}
		function onexitresourcetitlestring() {
			var data$1 = this.resume();
			this.stack[this.stack.length - 1].title = data$1;
		}
		function onexitresource() {
			setData("inReference");
		}
		function onenterreference() {
			setData("referenceType", "collapsed");
		}
		function onexitreferencestring(token) {
			var label = this.resume();
			this.stack[this.stack.length - 1].label = label;
			this.stack[this.stack.length - 1].identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
			setData("referenceType", "full");
		}
		function onexitcharacterreferencemarker(token) {
			setData("characterReferenceType", token.type);
		}
		function onexitcharacterreferencevalue(token) {
			var data$1 = this.sliceSerialize(token);
			var type = getData("characterReferenceType");
			var value;
			var tail;
			if (type) {
				value = safeFromInt(data$1, type === "characterReferenceMarkerNumeric" ? 10 : 16);
				setData("characterReferenceType");
			} else value = decode(data$1);
			tail = this.stack.pop();
			tail.value += value;
			tail.position.end = point$1(token.end);
		}
		function onexitautolinkprotocol(token) {
			onexitdata.call(this, token);
			this.stack[this.stack.length - 1].url = this.sliceSerialize(token);
		}
		function onexitautolinkemail(token) {
			onexitdata.call(this, token);
			this.stack[this.stack.length - 1].url = "mailto:" + this.sliceSerialize(token);
		}
		function blockQuote$2() {
			return {
				type: "blockquote",
				children: []
			};
		}
		function codeFlow() {
			return {
				type: "code",
				lang: null,
				meta: null,
				value: ""
			};
		}
		function codeText$2() {
			return {
				type: "inlineCode",
				value: ""
			};
		}
		function definition$2() {
			return {
				type: "definition",
				identifier: "",
				label: null,
				title: null,
				url: ""
			};
		}
		function emphasis() {
			return {
				type: "emphasis",
				children: []
			};
		}
		function heading() {
			return {
				type: "heading",
				depth: void 0,
				children: []
			};
		}
		function hardBreak() {
			return { type: "break" };
		}
		function html$1() {
			return {
				type: "html",
				value: ""
			};
		}
		function image$1() {
			return {
				type: "image",
				title: null,
				url: "",
				alt: null
			};
		}
		function link() {
			return {
				type: "link",
				title: null,
				url: "",
				children: []
			};
		}
		function list$2(token) {
			return {
				type: "list",
				ordered: token.type === "listOrdered",
				start: null,
				spread: token._spread,
				children: []
			};
		}
		function listItem$1(token) {
			return {
				type: "listItem",
				spread: token._spread,
				checked: null,
				children: []
			};
		}
		function paragraph$1() {
			return {
				type: "paragraph",
				children: []
			};
		}
		function strong() {
			return {
				type: "strong",
				children: []
			};
		}
		function text$5() {
			return {
				type: "text",
				value: ""
			};
		}
		function thematicBreak$3() {
			return { type: "thematicBreak" };
		}
	}
	function configure$3(config, extensions) {
		var index$1 = -1;
		while (++index$1 < extensions.length) extension$1(config, extensions[index$1]);
		return config;
	}
	function extension$1(config, extension$3) {
		var key;
		var left;
		for (key in extension$3) {
			left = own$1.call(config, key) ? config[key] : config[key] = {};
			if (key === "canContainEols" || key === "transforms") config[key] = [].concat(left, extension$3[key]);
			else Object.assign(left, extension$3[key]);
		}
	}
}));
var require_mdast_util_from_markdown = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_dist();
}));
var require_remark_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = parse;
	var fromMarkdown$2 = require_mdast_util_from_markdown();
	function parse(options) {
		var self = this;
		this.Parser = parse$2;
		function parse$2(doc) {
			return fromMarkdown$2(doc, Object.assign({}, self.data("settings"), options, {
				extensions: self.data("micromarkExtensions") || [],
				mdastExtensions: self.data("fromMarkdownExtensions") || []
			}));
		}
	}
}));
var languageMap_exports = /* @__PURE__ */ __export({
	R: () => "r",
	Rscript: () => "r",
	abap: () => abap,
	bash: () => bash,
	bsdmake: () => bsdmake,
	c_cpp: () => "c++",
	cake: () => "c#",
	cakescript: () => "c#",
	clojure: () => clojure,
	coffee: () => coffee,
	cperl: () => cperl,
	cpp: () => "c++",
	csharp: () => "c#",
	css: () => "css",
	cucumber: () => cucumber,
	dart: () => dart,
	default: () => languageMap_default,
	delphi: () => delphi,
	diff: () => diff,
	dockerfile: () => dockerfile,
	elixir: () => elixir,
	elm: () => "elm",
	erlang: () => erlang,
	fsharp: () => "f#",
	glsl: () => glsl,
	golang: () => "go",
	groovy: () => groovy,
	haskell: () => haskell,
	html: () => html,
	inc: () => "php",
	java: () => java,
	javascript: () => javascript,
	jruby: () => jruby,
	js: () => js,
	json: () => json,
	julia: () => julia,
	latex: () => latex,
	less: () => less,
	lisp: () => lisp,
	livescript: () => livescript,
	ls: () => ls,
	lua: () => "lua",
	macruby: () => macruby,
	make: () => make,
	makefile: () => makefile,
	markdown: () => markdown,
	matlab: () => matlab,
	mf: () => mf,
	nix: () => "nix",
	nixos: () => "nix",
	node: () => node,
	objc: () => objc,
	objectivec: () => objectivec,
	objectpascal: () => objectpascal,
	ocaml: () => ocaml,
	octave: () => octave,
	pandoc: () => pandoc,
	pascal: () => pascal,
	perl: () => perl,
	php: () => "php",
	posh: () => posh,
	powershell: () => powershell,
	prolog: () => prolog,
	protobuf: () => protobuf,
	pwsh: () => pwsh,
	python: () => python,
	python3: () => python3,
	r: () => "r",
	rake: () => rake,
	rb: () => rb,
	rbx: () => rbx,
	rs: () => rs,
	rss: () => "xml",
	ruby: () => ruby,
	rust: () => rust,
	rusthon: () => rusthon,
	sass: () => sass,
	scala: () => scala,
	scheme: () => scheme,
	scss: () => scss,
	sh: () => sh,
	splus: () => "r",
	sql: () => "sql",
	tex: () => tex,
	text: () => text$1,
	ts: () => ts,
	typescript: () => typescript,
	udiff: () => udiff,
	vbnet: () => vbnet,
	verilog: () => verilog,
	vhdl: () => vhdl,
	wasm: () => wasm,
	wast: () => wast,
	wsdl: () => "xml",
	xhtml: () => xhtml,
	xml: () => "xml",
	xsd: () => "xml",
	yaml: () => yaml,
	yml: () => yml,
	zsh: () => zsh
}, 1), abap, sh, bash, zsh, text$1, clojure, coffee, dart, diff, udiff, dockerfile, elixir, erlang, cucumber, glsl, groovy, haskell, html, xhtml, java, javascript, js, node, json, julia, tex, latex, less, lisp, livescript, ls, makefile, bsdmake, make, mf, markdown, pandoc, matlab, octave, objectivec, objc, ocaml, pascal, delphi, objectpascal, perl, cperl, powershell, posh, pwsh, prolog, protobuf, python, python3, rusthon, rust, ruby, jruby, macruby, rake, rb, rbx, rs, sass, scala, scheme, scss, typescript, ts, vbnet, verilog, vhdl, wast, wasm, yaml, yml, languageMap_default;
var init_languageMap = __esmMin((() => {
	abap = "abap";
	sh = "shell";
	bash = "shell";
	zsh = "shell";
	text$1 = "vb.net";
	clojure = "clojure";
	coffee = "coffeescript";
	dart = "dart";
	diff = "diff";
	udiff = "diff";
	dockerfile = "docker";
	elixir = "elixir";
	erlang = "erlang";
	cucumber = "gherkin";
	glsl = "glsl";
	groovy = "groovy";
	haskell = "haskell";
	html = "html";
	xhtml = "html";
	java = "java/c/c++/c#";
	javascript = "javascript";
	js = "javascript";
	node = "javascript";
	json = "json";
	julia = "julia";
	tex = "latex";
	latex = "latex";
	less = "less";
	lisp = "webassembly";
	livescript = "livescript";
	ls = "livescript";
	makefile = "makefile";
	bsdmake = "makefile";
	make = "makefile";
	mf = "makefile";
	markdown = "markdown";
	pandoc = "markdown";
	matlab = "matlab";
	octave = "matlab";
	objectivec = "objective-c";
	objc = "objective-c";
	ocaml = "ocaml";
	pascal = "pascal";
	delphi = "pascal";
	objectpascal = "pascal";
	perl = "perl";
	cperl = "perl";
	powershell = "powershell";
	posh = "powershell";
	pwsh = "powershell";
	prolog = "prolog";
	protobuf = "protobuf";
	python = "python";
	python3 = "python";
	rusthon = "python";
	rust = "rust";
	ruby = "ruby";
	jruby = "ruby";
	macruby = "ruby";
	rake = "ruby";
	rb = "ruby";
	rbx = "ruby";
	rs = "rust";
	sass = "sass";
	scala = "scala";
	scheme = "scheme";
	scss = "scss";
	typescript = "typescript";
	ts = "typescript";
	vbnet = "vb.net";
	verilog = "verilog";
	vhdl = "vhdl";
	wast = "webassembly";
	wasm = "webassembly";
	yaml = "yaml";
	yml = "yaml";
	languageMap_default = {
		abap,
		sh,
		"shell-script": "shell",
		bash,
		zsh,
		text: text$1,
		c_cpp: "c++",
		clojure,
		coffee,
		"coffee-script": "coffeescript",
		cpp: "c++",
		csharp: "c#",
		cake: "c#",
		cakescript: "c#",
		css: "css",
		dart,
		diff,
		udiff,
		dockerfile,
		elixir,
		elm: "elm",
		erlang,
		fsharp: "f#",
		cucumber,
		glsl,
		golang: "go",
		groovy,
		haskell,
		html,
		xhtml,
		java,
		javascript,
		js,
		node,
		json,
		julia,
		tex,
		latex,
		less,
		lisp,
		livescript,
		"live-script": "livescript",
		ls,
		lua: "lua",
		makefile,
		bsdmake,
		make,
		mf,
		markdown,
		pandoc,
		matlab,
		octave,
		nix: "nix",
		nixos: "nix",
		objectivec,
		"obj-c": "objective-c",
		objc,
		ocaml,
		pascal,
		delphi,
		objectpascal,
		perl,
		cperl,
		php: "php",
		inc: "php",
		powershell,
		posh,
		pwsh,
		prolog,
		protobuf,
		"Protocol Buffers": "protobuf",
		python,
		python3,
		rusthon,
		r: "r",
		R: "r",
		Rscript: "r",
		splus: "r",
		rust,
		ruby,
		jruby,
		macruby,
		rake,
		rb,
		rbx,
		rs,
		sass,
		scala,
		scheme,
		scss,
		sql: "sql",
		typescript,
		ts,
		"visual basic": "vb.net",
		vbnet,
		"vb .net": "vb.net",
		"vb.net": "vb.net",
		verilog,
		vhdl,
		wast,
		wasm,
		xml: "xml",
		rss: "xml",
		xsd: "xml",
		wsdl: "xml",
		yaml,
		yml
	};
}));
var require_common = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isSupportedCodeLang = exports.SUPPORTED_CODE_BLOCK_LANGUAGES = exports.richText = exports.LIMITS = void 0;
	exports.LIMITS = {
		PAYLOAD_BLOCKS: 1e3,
		RICH_TEXT_ARRAYS: 100,
		RICH_TEXT: {
			TEXT_CONTENT: 2e3,
			LINK_URL: 1e3,
			EQUATION_EXPRESSION: 1e3
		}
	};
	function richText(content$3, options = {}) {
		const annotations = {
			bold: false,
			strikethrough: false,
			underline: false,
			italic: false,
			code: false,
			color: "default",
			...options.annotations || {}
		};
		if (options.type === "equation") return {
			type: "equation",
			annotations,
			equation: { expression: content$3 }
		};
		else return {
			type: "text",
			annotations,
			text: {
				content: content$3,
				link: options.url ? {
					type: "url",
					url: options.url
				} : void 0
			}
		};
	}
	exports.richText = richText;
	exports.SUPPORTED_CODE_BLOCK_LANGUAGES = [
		"abap",
		"arduino",
		"bash",
		"basic",
		"c",
		"clojure",
		"coffeescript",
		"c++",
		"c#",
		"css",
		"dart",
		"diff",
		"docker",
		"elixir",
		"elm",
		"erlang",
		"flow",
		"fortran",
		"f#",
		"gherkin",
		"glsl",
		"go",
		"graphql",
		"groovy",
		"haskell",
		"html",
		"java",
		"javascript",
		"json",
		"julia",
		"kotlin",
		"latex",
		"less",
		"lisp",
		"livescript",
		"lua",
		"makefile",
		"markdown",
		"markup",
		"matlab",
		"mermaid",
		"nix",
		"objective-c",
		"ocaml",
		"pascal",
		"perl",
		"php",
		"plain text",
		"powershell",
		"prolog",
		"protobuf",
		"python",
		"r",
		"reason",
		"ruby",
		"rust",
		"sass",
		"scala",
		"scheme",
		"scss",
		"shell",
		"sql",
		"swift",
		"typescript",
		"vb.net",
		"verilog",
		"vhdl",
		"visual basic",
		"webassembly",
		"xml",
		"yaml",
		"java/c/c++/c#"
	];
	function isSupportedCodeLang(lang) {
		return exports.SUPPORTED_CODE_BLOCK_LANGUAGES.includes(lang);
	}
	exports.isSupportedCodeLang = isSupportedCodeLang;
}));
var require_blocks = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.equation = exports.tableRow = exports.table = exports.toDo = exports.numberedListItem = exports.bulletedListItem = exports.headingThree = exports.headingTwo = exports.headingOne = exports.table_of_contents = exports.image = exports.blockquote = exports.code = exports.paragraph = void 0;
	var common_1 = require_common();
	function paragraph(text$5) {
		return {
			object: "block",
			type: "paragraph",
			paragraph: { rich_text: text$5 }
		};
	}
	exports.paragraph = paragraph;
	function code$1(text$5, lang = "plain text") {
		return {
			object: "block",
			type: "code",
			code: {
				rich_text: text$5,
				language: lang
			}
		};
	}
	exports.code = code$1;
	function blockquote(text$5 = [], children = []) {
		return {
			object: "block",
			type: "quote",
			quote: {
				rich_text: text$5.length ? text$5 : [(0, common_1.richText)("")],
				children
			}
		};
	}
	exports.blockquote = blockquote;
	function image(url) {
		return {
			object: "block",
			type: "image",
			image: {
				type: "external",
				external: { url }
			}
		};
	}
	exports.image = image;
	function table_of_contents() {
		return {
			object: "block",
			type: "table_of_contents",
			table_of_contents: {}
		};
	}
	exports.table_of_contents = table_of_contents;
	function headingOne(text$5) {
		return {
			object: "block",
			type: "heading_1",
			heading_1: { rich_text: text$5 }
		};
	}
	exports.headingOne = headingOne;
	function headingTwo(text$5) {
		return {
			object: "block",
			type: "heading_2",
			heading_2: { rich_text: text$5 }
		};
	}
	exports.headingTwo = headingTwo;
	function headingThree(text$5) {
		return {
			object: "block",
			type: "heading_3",
			heading_3: { rich_text: text$5 }
		};
	}
	exports.headingThree = headingThree;
	function bulletedListItem(text$5, children = []) {
		return {
			object: "block",
			type: "bulleted_list_item",
			bulleted_list_item: {
				rich_text: text$5,
				children: children.length ? children : void 0
			}
		};
	}
	exports.bulletedListItem = bulletedListItem;
	function numberedListItem(text$5, children = []) {
		return {
			object: "block",
			type: "numbered_list_item",
			numbered_list_item: {
				rich_text: text$5,
				children: children.length ? children : void 0
			}
		};
	}
	exports.numberedListItem = numberedListItem;
	function toDo(checked, text$5, children = []) {
		return {
			object: "block",
			type: "to_do",
			to_do: {
				rich_text: text$5,
				checked,
				children: children.length ? children : void 0
			}
		};
	}
	exports.toDo = toDo;
	function table$3(children, tableWidth) {
		return {
			object: "block",
			type: "table",
			table: {
				table_width: tableWidth,
				has_column_header: true,
				children: (children === null || children === void 0 ? void 0 : children.length) ? children : []
			}
		};
	}
	exports.table = table$3;
	function tableRow(cells = []) {
		return {
			object: "block",
			type: "table_row",
			table_row: { cells: cells.length ? cells : [] }
		};
	}
	exports.tableRow = tableRow;
	function equation(value) {
		return {
			type: "equation",
			equation: { expression: value }
		};
	}
	exports.equation = equation;
}));
var require_notion = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$1 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p$1 in m) if (p$1 !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p$1)) __createBinding$1(exports$1, m, p$1);
	};
	var __importDefault$2 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseCodeLanguage = void 0;
	var languageMap_json_1 = __importDefault$2((init_languageMap(), __toCommonJS(languageMap_exports).default));
	__exportStar(require_blocks(), exports);
	__exportStar(require_common(), exports);
	function parseCodeLanguage(lang) {
		return lang ? languageMap_json_1.default[lang.toLowerCase()] : void 0;
	}
	exports.parseCodeLanguage = parseCodeLanguage;
}));
var require_internal = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	var __importDefault$1 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseRichText = exports.parseBlocks = void 0;
	var notion = __importStar(require_notion());
	var path_1 = __importDefault$1(require___vite_browser_external());
	var url_1 = require___vite_browser_external();
	var notion_1 = require_notion();
	function ensureLength(text$5, copy) {
		return (text$5.match(/[^]{1,2000}/g) || []).flatMap((item) => notion.richText(item, copy));
	}
	function ensureCodeBlockLanguage(lang) {
		if (lang) {
			lang = lang.toLowerCase();
			return (0, notion_1.isSupportedCodeLang)(lang) ? lang : notion.parseCodeLanguage(lang);
		}
	}
	function parseInline(element, options) {
		var _a;
		const copy = {
			annotations: { ...(_a = options === null || options === void 0 ? void 0 : options.annotations) !== null && _a !== void 0 ? _a : {} },
			url: options === null || options === void 0 ? void 0 : options.url
		};
		switch (element.type) {
			case "text": return ensureLength(element.value, copy);
			case "delete":
				copy.annotations.strikethrough = true;
				return element.children.flatMap((child) => parseInline(child, copy));
			case "emphasis":
				copy.annotations.italic = true;
				return element.children.flatMap((child) => parseInline(child, copy));
			case "strong":
				copy.annotations.bold = true;
				return element.children.flatMap((child) => parseInline(child, copy));
			case "link":
				copy.url = element.url;
				return element.children.flatMap((child) => parseInline(child, copy));
			case "inlineCode":
				copy.annotations.code = true;
				return [notion.richText(element.value, copy)];
			case "inlineMath": return [notion.richText(element.value, {
				...copy,
				type: "equation"
			})];
			default: return [];
		}
	}
	function parseImage(image$1, options) {
		var _a;
		const allowedTypes = [
			".png",
			".jpg",
			".jpeg",
			".gif",
			".tif",
			".tiff",
			".bmp",
			".svg",
			".heic"
		];
		function dealWithError() {
			return notion.paragraph([notion.richText(image$1.url)]);
		}
		try {
			if ((_a = options.strictImageUrls) !== null && _a !== void 0 ? _a : true) {
				const parsedUrl = new url_1.URL(image$1.url);
				const fileType = path_1.default.extname(parsedUrl.pathname);
				if (allowedTypes.includes(fileType)) return notion.image(image$1.url);
				else return dealWithError();
			} else return notion.image(image$1.url);
		} catch (error) {
			return dealWithError();
		}
	}
	function parseParagraph(element, options) {
		if (element.children.length > 2 && element.children[0].type === "text" && element.children[0].value === "[[" && element.children[1].type === "emphasis") {
			if (element.children[1].children[0].value === "TOC") return [notion.table_of_contents()];
		}
		const images = [];
		const paragraphs = [];
		element.children.forEach((item) => {
			if (item.type === "image") images.push(parseImage(item, options));
			else {
				const richText$1 = parseInline(item);
				if (richText$1.length) paragraphs.push(richText$1);
			}
		});
		if (paragraphs.length) return [notion.paragraph(paragraphs.flat()), ...images];
		else return images;
	}
	function parseBlockquote(element, options) {
		const children = element.children.flatMap((child) => parseNode(child, options));
		return notion.blockquote([], children);
	}
	function parseHeading(element) {
		const text$5 = element.children.flatMap((child) => parseInline(child));
		switch (element.depth) {
			case 1: return notion.headingOne(text$5);
			case 2: return notion.headingTwo(text$5);
			default: return notion.headingThree(text$5);
		}
	}
	function parseCode(element) {
		const text$5 = ensureLength(element.value);
		const lang = ensureCodeBlockLanguage(element.lang);
		return notion.code(text$5, lang);
	}
	function parseList(element, options) {
		return element.children.flatMap((item) => {
			const paragraph$1 = item.children.shift();
			if (paragraph$1 === void 0 || paragraph$1.type !== "paragraph") return [];
			const text$5 = paragraph$1.children.flatMap((child) => parseInline(child));
			const parsedChildren = item.children.flatMap((child) => parseNode(child, options));
			if (element.start !== null && element.start !== void 0) return [notion.numberedListItem(text$5, parsedChildren)];
			else if (item.checked !== null && item.checked !== void 0) return [notion.toDo(item.checked, text$5, parsedChildren)];
			else return [notion.bulletedListItem(text$5, parsedChildren)];
		});
	}
	function parseTableCell(node$1) {
		return [node$1.children.flatMap((child) => parseInline(child))];
	}
	function parseTableRow(node$1) {
		const tableCells = node$1.children.flatMap((child) => parseTableCell(child));
		return [notion.tableRow(tableCells)];
	}
	function parseTable(node$1) {
		var _a;
		const tableWidth = ((_a = node$1.children) === null || _a === void 0 ? void 0 : _a.length) ? node$1.children[0].children.length : 0;
		const tableRows = node$1.children.flatMap((child) => parseTableRow(child));
		return [notion.table(tableRows, tableWidth)];
	}
	function parseMath(node$1) {
		const textWithKatexNewlines = node$1.value.split("\n").join("\\\\\n");
		return notion.equation(textWithKatexNewlines);
	}
	function parseNode(node$1, options) {
		switch (node$1.type) {
			case "heading": return [parseHeading(node$1)];
			case "paragraph": return parseParagraph(node$1, options);
			case "code": return [parseCode(node$1)];
			case "blockquote": return [parseBlockquote(node$1, options)];
			case "list": return parseList(node$1, options);
			case "table": return parseTable(node$1);
			case "math": return [parseMath(node$1)];
			default: return [];
		}
	}
	function parseBlocks(root, options) {
		var _a, _b, _c, _d;
		const parsed = root.children.flatMap((item) => parseNode(item, options || {}));
		const truncate = !!((_b = (_a = options === null || options === void 0 ? void 0 : options.notionLimits) === null || _a === void 0 ? void 0 : _a.truncate) !== null && _b !== void 0 ? _b : true), limitCallback = (_d = (_c = options === null || options === void 0 ? void 0 : options.notionLimits) === null || _c === void 0 ? void 0 : _c.onError) !== null && _d !== void 0 ? _d : (() => {});
		if (parsed.length > notion_1.LIMITS.PAYLOAD_BLOCKS) limitCallback(/* @__PURE__ */ new Error(`Resulting blocks array exceeds Notion limit (${notion_1.LIMITS.PAYLOAD_BLOCKS})`));
		return truncate ? parsed.slice(0, notion_1.LIMITS.PAYLOAD_BLOCKS) : parsed;
	}
	exports.parseBlocks = parseBlocks;
	function parseRichText(root, options) {
		var _a, _b, _c, _d;
		const richTexts = [];
		root.children.forEach((child) => {
			if (child.type === "paragraph") child.children.forEach((child$1) => richTexts.push(...parseInline(child$1)));
			else if ((options === null || options === void 0 ? void 0 : options.nonInline) === "throw") throw new Error(`Unsupported markdown element: ${JSON.stringify(child)}`);
		});
		const truncate = !!((_b = (_a = options === null || options === void 0 ? void 0 : options.notionLimits) === null || _a === void 0 ? void 0 : _a.truncate) !== null && _b !== void 0 ? _b : true), limitCallback = (_d = (_c = options === null || options === void 0 ? void 0 : options.notionLimits) === null || _c === void 0 ? void 0 : _c.onError) !== null && _d !== void 0 ? _d : (() => {});
		if (richTexts.length > notion_1.LIMITS.RICH_TEXT_ARRAYS) limitCallback(/* @__PURE__ */ new Error(`Resulting richTexts array exceeds Notion limit (${notion_1.LIMITS.RICH_TEXT_ARRAYS})`));
		return (truncate ? richTexts.slice(0, notion_1.LIMITS.RICH_TEXT_ARRAYS) : richTexts).map((rt) => {
			var _a$1;
			if (rt.type !== "text") return rt;
			if (rt.text.content.length > notion_1.LIMITS.RICH_TEXT.TEXT_CONTENT) {
				limitCallback(/* @__PURE__ */ new Error(`Resulting text content exceeds Notion limit (${notion_1.LIMITS.RICH_TEXT.TEXT_CONTENT})`));
				if (truncate) rt.text.content = rt.text.content.slice(0, notion_1.LIMITS.RICH_TEXT.TEXT_CONTENT - 3) + "...";
			}
			if (((_a$1 = rt.text.link) === null || _a$1 === void 0 ? void 0 : _a$1.url) && rt.text.link.url.length > notion_1.LIMITS.RICH_TEXT.LINK_URL) limitCallback(/* @__PURE__ */ new Error(`Resulting text URL exceeds Notion limit (${notion_1.LIMITS.RICH_TEXT.LINK_URL})`));
			return rt;
		});
	}
	exports.parseRichText = parseRichText;
}));
var require_syntax$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var asciiAlpha = require_ascii_alpha();
	var asciiAlphanumeric = require_ascii_alphanumeric();
	var asciiControl = require_ascii_control();
	var markdownLineEnding = require_markdown_line_ending();
	var unicodePunctuation$1 = require_unicode_punctuation();
	var unicodeWhitespace$1 = require_unicode_whitespace();
	var www = {
		tokenize: tokenizeWww,
		partial: true
	};
	var domain = {
		tokenize: tokenizeDomain,
		partial: true
	};
	var path = {
		tokenize: tokenizePath,
		partial: true
	};
	var punctuation = {
		tokenize: tokenizePunctuation,
		partial: true
	};
	var namedCharacterReference = {
		tokenize: tokenizeNamedCharacterReference,
		partial: true
	};
	var wwwAutolink = {
		tokenize: tokenizeWwwAutolink,
		previous: previousWww
	};
	var httpAutolink = {
		tokenize: tokenizeHttpAutolink,
		previous: previousHttp
	};
	var emailAutolink = {
		tokenize: tokenizeEmailAutolink,
		previous: previousEmail
	};
	var text = {};
	exports.text = text;
	var code = 48;
	while (code < 123) {
		text[code] = emailAutolink;
		code++;
		if (code === 58) code = 65;
		else if (code === 91) code = 97;
	}
	text[43] = emailAutolink;
	text[45] = emailAutolink;
	text[46] = emailAutolink;
	text[95] = emailAutolink;
	text[72] = [emailAutolink, httpAutolink];
	text[104] = [emailAutolink, httpAutolink];
	text[87] = [emailAutolink, wwwAutolink];
	text[119] = [emailAutolink, wwwAutolink];
	function tokenizeEmailAutolink(effects, ok$1, nok) {
		var self = this;
		var hasDot;
		return start;
		function start(code$2) {
			/* istanbul ignore next - hooks. */
			if (!gfmAtext(code$2) || !previousEmail(self.previous) || previous$2(self.events)) return nok(code$2);
			effects.enter("literalAutolink");
			effects.enter("literalAutolinkEmail");
			return atext(code$2);
		}
		function atext(code$2) {
			if (gfmAtext(code$2)) {
				effects.consume(code$2);
				return atext;
			}
			if (code$2 === 64) {
				effects.consume(code$2);
				return label;
			}
			return nok(code$2);
		}
		function label(code$2) {
			if (code$2 === 46) return effects.check(punctuation, done, dotContinuation)(code$2);
			if (code$2 === 45 || code$2 === 95) return effects.check(punctuation, nok, dashOrUnderscoreContinuation)(code$2);
			if (asciiAlphanumeric(code$2)) {
				effects.consume(code$2);
				return label;
			}
			return done(code$2);
		}
		function dotContinuation(code$2) {
			effects.consume(code$2);
			hasDot = true;
			return label;
		}
		function dashOrUnderscoreContinuation(code$2) {
			effects.consume(code$2);
			return afterDashOrUnderscore;
		}
		function afterDashOrUnderscore(code$2) {
			if (code$2 === 46) return effects.check(punctuation, nok, dotContinuation)(code$2);
			return label(code$2);
		}
		function done(code$2) {
			if (hasDot) {
				effects.exit("literalAutolinkEmail");
				effects.exit("literalAutolink");
				return ok$1(code$2);
			}
			return nok(code$2);
		}
	}
	function tokenizeWwwAutolink(effects, ok$1, nok) {
		var self = this;
		return start;
		function start(code$2) {
			/* istanbul ignore next - hooks. */
			if (code$2 !== 87 && code$2 - 32 !== 87 || !previousWww(self.previous) || previous$2(self.events)) return nok(code$2);
			effects.enter("literalAutolink");
			effects.enter("literalAutolinkWww");
			return effects.check(www, effects.attempt(domain, effects.attempt(path, done), nok), nok)(code$2);
		}
		function done(code$2) {
			effects.exit("literalAutolinkWww");
			effects.exit("literalAutolink");
			return ok$1(code$2);
		}
	}
	function tokenizeHttpAutolink(effects, ok$1, nok) {
		var self = this;
		return start;
		function start(code$2) {
			/* istanbul ignore next - hooks. */
			if (code$2 !== 72 && code$2 - 32 !== 72 || !previousHttp(self.previous) || previous$2(self.events)) return nok(code$2);
			effects.enter("literalAutolink");
			effects.enter("literalAutolinkHttp");
			effects.consume(code$2);
			return t1;
		}
		function t1(code$2) {
			if (code$2 === 84 || code$2 - 32 === 84) {
				effects.consume(code$2);
				return t2;
			}
			return nok(code$2);
		}
		function t2(code$2) {
			if (code$2 === 84 || code$2 - 32 === 84) {
				effects.consume(code$2);
				return p$1;
			}
			return nok(code$2);
		}
		function p$1(code$2) {
			if (code$2 === 80 || code$2 - 32 === 80) {
				effects.consume(code$2);
				return s;
			}
			return nok(code$2);
		}
		function s(code$2) {
			if (code$2 === 83 || code$2 - 32 === 83) {
				effects.consume(code$2);
				return colon$1;
			}
			return colon$1(code$2);
		}
		function colon$1(code$2) {
			if (code$2 === 58) {
				effects.consume(code$2);
				return slash1;
			}
			return nok(code$2);
		}
		function slash1(code$2) {
			if (code$2 === 47) {
				effects.consume(code$2);
				return slash2;
			}
			return nok(code$2);
		}
		function slash2(code$2) {
			if (code$2 === 47) {
				effects.consume(code$2);
				return after;
			}
			return nok(code$2);
		}
		function after(code$2) {
			return asciiControl(code$2) || unicodeWhitespace$1(code$2) || unicodePunctuation$1(code$2) ? nok(code$2) : effects.attempt(domain, effects.attempt(path, done), nok)(code$2);
		}
		function done(code$2) {
			effects.exit("literalAutolinkHttp");
			effects.exit("literalAutolink");
			return ok$1(code$2);
		}
	}
	function tokenizeWww(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			effects.consume(code$2);
			return w2;
		}
		function w2(code$2) {
			if (code$2 === 87 || code$2 - 32 === 87) {
				effects.consume(code$2);
				return w3;
			}
			return nok(code$2);
		}
		function w3(code$2) {
			if (code$2 === 87 || code$2 - 32 === 87) {
				effects.consume(code$2);
				return dot;
			}
			return nok(code$2);
		}
		function dot(code$2) {
			if (code$2 === 46) {
				effects.consume(code$2);
				return after;
			}
			return nok(code$2);
		}
		function after(code$2) {
			return code$2 === null || markdownLineEnding(code$2) ? nok(code$2) : ok$1(code$2);
		}
	}
	function tokenizeDomain(effects, ok$1, nok) {
		var hasUnderscoreInLastSegment;
		var hasUnderscoreInLastLastSegment;
		return domain$1;
		function domain$1(code$2) {
			if (code$2 === 38) return effects.check(namedCharacterReference, done, punctuationContinuation)(code$2);
			if (code$2 === 46 || code$2 === 95) return effects.check(punctuation, done, punctuationContinuation)(code$2);
			if (asciiControl(code$2) || unicodeWhitespace$1(code$2) || code$2 !== 45 && unicodePunctuation$1(code$2)) return done(code$2);
			effects.consume(code$2);
			return domain$1;
		}
		function punctuationContinuation(code$2) {
			if (code$2 === 46) {
				hasUnderscoreInLastLastSegment = hasUnderscoreInLastSegment;
				hasUnderscoreInLastSegment = void 0;
				effects.consume(code$2);
				return domain$1;
			}
			if (code$2 === 95) hasUnderscoreInLastSegment = true;
			effects.consume(code$2);
			return domain$1;
		}
		function done(code$2) {
			if (!hasUnderscoreInLastLastSegment && !hasUnderscoreInLastSegment) return ok$1(code$2);
			return nok(code$2);
		}
	}
	function tokenizePath(effects, ok$1) {
		var balance = 0;
		return inPath;
		function inPath(code$2) {
			if (code$2 === 38) return effects.check(namedCharacterReference, ok$1, continuedPunctuation)(code$2);
			if (code$2 === 40) balance++;
			if (code$2 === 41) return effects.check(punctuation, parenAtPathEnd, continuedPunctuation)(code$2);
			if (pathEnd(code$2)) return ok$1(code$2);
			if (trailingPunctuation(code$2)) return effects.check(punctuation, ok$1, continuedPunctuation)(code$2);
			effects.consume(code$2);
			return inPath;
		}
		function continuedPunctuation(code$2) {
			effects.consume(code$2);
			return inPath;
		}
		function parenAtPathEnd(code$2) {
			balance--;
			return balance < 0 ? ok$1(code$2) : continuedPunctuation(code$2);
		}
	}
	function tokenizeNamedCharacterReference(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			effects.consume(code$2);
			return inside;
		}
		function inside(code$2) {
			if (asciiAlpha(code$2)) {
				effects.consume(code$2);
				return inside;
			}
			if (code$2 === 59) {
				effects.consume(code$2);
				return after;
			}
			return nok(code$2);
		}
		function after(code$2) {
			return pathEnd(code$2) ? ok$1(code$2) : nok(code$2);
		}
	}
	function tokenizePunctuation(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			effects.consume(code$2);
			return after;
		}
		function after(code$2) {
			if (trailingPunctuation(code$2)) {
				effects.consume(code$2);
				return after;
			}
			return pathEnd(code$2) ? ok$1(code$2) : nok(code$2);
		}
	}
	function trailingPunctuation(code$2) {
		return code$2 === 33 || code$2 === 34 || code$2 === 39 || code$2 === 41 || code$2 === 42 || code$2 === 44 || code$2 === 46 || code$2 === 58 || code$2 === 59 || code$2 === 60 || code$2 === 63 || code$2 === 95 || code$2 === 126;
	}
	function pathEnd(code$2) {
		return code$2 === null || code$2 < 0 || code$2 === 32 || code$2 === 60;
	}
	function gfmAtext(code$2) {
		return code$2 === 43 || code$2 === 45 || code$2 === 46 || code$2 === 95 || asciiAlphanumeric(code$2);
	}
	function previousWww(code$2) {
		return code$2 === null || code$2 < 0 || code$2 === 32 || code$2 === 40 || code$2 === 42 || code$2 === 95 || code$2 === 126;
	}
	function previousHttp(code$2) {
		return code$2 === null || !asciiAlpha(code$2);
	}
	function previousEmail(code$2) {
		return code$2 !== 47 && previousHttp(code$2);
	}
	function previous$2(events) {
		var index$1 = events.length;
		while (index$1--) if ((events[index$1][1].type === "labelLink" || events[index$1][1].type === "labelImage") && !events[index$1][1]._balanced) return true;
	}
}));
var require_micromark_extension_gfm_autolink_literal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_syntax$4();
}));
var require_micromark_extension_gfm_strikethrough = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = create$1;
	var classifyCharacter = require_classify_character();
	var chunkedSplice = require_chunked_splice();
	var resolveAll = require_resolve_all();
	var shallow = require_shallow();
	function create$1(options) {
		var single = (options || {}).singleTilde;
		var tokenizer = {
			tokenize: tokenizeStrikethrough,
			resolveAll: resolveAllStrikethrough
		};
		if (single === null || single === void 0) single = true;
		return {
			text: { 126: tokenizer },
			insideSpan: { null: tokenizer }
		};
		function resolveAllStrikethrough(events, context) {
			var index$1 = -1;
			var strikethrough$3;
			var text$5;
			var open;
			var nextEvents;
			while (++index$1 < events.length) if (events[index$1][0] === "enter" && events[index$1][1].type === "strikethroughSequenceTemporary" && events[index$1][1]._close) {
				open = index$1;
				while (open--) if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index$1][1].end.offset - events[index$1][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
					events[index$1][1].type = "strikethroughSequence";
					events[open][1].type = "strikethroughSequence";
					strikethrough$3 = {
						type: "strikethrough",
						start: shallow(events[open][1].start),
						end: shallow(events[index$1][1].end)
					};
					text$5 = {
						type: "strikethroughText",
						start: shallow(events[open][1].end),
						end: shallow(events[index$1][1].start)
					};
					nextEvents = [
						[
							"enter",
							strikethrough$3,
							context
						],
						[
							"enter",
							events[open][1],
							context
						],
						[
							"exit",
							events[open][1],
							context
						],
						[
							"enter",
							text$5,
							context
						]
					];
					chunkedSplice(nextEvents, nextEvents.length, 0, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index$1), context));
					chunkedSplice(nextEvents, nextEvents.length, 0, [
						[
							"exit",
							text$5,
							context
						],
						[
							"enter",
							events[index$1][1],
							context
						],
						[
							"exit",
							events[index$1][1],
							context
						],
						[
							"exit",
							strikethrough$3,
							context
						]
					]);
					chunkedSplice(events, open - 1, index$1 - open + 3, nextEvents);
					index$1 = open + nextEvents.length - 2;
					break;
				}
			}
			return removeRemainingSequences(events);
		}
		function removeRemainingSequences(events) {
			var index$1 = -1;
			var length = events.length;
			while (++index$1 < length) if (events[index$1][1].type === "strikethroughSequenceTemporary") events[index$1][1].type = "data";
			return events;
		}
		function tokenizeStrikethrough(effects, ok$1, nok) {
			var previous$4 = this.previous;
			var events = this.events;
			var size = 0;
			return start;
			function start(code$2) {
				if (code$2 !== 126 || previous$4 === 126 && events[events.length - 1][1].type !== "characterEscape") return nok(code$2);
				effects.enter("strikethroughSequenceTemporary");
				return more(code$2);
			}
			function more(code$2) {
				var before = classifyCharacter(previous$4);
				var token;
				var after;
				if (code$2 === 126) {
					if (size > 1) return nok(code$2);
					effects.consume(code$2);
					size++;
					return more;
				}
				if (size < 2 && !single) return nok(code$2);
				token = effects.exit("strikethroughSequenceTemporary");
				after = classifyCharacter(code$2);
				token._open = !after || after === 2 && before;
				token._close = !before || before === 2 && after;
				return ok$1(code$2);
			}
		}
	}
}));
var require_syntax$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.flow = { null: {
		tokenize: tokenizeTable,
		resolve: resolveTable,
		interruptible: true
	} };
	var createSpace$1 = require_factory_space();
	var setextUnderlineMini = {
		tokenize: tokenizeSetextUnderlineMini,
		partial: true
	};
	var nextPrefixedOrBlank = {
		tokenize: tokenizeNextPrefixedOrBlank,
		partial: true
	};
	function resolveTable(events, context) {
		var length = events.length;
		var index$1 = -1;
		var token;
		var inHead;
		var inDelimiterRow;
		var inRow;
		var cell;
		var content$3;
		var text$5;
		var contentStart;
		var contentEnd;
		var cellStart;
		while (++index$1 < length) {
			token = events[index$1][1];
			if (inRow) {
				if (token.type === "temporaryTableCellContent") {
					contentStart = contentStart || index$1;
					contentEnd = index$1;
				}
				if ((token.type === "tableCellDivider" || token.type === "tableRow") && contentEnd) {
					content$3 = {
						type: "tableContent",
						start: events[contentStart][1].start,
						end: events[contentEnd][1].end
					};
					text$5 = {
						type: "chunkText",
						start: content$3.start,
						end: content$3.end,
						contentType: "text"
					};
					events.splice(contentStart, contentEnd - contentStart + 1, [
						"enter",
						content$3,
						context
					], [
						"enter",
						text$5,
						context
					], [
						"exit",
						text$5,
						context
					], [
						"exit",
						content$3,
						context
					]);
					index$1 -= contentEnd - contentStart - 3;
					length = events.length;
					contentStart = void 0;
					contentEnd = void 0;
				}
			}
			if (events[index$1][0] === "exit" && cellStart && cellStart + 1 < index$1 && (token.type === "tableCellDivider" || token.type === "tableRow" && (cellStart + 3 < index$1 || events[cellStart][1].type !== "whitespace"))) {
				cell = {
					type: inDelimiterRow ? "tableDelimiter" : inHead ? "tableHeader" : "tableData",
					start: events[cellStart][1].start,
					end: events[index$1][1].end
				};
				events.splice(index$1 + (token.type === "tableCellDivider" ? 1 : 0), 0, [
					"exit",
					cell,
					context
				]);
				events.splice(cellStart, 0, [
					"enter",
					cell,
					context
				]);
				index$1 += 2;
				length = events.length;
				cellStart = index$1 + 1;
			}
			if (token.type === "tableRow") {
				inRow = events[index$1][0] === "enter";
				if (inRow) cellStart = index$1 + 1;
			}
			if (token.type === "tableDelimiterRow") {
				inDelimiterRow = events[index$1][0] === "enter";
				if (inDelimiterRow) cellStart = index$1 + 1;
			}
			if (token.type === "tableHead") inHead = events[index$1][0] === "enter";
		}
		return events;
	}
	function tokenizeTable(effects, ok$1, nok) {
		var align = [];
		var tableHeaderCount = 0;
		var seenDelimiter;
		var hasDash;
		return start;
		function start(code$2) {
			/* istanbul ignore if - used to be passed in beta micromark versions. */
			if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) return nok(code$2);
			effects.enter("table")._align = align;
			effects.enter("tableHead");
			effects.enter("tableRow");
			if (code$2 === 124) return cellDividerHead(code$2);
			tableHeaderCount++;
			effects.enter("temporaryTableCellContent");
			return inCellContentHead(code$2);
		}
		function cellDividerHead(code$2) {
			effects.enter("tableCellDivider");
			effects.consume(code$2);
			effects.exit("tableCellDivider");
			seenDelimiter = true;
			return cellBreakHead;
		}
		function cellBreakHead(code$2) {
			if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) return atRowEndHead(code$2);
			if (code$2 === -2 || code$2 === -1 || code$2 === 32) {
				effects.enter("whitespace");
				effects.consume(code$2);
				return inWhitespaceHead;
			}
			if (seenDelimiter) {
				seenDelimiter = void 0;
				tableHeaderCount++;
			}
			if (code$2 === 124) return cellDividerHead(code$2);
			effects.enter("temporaryTableCellContent");
			return inCellContentHead(code$2);
		}
		function inWhitespaceHead(code$2) {
			if (code$2 === -2 || code$2 === -1 || code$2 === 32) {
				effects.consume(code$2);
				return inWhitespaceHead;
			}
			effects.exit("whitespace");
			return cellBreakHead(code$2);
		}
		function inCellContentHead(code$2) {
			if (code$2 === null || code$2 < 0 || code$2 === 32 || code$2 === 124) {
				effects.exit("temporaryTableCellContent");
				return cellBreakHead(code$2);
			}
			effects.consume(code$2);
			return code$2 === 92 ? inCellContentEscapeHead : inCellContentHead;
		}
		function inCellContentEscapeHead(code$2) {
			if (code$2 === 92 || code$2 === 124) {
				effects.consume(code$2);
				return inCellContentHead;
			}
			return inCellContentHead(code$2);
		}
		function atRowEndHead(code$2) {
			if (code$2 === null) return nok(code$2);
			effects.exit("tableRow");
			effects.exit("tableHead");
			effects.enter("lineEnding");
			effects.consume(code$2);
			effects.exit("lineEnding");
			return effects.check(setextUnderlineMini, nok, createSpace$1(effects, rowStartDelimiter, "linePrefix", 4));
		}
		function rowStartDelimiter(code$2) {
			if (code$2 === null || code$2 < 0 || code$2 === 32) return nok(code$2);
			effects.enter("tableDelimiterRow");
			return atDelimiterRowBreak(code$2);
		}
		function atDelimiterRowBreak(code$2) {
			if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) return rowEndDelimiter(code$2);
			if (code$2 === -2 || code$2 === -1 || code$2 === 32) {
				effects.enter("whitespace");
				effects.consume(code$2);
				return inWhitespaceDelimiter;
			}
			if (code$2 === 45) {
				effects.enter("tableDelimiterFiller");
				effects.consume(code$2);
				hasDash = true;
				align.push(null);
				return inFillerDelimiter;
			}
			if (code$2 === 58) {
				effects.enter("tableDelimiterAlignment");
				effects.consume(code$2);
				effects.exit("tableDelimiterAlignment");
				align.push("left");
				return afterLeftAlignment;
			}
			if (code$2 === 124) {
				effects.enter("tableCellDivider");
				effects.consume(code$2);
				effects.exit("tableCellDivider");
				return atDelimiterRowBreak;
			}
			return nok(code$2);
		}
		function inWhitespaceDelimiter(code$2) {
			if (code$2 === -2 || code$2 === -1 || code$2 === 32) {
				effects.consume(code$2);
				return inWhitespaceDelimiter;
			}
			effects.exit("whitespace");
			return atDelimiterRowBreak(code$2);
		}
		function inFillerDelimiter(code$2) {
			if (code$2 === 45) {
				effects.consume(code$2);
				return inFillerDelimiter;
			}
			effects.exit("tableDelimiterFiller");
			if (code$2 === 58) {
				effects.enter("tableDelimiterAlignment");
				effects.consume(code$2);
				effects.exit("tableDelimiterAlignment");
				align[align.length - 1] = align[align.length - 1] === "left" ? "center" : "right";
				return afterRightAlignment;
			}
			return atDelimiterRowBreak(code$2);
		}
		function afterLeftAlignment(code$2) {
			if (code$2 === 45) {
				effects.enter("tableDelimiterFiller");
				effects.consume(code$2);
				hasDash = true;
				return inFillerDelimiter;
			}
			return nok(code$2);
		}
		function afterRightAlignment(code$2) {
			if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) return rowEndDelimiter(code$2);
			if (code$2 === -2 || code$2 === -1 || code$2 === 32) {
				effects.enter("whitespace");
				effects.consume(code$2);
				return inWhitespaceDelimiter;
			}
			if (code$2 === 124) {
				effects.enter("tableCellDivider");
				effects.consume(code$2);
				effects.exit("tableCellDivider");
				return atDelimiterRowBreak;
			}
			return nok(code$2);
		}
		function rowEndDelimiter(code$2) {
			effects.exit("tableDelimiterRow");
			if (!hasDash || tableHeaderCount !== align.length) return nok(code$2);
			if (code$2 === null) return tableClose(code$2);
			return effects.check(nextPrefixedOrBlank, tableClose, tableContinue)(code$2);
		}
		function tableClose(code$2) {
			effects.exit("table");
			return ok$1(code$2);
		}
		function tableContinue(code$2) {
			effects.enter("lineEnding");
			effects.consume(code$2);
			effects.exit("lineEnding");
			return createSpace$1(effects, bodyStart, "linePrefix", 4);
		}
		function bodyStart(code$2) {
			effects.enter("tableBody");
			return rowStartBody(code$2);
		}
		function rowStartBody(code$2) {
			effects.enter("tableRow");
			if (code$2 === 124) return cellDividerBody(code$2);
			effects.enter("temporaryTableCellContent");
			return inCellContentBody(code$2);
		}
		function cellDividerBody(code$2) {
			effects.enter("tableCellDivider");
			effects.consume(code$2);
			effects.exit("tableCellDivider");
			return cellBreakBody;
		}
		function cellBreakBody(code$2) {
			if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) return atRowEndBody(code$2);
			if (code$2 === -2 || code$2 === -1 || code$2 === 32) {
				effects.enter("whitespace");
				effects.consume(code$2);
				return inWhitespaceBody;
			}
			if (code$2 === 124) return cellDividerBody(code$2);
			effects.enter("temporaryTableCellContent");
			return inCellContentBody(code$2);
		}
		function inWhitespaceBody(code$2) {
			if (code$2 === -2 || code$2 === -1 || code$2 === 32) {
				effects.consume(code$2);
				return inWhitespaceBody;
			}
			effects.exit("whitespace");
			return cellBreakBody(code$2);
		}
		function inCellContentBody(code$2) {
			if (code$2 === null || code$2 < 0 || code$2 === 32 || code$2 === 124) {
				effects.exit("temporaryTableCellContent");
				return cellBreakBody(code$2);
			}
			effects.consume(code$2);
			return code$2 === 92 ? inCellContentEscapeBody : inCellContentBody;
		}
		function inCellContentEscapeBody(code$2) {
			if (code$2 === 92 || code$2 === 124) {
				effects.consume(code$2);
				return inCellContentBody;
			}
			return inCellContentBody(code$2);
		}
		function atRowEndBody(code$2) {
			effects.exit("tableRow");
			if (code$2 === null) return tableBodyClose(code$2);
			return effects.check(nextPrefixedOrBlank, tableBodyClose, tableBodyContinue)(code$2);
		}
		function tableBodyClose(code$2) {
			effects.exit("tableBody");
			return tableClose(code$2);
		}
		function tableBodyContinue(code$2) {
			effects.enter("lineEnding");
			effects.consume(code$2);
			effects.exit("lineEnding");
			return createSpace$1(effects, rowStartBody, "linePrefix", 4);
		}
	}
	function tokenizeSetextUnderlineMini(effects, ok$1, nok) {
		return start;
		function start(code$2) {
			if (code$2 !== 45) return nok(code$2);
			effects.enter("setextUnderline");
			return sequence(code$2);
		}
		function sequence(code$2) {
			if (code$2 === 45) {
				effects.consume(code$2);
				return sequence;
			}
			return whitespace(code$2);
		}
		function whitespace(code$2) {
			if (code$2 === -2 || code$2 === -1 || code$2 === 32) {
				effects.consume(code$2);
				return whitespace;
			}
			if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) return ok$1(code$2);
			return nok(code$2);
		}
	}
	function tokenizeNextPrefixedOrBlank(effects, ok$1, nok) {
		var size = 0;
		return start;
		function start(code$2) {
			effects.enter("check");
			effects.consume(code$2);
			return whitespace;
		}
		function whitespace(code$2) {
			if (code$2 === -1 || code$2 === 32) {
				effects.consume(code$2);
				size++;
				return size === 4 ? ok$1 : whitespace;
			}
			if (code$2 === null || code$2 < 0) return ok$1(code$2);
			return nok(code$2);
		}
	}
}));
var require_micromark_extension_gfm_table = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_syntax$3();
}));
var require_syntax$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
	var spaceFactory = require_factory_space();
	var prefixSize$1 = require_prefix_size();
	var tasklistCheck = { tokenize: tokenizeTasklistCheck };
	exports.text = { 91: tasklistCheck };
	function tokenizeTasklistCheck(effects, ok$1, nok) {
		var self = this;
		return open;
		function open(code$2) {
			if (code$2 !== 91 || self.previous !== null || !self._gfmTasklistFirstContentOfListItem) return nok(code$2);
			effects.enter("taskListCheck");
			effects.enter("taskListCheckMarker");
			effects.consume(code$2);
			effects.exit("taskListCheckMarker");
			return inside;
		}
		function inside(code$2) {
			if (code$2 === -2 || code$2 === 32) {
				effects.enter("taskListCheckValueUnchecked");
				effects.consume(code$2);
				effects.exit("taskListCheckValueUnchecked");
				return close;
			}
			if (code$2 === 88 || code$2 === 120) {
				effects.enter("taskListCheckValueChecked");
				effects.consume(code$2);
				effects.exit("taskListCheckValueChecked");
				return close;
			}
			return nok(code$2);
		}
		function close(code$2) {
			if (code$2 === 93) {
				effects.enter("taskListCheckMarker");
				effects.consume(code$2);
				effects.exit("taskListCheckMarker");
				effects.exit("taskListCheck");
				return effects.check({ tokenize: spaceThenNonSpace }, ok$1, nok);
			}
			return nok(code$2);
		}
	}
	function spaceThenNonSpace(effects, ok$1, nok) {
		var self = this;
		return spaceFactory(effects, after, "whitespace");
		function after(code$2) {
			return prefixSize$1(self.events, "whitespace") && code$2 !== null && !markdownLineEndingOrSpace(code$2) ? ok$1(code$2) : nok(code$2);
		}
	}
}));
var require_micromark_extension_gfm_task_list_item = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_syntax$2();
}));
var require_syntax$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var combine = require_combine_extensions();
	var autolink = require_micromark_extension_gfm_autolink_literal();
	var strikethrough$2 = require_micromark_extension_gfm_strikethrough();
	var table$2 = require_micromark_extension_gfm_table();
	var tasklist = require_micromark_extension_gfm_task_list_item();
	module.exports = create;
	function create(options) {
		return combine([
			autolink,
			strikethrough$2(options),
			table$2,
			tasklist
		]);
	}
}));
var require_micromark_extension_gfm = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_syntax$1();
}));
var require_ccount = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = ccount$1;
	function ccount$1(source, character) {
		var value = String(source);
		var count = 0;
		var index$1;
		if (typeof character !== "string") throw new Error("Expected character");
		index$1 = value.indexOf(character);
		while (index$1 !== -1) {
			count++;
			index$1 = value.indexOf(character, index$1 + character.length);
		}
		return count;
	}
}));
var require_convert = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = convert$2;
	function convert$2(test) {
		if (test == null) return ok;
		if (typeof test === "string") return typeFactory(test);
		if (typeof test === "object") return "length" in test ? anyFactory(test) : allFactory(test);
		if (typeof test === "function") return test;
		throw new Error("Expected function, string, or object as test");
	}
	function allFactory(test) {
		return all$1;
		function all$1(node$1) {
			var key;
			for (key in test) if (node$1[key] !== test[key]) return false;
			return true;
		}
	}
	function anyFactory(tests) {
		var checks = [];
		var index$1 = -1;
		while (++index$1 < tests.length) checks[index$1] = convert$2(tests[index$1]);
		return any;
		function any() {
			var index$2 = -1;
			while (++index$2 < checks.length) if (checks[index$2].apply(this, arguments)) return true;
			return false;
		}
	}
	function typeFactory(test) {
		return type;
		function type(node$1) {
			return Boolean(node$1 && node$1.type === test);
		}
	}
	function ok() {
		return true;
	}
}));
var require_color_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = identity;
	function identity(d) {
		return d;
	}
}));
var require_unist_util_visit_parents = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = visitParents;
	var convert$1 = require_convert();
	var color = require_color_browser();
	var CONTINUE = true;
	var SKIP = "skip";
	var EXIT = false;
	visitParents.CONTINUE = CONTINUE;
	visitParents.SKIP = SKIP;
	visitParents.EXIT = EXIT;
	function visitParents(tree, test, visitor, reverse) {
		var step;
		var is;
		if (typeof test === "function" && typeof visitor !== "function") {
			reverse = visitor;
			visitor = test;
			test = null;
		}
		is = convert$1(test);
		step = reverse ? -1 : 1;
		factory(tree, null, [])();
		function factory(node$1, index$1, parents) {
			var value = typeof node$1 === "object" && node$1 !== null ? node$1 : {};
			var name;
			if (typeof value.type === "string") {
				name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
				visit$1.displayName = "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")";
			}
			return visit$1;
			function visit$1() {
				var grandparents = parents.concat(node$1);
				var result = [];
				var subresult;
				var offset;
				if (!test || is(node$1, index$1, parents[parents.length - 1] || null)) {
					result = toResult(visitor(node$1, parents));
					if (result[0] === EXIT) return result;
				}
				if (node$1.children && result[0] !== SKIP) {
					offset = (reverse ? node$1.children.length : -1) + step;
					while (offset > -1 && offset < node$1.children.length) {
						subresult = factory(node$1.children[offset], offset, grandparents)();
						if (subresult[0] === EXIT) return subresult;
						offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
					}
				}
				return result;
			}
		}
	}
	function toResult(value) {
		if (value !== null && typeof value === "object" && "length" in value) return value;
		if (typeof value === "number") return [CONTINUE, value];
		return [value];
	}
}));
var require_escape_string_regexp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (string$2) => {
		if (typeof string$2 !== "string") throw new TypeError("Expected a string");
		return string$2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
	};
}));
var require_mdast_util_find_and_replace = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = findAndReplace$1;
	var visit = require_unist_util_visit_parents();
	var convert = require_convert();
	var escape = require_escape_string_regexp();
	var splice = [].splice;
	function findAndReplace$1(tree, find, replace$1, options) {
		var settings;
		var schema;
		if (typeof find === "string" || find && typeof find.exec === "function") schema = [[find, replace$1]];
		else {
			schema = find;
			options = replace$1;
		}
		settings = options || {};
		search(tree, settings, handlerFactory(toPairs(schema)));
		return tree;
		function handlerFactory(pairs) {
			var pair = pairs[0];
			return handler;
			function handler(node$1, parent) {
				var find$1 = pair[0];
				var replace$2 = pair[1];
				var nodes = [];
				var start = 0;
				var index$1 = parent.children.indexOf(node$1);
				var position$1;
				var match;
				var subhandler;
				var value;
				find$1.lastIndex = 0;
				match = find$1.exec(node$1.value);
				while (match) {
					position$1 = match.index;
					value = replace$2.apply(null, [].concat(match, {
						index: match.index,
						input: match.input
					}));
					if (value !== false) {
						if (start !== position$1) nodes.push({
							type: "text",
							value: node$1.value.slice(start, position$1)
						});
						if (typeof value === "string" && value.length > 0) value = {
							type: "text",
							value
						};
						if (value) nodes = [].concat(nodes, value);
						start = position$1 + match[0].length;
					}
					if (!find$1.global) break;
					match = find$1.exec(node$1.value);
				}
				if (position$1 === void 0) {
					nodes = [node$1];
					index$1--;
				} else {
					if (start < node$1.value.length) nodes.push({
						type: "text",
						value: node$1.value.slice(start)
					});
					nodes.unshift(index$1, 1);
					splice.apply(parent.children, nodes);
				}
				if (pairs.length > 1) {
					subhandler = handlerFactory(pairs.slice(1));
					position$1 = -1;
					while (++position$1 < nodes.length) {
						node$1 = nodes[position$1];
						if (node$1.type === "text") subhandler(node$1, parent);
						else search(node$1, settings, subhandler);
					}
				}
				return index$1 + nodes.length + 1;
			}
		}
	}
	function search(tree, settings, handler) {
		var ignored = convert(settings.ignore || []);
		var result = [];
		visit(tree, "text", visitor);
		return result;
		function visitor(node$1, parents) {
			var index$1 = -1;
			var parent;
			var grandparent;
			while (++index$1 < parents.length) {
				parent = parents[index$1];
				if (ignored(parent, grandparent ? grandparent.children.indexOf(parent) : void 0, grandparent)) return;
				grandparent = parent;
			}
			return handler(node$1, grandparent);
		}
	}
	function toPairs(schema) {
		var result = [];
		var key;
		var index$1;
		if (typeof schema !== "object") throw new Error("Expected array or object as schema");
		if ("length" in schema) {
			index$1 = -1;
			while (++index$1 < schema.length) result.push([toExpression(schema[index$1][0]), toFunction(schema[index$1][1])]);
		} else for (key in schema) result.push([toExpression(key), toFunction(schema[key])]);
		return result;
	}
	function toExpression(find) {
		return typeof find === "string" ? new RegExp(escape(find), "g") : find;
	}
	function toFunction(replace$1) {
		return typeof replace$1 === "function" ? replace$1 : returner;
		function returner() {
			return replace$1;
		}
	}
}));
var require_from_markdown$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var ccount = require_ccount();
	var findAndReplace = require_mdast_util_find_and_replace();
	var unicodePunctuation = require_unicode_punctuation();
	var unicodeWhitespace = require_unicode_whitespace();
	exports.transforms = [transformGfmAutolinkLiterals];
	exports.enter = {
		literalAutolink: enterLiteralAutolink,
		literalAutolinkEmail: enterLiteralAutolinkValue,
		literalAutolinkHttp: enterLiteralAutolinkValue,
		literalAutolinkWww: enterLiteralAutolinkValue
	};
	exports.exit = {
		literalAutolink: exitLiteralAutolink,
		literalAutolinkEmail: exitLiteralAutolinkEmail,
		literalAutolinkHttp: exitLiteralAutolinkHttp,
		literalAutolinkWww: exitLiteralAutolinkWww
	};
	function enterLiteralAutolink(token) {
		this.enter({
			type: "link",
			title: null,
			url: "",
			children: []
		}, token);
	}
	function enterLiteralAutolinkValue(token) {
		this.config.enter.autolinkProtocol.call(this, token);
	}
	function exitLiteralAutolinkHttp(token) {
		this.config.exit.autolinkProtocol.call(this, token);
	}
	function exitLiteralAutolinkWww(token) {
		this.config.exit.data.call(this, token);
		this.stack[this.stack.length - 1].url = "http://" + this.sliceSerialize(token);
	}
	function exitLiteralAutolinkEmail(token) {
		this.config.exit.autolinkEmail.call(this, token);
	}
	function exitLiteralAutolink(token) {
		this.exit(token);
	}
	function transformGfmAutolinkLiterals(tree) {
		findAndReplace(tree, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/i, findUrl], [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/, findEmail]], { ignore: ["link", "linkReference"] });
	}
	function findUrl($0, protocol, domain$1, path$1, match) {
		var prefix = "";
		var parts;
		var result;
		if (!previous$1(match)) return false;
		if (/^w/i.test(protocol)) {
			domain$1 = protocol + domain$1;
			protocol = "";
			prefix = "http://";
		}
		if (!isCorrectDomain(domain$1)) return false;
		parts = splitUrl(domain$1 + path$1);
		if (!parts[0]) return false;
		result = {
			type: "link",
			title: null,
			url: prefix + protocol + parts[0],
			children: [{
				type: "text",
				value: protocol + parts[0]
			}]
		};
		if (parts[1]) result = [result, {
			type: "text",
			value: parts[1]
		}];
		return result;
	}
	function findEmail($0, atext, label, match) {
		if (!previous$1(match, true) || /[_-]$/.test(label)) return false;
		return {
			type: "link",
			title: null,
			url: "mailto:" + atext + "@" + label,
			children: [{
				type: "text",
				value: atext + "@" + label
			}]
		};
	}
	function isCorrectDomain(domain$1) {
		var parts = domain$1.split(".");
		if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) return false;
		return true;
	}
	function splitUrl(url) {
		var trail = /[!"&'),.:;<>?\]}]+$/.exec(url);
		var closingParenIndex;
		var openingParens;
		var closingParens;
		if (trail) {
			url = url.slice(0, trail.index);
			trail = trail[0];
			closingParenIndex = trail.indexOf(")");
			openingParens = ccount(url, "(");
			closingParens = ccount(url, ")");
			while (closingParenIndex !== -1 && openingParens > closingParens) {
				url += trail.slice(0, closingParenIndex + 1);
				trail = trail.slice(closingParenIndex + 1);
				closingParenIndex = trail.indexOf(")");
				closingParens++;
			}
		}
		return [url, trail];
	}
	function previous$1(match, email) {
		var code$2 = match.input.charCodeAt(match.index - 1);
		return (code$2 !== code$2 || unicodeWhitespace(code$2) || unicodePunctuation(code$2)) && (!email || code$2 !== 47);
	}
}));
var require_from_markdown$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.canContainEols = ["delete"];
	exports.enter = { strikethrough: enterStrikethrough };
	exports.exit = { strikethrough: exitStrikethrough };
	function enterStrikethrough(token) {
		this.enter({
			type: "delete",
			children: []
		}, token);
	}
	function exitStrikethrough(token) {
		this.exit(token);
	}
}));
var require_from_markdown$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.enter = {
		table: enterTable,
		tableData: enterCell,
		tableHeader: enterCell,
		tableRow: enterRow
	};
	exports.exit = {
		codeText: exitCodeText,
		table: exitTable,
		tableData: exit,
		tableHeader: exit,
		tableRow: exit
	};
	function enterTable(token) {
		this.enter({
			type: "table",
			align: token._align,
			children: []
		}, token);
		this.setData("inTable", true);
	}
	function exitTable(token) {
		this.exit(token);
		this.setData("inTable");
	}
	function enterRow(token) {
		this.enter({
			type: "tableRow",
			children: []
		}, token);
	}
	function exit(token) {
		this.exit(token);
	}
	function enterCell(token) {
		this.enter({
			type: "tableCell",
			children: []
		}, token);
	}
	function exitCodeText(token) {
		var value = this.resume();
		if (this.getData("inTable")) value = value.replace(/\\([\\|])/g, replace);
		this.stack[this.stack.length - 1].value = value;
		this.exit(token);
	}
	function replace($0, $1) {
		return $1 === "|" ? $1 : $0;
	}
}));
var require_from_markdown$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.exit = {
		taskListCheckValueChecked: exitCheck,
		taskListCheckValueUnchecked: exitCheck,
		paragraph: exitParagraphWithTaskListItem
	};
	function exitCheck(token) {
		this.stack[this.stack.length - 2].checked = token.type === "taskListCheckValueChecked";
	}
	function exitParagraphWithTaskListItem(token) {
		var parent = this.stack[this.stack.length - 2];
		var node$1 = this.stack[this.stack.length - 1];
		var siblings = parent.children;
		var head = node$1.children[0];
		var index$1 = -1;
		var firstParaghraph;
		if (parent && parent.type === "listItem" && typeof parent.checked === "boolean" && head && head.type === "text") {
			while (++index$1 < siblings.length) if (siblings[index$1].type === "paragraph") {
				firstParaghraph = siblings[index$1];
				break;
			}
			if (firstParaghraph === node$1) {
				head.value = head.value.slice(1);
				if (head.value.length === 0) node$1.children.shift();
				else {
					head.position.start.column++;
					head.position.start.offset++;
					node$1.position.start = Object.assign({}, head.position.start);
				}
			}
		}
		this.exit(token);
	}
}));
var require_from_markdown$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var autolinkLiteral$1 = require_from_markdown$5();
	var strikethrough$1 = require_from_markdown$4();
	var table$1 = require_from_markdown$3();
	var taskListItem$1 = require_from_markdown$2();
	var own = {}.hasOwnProperty;
	module.exports = configure$2([
		autolinkLiteral$1,
		strikethrough$1,
		table$1,
		taskListItem$1
	]);
	function configure$2(extensions) {
		var config = {
			transforms: [],
			canContainEols: []
		};
		var length = extensions.length;
		var index$1 = -1;
		while (++index$1 < length) extension(config, extensions[index$1]);
		return config;
	}
	function extension(config, extension$3) {
		var key;
		var left;
		var right;
		for (key in extension$3) {
			left = own.call(config, key) ? config[key] : config[key] = {};
			right = extension$3[key];
			if (key === "canContainEols" || key === "transforms") config[key] = [].concat(left, right);
			else Object.assign(left, right);
		}
	}
}));
var require_to_markdown$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var inConstruct = "phrasing";
	var notInConstruct = [
		"autolink",
		"link",
		"image",
		"label"
	];
	exports.unsafe = [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct,
			notInConstruct
		}
	];
}));
var require_container_phrasing = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = phrasing$2;
	function phrasing$2(parent, context, safeOptions) {
		var children = parent.children || [];
		var results = [];
		var index$1 = -1;
		var before = safeOptions.before;
		var after;
		var handle;
		var child;
		while (++index$1 < children.length) {
			child = children[index$1];
			if (index$1 + 1 < children.length) {
				handle = context.handle.handlers[children[index$1 + 1].type];
				if (handle && handle.peek) handle = handle.peek;
				after = handle ? handle(children[index$1 + 1], parent, context, {
					before: "",
					after: ""
				}).charAt(0) : "";
			} else after = safeOptions.after;
			if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
				results[results.length - 1] = results[results.length - 1].replace(/(\r?\n|\r)$/, " ");
				before = " ";
			}
			results.push(context.handle(child, parent, context, {
				before,
				after
			}));
			before = results[results.length - 1].slice(-1);
		}
		return results.join("");
	}
}));
var require_to_markdown$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var phrasing$1 = require_container_phrasing();
	exports.unsafe = [{
		character: "~",
		inConstruct: "phrasing"
	}];
	exports.handlers = { delete: handleDelete };
	handleDelete.peek = peekDelete;
	function handleDelete(node$1, _, context) {
		var exit$2 = context.enter("emphasis");
		var value = phrasing$1(node$1, context, {
			before: "~",
			after: "~"
		});
		exit$2();
		return "~~" + value + "~~";
	}
	function peekDelete() {
		return "~";
	}
}));
var require_pattern_compile = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = patternCompile$2;
	function patternCompile$2(pattern) {
		var before;
		var after;
		if (!pattern._compiled) {
			before = pattern.before ? "(?:" + pattern.before + ")" : "";
			after = pattern.after ? "(?:" + pattern.after + ")" : "";
			if (pattern.atBreak) before = "[\\r\\n][\\t ]*" + before;
			pattern._compiled = new RegExp((before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (after || ""), "g");
		}
		return pattern._compiled;
	}
}));
var require_inline_code = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = inlineCode;
	inlineCode.peek = inlineCodePeek;
	var patternCompile$1 = require_pattern_compile();
	function inlineCode(node$1, parent, context) {
		var value = node$1.value || "";
		var sequence = "`";
		var index$1 = -1;
		var pattern;
		var expression;
		var match;
		var position$1;
		while ((/* @__PURE__ */ new RegExp("(^|[^`])" + sequence + "([^`]|$)")).test(value)) sequence += "`";
		if (/[^ \r\n]/.test(value) && (/[ \r\n`]/.test(value.charAt(0)) || /[ \r\n`]/.test(value.charAt(value.length - 1)))) value = " " + value + " ";
		while (++index$1 < context.unsafe.length) {
			pattern = context.unsafe[index$1];
			if (!pattern.atBreak) continue;
			expression = patternCompile$1(pattern);
			while (match = expression.exec(value)) {
				position$1 = match.index;
				if (value.charCodeAt(position$1) === 10 && value.charCodeAt(position$1 - 1) === 13) position$1--;
				value = value.slice(0, position$1) + " " + value.slice(match.index + 1);
			}
		}
		return sequence + value + sequence;
	}
	function inlineCodePeek() {
		return "`";
	}
}));
var require_repeat_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var res = "";
	var cache;
	module.exports = repeat$4;
	function repeat$4(str, num) {
		if (typeof str !== "string") throw new TypeError("expected a string");
		if (num === 1) return str;
		if (num === 2) return str + str;
		var max = str.length * num;
		if (cache !== str || typeof cache === "undefined") {
			cache = str;
			res = "";
		} else if (res.length >= max) return res.substr(0, max);
		while (max > res.length && num > 1) {
			if (num & 1) res += str;
			num >>= 1;
			str += str;
		}
		res += str;
		res = res.substr(0, max);
		return res;
	}
}));
var require_markdown_table = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var repeat$3 = require_repeat_string();
	module.exports = markdownTable$1;
	var trailingWhitespace = / +$/;
	var space = " ";
	var lineFeed = "\n";
	var dash = "-";
	var colon = ":";
	var verticalBar = "|";
	var x = 0;
	var C = 67;
	var L = 76;
	var R = 82;
	var c = 99;
	var l = 108;
	var r = 114;
	function markdownTable$1(table$4, options) {
		var settings = options || {};
		var padding = settings.padding !== false;
		var start = settings.delimiterStart !== false;
		var end = settings.delimiterEnd !== false;
		var align = (settings.align || []).concat();
		var alignDelimiters = settings.alignDelimiters !== false;
		var alignments = [];
		var stringLength = settings.stringLength || defaultStringLength;
		var rowIndex = -1;
		var rowLength = table$4.length;
		var cellMatrix = [];
		var sizeMatrix = [];
		var row = [];
		var sizes = [];
		var longestCellByColumn = [];
		var mostCellsPerRow = 0;
		var cells;
		var columnIndex;
		var columnLength;
		var largest;
		var size;
		var cell;
		var lines;
		var line;
		var before;
		var after;
		var code$2;
		while (++rowIndex < rowLength) {
			cells = table$4[rowIndex];
			columnIndex = -1;
			columnLength = cells.length;
			row = [];
			sizes = [];
			if (columnLength > mostCellsPerRow) mostCellsPerRow = columnLength;
			while (++columnIndex < columnLength) {
				cell = serialize(cells[columnIndex]);
				if (alignDelimiters === true) {
					size = stringLength(cell);
					sizes[columnIndex] = size;
					largest = longestCellByColumn[columnIndex];
					if (largest === void 0 || size > largest) longestCellByColumn[columnIndex] = size;
				}
				row.push(cell);
			}
			cellMatrix[rowIndex] = row;
			sizeMatrix[rowIndex] = sizes;
		}
		columnIndex = -1;
		columnLength = mostCellsPerRow;
		if (typeof align === "object" && "length" in align) while (++columnIndex < columnLength) alignments[columnIndex] = toAlignment(align[columnIndex]);
		else {
			code$2 = toAlignment(align);
			while (++columnIndex < columnLength) alignments[columnIndex] = code$2;
		}
		columnIndex = -1;
		columnLength = mostCellsPerRow;
		row = [];
		sizes = [];
		while (++columnIndex < columnLength) {
			code$2 = alignments[columnIndex];
			before = "";
			after = "";
			if (code$2 === l) before = colon;
			else if (code$2 === r) after = colon;
			else if (code$2 === c) {
				before = colon;
				after = colon;
			}
			size = alignDelimiters ? Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length) : 1;
			cell = before + repeat$3(dash, size) + after;
			if (alignDelimiters === true) {
				size = before.length + size + after.length;
				if (size > longestCellByColumn[columnIndex]) longestCellByColumn[columnIndex] = size;
				sizes[columnIndex] = size;
			}
			row[columnIndex] = cell;
		}
		cellMatrix.splice(1, 0, row);
		sizeMatrix.splice(1, 0, sizes);
		rowIndex = -1;
		rowLength = cellMatrix.length;
		lines = [];
		while (++rowIndex < rowLength) {
			row = cellMatrix[rowIndex];
			sizes = sizeMatrix[rowIndex];
			columnIndex = -1;
			columnLength = mostCellsPerRow;
			line = [];
			while (++columnIndex < columnLength) {
				cell = row[columnIndex] || "";
				before = "";
				after = "";
				if (alignDelimiters === true) {
					size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
					code$2 = alignments[columnIndex];
					if (code$2 === r) before = repeat$3(space, size);
					else if (code$2 === c) if (size % 2 === 0) {
						before = repeat$3(space, size / 2);
						after = before;
					} else {
						before = repeat$3(space, size / 2 + .5);
						after = repeat$3(space, size / 2 - .5);
					}
					else after = repeat$3(space, size);
				}
				if (start === true && columnIndex === 0) line.push(verticalBar);
				if (padding === true && !(alignDelimiters === false && cell === "") && (start === true || columnIndex !== 0)) line.push(space);
				if (alignDelimiters === true) line.push(before);
				line.push(cell);
				if (alignDelimiters === true) line.push(after);
				if (padding === true) line.push(space);
				if (end === true || columnIndex !== columnLength - 1) line.push(verticalBar);
			}
			line = line.join("");
			if (end === false) line = line.replace(trailingWhitespace, "");
			lines.push(line);
		}
		return lines.join(lineFeed);
	}
	function serialize(value) {
		return value === null || value === void 0 ? "" : String(value);
	}
	function defaultStringLength(value) {
		return value.length;
	}
	function toAlignment(value) {
		var code$2 = typeof value === "string" ? value.charCodeAt(0) : x;
		return code$2 === L || code$2 === l ? l : code$2 === R || code$2 === r ? r : code$2 === C || code$2 === c ? c : x;
	}
}));
var require_to_markdown$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var phrasing = require_container_phrasing();
	var defaultInlineCode = require_inline_code();
	var markdownTable = require_markdown_table();
	module.exports = toMarkdown$3;
	function toMarkdown$3(options) {
		var settings = options || {};
		var padding = settings.tableCellPadding;
		var alignDelimiters = settings.tablePipeAlign;
		var stringLength = settings.stringLength;
		var around = padding ? " " : "|";
		return {
			unsafe: [
				{
					character: "\r",
					inConstruct: "tableCell"
				},
				{
					character: "\n",
					inConstruct: "tableCell"
				},
				{
					atBreak: true,
					character: "|",
					after: "[	 :-]"
				},
				{
					character: "|",
					inConstruct: "tableCell"
				},
				{
					atBreak: true,
					character: ":",
					after: "-"
				},
				{
					atBreak: true,
					character: "-",
					after: "[:|-]"
				}
			],
			handlers: {
				table: handleTable,
				tableRow: handleTableRow,
				tableCell: handleTableCell,
				inlineCode: inlineCodeWithTable
			}
		};
		function handleTable(node$1, _, context) {
			return serializeData(handleTableAsData(node$1, context), node$1.align);
		}
		function handleTableRow(node$1, _, context) {
			var value = serializeData([handleTableRowAsData(node$1, context)]);
			return value.slice(0, value.indexOf("\n"));
		}
		function handleTableCell(node$1, _, context) {
			var exit$2 = context.enter("tableCell");
			var value = phrasing(node$1, context, {
				before: around,
				after: around
			});
			exit$2();
			return value;
		}
		function serializeData(matrix, align) {
			return markdownTable(matrix, {
				align,
				alignDelimiters,
				padding,
				stringLength
			});
		}
		function handleTableAsData(node$1, context) {
			var children = node$1.children;
			var index$1 = -1;
			var length = children.length;
			var result = [];
			var subexit = context.enter("table");
			while (++index$1 < length) result[index$1] = handleTableRowAsData(children[index$1], context);
			subexit();
			return result;
		}
		function handleTableRowAsData(node$1, context) {
			var children = node$1.children;
			var index$1 = -1;
			var length = children.length;
			var result = [];
			var subexit = context.enter("tableRow");
			while (++index$1 < length) result[index$1] = handleTableCell(children[index$1], node$1, context);
			subexit();
			return result;
		}
		function inlineCodeWithTable(node$1, parent, context) {
			var value = defaultInlineCode(node$1, parent, context);
			if (context.stack.indexOf("tableCell") !== -1) value = value.replace(/\|/g, "\\$&");
			return value;
		}
	}
}));
var require_check_bullet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = checkBullet$1;
	function checkBullet$1(context) {
		var marker = context.options.bullet || "*";
		if (marker !== "*" && marker !== "+" && marker !== "-") throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
		return marker;
	}
}));
var require_check_list_item_indent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = checkListItemIndent$1;
	function checkListItemIndent$1(context) {
		var style = context.options.listItemIndent || "tab";
		if (style === 1 || style === "1") return "one";
		if (style !== "tab" && style !== "one" && style !== "mixed") throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
		return style;
	}
}));
var require_container_flow = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = flow$1;
	var repeat$2 = require_repeat_string();
	function flow$1(parent, context) {
		var children = parent.children || [];
		var results = [];
		var index$1 = -1;
		var child;
		while (++index$1 < children.length) {
			child = children[index$1];
			results.push(context.handle(child, parent, context, {
				before: "\n",
				after: "\n"
			}));
			if (index$1 + 1 < children.length) results.push(between(child, children[index$1 + 1]));
		}
		return results.join("");
		function between(left, right) {
			var index$2 = -1;
			var result;
			while (++index$2 < context.join.length) {
				result = context.join[index$2](left, right, parent, context);
				if (result === true || result === 1) break;
				if (typeof result === "number") return repeat$2("\n", 1 + Number(result));
				if (result === false) return "\n\n<!---->\n\n";
			}
			return "\n\n";
		}
	}
}));
var require_indent_lines = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = indentLines$1;
	var eol = /\r?\n|\r/g;
	function indentLines$1(value, map) {
		var result = [];
		var start = 0;
		var line = 0;
		var match;
		while (match = eol.exec(value)) {
			one(value.slice(start, match.index));
			result.push(match[0]);
			start = match.index + match[0].length;
			line++;
		}
		one(value.slice(start));
		return result.join("");
		function one(value$1) {
			result.push(map(value$1, line, !value$1));
		}
	}
}));
var require_list_item = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = listItem;
	var repeat$1 = require_repeat_string();
	var checkBullet = require_check_bullet();
	var checkListItemIndent = require_check_list_item_indent();
	var flow = require_container_flow();
	var indentLines = require_indent_lines();
	function listItem(node$1, parent, context) {
		var bullet = checkBullet(context);
		var listItemIndent = checkListItemIndent(context);
		var size;
		var value;
		var exit$2;
		if (parent && parent.ordered) bullet = (parent.start > -1 ? parent.start : 1) + (context.options.incrementListMarker === false ? 0 : parent.children.indexOf(node$1)) + ".";
		size = bullet.length + 1;
		if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.spread || node$1.spread)) size = Math.ceil(size / 4) * 4;
		exit$2 = context.enter("listItem");
		value = indentLines(flow(node$1, context), map);
		exit$2();
		return value;
		function map(line, index$1, blank) {
			if (index$1) return (blank ? "" : repeat$1(" ", size)) + line;
			return (blank ? bullet : bullet + repeat$1(" ", size - bullet.length)) + line;
		}
	}
}));
var require_to_markdown$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var defaultListItem = require_list_item();
	exports.unsafe = [{
		atBreak: true,
		character: "-",
		after: "[:|-]"
	}];
	exports.handlers = { listItem: listItemWithTaskListItem };
	function listItemWithTaskListItem(node$1, parent, context) {
		var value = defaultListItem(node$1, parent, context);
		var head = node$1.children[0];
		if (typeof node$1.checked === "boolean" && head && head.type === "paragraph") value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
		return value;
		function check($0) {
			return $0 + "[" + (node$1.checked ? "x" : " ") + "] ";
		}
	}
}));
var require_configure = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = configure$1;
	function configure$1(base, extension$3) {
		var index$1 = -1;
		var key;
		if (extension$3.extensions) while (++index$1 < extension$3.extensions.length) configure$1(base, extension$3.extensions[index$1]);
		for (key in extension$3) if (key === "extensions") {} else if (key === "unsafe" || key === "join") base[key] = base[key].concat(extension$3[key] || []);
		else if (key === "handlers") base[key] = Object.assign(base[key], extension$3[key] || {});
		else base.options[key] = extension$3[key];
		return base;
	}
}));
var require_to_markdown$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var autolinkLiteral = require_to_markdown$5();
	var strikethrough = require_to_markdown$4();
	var table = require_to_markdown$3();
	var taskListItem = require_to_markdown$2();
	var configure = require_configure();
	module.exports = toMarkdown$2;
	function toMarkdown$2(options) {
		var config = configure({
			handlers: {},
			join: [],
			unsafe: [],
			options: {}
		}, { extensions: [
			autolinkLiteral,
			strikethrough,
			table(options),
			taskListItem
		] });
		return Object.assign(config.options, {
			handlers: config.handlers,
			join: config.join,
			unsafe: config.unsafe
		});
	}
}));
var require_remark_gfm = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var syntax$1 = require_micromark_extension_gfm();
	var fromMarkdown$1 = require_from_markdown$1();
	var toMarkdown$1 = require_to_markdown$1();
	var warningIssued$1;
	module.exports = gfm;
	function gfm(options) {
		var data = this.data();
		/* istanbul ignore next - old remark. */
		if (!warningIssued$1 && (this.Parser && this.Parser.prototype && this.Parser.prototype.blockTokenizers || this.Compiler && this.Compiler.prototype && this.Compiler.prototype.visitors)) {
			warningIssued$1 = true;
			console.warn("[remark-gfm] Warning: please upgrade to remark 13 to use this plugin");
		}
		add("micromarkExtensions", syntax$1(options));
		add("fromMarkdownExtensions", fromMarkdown$1);
		add("toMarkdownExtensions", toMarkdown$1(options));
		function add(field, value) {
			/* istanbul ignore if - other extensions. */
			if (data[field]) data[field].push(value);
			else data[field] = [value];
		}
	}
}));
var require_tokenize_math_flow = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.tokenize = tokenizeMathFenced;
	exports.concrete = true;
	var prefixSize = require_prefix_size();
	var createSpace = require_factory_space();
	function tokenizeMathFenced(effects, ok$1, nok) {
		var self = this;
		var initialPrefix = prefixSize(this.events, "linePrefix");
		var sizeOpen = 0;
		return start;
		function start(code$2) {
			/* istanbul ignore if - handled by mm */
			if (code$2 !== 36) throw new Error("expected `$`");
			effects.enter("mathFlow");
			effects.enter("mathFlowFence");
			effects.enter("mathFlowFenceSequence");
			return sequenceOpen(code$2);
		}
		function sequenceOpen(code$2) {
			if (code$2 === 36) {
				effects.consume(code$2);
				sizeOpen++;
				return sequenceOpen;
			}
			effects.exit("mathFlowFenceSequence");
			return sizeOpen < 2 ? nok(code$2) : createSpace(effects, metaOpen, "whitespace")(code$2);
		}
		function metaOpen(code$2) {
			if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) return openAfter(code$2);
			effects.enter("mathFlowFenceMeta");
			effects.enter("chunkString", { contentType: "string" });
			return meta(code$2);
		}
		function meta(code$2) {
			if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) {
				effects.exit("chunkString");
				effects.exit("mathFlowFenceMeta");
				return openAfter(code$2);
			}
			if (code$2 === 36) return nok(code$2);
			effects.consume(code$2);
			return meta;
		}
		function openAfter(code$2) {
			effects.exit("mathFlowFence");
			return self.interrupt ? ok$1(code$2) : content$3(code$2);
		}
		function content$3(code$2) {
			if (code$2 === null) return after(code$2);
			if (code$2 === -5 || code$2 === -4 || code$2 === -3) {
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				return effects.attempt({
					tokenize: tokenizeClosingFence,
					partial: true
				}, after, initialPrefix ? createSpace(effects, content$3, "linePrefix", initialPrefix + 1) : content$3);
			}
			effects.enter("mathFlowValue");
			return contentContinue(code$2);
		}
		function contentContinue(code$2) {
			if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) {
				effects.exit("mathFlowValue");
				return content$3(code$2);
			}
			effects.consume(code$2);
			return contentContinue;
		}
		function after(code$2) {
			effects.exit("mathFlow");
			return ok$1(code$2);
		}
		function tokenizeClosingFence(effects$1, ok$2, nok$1) {
			var size = 0;
			return createSpace(effects$1, closingPrefixAfter, "linePrefix", 4);
			function closingPrefixAfter(code$2) {
				effects$1.enter("mathFlowFence");
				effects$1.enter("mathFlowFenceSequence");
				return closingSequence(code$2);
			}
			function closingSequence(code$2) {
				if (code$2 === 36) {
					effects$1.consume(code$2);
					size++;
					return closingSequence;
				}
				if (size < sizeOpen) return nok$1(code$2);
				effects$1.exit("mathFlowFenceSequence");
				return createSpace(effects$1, closingSequenceEnd, "whitespace")(code$2);
			}
			function closingSequenceEnd(code$2) {
				if (code$2 === null || code$2 === -5 || code$2 === -4 || code$2 === -3) {
					effects$1.exit("mathFlowFence");
					return ok$2(code$2);
				}
				return nok$1(code$2);
			}
		}
	}
}));
var require_tokenize_math_text = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.tokenize = tokenizeMathText;
	exports.resolve = resolveMathText;
	exports.previous = previous;
	function resolveMathText(events) {
		var tailExitIndex = events.length - 4;
		var headEnterIndex = 3;
		var index$1;
		var enter;
		if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
			index$1 = headEnterIndex;
			while (++index$1 < tailExitIndex) if (events[index$1][1].type === "mathTextData") {
				events[tailExitIndex][1].type = "mathTextPadding";
				events[headEnterIndex][1].type = "mathTextPadding";
				headEnterIndex += 2;
				tailExitIndex -= 2;
				break;
			}
		}
		index$1 = headEnterIndex - 1;
		tailExitIndex++;
		while (++index$1 <= tailExitIndex) if (enter === void 0) {
			if (index$1 !== tailExitIndex && events[index$1][1].type !== "lineEnding") enter = index$1;
		} else if (index$1 === tailExitIndex || events[index$1][1].type === "lineEnding") {
			events[enter][1].type = "mathTextData";
			if (index$1 !== enter + 2) {
				events[enter][1].end = events[index$1 - 1][1].end;
				events.splice(enter + 2, index$1 - enter - 2);
				tailExitIndex -= index$1 - enter - 2;
				index$1 = enter + 2;
			}
			enter = void 0;
		}
		return events;
	}
	function previous(code$2) {
		return code$2 !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
	}
	function tokenizeMathText(effects, ok$1, nok) {
		var self = this;
		var sizeOpen = 0;
		var size;
		var token;
		return start;
		function start(code$2) {
			/* istanbul ignore if - handled by mm */
			if (code$2 !== 36) throw new Error("expected `$`");
			/* istanbul ignore if - handled by mm */
			if (!previous.call(self, self.previous)) throw new Error("expected correct previous");
			effects.enter("mathText");
			effects.enter("mathTextSequence");
			return openingSequence(code$2);
		}
		function openingSequence(code$2) {
			if (code$2 === 36) {
				effects.consume(code$2);
				sizeOpen++;
				return openingSequence;
			}
			effects.exit("mathTextSequence");
			return gap(code$2);
		}
		function gap(code$2) {
			if (code$2 === null) return nok(code$2);
			if (code$2 === 36) {
				token = effects.enter("mathTextSequence");
				size = 0;
				return closingSequence(code$2);
			}
			if (code$2 === 32) {
				effects.enter("space");
				effects.consume(code$2);
				effects.exit("space");
				return gap;
			}
			if (code$2 === -5 || code$2 === -4 || code$2 === -3) {
				effects.enter("lineEnding");
				effects.consume(code$2);
				effects.exit("lineEnding");
				return gap;
			}
			effects.enter("mathTextData");
			return data(code$2);
		}
		function data(code$2) {
			if (code$2 === null || code$2 === 32 || code$2 === 36 || code$2 === -5 || code$2 === -4 || code$2 === -3) {
				effects.exit("mathTextData");
				return gap(code$2);
			}
			effects.consume(code$2);
			return data;
		}
		function closingSequence(code$2) {
			if (code$2 === 36) {
				effects.consume(code$2);
				size++;
				return closingSequence;
			}
			if (size === sizeOpen) {
				effects.exit("mathTextSequence");
				effects.exit("mathText");
				return ok$1(code$2);
			}
			token.type = "mathTextData";
			return data(code$2);
		}
	}
}));
var require_syntax = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.flow = { 36: require_tokenize_math_flow() };
	exports.text = { 36: require_tokenize_math_text() };
}));
var require_micromark_extension_math = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_syntax();
}));
var require_from_markdown = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.enter = {
		mathFlow: enterMathFlow,
		mathFlowFenceMeta: enterMathFlowMeta,
		mathText: enterMathText
	};
	exports.exit = {
		mathFlow: exitMathFlow,
		mathFlowFence: exitMathFlowFence,
		mathFlowFenceMeta: exitMathFlowMeta,
		mathFlowValue: exitMathData,
		mathText: exitMathText,
		mathTextData: exitMathData
	};
	function enterMathFlow(token) {
		this.enter({
			type: "math",
			meta: null,
			value: "",
			data: {
				hName: "div",
				hProperties: { className: ["math", "math-display"] },
				hChildren: [{
					type: "text",
					value: ""
				}]
			}
		}, token);
	}
	function enterMathFlowMeta() {
		this.buffer();
	}
	function exitMathFlowMeta() {
		var data = this.resume();
		this.stack[this.stack.length - 1].meta = data;
	}
	function exitMathFlowFence() {
		if (this.getData("mathFlowInside")) return;
		this.buffer();
		this.setData("mathFlowInside", true);
	}
	function exitMathFlow(token) {
		var data = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
		var node$1 = this.exit(token);
		node$1.value = data;
		node$1.data.hChildren[0].value = data;
		this.setData("mathFlowInside");
	}
	function enterMathText(token) {
		this.enter({
			type: "inlineMath",
			value: "",
			data: {
				hName: "span",
				hProperties: { className: ["math", "math-inline"] },
				hChildren: [{
					type: "text",
					value: ""
				}]
			}
		}, token);
		this.buffer();
	}
	function exitMathText(token) {
		var data = this.resume();
		var node$1 = this.exit(token);
		node$1.value = data;
		node$1.data.hChildren[0].value = data;
	}
	function exitMathData(token) {
		this.config.enter.data.call(this, token);
		this.config.exit.data.call(this, token);
	}
}));
var require_longest_streak = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = longestStreak;
	function longestStreak(value, character) {
		var count = 0;
		var maximum = 0;
		var expected;
		var index$1;
		if (typeof character !== "string" || character.length !== 1) throw new Error("Expected character");
		value = String(value);
		index$1 = value.indexOf(character);
		expected = index$1;
		while (index$1 !== -1) {
			count++;
			if (index$1 === expected) {
				if (count > maximum) maximum = count;
			} else count = 1;
			expected = index$1 + 1;
			index$1 = value.indexOf(character, expected);
		}
		return maximum;
	}
}));
var require_pattern_in_scope = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = patternInScope$1;
	function patternInScope$1(stack, pattern) {
		return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct);
	}
	function listInScope(stack, list$2, none) {
		var index$1;
		if (!list$2) return none;
		if (typeof list$2 === "string") list$2 = [list$2];
		index$1 = -1;
		while (++index$1 < list$2.length) if (stack.indexOf(list$2[index$1]) !== -1) return true;
		return false;
	}
}));
var require_safe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = safe$1;
	var patternCompile = require_pattern_compile();
	var patternInScope = require_pattern_in_scope();
	function safe$1(context, input, config) {
		var value = (config.before || "") + (input || "") + (config.after || "");
		var positions = [];
		var result = [];
		var infos = {};
		var index$1 = -1;
		var before;
		var after;
		var position$1;
		var pattern;
		var expression;
		var match;
		var start;
		var end;
		while (++index$1 < context.unsafe.length) {
			pattern = context.unsafe[index$1];
			if (!patternInScope(context.stack, pattern)) continue;
			expression = patternCompile(pattern);
			while (match = expression.exec(value)) {
				before = "before" in pattern || pattern.atBreak;
				after = "after" in pattern;
				position$1 = match.index + (before ? match[1].length : 0);
				if (positions.indexOf(position$1) === -1) {
					positions.push(position$1);
					infos[position$1] = {
						before,
						after
					};
				} else {
					if (infos[position$1].before && !before) infos[position$1].before = false;
					if (infos[position$1].after && !after) infos[position$1].after = false;
				}
			}
		}
		positions.sort(numerical);
		start = config.before ? config.before.length : 0;
		end = value.length - (config.after ? config.after.length : 0);
		index$1 = -1;
		while (++index$1 < positions.length) {
			position$1 = positions[index$1];
			if (position$1 < start || position$1 >= end) continue;
			if (position$1 + 1 < end && positions[index$1 + 1] === position$1 + 1 && infos[position$1].after && !infos[position$1 + 1].before && !infos[position$1 + 1].after) continue;
			if (start !== position$1) result.push(escapeBackslashes(value.slice(start, position$1), "\\"));
			start = position$1;
			if (/[!-/:-@[-`{-~]/.test(value.charAt(position$1)) && (!config.encode || config.encode.indexOf(value.charAt(position$1)) === -1)) result.push("\\");
			else {
				result.push("&#x" + value.charCodeAt(position$1).toString(16).toUpperCase() + ";");
				start++;
			}
		}
		result.push(escapeBackslashes(value.slice(start, end), config.after));
		return result.join("");
	}
	function numerical(a, b) {
		return a - b;
	}
	function escapeBackslashes(value, after) {
		var expression = /\\(?=[!-/:-@[-`{-~])/g;
		var positions = [];
		var results = [];
		var index$1 = -1;
		var start = 0;
		var whole = value + after;
		var match;
		while (match = expression.exec(whole)) positions.push(match.index);
		while (++index$1 < positions.length) {
			if (start !== positions[index$1]) results.push(value.slice(start, positions[index$1]));
			results.push("\\");
			start = positions[index$1];
		}
		results.push(value.slice(start));
		return results.join("");
	}
}));
var require_to_markdown = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.unsafe = [
		{
			character: "\r",
			inConstruct: ["mathFlowMeta"]
		},
		{
			character: "\r",
			inConstruct: ["mathFlowMeta"]
		},
		{
			character: "$",
			inConstruct: ["mathFlowMeta", "phrasing"]
		},
		{
			atBreak: true,
			character: "$",
			after: "\\$"
		}
	];
	exports.handlers = {
		math: math$1,
		inlineMath
	};
	inlineMath.peek = inlineMathPeek;
	var repeat = require_repeat_string();
	var streak = require_longest_streak();
	var safe = require_safe();
	function math$1(node$1, _, context) {
		var raw = node$1.value || "";
		var fence = repeat("$", Math.max(streak(raw, "$") + 1, 2));
		var exit$2 = context.enter("mathFlow");
		var value = fence;
		var subexit;
		if (node$1.meta) {
			subexit = context.enter("mathFlowMeta");
			value += safe(context, node$1.meta, {
				before: "$",
				after: " ",
				encode: ["$"]
			});
			subexit();
		}
		value += "\n";
		if (raw) value += raw + "\n";
		value += fence;
		exit$2();
		return value;
	}
	function inlineMath(node$1) {
		var value = node$1.value || "";
		var size = 1;
		var pad = "";
		var sequence;
		while ((/* @__PURE__ */ new RegExp("(^|[^$])" + repeat("\\$", size) + "([^$]|$)")).test(value)) size++;
		if (/[^ \r\n]/.test(value) && (/[ \r\n$]/.test(value.charAt(0)) || /[ \r\n$]/.test(value.charAt(value.length - 1)))) pad = " ";
		sequence = repeat("$", size);
		return sequence + pad + value + pad + sequence;
	}
	function inlineMathPeek() {
		return "$";
	}
}));
var require_remark_math = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var syntax = require_micromark_extension_math();
	var fromMarkdown = require_from_markdown();
	var toMarkdown = require_to_markdown();
	var warningIssued;
	module.exports = math;
	function math() {
		var data = this.data();
		/* istanbul ignore next - old remark. */
		if (!warningIssued && (this.Parser && this.Parser.prototype && this.Parser.prototype.blockTokenizers || this.Compiler && this.Compiler.prototype && this.Compiler.prototype.visitors)) {
			warningIssued = true;
			console.warn("[remark-math] Warning: please upgrade to remark 13 to use this plugin");
		}
		add("micromarkExtensions", syntax);
		add("fromMarkdownExtensions", fromMarkdown);
		add("toMarkdownExtensions", toMarkdown);
		function add(field, value) {
			/* istanbul ignore if - other extensions. */
			if (data[field]) data[field].push(value);
			else data[field] = [value];
		}
	}
}));
var require_src = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.markdownToRichText = exports.markdownToBlocks = void 0;
	var unified_1 = __importDefault(require_unified());
	var remark_parse_1 = __importDefault(require_remark_parse());
	var internal_1 = require_internal();
	var remark_gfm_1 = __importDefault(require_remark_gfm());
	var remark_math_1 = __importDefault(require_remark_math());
	function markdownToBlocks(body, options) {
		const root = (0, unified_1.default)().use(remark_parse_1.default).use(remark_gfm_1.default).use(remark_math_1.default).parse(body);
		return (0, internal_1.parseBlocks)(root, options);
	}
	exports.markdownToBlocks = markdownToBlocks;
	function markdownToRichText(text$5, options) {
		const root = (0, unified_1.default)().use(remark_parse_1.default).use(remark_gfm_1.default).parse(text$5);
		return (0, internal_1.parseRichText)(root, options);
	}
	exports.markdownToRichText = markdownToRichText;
}));
export default require_src();
