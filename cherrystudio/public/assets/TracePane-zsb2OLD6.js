import { s as __toESM, t as __commonJSMin } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { a as FieldGroup, l as FieldTitle, n as FieldContent, r as FieldDescription, t as Field } from "./field-v-3EhHEn.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-C7Ec2BdI.js";
import { o as parseUniqueModelId } from "./model-CfoN7z8F.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as ChevronDown } from "./chevron-down-BVtofl6V.js";
import { t as ChevronRight } from "./chevron-right-CvFIUMTW.js";
import { t as ChevronsLeft } from "./chevrons-left-DTTrVPYr.js";
import { t as Copy } from "./copy-DLNIVOlq.js";
import { t as CodeViewer_default } from "./CodeViewer-DGoFKh5Z.js";
import { t as ModelAvatar_default } from "./ModelAvatar-B9O4au8z.js";
import { t as useTemporaryValue } from "./useTemporaryValue-BuEAjgKO.js";
const SPAN_NAME_TURN = "ai.turn";
(/* @__PURE__ */ __commonJSMin((() => {
	var Reflect;
	(function(Reflect$1) {
		(function(factory) {
			var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
			var exporter = makeExporter(Reflect$1);
			if (typeof root.Reflect !== "undefined") exporter = makeExporter(root.Reflect, exporter);
			factory(exporter, root);
			if (typeof root.Reflect === "undefined") root.Reflect = Reflect$1;
			function makeExporter(target, previous) {
				return function(key, value) {
					Object.defineProperty(target, key, {
						configurable: true,
						writable: true,
						value
					});
					if (previous) previous(key, value);
				};
			}
			function functionThis() {
				try {
					return Function("return this;")();
				} catch (_) {}
			}
			function indirectEvalThis() {
				try {
					return (0, eval)("(function() { return this; })()");
				} catch (_) {}
			}
			function sloppyModeThis() {
				return functionThis() || indirectEvalThis();
			}
		})(function(exporter, root) {
			var hasOwn = Object.prototype.hasOwnProperty;
			var supportsSymbol = typeof Symbol === "function";
			var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
			var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
			var supportsCreate = typeof Object.create === "function";
			var supportsProto = { __proto__: [] } instanceof Array;
			var downLevel = !supportsCreate && !supportsProto;
			var HashMap = {
				create: supportsCreate ? function() {
					return MakeDictionary(Object.create(null));
				} : supportsProto ? function() {
					return MakeDictionary({ __proto__: null });
				} : function() {
					return MakeDictionary({});
				},
				has: downLevel ? function(map, key) {
					return hasOwn.call(map, key);
				} : function(map, key) {
					return key in map;
				},
				get: downLevel ? function(map, key) {
					return hasOwn.call(map, key) ? map[key] : void 0;
				} : function(map, key) {
					return map[key];
				}
			};
			var functionPrototype = Object.getPrototypeOf(Function);
			var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
			var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
			var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
			var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
			var metadataRegistry = GetOrCreateMetadataRegistry();
			var metadataProvider = CreateMetadataProvider(metadataRegistry);
			function decorate(decorators, target, propertyKey, attributes) {
				if (!IsUndefined(propertyKey)) {
					if (!IsArray(decorators)) throw new TypeError();
					if (!IsObject(target)) throw new TypeError();
					if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError();
					if (IsNull(attributes)) attributes = void 0;
					propertyKey = ToPropertyKey(propertyKey);
					return DecorateProperty(decorators, target, propertyKey, attributes);
				} else {
					if (!IsArray(decorators)) throw new TypeError();
					if (!IsConstructor(target)) throw new TypeError();
					return DecorateConstructor(decorators, target);
				}
			}
			exporter("decorate", decorate);
			function metadata(metadataKey, metadataValue) {
				function decorator(target, propertyKey) {
					if (!IsObject(target)) throw new TypeError();
					if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError();
					OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
				}
				return decorator;
			}
			exporter("metadata", metadata);
			function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
			}
			exporter("defineMetadata", defineMetadata);
			function hasMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryHasMetadata(metadataKey, target, propertyKey);
			}
			exporter("hasMetadata", hasMetadata);
			function hasOwnMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
			}
			exporter("hasOwnMetadata", hasOwnMetadata);
			function getMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryGetMetadata(metadataKey, target, propertyKey);
			}
			exporter("getMetadata", getMetadata);
			function getOwnMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
			}
			exporter("getOwnMetadata", getOwnMetadata);
			function getMetadataKeys(target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryMetadataKeys(target, propertyKey);
			}
			exporter("getMetadataKeys", getMetadataKeys);
			function getOwnMetadataKeys(target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryOwnMetadataKeys(target, propertyKey);
			}
			exporter("getOwnMetadataKeys", getOwnMetadataKeys);
			function deleteMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				var provider = GetMetadataProvider(target, propertyKey, false);
				if (IsUndefined(provider)) return false;
				return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
			}
			exporter("deleteMetadata", deleteMetadata);
			function DecorateConstructor(decorators, target) {
				for (var i = decorators.length - 1; i >= 0; --i) {
					var decorator = decorators[i];
					var decorated = decorator(target);
					if (!IsUndefined(decorated) && !IsNull(decorated)) {
						if (!IsConstructor(decorated)) throw new TypeError();
						target = decorated;
					}
				}
				return target;
			}
			function DecorateProperty(decorators, target, propertyKey, descriptor) {
				for (var i = decorators.length - 1; i >= 0; --i) {
					var decorator = decorators[i];
					var decorated = decorator(target, propertyKey, descriptor);
					if (!IsUndefined(decorated) && !IsNull(decorated)) {
						if (!IsObject(decorated)) throw new TypeError();
						descriptor = decorated;
					}
				}
				return descriptor;
			}
			function OrdinaryHasMetadata(MetadataKey, O, P) {
				if (OrdinaryHasOwnMetadata(MetadataKey, O, P)) return true;
				var parent = OrdinaryGetPrototypeOf(O);
				if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
				return false;
			}
			function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
				var provider = GetMetadataProvider(O, P, false);
				if (IsUndefined(provider)) return false;
				return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
			}
			function OrdinaryGetMetadata(MetadataKey, O, P) {
				if (OrdinaryHasOwnMetadata(MetadataKey, O, P)) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
				var parent = OrdinaryGetPrototypeOf(O);
				if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
			}
			function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
				var provider = GetMetadataProvider(O, P, false);
				if (IsUndefined(provider)) return;
				return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
			}
			function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
				GetMetadataProvider(O, P, true).OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
			}
			function OrdinaryMetadataKeys(O, P) {
				var ownKeys = OrdinaryOwnMetadataKeys(O, P);
				var parent = OrdinaryGetPrototypeOf(O);
				if (parent === null) return ownKeys;
				var parentKeys = OrdinaryMetadataKeys(parent, P);
				if (parentKeys.length <= 0) return ownKeys;
				if (ownKeys.length <= 0) return parentKeys;
				var set = new _Set();
				var keys = [];
				for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
					var key = ownKeys_1[_i];
					var hasKey = set.has(key);
					if (!hasKey) {
						set.add(key);
						keys.push(key);
					}
				}
				for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
					var key = parentKeys_1[_a];
					var hasKey = set.has(key);
					if (!hasKey) {
						set.add(key);
						keys.push(key);
					}
				}
				return keys;
			}
			function OrdinaryOwnMetadataKeys(O, P) {
				var provider = GetMetadataProvider(O, P, false);
				if (!provider) return [];
				return provider.OrdinaryOwnMetadataKeys(O, P);
			}
			function Type(x) {
				if (x === null) return 1;
				switch (typeof x) {
					case "undefined": return 0;
					case "boolean": return 2;
					case "string": return 3;
					case "symbol": return 4;
					case "number": return 5;
					case "object": return x === null ? 1 : 6;
					default: return 6;
				}
			}
			function IsUndefined(x) {
				return x === void 0;
			}
			function IsNull(x) {
				return x === null;
			}
			function IsSymbol(x) {
				return typeof x === "symbol";
			}
			function IsObject(x) {
				return typeof x === "object" ? x !== null : typeof x === "function";
			}
			function ToPrimitive(input, PreferredType) {
				switch (Type(input)) {
					case 0: return input;
					case 1: return input;
					case 2: return input;
					case 3: return input;
					case 4: return input;
					case 5: return input;
				}
				var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
				var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
				if (exoticToPrim !== void 0) {
					var result = exoticToPrim.call(input, hint);
					if (IsObject(result)) throw new TypeError();
					return result;
				}
				return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
			}
			function OrdinaryToPrimitive(O, hint) {
				if (hint === "string") {
					var toString_1 = O.toString;
					if (IsCallable(toString_1)) {
						var result = toString_1.call(O);
						if (!IsObject(result)) return result;
					}
					var valueOf = O.valueOf;
					if (IsCallable(valueOf)) {
						var result = valueOf.call(O);
						if (!IsObject(result)) return result;
					}
				} else {
					var valueOf = O.valueOf;
					if (IsCallable(valueOf)) {
						var result = valueOf.call(O);
						if (!IsObject(result)) return result;
					}
					var toString_2 = O.toString;
					if (IsCallable(toString_2)) {
						var result = toString_2.call(O);
						if (!IsObject(result)) return result;
					}
				}
				throw new TypeError();
			}
			function ToBoolean(argument) {
				return !!argument;
			}
			function ToString(argument) {
				return "" + argument;
			}
			function ToPropertyKey(argument) {
				var key = ToPrimitive(argument, 3);
				if (IsSymbol(key)) return key;
				return ToString(key);
			}
			function IsArray(argument) {
				return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
			}
			function IsCallable(argument) {
				return typeof argument === "function";
			}
			function IsConstructor(argument) {
				return typeof argument === "function";
			}
			function IsPropertyKey(argument) {
				switch (Type(argument)) {
					case 3: return true;
					case 4: return true;
					default: return false;
				}
			}
			function SameValueZero(x, y) {
				return x === y || x !== x && y !== y;
			}
			function GetMethod(V, P) {
				var func = V[P];
				if (func === void 0 || func === null) return void 0;
				if (!IsCallable(func)) throw new TypeError();
				return func;
			}
			function GetIterator(obj) {
				var method = GetMethod(obj, iteratorSymbol);
				if (!IsCallable(method)) throw new TypeError();
				var iterator = method.call(obj);
				if (!IsObject(iterator)) throw new TypeError();
				return iterator;
			}
			function IteratorValue(iterResult) {
				return iterResult.value;
			}
			function IteratorStep(iterator) {
				var result = iterator.next();
				return result.done ? false : result;
			}
			function IteratorClose(iterator) {
				var f = iterator["return"];
				if (f) f.call(iterator);
			}
			function OrdinaryGetPrototypeOf(O) {
				var proto = Object.getPrototypeOf(O);
				if (typeof O !== "function" || O === functionPrototype) return proto;
				if (proto !== functionPrototype) return proto;
				var prototype = O.prototype;
				var prototypeProto = prototype && Object.getPrototypeOf(prototype);
				if (prototypeProto == null || prototypeProto === Object.prototype) return proto;
				var constructor = prototypeProto.constructor;
				if (typeof constructor !== "function") return proto;
				if (constructor === O) return proto;
				return constructor;
			}
			function CreateMetadataRegistry() {
				var fallback;
				if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") fallback = CreateFallbackProvider(root.Reflect);
				var first;
				var second;
				var rest;
				var targetProviderMap = new _WeakMap();
				var registry = {
					registerProvider,
					getProvider,
					setProvider
				};
				return registry;
				function registerProvider(provider) {
					if (!Object.isExtensible(registry)) throw new Error("Cannot add provider to a frozen registry.");
					switch (true) {
						case fallback === provider: break;
						case IsUndefined(first):
							first = provider;
							break;
						case first === provider: break;
						case IsUndefined(second):
							second = provider;
							break;
						case second === provider: break;
						default:
							if (rest === void 0) rest = new _Set();
							rest.add(provider);
							break;
					}
				}
				function getProviderNoCache(O, P) {
					if (!IsUndefined(first)) {
						if (first.isProviderFor(O, P)) return first;
						if (!IsUndefined(second)) {
							if (second.isProviderFor(O, P)) return first;
							if (!IsUndefined(rest)) {
								var iterator = GetIterator(rest);
								while (true) {
									var next = IteratorStep(iterator);
									if (!next) return;
									var provider = IteratorValue(next);
									if (provider.isProviderFor(O, P)) {
										IteratorClose(iterator);
										return provider;
									}
								}
							}
						}
					}
					if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) return fallback;
				}
				function getProvider(O, P) {
					var providerMap = targetProviderMap.get(O);
					var provider;
					if (!IsUndefined(providerMap)) provider = providerMap.get(P);
					if (!IsUndefined(provider)) return provider;
					provider = getProviderNoCache(O, P);
					if (!IsUndefined(provider)) {
						if (IsUndefined(providerMap)) {
							providerMap = new _Map();
							targetProviderMap.set(O, providerMap);
						}
						providerMap.set(P, provider);
					}
					return provider;
				}
				function hasProvider(provider) {
					if (IsUndefined(provider)) throw new TypeError();
					return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
				}
				function setProvider(O, P, provider) {
					if (!hasProvider(provider)) throw new Error("Metadata provider not registered.");
					var existingProvider = getProvider(O, P);
					if (existingProvider !== provider) {
						if (!IsUndefined(existingProvider)) return false;
						var providerMap = targetProviderMap.get(O);
						if (IsUndefined(providerMap)) {
							providerMap = new _Map();
							targetProviderMap.set(O, providerMap);
						}
						providerMap.set(P, provider);
					}
					return true;
				}
			}
			function GetOrCreateMetadataRegistry() {
				var metadataRegistry$1;
				if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) metadataRegistry$1 = root.Reflect[registrySymbol];
				if (IsUndefined(metadataRegistry$1)) metadataRegistry$1 = CreateMetadataRegistry();
				if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) Object.defineProperty(root.Reflect, registrySymbol, {
					enumerable: false,
					configurable: false,
					writable: false,
					value: metadataRegistry$1
				});
				return metadataRegistry$1;
			}
			function CreateMetadataProvider(registry) {
				var metadata$1 = new _WeakMap();
				var provider = {
					isProviderFor: function(O, P) {
						var targetMetadata = metadata$1.get(O);
						if (IsUndefined(targetMetadata)) return false;
						return targetMetadata.has(P);
					},
					OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata$1,
					OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata$1,
					OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata$1,
					OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys$1,
					OrdinaryDeleteMetadata
				};
				metadataRegistry.registerProvider(provider);
				return provider;
				function GetOrCreateMetadataMap(O, P, Create) {
					var targetMetadata = metadata$1.get(O);
					var createdTargetMetadata = false;
					if (IsUndefined(targetMetadata)) {
						if (!Create) return void 0;
						targetMetadata = new _Map();
						metadata$1.set(O, targetMetadata);
						createdTargetMetadata = true;
					}
					var metadataMap = targetMetadata.get(P);
					if (IsUndefined(metadataMap)) {
						if (!Create) return void 0;
						metadataMap = new _Map();
						targetMetadata.set(P, metadataMap);
						if (!registry.setProvider(O, P, provider)) {
							targetMetadata.delete(P);
							if (createdTargetMetadata) metadata$1.delete(O);
							throw new Error("Wrong provider for target.");
						}
					}
					return metadataMap;
				}
				function OrdinaryHasOwnMetadata$1(MetadataKey, O, P) {
					var metadataMap = GetOrCreateMetadataMap(O, P, false);
					if (IsUndefined(metadataMap)) return false;
					return ToBoolean(metadataMap.has(MetadataKey));
				}
				function OrdinaryGetOwnMetadata$1(MetadataKey, O, P) {
					var metadataMap = GetOrCreateMetadataMap(O, P, false);
					if (IsUndefined(metadataMap)) return void 0;
					return metadataMap.get(MetadataKey);
				}
				function OrdinaryDefineOwnMetadata$1(MetadataKey, MetadataValue, O, P) {
					GetOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
				}
				function OrdinaryOwnMetadataKeys$1(O, P) {
					var keys = [];
					var metadataMap = GetOrCreateMetadataMap(O, P, false);
					if (IsUndefined(metadataMap)) return keys;
					var iterator = GetIterator(metadataMap.keys());
					var k = 0;
					while (true) {
						var next = IteratorStep(iterator);
						if (!next) {
							keys.length = k;
							return keys;
						}
						var nextValue = IteratorValue(next);
						try {
							keys[k] = nextValue;
						} catch (e) {
							try {
								IteratorClose(iterator);
							} finally {
								throw e;
							}
						}
						k++;
					}
				}
				function OrdinaryDeleteMetadata(MetadataKey, O, P) {
					var metadataMap = GetOrCreateMetadataMap(O, P, false);
					if (IsUndefined(metadataMap)) return false;
					if (!metadataMap.delete(MetadataKey)) return false;
					if (metadataMap.size === 0) {
						var targetMetadata = metadata$1.get(O);
						if (!IsUndefined(targetMetadata)) {
							targetMetadata.delete(P);
							if (targetMetadata.size === 0) metadata$1.delete(targetMetadata);
						}
					}
					return true;
				}
			}
			function CreateFallbackProvider(reflect) {
				var defineMetadata$1 = reflect.defineMetadata, hasOwnMetadata$1 = reflect.hasOwnMetadata, getOwnMetadata$1 = reflect.getOwnMetadata, getOwnMetadataKeys$1 = reflect.getOwnMetadataKeys, deleteMetadata$1 = reflect.deleteMetadata;
				var metadataOwner = new _WeakMap();
				return {
					isProviderFor: function(O, P) {
						var metadataPropertySet = metadataOwner.get(O);
						if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) return true;
						if (getOwnMetadataKeys$1(O, P).length) {
							if (IsUndefined(metadataPropertySet)) {
								metadataPropertySet = new _Set();
								metadataOwner.set(O, metadataPropertySet);
							}
							metadataPropertySet.add(P);
							return true;
						}
						return false;
					},
					OrdinaryDefineOwnMetadata: defineMetadata$1,
					OrdinaryHasOwnMetadata: hasOwnMetadata$1,
					OrdinaryGetOwnMetadata: getOwnMetadata$1,
					OrdinaryOwnMetadataKeys: getOwnMetadataKeys$1,
					OrdinaryDeleteMetadata: deleteMetadata$1
				};
			}
			function GetMetadataProvider(O, P, Create) {
				var registeredProvider = metadataRegistry.getProvider(O, P);
				if (!IsUndefined(registeredProvider)) return registeredProvider;
				if (Create) {
					if (metadataRegistry.setProvider(O, P, metadataProvider)) return metadataProvider;
					throw new Error("Illegal state.");
				}
			}
			function CreateMapPolyfill() {
				var cacheSentinel = {};
				var arraySentinel = [];
				var MapIterator = function() {
					function MapIterator$1(keys, values, selector) {
						this._index = 0;
						this._keys = keys;
						this._values = values;
						this._selector = selector;
					}
					MapIterator$1.prototype["@@iterator"] = function() {
						return this;
					};
					MapIterator$1.prototype[iteratorSymbol] = function() {
						return this;
					};
					MapIterator$1.prototype.next = function() {
						var index = this._index;
						if (index >= 0 && index < this._keys.length) {
							var result = this._selector(this._keys[index], this._values[index]);
							if (index + 1 >= this._keys.length) {
								this._index = -1;
								this._keys = arraySentinel;
								this._values = arraySentinel;
							} else this._index++;
							return {
								value: result,
								done: false
							};
						}
						return {
							value: void 0,
							done: true
						};
					};
					MapIterator$1.prototype.throw = function(error) {
						if (this._index >= 0) {
							this._index = -1;
							this._keys = arraySentinel;
							this._values = arraySentinel;
						}
						throw error;
					};
					MapIterator$1.prototype.return = function(value) {
						if (this._index >= 0) {
							this._index = -1;
							this._keys = arraySentinel;
							this._values = arraySentinel;
						}
						return {
							value,
							done: true
						};
					};
					return MapIterator$1;
				}();
				return function() {
					function Map$1() {
						this._keys = [];
						this._values = [];
						this._cacheKey = cacheSentinel;
						this._cacheIndex = -2;
					}
					Object.defineProperty(Map$1.prototype, "size", {
						get: function() {
							return this._keys.length;
						},
						enumerable: true,
						configurable: true
					});
					Map$1.prototype.has = function(key) {
						return this._find(key, false) >= 0;
					};
					Map$1.prototype.get = function(key) {
						var index = this._find(key, false);
						return index >= 0 ? this._values[index] : void 0;
					};
					Map$1.prototype.set = function(key, value) {
						var index = this._find(key, true);
						this._values[index] = value;
						return this;
					};
					Map$1.prototype.delete = function(key) {
						var index = this._find(key, false);
						if (index >= 0) {
							var size = this._keys.length;
							for (var i = index + 1; i < size; i++) {
								this._keys[i - 1] = this._keys[i];
								this._values[i - 1] = this._values[i];
							}
							this._keys.length--;
							this._values.length--;
							if (SameValueZero(key, this._cacheKey)) {
								this._cacheKey = cacheSentinel;
								this._cacheIndex = -2;
							}
							return true;
						}
						return false;
					};
					Map$1.prototype.clear = function() {
						this._keys.length = 0;
						this._values.length = 0;
						this._cacheKey = cacheSentinel;
						this._cacheIndex = -2;
					};
					Map$1.prototype.keys = function() {
						return new MapIterator(this._keys, this._values, getKey);
					};
					Map$1.prototype.values = function() {
						return new MapIterator(this._keys, this._values, getValue);
					};
					Map$1.prototype.entries = function() {
						return new MapIterator(this._keys, this._values, getEntry);
					};
					Map$1.prototype["@@iterator"] = function() {
						return this.entries();
					};
					Map$1.prototype[iteratorSymbol] = function() {
						return this.entries();
					};
					Map$1.prototype._find = function(key, insert) {
						if (!SameValueZero(this._cacheKey, key)) {
							this._cacheIndex = -1;
							for (var i = 0; i < this._keys.length; i++) if (SameValueZero(this._keys[i], key)) {
								this._cacheIndex = i;
								break;
							}
						}
						if (this._cacheIndex < 0 && insert) {
							this._cacheIndex = this._keys.length;
							this._keys.push(key);
							this._values.push(void 0);
						}
						return this._cacheIndex;
					};
					return Map$1;
				}();
				function getKey(key, _) {
					return key;
				}
				function getValue(_, value) {
					return value;
				}
				function getEntry(key, value) {
					return [key, value];
				}
			}
			function CreateSetPolyfill() {
				return function() {
					function Set$1() {
						this._map = new _Map();
					}
					Object.defineProperty(Set$1.prototype, "size", {
						get: function() {
							return this._map.size;
						},
						enumerable: true,
						configurable: true
					});
					Set$1.prototype.has = function(value) {
						return this._map.has(value);
					};
					Set$1.prototype.add = function(value) {
						return this._map.set(value, value), this;
					};
					Set$1.prototype.delete = function(value) {
						return this._map.delete(value);
					};
					Set$1.prototype.clear = function() {
						this._map.clear();
					};
					Set$1.prototype.keys = function() {
						return this._map.keys();
					};
					Set$1.prototype.values = function() {
						return this._map.keys();
					};
					Set$1.prototype.entries = function() {
						return this._map.entries();
					};
					Set$1.prototype["@@iterator"] = function() {
						return this.keys();
					};
					Set$1.prototype[iteratorSymbol] = function() {
						return this.keys();
					};
					return Set$1;
				}();
			}
			function CreateWeakMapPolyfill() {
				var UUID_SIZE = 16;
				var keys = HashMap.create();
				var rootKey = CreateUniqueKey();
				return function() {
					function WeakMap$1() {
						this._key = CreateUniqueKey();
					}
					WeakMap$1.prototype.has = function(target) {
						var table = GetOrCreateWeakMapTable(target, false);
						return table !== void 0 ? HashMap.has(table, this._key) : false;
					};
					WeakMap$1.prototype.get = function(target) {
						var table = GetOrCreateWeakMapTable(target, false);
						return table !== void 0 ? HashMap.get(table, this._key) : void 0;
					};
					WeakMap$1.prototype.set = function(target, value) {
						var table = GetOrCreateWeakMapTable(target, true);
						table[this._key] = value;
						return this;
					};
					WeakMap$1.prototype.delete = function(target) {
						var table = GetOrCreateWeakMapTable(target, false);
						return table !== void 0 ? delete table[this._key] : false;
					};
					WeakMap$1.prototype.clear = function() {
						this._key = CreateUniqueKey();
					};
					return WeakMap$1;
				}();
				function CreateUniqueKey() {
					var key;
					do
						key = "@@WeakMap@@" + CreateUUID();
					while (HashMap.has(keys, key));
					keys[key] = true;
					return key;
				}
				function GetOrCreateWeakMapTable(target, create) {
					if (!hasOwn.call(target, rootKey)) {
						if (!create) return void 0;
						Object.defineProperty(target, rootKey, { value: HashMap.create() });
					}
					return target[rootKey];
				}
				function FillRandomBytes(buffer, size) {
					for (var i = 0; i < size; ++i) buffer[i] = Math.random() * 255 | 0;
					return buffer;
				}
				function GenRandomBytes(size) {
					if (typeof Uint8Array === "function") {
						var array = new Uint8Array(size);
						if (typeof crypto !== "undefined") crypto.getRandomValues(array);
						else if (typeof msCrypto !== "undefined") msCrypto.getRandomValues(array);
						else FillRandomBytes(array, size);
						return array;
					}
					return FillRandomBytes(new Array(size), size);
				}
				function CreateUUID() {
					var data = GenRandomBytes(UUID_SIZE);
					data[6] = data[6] & 79 | 64;
					data[8] = data[8] & 191 | 128;
					var result = "";
					for (var offset = 0; offset < UUID_SIZE; ++offset) {
						var byte = data[offset];
						if (offset === 4 || offset === 6 || offset === 8) result += "-";
						if (byte < 16) result += "0";
						result += byte.toString(16).toLowerCase();
					}
					return result;
				}
			}
			function MakeDictionary(obj) {
				obj.__ = void 0;
				delete obj.__;
				return obj;
			}
		});
	})(Reflect || (Reflect = {}));
})))();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var attrsOf = (node) => node.attributes ?? {};
var str = (value) => typeof value === "string" && value ? value : void 0;
function defaultTabs(node, t) {
	return [
		{
			value: "inputs",
			label: t("trace.inputs"),
			data: getSpanInputs(node)
		},
		{
			value: "outputs",
			label: t("trace.outputs"),
			data: getSpanOutputs(node)
		},
		{
			value: "raw",
			label: t("message.tools.raw"),
			data: rawData(node)
		}
	];
}
var httpPresenter = {
	match: (node) => attrsOf(node).tags === "HTTP",
	build: (node, t) => {
		const a = attrsOf(node);
		return {
			rows: [
				{
					label: t("trace.requestMethod"),
					value: str(a["http.method"]) ?? ""
				},
				{
					label: t("trace.requestUrl"),
					value: str(a["http.url"]) ?? ""
				},
				{
					label: t("trace.responseStatus"),
					value: [a["http.status"], a["http.statusText"]].filter(Boolean).join(" ")
				}
			],
			tabs: [
				{
					value: "inputs",
					label: t("trace.inputs"),
					data: a.inputs
				},
				{
					value: "outputs",
					label: t("trace.outputs"),
					data: a.outputs
				},
				{
					value: "requestHeaders",
					label: t("trace.requestHeaders"),
					data: a["http.request.headers"]
				},
				{
					value: "responseHeaders",
					label: t("trace.responseHeaders"),
					data: a["http.response.headers"]
				},
				{
					value: "raw",
					label: t("message.tools.raw"),
					data: rawData(node)
				}
			]
		};
	}
};
var mcpPresenter = {
	match: (node) => attrsOf(node).tags === "MCP",
	build: (node, t) => {
		const call = parseMcpCall(attrsOf(node).inputs);
		return {
			rows: [
				{
					label: t("trace.serverName"),
					value: str(call?.server?.name)
				},
				{
					label: t("trace.serverType"),
					value: str(call?.server?.type)
				},
				{
					label: t("trace.serverDescription"),
					value: str(call?.server?.description)
				}
			].filter((row) => row.value),
			tabs: [
				{
					value: "inputs",
					label: t("trace.inputs"),
					data: call ? call.args : getSpanInputs(node)
				},
				{
					value: "outputs",
					label: t("trace.outputs"),
					data: getSpanOutputs(node)
				},
				{
					value: "raw",
					label: t("message.tools.raw"),
					data: rawData(node)
				}
			]
		};
	}
};
var turnPresenter = {
	match: (node) => node.name === SPAN_NAME_TURN,
	build: (node, t) => {
		const a = attrsOf(node);
		const rows = [];
		const model = modelRow(node, t);
		if (model) rows.push(model);
		const agent = str(a["gen_ai.agent.name"]);
		if (agent) rows.push({
			label: t("trace.agent"),
			value: agent
		});
		const operation = str(a["gen_ai.operation.name"]);
		if (operation) rows.push({
			label: t("trace.operation"),
			value: operation
		});
		if (a["cs.tool_calls"] != null) rows.push({
			label: t("trace.toolCalls"),
			value: String(a["cs.tool_calls"])
		});
		rows.push({
			label: t("trace.status"),
			value: String(node.status ?? "")
		});
		return {
			rows,
			tabs: [
				{
					value: "inputs",
					label: t("trace.inputs"),
					data: a.inputs
				},
				{
					value: "outputs",
					label: t("trace.outputs"),
					data: a.outputs
				},
				{
					value: "raw",
					label: t("message.tools.raw"),
					data: rawData(node)
				}
			]
		};
	}
};
var modelPresenter = {
	match: (node) => hasModelAttribute(node),
	build: (node, t) => {
		const usage = node.usage;
		const rows = [];
		const model = modelRow(node, t);
		if (model) rows.push(model);
		if (usage) {
			const cachedTokens = getTokenDetail(usage, "prompt_tokens_details", "cached_tokens");
			const reasoningTokens = getTokenDetail(usage, "completion_tokens_details", "reasoning_tokens");
			rows.push({
				label: t("trace.tokenUsage"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ui": "chat.span-presenters",
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive",
							children: `↑${usage.prompt_tokens}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-1 text-muted-foreground",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-success",
							children: `↓${usage.completion_tokens}`
						}),
						cachedTokens ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-muted-foreground",
							children: `${t("trace.cachedTokens")} ${cachedTokens}`
						}) : null,
						reasoningTokens ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-muted-foreground",
							children: `${t("trace.reasoningTokens")} ${reasoningTokens}`
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-muted-foreground",
							children: `Σ ${usage.total_tokens}`
						})
					]
				})
			});
		}
		return {
			rows,
			tabs: defaultTabs(node, t)
		};
	}
};
function getTokenDetail(usage, detailsKey, tokenKey) {
	if (!usage || typeof usage !== "object") return void 0;
	const details = usage[detailsKey];
	if (!details || typeof details !== "object") return void 0;
	const value = details[tokenKey];
	return typeof value === "number" ? value : void 0;
}
var genericPresenter = {
	match: () => true,
	build: (node, t) => ({
		rows: [],
		tabs: defaultTabs(node, t)
	})
};
var PRESENTERS = [
	httpPresenter,
	mcpPresenter,
	turnPresenter,
	modelPresenter,
	genericPresenter
];
function buildSpanView(node, t) {
	return (PRESENTERS.find((p) => p.match(node)) ?? genericPresenter).build(node, t);
}
function hasModelAttribute(node) {
	const a = attrsOf(node);
	return Boolean(a["cs.model_id"] || a["ai.model.id"] || a["gen_ai.request.model"]);
}
function modelRow(node, t) {
	const model = resolveSpanModel(node);
	if (!model) return void 0;
	return {
		label: t("trace.model"),
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "chat.model-row",
			className: "flex min-w-0 flex-1 items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelAvatar_default, {
				model,
				size: 16,
				className: "shrink-0"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate text-foreground",
				children: model.name
			})]
		})
	};
}
function resolveSpanModel(node) {
	const attrs = attrsOf(node);
	const name = node.modelName ?? str(attrs.modelName) ?? str(attrs["ai.model.id"]);
	if (!name) return void 0;
	const uniqueId = attrs["cs.model_id"];
	if (typeof uniqueId === "string") try {
		const { providerId, modelId } = parseUniqueModelId(uniqueId);
		if (providerId && modelId) return {
			id: modelId,
			name,
			providerId
		};
	} catch {}
	return {
		id: str(attrs["ai.model.id"]) ?? name,
		name,
		providerId: str(attrs["ai.model.provider"])
	};
}
function parseMcpCall(raw) {
	if (typeof raw !== "string") return void 0;
	try {
		const parsed = JSON.parse(raw);
		const call = Array.isArray(parsed) ? parsed[0] : parsed;
		return call && typeof call === "object" ? call : void 0;
	} catch {
		return;
	}
}
function rawData(node) {
	return {
		id: node.id,
		traceId: node.traceId,
		parentId: node.parentId,
		name: node.name,
		status: node.status,
		kind: node.kind,
		topicId: node.topicId,
		modelName: node.modelName,
		usage: node.usage,
		attributes: node.attributes,
		events: node.events,
		links: node.links
	};
}
function getSpanInputs(node) {
	const attrs = node.attributes ?? {};
	return attrs.inputs ?? attrs.user_prompt ?? attrs.tool_input ?? attrs.tool_parameters ?? getEventValue(node, ["user_prompt", "claude_code.user_prompt"], ["prompt", "log.body"]) ?? getEventValue(node, ["api_request_body", "claude_code.api_request_body"], ["body", "body_ref"]) ?? getEventValue(node, ["tool.output"], [
		"input",
		"tool_input",
		"tool.input"
	]) ?? pickAttributes(attrs, [
		"new_context",
		"system_prompt_preview",
		"user_system_prompt",
		"model",
		"gen_ai.request.model",
		"query_source",
		"tool_name",
		"file_path",
		"full_command",
		"skill_name",
		"subagent_type",
		"hook_event",
		"hook_name",
		"hook_definitions"
	]);
}
function getSpanOutputs(node) {
	const attrs = node.attributes ?? {};
	return attrs.outputs ?? attrs["response.model_output"] ?? attrs.model_output ?? getEventValue(node, ["api_response_body", "claude_code.api_response_body"], ["body", "body_ref"]) ?? getEventValue(node, ["tool.output"], [
		"output",
		"tool_output",
		"tool.output",
		"result"
	]) ?? getEventValue(node, ["tool_result", "claude_code.tool_result"], [
		"tool_result",
		"result",
		"log.body"
	]) ?? pickAttributes(attrs, [
		"request_id",
		"gen_ai.response.id",
		"stop_reason",
		"response.has_tool_call",
		"result_tokens",
		"success",
		"error",
		"duration_ms"
	]);
}
function getEventValue(node, eventNames, keys) {
	for (const event of node.events ?? []) {
		if (!eventNames.includes(getEventName(event))) continue;
		for (const key of keys) {
			const value = event.attributes?.[key];
			if (value !== void 0) return value;
		}
	}
}
function getEventName(event) {
	const name = event.attributes?.["event.name"];
	return typeof name === "string" ? name : event.name;
}
function pickAttributes(attributes, keys) {
	const picked = {};
	for (const key of keys) {
		const value = attributes[key];
		if (value !== void 0) picked[key] = value;
	}
	return Object.keys(picked).length > 0 ? picked : void 0;
}
var import_react = /* @__PURE__ */ __toESM(require_react());
const ProgressBar = ({ start = 0, progress, height = 6 }) => {
	const displayProgress = Math.min(100, Math.max(0, progress));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.progress-bar",
		className: "mt-2 w-full min-w-0 overflow-hidden bg-muted",
		style: { borderRadius: height },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-success transition-[width] duration-300 ease-in-out",
			style: {
				width: `${displayProgress}%`,
				height,
				borderRadius: height,
				marginLeft: `${start}%`
			}
		})
	});
};
const TRACE_ROW_GRID = "grid min-w-0 items-center gap-px [grid-template-columns:minmax(0,2.4fr)_minmax(3.5rem,0.7fr)_minmax(4rem,1fr)] max-[520px]:[grid-template-columns:minmax(0,1.7fr)_minmax(3.25rem,0.65fr)_minmax(3.5rem,0.75fr)]";
const convertTime = (time) => {
	if (time == null) return "";
	if (time > 1e5) return `${(time / 1e3).toFixed(0)}s`;
	if (time > 1e4) return `${(time / 1e3).toFixed(1)}s`;
	if (time > 1e3) return `${(time / 1e3).toFixed(2)}s`;
	if (time > 100) return `${time.toFixed(0)}ms`;
	if (time > 10) return `${time.toFixed(1)}ms`;
	return time.toFixed(2) + "ms";
};
var TraceTree = ({ node, handleClick, treeData, paddingLeft = 2 }) => {
	const [isOpen, setIsOpen] = (0, import_react.useState)(true);
	const hasChildren = node.children && node.children.length > 0;
	const usedTime = convertTime((node.endTime || Date.now()) - node.startTime);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.trace-tree",
		className: "w-full min-w-0 text-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${TRACE_ROW_GRID} min-h-8 w-full px-2 hover:cursor-pointer hover:bg-accent max-[520px]:px-1 [&>div]:min-w-0`,
				onClick: (e) => {
					e.preventDefault();
					handleClick(node.id);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 text-left",
						style: { paddingLeft: `${paddingLeft}px` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-row items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"aria-label": "Toggle",
								"aria-expanded": isOpen ? true : false,
								variant: "ghost",
								size: "icon-sm",
								className: "h-6 w-4 shrink-0 p-0",
								onClick: (e) => {
									e.preventDefault();
									e.stopPropagation();
									setIsOpen(!isOpen);
								},
								style: { visibility: hasChildren ? "visible" : "hidden" },
								children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-ui": "chat.trace-tree.button",
								role: "button",
								tabIndex: 0,
								className: `${node.status === "ERROR" ? "text-destructive" : "text-foreground"} min-w-0 flex-1 cursor-pointer select-none [overflow-wrap:anywhere]`,
								children: node.name
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 whitespace-nowrap text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: usedTime })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 px-1 py-2 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
							progress: Math.max(node.percent, 5),
							start: node.start
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[0.5px] w-full bg-border-subtle" }),
			hasChildren && isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: node.children && node.children.sort((a, b) => a.startTime - b.startTime).map((childNode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceTree, {
				treeData,
				node: childNode,
				handleClick,
				paddingLeft: paddingLeft + 4
			}, childNode.id)) })
		]
	});
};
var TraceTree_default = TraceTree;
var logger = loggerService.withContext("SpanDetail");
var SpanDetail = ({ node, onShowList }) => {
	const [activeTab, setActiveTab] = (0, import_react.useState)("inputs");
	const [copiedContent, setCopiedContent] = useTemporaryValue(null);
	const { t } = useTranslation();
	const view = (0, import_react.useMemo)(() => buildSpanView(node, t), [node, t]);
	const { tabs } = view;
	const safeTab = tabs.some((tab) => tab.value === activeTab) ? activeTab : tabs[0]?.value ?? "inputs";
	const { content, contentLanguage } = (0, import_react.useMemo)(() => formatTabData(node, tabs, safeTab), [
		node,
		tabs,
		safeTab
	]);
	const copied = copiedContent?.nodeId === node.id && copiedContent.tab === safeTab && copiedContent.content === content;
	const usedTime = convertTime((node.endTime || Date.now()) - node.startTime);
	const rows = [
		{
			label: "ID",
			value: node.id
		},
		{
			label: t("trace.name"),
			value: node.name
		},
		{
			label: t("trace.tag"),
			value: String(node.attributes?.tags || "")
		},
		{
			label: t("trace.startTime"),
			value: formatDate(node.startTime)
		},
		{
			label: t("trace.endTime"),
			value: formatDate(node.endTime)
		},
		{
			label: t("trace.spendTime"),
			value: usedTime
		},
		...view.rows
	];
	const handleCopy = async () => {
		if (!content) return;
		try {
			await navigator.clipboard.writeText(content);
			setCopiedContent({
				nodeId: node.id,
				tab: safeTab,
				content
			});
		} catch (error) {
			logger.error("Failed to copy span detail content", error);
			toast.error(t("common.copy_failed"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.span-detail",
		className: "flex h-full min-h-0 min-w-0 flex-col overflow-hidden p-3 text-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex min-w-0 shrink-0 items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-foreground text-sm",
						children: t("trace.spanDetail")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 truncate text-muted-foreground",
						children: node.name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "h-7 shrink-0 px-2",
					onClick: () => onShowList(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("trace.backList") })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
				className: "mb-3 shrink-0 gap-0 overflow-hidden rounded-md border border-border-subtle bg-background-subtle",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailField, { row }, row.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: safeTab,
				onValueChange: setActiveTab,
				className: "min-h-0 flex-1 gap-2 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 shrink-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
							className: "h-8",
							children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: tab.value,
								children: tab.label
							}, tab.value))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("common.copy"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							className: copied ? "text-success hover:text-success" : "text-muted-foreground hover:text-foreground",
							"aria-label": t("common.copy"),
							disabled: !content,
							onClick: () => void handleCopy(),
							children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 })
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: safeTab,
					className: "min-h-0 flex-1 overflow-hidden rounded-md border border-border-subtle bg-popover",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeViewer_default, {
						value: content,
						language: contentLanguage,
						expanded: false,
						height: "100%",
						wrapped: true,
						fontSize: 12,
						options: { lineNumbers: false },
						className: "selectable h-full [&_.shiki-scroller]:overflow-x-hidden"
					}, safeTab)
				})]
			})
		]
	});
};
function DetailField({ row }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
		orientation: "horizontal",
		className: "border-border-subtle border-t px-3 py-2 first:border-t-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldContent, {
			className: "min-w-24 max-w-32 shrink-0 gap-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTitle, {
				className: "font-normal text-muted-foreground text-xs",
				children: row.label
			})
		}), row.content ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
			className: "min-w-0 flex-1 break-words text-foreground text-xs",
			children: row.value
		})]
	});
}
function formatDate(timestamp) {
	if (timestamp == null) return "";
	const date = new Date(timestamp);
	const pad = (n) => n.toString().padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${date.getMilliseconds().toString().padStart(3, "0")}`;
}
function formatTabData(node, tabs, activeTab) {
	let data = tabs.find((tab) => tab.value === activeTab)?.data;
	if (activeTab === "outputs" && node.status === "ERROR") {
		const exception = Array.isArray(node.events) ? node.events.find((e) => e.name === "exception") : void 0;
		if (exception) data = exception;
	}
	if (typeof data === "string" && (data.startsWith("{") || data.startsWith("["))) try {
		return {
			content: JSON.stringify(JSON.parse(data), null, 2),
			contentLanguage: "json"
		};
	} catch {}
	else if (data && typeof data === "object") return {
		content: JSON.stringify(data, null, 2),
		contentLanguage: "json"
	};
	return {
		content: String(data ?? ""),
		contentLanguage: "text"
	};
}
var SpanDetail_default = SpanDetail;
const TracePage = ({ topicId, traceId, reload = false }) => {
	const [spans, setSpans] = (0, import_react.useState)([]);
	const [selectedNode, setSelectedNode] = (0, import_react.useState)(null);
	const [showList, setShowList] = (0, import_react.useState)(true);
	const [pollError, setPollError] = (0, import_react.useState)(null);
	const failureCountRef = (0, import_react.useRef)(0);
	const emptyCountRef = (0, import_react.useRef)(0);
	const { t } = useTranslation();
	const mergeTraceNodes = (0, import_react.useCallback)((oldNodes, newNodes) => {
		const oldMap = new Map(oldNodes.map((n) => [n.id, n]));
		return newNodes.map((newNode) => {
			const oldNode = oldMap.get(newNode.id);
			if (oldNode) {
				const mergedChildren = mergeTraceNodes(oldNode.children, newNode.children);
				return {
					...oldNode,
					...newNode,
					children: mergedChildren
				};
			}
			return newNode;
		});
	}, []);
	const updatePercentAndStart = (0, import_react.useCallback)((nodes, rootStart, rootEnd) => {
		nodes.forEach((node) => {
			const _rootStart = rootStart || node.startTime;
			const _rootEnd = rootEnd || node.endTime || Date.now();
			const usedTime = (node.endTime || _rootEnd) - node.startTime;
			const duration = _rootEnd - _rootStart;
			node.start = (node.startTime - _rootStart) * 100 / duration;
			node.percent = duration === 0 ? 0 : usedTime * 100 / duration;
			if (node.children) updatePercentAndStart(node.children, _rootStart, _rootEnd);
		});
	}, []);
	const getRootSpans = (0, import_react.useCallback)((spans$1) => {
		const map = /* @__PURE__ */ new Map();
		spans$1.map((span) => {
			map.set(span.id, {
				...span,
				children: [],
				percent: 100,
				start: 0
			});
		});
		return Array.from(map.values().filter((span) => {
			if (span.parentId && map.has(span.parentId)) {
				const parent = map.get(span.parentId);
				if (parent) parent.children.push(span);
				return false;
			}
			return true;
		}));
	}, []);
	const findNodeById = (0, import_react.useCallback)((nodes, id) => {
		for (const n of nodes) {
			if (n.id === id) return n;
			if (n.children) {
				const found = findNodeById(n.children, id);
				if (found) return found;
			}
		}
		return null;
	}, []);
	const handleNodeClick = (nodeId) => {
		const latestNode = findNodeById(spans, nodeId);
		if (latestNode) {
			setSelectedNode(latestNode);
			setShowList(false);
		}
	};
	const handleShowList = () => {
		setShowList(true);
		setSelectedNode(null);
	};
	(0, import_react.useEffect)(() => {
		setSpans([]);
		setSelectedNode(null);
		setShowList(true);
	}, [topicId, traceId]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		let finished = false;
		let intervalId = null;
		failureCountRef.current = 0;
		emptyCountRef.current = 0;
		setPollError(null);
		const stop = () => {
			finished = true;
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		};
		let lastSpanCount = 0;
		let consecutiveEnded = 0;
		const poll = async () => {
			try {
				const spans$1 = topicId && traceId ? await window.api.trace.getData(topicId, traceId) : [];
				if (cancelled) return;
				failureCountRef.current = 0;
				const matchedSpans = getRootSpans(spans$1);
				if (matchedSpans.length === 0) {
					emptyCountRef.current++;
					if (emptyCountRef.current >= 30 && lastSpanCount === 0) {
						stop();
						return;
					}
				} else {
					emptyCountRef.current = 0;
					lastSpanCount = matchedSpans.length;
					updatePercentAndStart(matchedSpans);
					setSpans((prev) => mergeTraceNodes(prev, matchedSpans));
				}
				consecutiveEnded = matchedSpans.length > 0 && matchedSpans.every((e) => e.endTime && e.endTime > 0) ? consecutiveEnded + 1 : 0;
				if (consecutiveEnded >= 20) stop();
			} catch (error) {
				if (cancelled) return;
				failureCountRef.current++;
				if (failureCountRef.current >= 3) {
					stop();
					setPollError(error instanceof Error ? error.message : String(error));
				}
			}
		};
		const start = async () => {
			await poll();
			if (cancelled || finished) return;
			intervalId = setInterval(poll, 300);
		};
		start();
		return () => {
			cancelled = true;
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		};
	}, [
		topicId,
		traceId,
		reload,
		getRootSpans,
		updatePercentAndStart,
		mergeTraceNodes
	]);
	(0, import_react.useEffect)(() => {
		if (selectedNode) {
			const latest = findNodeById(spans, selectedNode.id);
			if (!latest) {
				setShowList(true);
				setSelectedNode(null);
			} else if (latest !== selectedNode) setSelectedNode(latest);
		}
	}, [
		spans,
		selectedNode,
		findNodeById
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.trace-page",
		className: "flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden bg-card text-card-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
				children: showList ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "chat.trace-page.trace-list-scroll",
					"data-testid": "trace-list-scroll",
					className: "min-h-0 w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-3",
					children: pollError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full min-h-40 items-center justify-center text-destructive text-xs",
						children: [
							t("trace.pollError"),
							": ",
							pollError
						]
					}) : spans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-full min-h-40 items-center justify-center text-muted-foreground text-xs",
						children: t("trace.noTraceList")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-ui": "chat.trace-page.trace-table",
						"data-testid": "trace-table",
						className: "min-w-0 overflow-hidden rounded-md border border-border-subtle bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `${TRACE_ROW_GRID} sticky top-0 z-[2] w-full border-border border-b-[0.5px] bg-card`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 min-w-0 items-center bg-background-subtle px-2 text-left font-medium text-muted-foreground text-xs max-[520px]:px-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										tabIndex: 0,
										className: "min-w-0 truncate",
										children: t("trace.name")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 min-w-0 items-center justify-center bg-background-subtle px-2 text-center font-medium text-muted-foreground text-xs max-[520px]:px-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 truncate",
										children: t("trace.spendTime")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex h-8 min-w-0 items-center bg-background-subtle px-2 max-[520px]:px-1" })
							]
						}), spans.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceTree_default, {
							treeData: node.children,
							node,
							handleClick: handleNodeClick
						}, node.id))]
					})
				}) : selectedNode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpanDetail_default, {
					node: selectedNode,
					onShowList: handleShowList
				})
			})
		})
	});
};
function TracePane({ payload }) {
	if (!payload) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.trace-pane",
		className: "flex h-full min-h-0 min-w-0 flex-col overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TracePage, {
			topicId: payload.topicId,
			traceId: payload.traceId,
			reload: `${payload.topicId}:${payload.traceId}`
		})
	});
}
export { TracePane as t };
