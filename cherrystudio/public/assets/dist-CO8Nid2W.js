import { A as unknown, f as _enum, j as any, k as array, l as boolean, q as literal, t as number, u as object, v as record, x as string, z as union } from "./schemas-Bbbixa2f.js";
import { f as EmptyResponseBodyError, n as TooManyEmbeddingValuesForCallError, p as UnsupportedFunctionalityError } from "./types-Db4HyS8d.js";
import { C as loadOptionalSetting, D as loadSetting, E as normalizeHeaders, F as parseProviderOptions, G as postJsonToApi, H as resolve, I as safeParseJSON, J as safeValidateTypes, M as withUserAgentSuffix, N as withoutTrailingSlash, b as asSchema, c as combineHeaders, e as convertToBase64, i as createJsonErrorResponseHandler, j as createJsonResponseHandler, p as extractResponseHeaders, q as generateId, t as getRuntimeEnvironmentUserAgent } from "./dist-K3A05YNJ.js";
import { c as anthropicTools, d as prepareTools, e as Crc32 } from "./internal-CU_JnPDo.js";
const SHORT_TO_HEX = {};
const HEX_TO_SHORT = {};
for (let i = 0; i < 256; i++) {
	let encodedByte = i.toString(16).toLowerCase();
	if (encodedByte.length === 1) encodedByte = `0${encodedByte}`;
	SHORT_TO_HEX[i] = encodedByte;
	HEX_TO_SHORT[encodedByte] = i;
}
function fromHex(encoded) {
	if (encoded.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
	const out = new Uint8Array(encoded.length / 2);
	for (let i = 0; i < encoded.length; i += 2) {
		const encodedByte = encoded.slice(i, i + 2).toLowerCase();
		if (encodedByte in HEX_TO_SHORT) out[i / 2] = HEX_TO_SHORT[encodedByte];
		else throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
	}
	return out;
}
function toHex(bytes) {
	let out = "";
	for (let i = 0; i < bytes.byteLength; i++) out += SHORT_TO_HEX[bytes[i]];
	return out;
}
var Int64 = class Int64 {
	constructor(bytes) {
		this.bytes = bytes;
		if (bytes.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes");
	}
	static fromNumber(number$1) {
		if (number$1 > 0x8000000000000000 || number$1 < -0x8000000000000000) throw new Error(`${number$1} is too large (or, if negative, too small) to represent as an Int64`);
		const bytes = new Uint8Array(8);
		for (let i = 7, remaining = Math.abs(Math.round(number$1)); i > -1 && remaining > 0; i--, remaining /= 256) bytes[i] = remaining;
		if (number$1 < 0) negate(bytes);
		return new Int64(bytes);
	}
	valueOf() {
		const bytes = this.bytes.slice(0);
		const negative = bytes[0] & 128;
		if (negative) negate(bytes);
		return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
	}
	toString() {
		return String(this.valueOf());
	}
};
function negate(bytes) {
	for (let i = 0; i < 8; i++) bytes[i] ^= 255;
	for (let i = 7; i > -1; i--) {
		bytes[i]++;
		if (bytes[i] !== 0) break;
	}
}
var HeaderMarshaller = class {
	constructor(toUtf8$1, fromUtf8$1) {
		this.toUtf8 = toUtf8$1;
		this.fromUtf8 = fromUtf8$1;
	}
	format(headers) {
		const chunks = [];
		for (const headerName of Object.keys(headers)) {
			const bytes = this.fromUtf8(headerName);
			chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
		}
		const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
		let position = 0;
		for (const chunk of chunks) {
			out.set(chunk, position);
			position += chunk.byteLength;
		}
		return out;
	}
	formatHeaderValue(header) {
		switch (header.type) {
			case "boolean": return Uint8Array.from([header.value ? 0 : 1]);
			case "byte": return Uint8Array.from([2, header.value]);
			case "short":
				const shortView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(3));
				shortView.setUint8(0, 3);
				shortView.setInt16(1, header.value, false);
				return new Uint8Array(shortView.buffer);
			case "integer":
				const intView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(5));
				intView.setUint8(0, 4);
				intView.setInt32(1, header.value, false);
				return new Uint8Array(intView.buffer);
			case "long":
				const longBytes = new Uint8Array(9);
				longBytes[0] = 5;
				longBytes.set(header.value.bytes, 1);
				return longBytes;
			case "binary":
				const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
				binView.setUint8(0, 6);
				binView.setUint16(1, header.value.byteLength, false);
				const binBytes = new Uint8Array(binView.buffer);
				binBytes.set(header.value, 3);
				return binBytes;
			case "string":
				const utf8Bytes = this.fromUtf8(header.value);
				const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
				strView.setUint8(0, 7);
				strView.setUint16(1, utf8Bytes.byteLength, false);
				const strBytes = new Uint8Array(strView.buffer);
				strBytes.set(utf8Bytes, 3);
				return strBytes;
			case "timestamp":
				const tsBytes = new Uint8Array(9);
				tsBytes[0] = 8;
				tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
				return tsBytes;
			case "uuid":
				if (!UUID_PATTERN.test(header.value)) throw new Error(`Invalid UUID received: ${header.value}`);
				const uuidBytes = new Uint8Array(17);
				uuidBytes[0] = 9;
				uuidBytes.set(fromHex(header.value.replace(/\-/g, "")), 1);
				return uuidBytes;
		}
	}
	parse(headers) {
		const out = {};
		let position = 0;
		while (position < headers.byteLength) {
			const nameLength = headers.getUint8(position++);
			const name = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
			position += nameLength;
			switch (headers.getUint8(position++)) {
				case 0:
					out[name] = {
						type: BOOLEAN_TAG,
						value: true
					};
					break;
				case 1:
					out[name] = {
						type: BOOLEAN_TAG,
						value: false
					};
					break;
				case 2:
					out[name] = {
						type: BYTE_TAG,
						value: headers.getInt8(position++)
					};
					break;
				case 3:
					out[name] = {
						type: SHORT_TAG,
						value: headers.getInt16(position, false)
					};
					position += 2;
					break;
				case 4:
					out[name] = {
						type: INT_TAG,
						value: headers.getInt32(position, false)
					};
					position += 4;
					break;
				case 5:
					out[name] = {
						type: LONG_TAG,
						value: new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8))
					};
					position += 8;
					break;
				case 6:
					const binaryLength = headers.getUint16(position, false);
					position += 2;
					out[name] = {
						type: BINARY_TAG,
						value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength)
					};
					position += binaryLength;
					break;
				case 7:
					const stringLength = headers.getUint16(position, false);
					position += 2;
					out[name] = {
						type: STRING_TAG,
						value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength))
					};
					position += stringLength;
					break;
				case 8:
					out[name] = {
						type: TIMESTAMP_TAG,
						value: new Date(new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf())
					};
					position += 8;
					break;
				case 9:
					const uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
					position += 16;
					out[name] = {
						type: UUID_TAG,
						value: `${toHex(uuidBytes.subarray(0, 4))}-${toHex(uuidBytes.subarray(4, 6))}-${toHex(uuidBytes.subarray(6, 8))}-${toHex(uuidBytes.subarray(8, 10))}-${toHex(uuidBytes.subarray(10))}`
					};
					break;
				default: throw new Error(`Unrecognized header type tag`);
			}
		}
		return out;
	}
};
var HEADER_VALUE_TYPE;
(function(HEADER_VALUE_TYPE$1) {
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["boolTrue"] = 0] = "boolTrue";
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["boolFalse"] = 1] = "boolFalse";
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["byte"] = 2] = "byte";
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["short"] = 3] = "short";
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["integer"] = 4] = "integer";
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["long"] = 5] = "long";
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["byteArray"] = 6] = "byteArray";
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["string"] = 7] = "string";
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["timestamp"] = 8] = "timestamp";
	HEADER_VALUE_TYPE$1[HEADER_VALUE_TYPE$1["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
const BOOLEAN_TAG = "boolean";
const BYTE_TAG = "byte";
const SHORT_TAG = "short";
const INT_TAG = "integer";
const LONG_TAG = "long";
const BINARY_TAG = "binary";
const STRING_TAG = "string";
const TIMESTAMP_TAG = "timestamp";
const UUID_TAG = "uuid";
const UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const PRELUDE_MEMBER_LENGTH = 4;
const PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
const CHECKSUM_LENGTH = 4;
const MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;
function splitMessage({ byteLength, byteOffset, buffer }) {
	if (byteLength < MINIMUM_MESSAGE_LENGTH) throw new Error("Provided message too short to accommodate event stream message overhead");
	const view = new DataView(buffer, byteOffset, byteLength);
	const messageLength = view.getUint32(0, false);
	if (byteLength !== messageLength) throw new Error("Reported message length does not match received message length");
	const headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
	const expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
	const expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
	const checksummer = new Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
	if (expectedPreludeChecksum !== checksummer.digest()) throw new Error(`The prelude checksum specified in the message (${expectedPreludeChecksum}) does not match the calculated CRC32 checksum (${checksummer.digest()})`);
	checksummer.update(new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH)));
	if (expectedMessageChecksum !== checksummer.digest()) throw new Error(`The message checksum (${checksummer.digest()}) did not match the expected value of ${expectedMessageChecksum}`);
	return {
		headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
		body: new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength, messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH))
	};
}
var EventStreamCodec = class {
	constructor(toUtf8$1, fromUtf8$1) {
		this.headerMarshaller = new HeaderMarshaller(toUtf8$1, fromUtf8$1);
		this.messageBuffer = [];
		this.isEndOfStream = false;
	}
	feed(message) {
		this.messageBuffer.push(this.decode(message));
	}
	endOfStream() {
		this.isEndOfStream = true;
	}
	getMessage() {
		const message = this.messageBuffer.pop();
		const isEndOfStream = this.isEndOfStream;
		return {
			getMessage() {
				return message;
			},
			isEndOfStream() {
				return isEndOfStream;
			}
		};
	}
	getAvailableMessages() {
		const messages = this.messageBuffer;
		this.messageBuffer = [];
		const isEndOfStream = this.isEndOfStream;
		return {
			getMessages() {
				return messages;
			},
			isEndOfStream() {
				return isEndOfStream;
			}
		};
	}
	encode({ headers: rawHeaders, body }) {
		const headers = this.headerMarshaller.format(rawHeaders);
		const length = headers.byteLength + body.byteLength + 16;
		const out = new Uint8Array(length);
		const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
		const checksum = new Crc32();
		view.setUint32(0, length, false);
		view.setUint32(4, headers.byteLength, false);
		view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
		out.set(headers, 12);
		out.set(body, headers.byteLength + 12);
		view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);
		return out;
	}
	decode(message) {
		const { headers, body } = splitMessage(message);
		return {
			headers: this.headerMarshaller.parse(headers),
			body
		};
	}
	formatHeaders(rawHeaders) {
		return this.headerMarshaller.format(rawHeaders);
	}
};
Symbol.asyncIterator;
Symbol.asyncIterator;
Symbol.asyncIterator;
Symbol.asyncIterator;
const fromUtf8 = (input) => new TextEncoder().encode(input);
const toUtf8 = (input) => {
	if (typeof input === "string") return input;
	if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
	return new TextDecoder("utf-8").decode(input);
};
/**
* @license MIT <https://opensource.org/licenses/MIT>
* @copyright Michael Hart 2024
*/
const encoder = new TextEncoder();
const HOST_SERVICES = {
	appstream2: "appstream",
	cloudhsmv2: "cloudhsm",
	email: "ses",
	marketplace: "aws-marketplace",
	mobile: "AWSMobileHubService",
	pinpoint: "mobiletargeting",
	queue: "sqs",
	"git-codecommit": "codecommit",
	"mturk-requester-sandbox": "mturk-requester",
	"personalize-runtime": "personalize"
};
const UNSIGNABLE_HEADERS = new Set([
	"authorization",
	"content-type",
	"content-length",
	"user-agent",
	"presigned-expires",
	"expect",
	"x-amzn-trace-id",
	"range",
	"connection"
]);
var AwsV4Signer = class {
	constructor({ method, url, headers, body, accessKeyId, secretAccessKey, sessionToken, service, region, cache, datetime, signQuery, appendSessionToken, allHeaders, singleEncode }) {
		if (url == null) throw new TypeError("url is a required option");
		if (accessKeyId == null) throw new TypeError("accessKeyId is a required option");
		if (secretAccessKey == null) throw new TypeError("secretAccessKey is a required option");
		this.method = method || (body ? "POST" : "GET");
		this.url = new URL(url);
		this.headers = new Headers(headers || {});
		this.body = body;
		this.accessKeyId = accessKeyId;
		this.secretAccessKey = secretAccessKey;
		this.sessionToken = sessionToken;
		let guessedService, guessedRegion;
		if (!service || !region) [guessedService, guessedRegion] = guessServiceRegion(this.url, this.headers);
		this.service = service || guessedService || "";
		this.region = region || guessedRegion || "us-east-1";
		this.cache = cache || /* @__PURE__ */ new Map();
		this.datetime = datetime || (/* @__PURE__ */ new Date()).toISOString().replace(/[:-]|\.\d{3}/g, "");
		this.signQuery = signQuery;
		this.appendSessionToken = appendSessionToken || this.service === "iotdevicegateway";
		this.headers.delete("Host");
		if (this.service === "s3" && !this.signQuery && !this.headers.has("X-Amz-Content-Sha256")) this.headers.set("X-Amz-Content-Sha256", "UNSIGNED-PAYLOAD");
		const params = this.signQuery ? this.url.searchParams : this.headers;
		params.set("X-Amz-Date", this.datetime);
		if (this.sessionToken && !this.appendSessionToken) params.set("X-Amz-Security-Token", this.sessionToken);
		this.signableHeaders = ["host", ...this.headers.keys()].filter((header) => allHeaders || !UNSIGNABLE_HEADERS.has(header)).sort();
		this.signedHeaders = this.signableHeaders.join(";");
		this.canonicalHeaders = this.signableHeaders.map((header) => header + ":" + (header === "host" ? this.url.host : (this.headers.get(header) || "").replace(/\s+/g, " "))).join("\n");
		this.credentialString = [
			this.datetime.slice(0, 8),
			this.region,
			this.service,
			"aws4_request"
		].join("/");
		if (this.signQuery) {
			if (this.service === "s3" && !params.has("X-Amz-Expires")) params.set("X-Amz-Expires", "86400");
			params.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
			params.set("X-Amz-Credential", this.accessKeyId + "/" + this.credentialString);
			params.set("X-Amz-SignedHeaders", this.signedHeaders);
		}
		if (this.service === "s3") try {
			this.encodedPath = decodeURIComponent(this.url.pathname.replace(/\+/g, " "));
		} catch (e) {
			this.encodedPath = this.url.pathname;
		}
		else this.encodedPath = this.url.pathname.replace(/\/+/g, "/");
		if (!singleEncode) this.encodedPath = encodeURIComponent(this.encodedPath).replace(/%2F/g, "/");
		this.encodedPath = encodeRfc3986(this.encodedPath);
		const seenKeys = /* @__PURE__ */ new Set();
		this.encodedSearch = [...this.url.searchParams].filter(([k]) => {
			if (!k) return false;
			if (this.service === "s3") {
				if (seenKeys.has(k)) return false;
				seenKeys.add(k);
			}
			return true;
		}).map((pair) => pair.map((p) => encodeRfc3986(encodeURIComponent(p)))).sort(([k1, v1], [k2, v2]) => k1 < k2 ? -1 : k1 > k2 ? 1 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0).map((pair) => pair.join("=")).join("&");
	}
	async sign() {
		if (this.signQuery) {
			this.url.searchParams.set("X-Amz-Signature", await this.signature());
			if (this.sessionToken && this.appendSessionToken) this.url.searchParams.set("X-Amz-Security-Token", this.sessionToken);
		} else this.headers.set("Authorization", await this.authHeader());
		return {
			method: this.method,
			url: this.url,
			headers: this.headers,
			body: this.body
		};
	}
	async authHeader() {
		return [
			"AWS4-HMAC-SHA256 Credential=" + this.accessKeyId + "/" + this.credentialString,
			"SignedHeaders=" + this.signedHeaders,
			"Signature=" + await this.signature()
		].join(", ");
	}
	async signature() {
		const date = this.datetime.slice(0, 8);
		const cacheKey = [
			this.secretAccessKey,
			date,
			this.region,
			this.service
		].join();
		let kCredentials = this.cache.get(cacheKey);
		if (!kCredentials) {
			const kDate = await hmac("AWS4" + this.secretAccessKey, date);
			const kRegion = await hmac(kDate, this.region);
			const kService = await hmac(kRegion, this.service);
			kCredentials = await hmac(kService, "aws4_request");
			this.cache.set(cacheKey, kCredentials);
		}
		return buf2hex(await hmac(kCredentials, await this.stringToSign()));
	}
	async stringToSign() {
		return [
			"AWS4-HMAC-SHA256",
			this.datetime,
			this.credentialString,
			buf2hex(await hash(await this.canonicalString()))
		].join("\n");
	}
	async canonicalString() {
		return [
			this.method.toUpperCase(),
			this.encodedPath,
			this.encodedSearch,
			this.canonicalHeaders + "\n",
			this.signedHeaders,
			await this.hexBodyHash()
		].join("\n");
	}
	async hexBodyHash() {
		let hashHeader = this.headers.get("X-Amz-Content-Sha256") || (this.service === "s3" && this.signQuery ? "UNSIGNED-PAYLOAD" : null);
		if (hashHeader == null) {
			if (this.body && typeof this.body !== "string" && !("byteLength" in this.body)) throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");
			hashHeader = buf2hex(await hash(this.body || ""));
		}
		return hashHeader;
	}
};
async function hmac(key, string$1) {
	const cryptoKey = await crypto.subtle.importKey("raw", typeof key === "string" ? encoder.encode(key) : key, {
		name: "HMAC",
		hash: { name: "SHA-256" }
	}, false, ["sign"]);
	return crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(string$1));
}
async function hash(content) {
	return crypto.subtle.digest("SHA-256", typeof content === "string" ? encoder.encode(content) : content);
}
const HEX_CHARS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f"
];
function buf2hex(arrayBuffer) {
	const buffer = new Uint8Array(arrayBuffer);
	let out = "";
	for (let idx = 0; idx < buffer.length; idx++) {
		const n = buffer[idx];
		out += HEX_CHARS[n >>> 4 & 15];
		out += HEX_CHARS[n & 15];
	}
	return out;
}
function encodeRfc3986(urlEncodedStr) {
	return urlEncodedStr.replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}
function guessServiceRegion(url, headers) {
	const { hostname, pathname } = url;
	if (hostname.endsWith(".on.aws")) {
		const match$1 = hostname.match(/^[^.]{1,63}\.lambda-url\.([^.]{1,63})\.on\.aws$/);
		return match$1 != null ? ["lambda", match$1[1] || ""] : ["", ""];
	}
	if (hostname.endsWith(".r2.cloudflarestorage.com")) return ["s3", "auto"];
	if (hostname.endsWith(".backblazeb2.com")) {
		const match$1 = hostname.match(/^(?:[^.]{1,63}\.)?s3\.([^.]{1,63})\.backblazeb2\.com$/);
		return match$1 != null ? ["s3", match$1[1] || ""] : ["", ""];
	}
	const match = hostname.replace("dualstack.", "").match(/([^.]{1,63})\.(?:([^.]{0,63})\.)?amazonaws\.com(?:\.cn)?$/);
	let service = match && match[1] || "";
	let region = match && match[2];
	if (region === "us-gov") region = "us-gov-west-1";
	else if (region === "s3" || region === "s3-accelerate") {
		region = "us-east-1";
		service = "s3";
	} else if (service === "iot") if (hostname.startsWith("iot.")) service = "execute-api";
	else if (hostname.startsWith("data.jobs.iot.")) service = "iot-jobs-data";
	else service = pathname === "/mqtt" ? "iotdevicegateway" : "iotdata";
	else if (service === "autoscaling") {
		const targetPrefix = (headers.get("X-Amz-Target") || "").split(".")[0];
		if (targetPrefix === "AnyScaleFrontendService") service = "application-autoscaling";
		else if (targetPrefix === "AnyScaleScalingPlannerFrontendService") service = "autoscaling-plans";
	} else if (region == null && service.startsWith("s3-")) {
		region = service.slice(3).replace(/^fips-|^external-1/, "");
		service = "s3";
	} else if (service.endsWith("-fips")) service = service.slice(0, -5);
	else if (region && /-\d$/.test(service) && !/-\d$/.test(region)) [service, region] = [region, service];
	return [HOST_SERVICES[service] || service, region || ""];
}
var VERSION = "3.0.61";
var BEDROCK_CACHE_POINT = { cachePoint: { type: "default" } };
var BEDROCK_STOP_REASONS = [
	"stop",
	"stop_sequence",
	"end_turn",
	"length",
	"max_tokens",
	"content-filter",
	"content_filtered",
	"guardrail_intervened",
	"tool-calls",
	"tool_use"
];
var BEDROCK_IMAGE_MIME_TYPES = {
	"image/jpeg": "jpeg",
	"image/png": "png",
	"image/gif": "gif",
	"image/webp": "webp"
};
var BEDROCK_DOCUMENT_MIME_TYPES = {
	"application/pdf": "pdf",
	"text/csv": "csv",
	"application/msword": "doc",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
	"application/vnd.ms-excel": "xls",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
	"text/html": "html",
	"text/plain": "txt",
	"text/markdown": "md"
};
var bedrockFilePartProviderOptions = object({ citations: object({ enabled: boolean() }).optional() });
var bedrockProviderOptions = object({
	additionalModelRequestFields: record(string(), any()).optional(),
	reasoningConfig: object({
		type: union([literal("enabled"), literal("disabled")]).optional(),
		budgetTokens: number().optional()
	}).optional(),
	anthropicBeta: array(string()).optional()
});
var BedrockErrorSchema = object({
	message: string(),
	type: string().nullish()
});
var createBedrockEventStreamResponseHandler = (chunkSchema) => async ({ response }) => {
	const responseHeaders = extractResponseHeaders(response);
	if (response.body == null) throw new EmptyResponseBodyError({});
	const codec = new EventStreamCodec(toUtf8, fromUtf8);
	let buffer = new Uint8Array(0);
	const textDecoder = new TextDecoder();
	return {
		responseHeaders,
		value: response.body.pipeThrough(new TransformStream({ async transform(chunk, controller) {
			var _a, _b;
			const newBuffer = new Uint8Array(buffer.length + chunk.length);
			newBuffer.set(buffer);
			newBuffer.set(chunk, buffer.length);
			buffer = newBuffer;
			while (buffer.length >= 4) {
				const totalLength = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength).getUint32(0, false);
				if (buffer.length < totalLength) break;
				try {
					const subView = buffer.subarray(0, totalLength);
					const decoded = codec.decode(subView);
					buffer = buffer.slice(totalLength);
					if (((_a = decoded.headers[":message-type"]) == null ? void 0 : _a.value) === "event") {
						const data = textDecoder.decode(decoded.body);
						const parsedDataResult = await safeParseJSON({ text: data });
						if (!parsedDataResult.success) {
							controller.enqueue(parsedDataResult);
							break;
						}
						delete parsedDataResult.value.p;
						let wrappedData = { [(_b = decoded.headers[":event-type"]) == null ? void 0 : _b.value]: parsedDataResult.value };
						const validatedWrappedData = await safeValidateTypes({
							value: wrappedData,
							schema: chunkSchema
						});
						if (!validatedWrappedData.success) controller.enqueue(validatedWrappedData);
						else controller.enqueue({
							success: true,
							value: validatedWrappedData.value,
							rawValue: wrappedData
						});
					}
				} catch (e) {
					break;
				}
			}
		} }))
	};
};
async function prepareTools$1({ tools, toolChoice, modelId }) {
	var _a;
	const toolWarnings = [];
	const betas = /* @__PURE__ */ new Set();
	if (tools == null || tools.length === 0) return {
		toolConfig: {},
		additionalTools: void 0,
		betas,
		toolWarnings
	};
	const supportedTools = tools.filter((tool) => {
		if (tool.type === "provider-defined" && tool.id === "anthropic.web_search_20250305") {
			toolWarnings.push({
				type: "unsupported-tool",
				tool,
				details: "The web_search_20250305 tool is not supported on Amazon Bedrock."
			});
			return false;
		}
		return true;
	});
	if (supportedTools.length === 0) return {
		toolConfig: {},
		additionalTools: void 0,
		betas,
		toolWarnings
	};
	const isAnthropicModel = modelId.includes("anthropic.");
	const providerDefinedTools = supportedTools.filter((t) => t.type === "provider-defined");
	const functionTools = supportedTools.filter((t) => t.type === "function");
	let additionalTools = void 0;
	const bedrockTools = [];
	const usingAnthropicTools = isAnthropicModel && providerDefinedTools.length > 0;
	if (usingAnthropicTools) {
		if (functionTools.length > 0) toolWarnings.push({
			type: "unsupported-setting",
			setting: "tools",
			details: "Mixed Anthropic provider-defined tools and standard function tools are not supported in a single call to Bedrock. Only Anthropic tools will be used."
		});
		const { toolChoice: preparedAnthropicToolChoice, toolWarnings: anthropicToolWarnings, betas: anthropicBetas } = await prepareTools({
			tools: providerDefinedTools,
			toolChoice
		});
		toolWarnings.push(...anthropicToolWarnings);
		anthropicBetas.forEach((beta) => betas.add(beta));
		if (preparedAnthropicToolChoice) additionalTools = { tool_choice: preparedAnthropicToolChoice };
		for (const tool of providerDefinedTools) {
			const toolFactory = Object.values(anthropicTools).find((factory) => {
				const instance = factory({});
				return instance.id === tool.id;
			});
			if (toolFactory != null) {
				const fullToolDefinition = toolFactory({});
				bedrockTools.push({ toolSpec: {
					name: tool.name,
					inputSchema: { json: asSchema(fullToolDefinition.inputSchema).jsonSchema }
				} });
			} else toolWarnings.push({
				type: "unsupported-tool",
				tool
			});
		}
	} else for (const tool of providerDefinedTools) toolWarnings.push({
		type: "unsupported-tool",
		tool
	});
	for (const tool of functionTools) bedrockTools.push({ toolSpec: {
		name: tool.name,
		...((_a = tool.description) == null ? void 0 : _a.trim()) !== "" ? { description: tool.description } : {},
		inputSchema: { json: tool.inputSchema }
	} });
	let bedrockToolChoice = void 0;
	if (!usingAnthropicTools && bedrockTools.length > 0 && toolChoice) {
		const type = toolChoice.type;
		switch (type) {
			case "auto":
				bedrockToolChoice = { auto: {} };
				break;
			case "required":
				bedrockToolChoice = { any: {} };
				break;
			case "none":
				bedrockTools.length = 0;
				bedrockToolChoice = void 0;
				break;
			case "tool":
				bedrockToolChoice = { tool: { name: toolChoice.toolName } };
				break;
			default: {
				const _exhaustiveCheck = type;
				throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${_exhaustiveCheck}` });
			}
		}
	}
	const toolConfig = bedrockTools.length > 0 ? {
		tools: bedrockTools,
		toolChoice: bedrockToolChoice
	} : {};
	return {
		toolConfig,
		additionalTools,
		betas,
		toolWarnings
	};
}
function getCachePoint(providerMetadata) {
	var _a;
	return (_a = providerMetadata == null ? void 0 : providerMetadata.bedrock) == null ? void 0 : _a.cachePoint;
}
async function shouldEnableCitations(providerMetadata) {
	var _a, _b;
	const bedrockOptions = await parseProviderOptions({
		provider: "bedrock",
		providerOptions: providerMetadata,
		schema: bedrockFilePartProviderOptions
	});
	return (_b = (_a = bedrockOptions == null ? void 0 : bedrockOptions.citations) == null ? void 0 : _a.enabled) != null ? _b : false;
}
async function convertToBedrockChatMessages(prompt) {
	var _a;
	const blocks = groupIntoBlocks(prompt);
	let system = [];
	const messages = [];
	let documentCounter = 0;
	const generateDocumentName = () => `document-${++documentCounter}`;
	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		const isLastBlock = i === blocks.length - 1;
		const type = block.type;
		switch (type) {
			case "system":
				if (messages.length > 0) throw new UnsupportedFunctionalityError({ functionality: "Multiple system messages that are separated by user/assistant messages" });
				for (const message of block.messages) {
					system.push({ text: message.content });
					if (getCachePoint(message.providerOptions)) system.push(BEDROCK_CACHE_POINT);
				}
				break;
			case "user": {
				const bedrockContent = [];
				for (const message of block.messages) {
					const { role, content, providerOptions } = message;
					switch (role) {
						case "user":
							for (let j = 0; j < content.length; j++) {
								const part = content[j];
								switch (part.type) {
									case "text":
										bedrockContent.push({ text: part.text });
										break;
									case "file":
										if (part.data instanceof URL) throw new UnsupportedFunctionalityError({ functionality: "File URL data" });
										if (part.mediaType.startsWith("image/")) bedrockContent.push({ image: {
											format: getBedrockImageFormat(part.mediaType),
											source: { bytes: convertToBase64(part.data) }
										} });
										else {
											if (!part.mediaType) throw new UnsupportedFunctionalityError({
												functionality: "file without mime type",
												message: "File mime type is required in user message part content"
											});
											const enableCitations = await shouldEnableCitations(part.providerOptions);
											bedrockContent.push({ document: {
												format: getBedrockDocumentFormat(part.mediaType),
												name: (_a = part.filename) != null ? _a : generateDocumentName(),
												source: { bytes: convertToBase64(part.data) },
												...enableCitations && { citations: { enabled: true } }
											} });
										}
										break;
								}
							}
							break;
						case "tool":
							for (const part of content) {
								let toolResultContent;
								const output = part.output;
								switch (output.type) {
									case "content":
										toolResultContent = output.value.map((contentPart) => {
											switch (contentPart.type) {
												case "text": return { text: contentPart.text };
												case "media":
													if (!contentPart.mediaType.startsWith("image/")) throw new UnsupportedFunctionalityError({ functionality: `media type: ${contentPart.mediaType}` });
													const format = getBedrockImageFormat(contentPart.mediaType);
													return { image: {
														format,
														source: { bytes: contentPart.data }
													} };
											}
										});
										break;
									case "text":
									case "error-text":
										toolResultContent = [{ text: output.value }];
										break;
									case "json":
									case "error-json":
									default:
										toolResultContent = [{ text: JSON.stringify(output.value) }];
										break;
								}
								bedrockContent.push({ toolResult: {
									toolUseId: part.toolCallId,
									content: toolResultContent
								} });
							}
							break;
						default: {
							const _exhaustiveCheck = role;
							throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
						}
					}
					if (getCachePoint(providerOptions)) bedrockContent.push(BEDROCK_CACHE_POINT);
				}
				messages.push({
					role: "user",
					content: bedrockContent
				});
				break;
			}
			case "assistant": {
				const bedrockContent = [];
				for (let j = 0; j < block.messages.length; j++) {
					const message = block.messages[j];
					const isLastMessage = j === block.messages.length - 1;
					const { content } = message;
					for (let k = 0; k < content.length; k++) {
						const part = content[k];
						const isLastContentPart = k === content.length - 1;
						switch (part.type) {
							case "text":
								if (!part.text.trim()) break;
								bedrockContent.push({ text: trimIfLast(isLastBlock, isLastMessage, isLastContentPart, part.text) });
								break;
							case "reasoning": {
								const reasoningMetadata = await parseProviderOptions({
									provider: "bedrock",
									providerOptions: part.providerOptions,
									schema: bedrockReasoningMetadataSchema
								});
								if (reasoningMetadata != null) {
									if (reasoningMetadata.signature != null) bedrockContent.push({ reasoningContent: { reasoningText: {
										text: trimIfLast(isLastBlock, isLastMessage, isLastContentPart, part.text),
										signature: reasoningMetadata.signature
									} } });
									else if (reasoningMetadata.redactedData != null) bedrockContent.push({ reasoningContent: { redactedReasoning: { data: reasoningMetadata.redactedData } } });
								}
								break;
							}
							case "tool-call":
								bedrockContent.push({ toolUse: {
									toolUseId: part.toolCallId,
									name: part.toolName,
									input: part.input
								} });
								break;
						}
					}
					if (getCachePoint(message.providerOptions)) bedrockContent.push(BEDROCK_CACHE_POINT);
				}
				messages.push({
					role: "assistant",
					content: bedrockContent
				});
				break;
			}
			default: {
				const _exhaustiveCheck = type;
				throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
			}
		}
	}
	return {
		system,
		messages
	};
}
function getBedrockImageFormat(mimeType) {
	if (!mimeType) throw new UnsupportedFunctionalityError({
		functionality: "image without mime type",
		message: "Image mime type is required in user message part content"
	});
	const format = BEDROCK_IMAGE_MIME_TYPES[mimeType];
	if (!format) throw new UnsupportedFunctionalityError({
		functionality: `image mime type: ${mimeType}`,
		message: `Unsupported image mime type: ${mimeType}, expected one of: ${Object.keys(BEDROCK_IMAGE_MIME_TYPES).join(", ")}`
	});
	return format;
}
function getBedrockDocumentFormat(mimeType) {
	const format = BEDROCK_DOCUMENT_MIME_TYPES[mimeType];
	if (!format) throw new UnsupportedFunctionalityError({
		functionality: `file mime type: ${mimeType}`,
		message: `Unsupported file mime type: ${mimeType}, expected one of: ${Object.keys(BEDROCK_DOCUMENT_MIME_TYPES).join(", ")}`
	});
	return format;
}
function trimIfLast(isLastBlock, isLastMessage, isLastContentPart, text) {
	return isLastBlock && isLastMessage && isLastContentPart ? text.trim() : text;
}
function groupIntoBlocks(prompt) {
	const blocks = [];
	let currentBlock = void 0;
	for (const message of prompt) {
		const { role } = message;
		switch (role) {
			case "system":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "system") {
					currentBlock = {
						type: "system",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			case "assistant":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "assistant") {
					currentBlock = {
						type: "assistant",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			case "user":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
					currentBlock = {
						type: "user",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			case "tool":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
					currentBlock = {
						type: "user",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			default: {
				const _exhaustiveCheck = role;
				throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
			}
		}
	}
	return blocks;
}
function mapBedrockFinishReason(finishReason, isJsonResponseFromTool) {
	switch (finishReason) {
		case "stop_sequence":
		case "end_turn": return "stop";
		case "max_tokens": return "length";
		case "content_filtered":
		case "guardrail_intervened": return "content-filter";
		case "tool_use": return isJsonResponseFromTool ? "stop" : "tool-calls";
		default: return "unknown";
	}
}
var BedrockChatLanguageModel = class {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v2";
		this.provider = "amazon-bedrock";
		this.supportedUrls = {};
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, providerOptions }) {
		var _a, _b, _c, _d, _e, _f, _g;
		const bedrockOptions = (_a = await parseProviderOptions({
			provider: "bedrock",
			providerOptions,
			schema: bedrockProviderOptions
		})) != null ? _a : {};
		const warnings = [];
		if (frequencyPenalty != null) warnings.push({
			type: "unsupported-setting",
			setting: "frequencyPenalty"
		});
		if (presencePenalty != null) warnings.push({
			type: "unsupported-setting",
			setting: "presencePenalty"
		});
		if (seed != null) warnings.push({
			type: "unsupported-setting",
			setting: "seed"
		});
		if (temperature != null && temperature > 1) {
			warnings.push({
				type: "unsupported-setting",
				setting: "temperature",
				details: `${temperature} exceeds bedrock maximum of 1.0. clamped to 1.0`
			});
			temperature = 1;
		} else if (temperature != null && temperature < 0) {
			warnings.push({
				type: "unsupported-setting",
				setting: "temperature",
				details: `${temperature} is below bedrock minimum of 0. clamped to 0`
			});
			temperature = 0;
		}
		if (responseFormat != null && responseFormat.type !== "text" && responseFormat.type !== "json") warnings.push({
			type: "unsupported-setting",
			setting: "responseFormat",
			details: "Only text and json response formats are supported."
		});
		const jsonResponseTool = (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null ? {
			type: "function",
			name: "json",
			description: "Respond with a JSON object.",
			inputSchema: responseFormat.schema
		} : void 0;
		const { toolConfig, additionalTools, toolWarnings, betas } = await prepareTools$1({
			tools: jsonResponseTool ? [...tools != null ? tools : [], jsonResponseTool] : tools,
			toolChoice: jsonResponseTool != null ? { type: "required" } : toolChoice,
			modelId: this.modelId
		});
		warnings.push(...toolWarnings);
		if (additionalTools) bedrockOptions.additionalModelRequestFields = {
			...bedrockOptions.additionalModelRequestFields,
			...additionalTools
		};
		if (betas.size > 0 || bedrockOptions.anthropicBeta) {
			const existingBetas = (_b = bedrockOptions.anthropicBeta) != null ? _b : [];
			const mergedBetas = betas.size > 0 ? [...existingBetas, ...Array.from(betas)] : existingBetas;
			bedrockOptions.additionalModelRequestFields = {
				...bedrockOptions.additionalModelRequestFields,
				anthropic_beta: mergedBetas
			};
		}
		const isThinking = ((_c = bedrockOptions.reasoningConfig) == null ? void 0 : _c.type) === "enabled";
		const thinkingBudget = (_d = bedrockOptions.reasoningConfig) == null ? void 0 : _d.budgetTokens;
		const inferenceConfig = {
			...maxOutputTokens != null && { maxTokens: maxOutputTokens },
			...temperature != null && { temperature },
			...topP != null && { topP },
			...topK != null && { topK },
			...stopSequences != null && { stopSequences }
		};
		if (isThinking && thinkingBudget != null) {
			if (inferenceConfig.maxTokens != null) inferenceConfig.maxTokens += thinkingBudget;
			else inferenceConfig.maxTokens = thinkingBudget + 4096;
			bedrockOptions.additionalModelRequestFields = {
				...bedrockOptions.additionalModelRequestFields,
				thinking: {
					type: (_e = bedrockOptions.reasoningConfig) == null ? void 0 : _e.type,
					budget_tokens: thinkingBudget
				}
			};
		}
		if (isThinking && inferenceConfig.temperature != null) {
			delete inferenceConfig.temperature;
			warnings.push({
				type: "unsupported-setting",
				setting: "temperature",
				details: "temperature is not supported when thinking is enabled"
			});
		}
		if (isThinking && inferenceConfig.topP != null) {
			delete inferenceConfig.topP;
			warnings.push({
				type: "unsupported-setting",
				setting: "topP",
				details: "topP is not supported when thinking is enabled"
			});
		}
		if (isThinking && inferenceConfig.topK != null) {
			delete inferenceConfig.topK;
			warnings.push({
				type: "unsupported-setting",
				setting: "topK",
				details: "topK is not supported when thinking is enabled"
			});
		}
		const hasAnyTools = ((_g = (_f = toolConfig.tools) == null ? void 0 : _f.length) != null ? _g : 0) > 0 || additionalTools;
		let filteredPrompt = prompt;
		if (!hasAnyTools) {
			const hasToolContent = prompt.some((message) => "content" in message && Array.isArray(message.content) && message.content.some((part) => part.type === "tool-call" || part.type === "tool-result"));
			if (hasToolContent) {
				filteredPrompt = prompt.map((message) => message.role === "system" ? message : {
					...message,
					content: message.content.filter((part) => part.type !== "tool-call" && part.type !== "tool-result")
				}).filter((message) => message.role === "system" || message.content.length > 0);
				warnings.push({
					type: "unsupported-setting",
					setting: "toolContent",
					details: "Tool calls and results removed from conversation because Bedrock does not support tool content without active tools."
				});
			}
		}
		const { system, messages } = await convertToBedrockChatMessages(filteredPrompt);
		const { reasoningConfig: _, additionalModelRequestFields: __,...filteredBedrockOptions } = (providerOptions == null ? void 0 : providerOptions.bedrock) || {};
		return {
			command: {
				system,
				messages,
				additionalModelRequestFields: bedrockOptions.additionalModelRequestFields,
				...Object.keys(inferenceConfig).length > 0 && { inferenceConfig },
				...filteredBedrockOptions,
				...toolConfig.tools !== void 0 && toolConfig.tools.length > 0 ? { toolConfig } : {}
			},
			warnings,
			usesJsonResponseTool: jsonResponseTool != null,
			betas
		};
	}
	async getHeaders({ headers }) {
		return combineHeaders(await resolve(this.config.headers), headers);
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
		const { command: args, warnings, usesJsonResponseTool } = await this.getArgs(options);
		const url = `${this.getUrl(this.modelId)}/converse`;
		const { value: response, responseHeaders } = await postJsonToApi({
			url,
			headers: await this.getHeaders({ headers: options.headers }),
			body: args,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: BedrockErrorSchema,
				errorToMessage: (error) => {
					var _a2;
					return `${(_a2 = error.message) != null ? _a2 : "Unknown error"}`;
				}
			}),
			successfulResponseHandler: createJsonResponseHandler(BedrockResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const content = [];
		let isJsonResponseFromTool = false;
		for (const part of response.output.message.content) {
			if (part.text) content.push({
				type: "text",
				text: part.text
			});
			if (part.reasoningContent) {
				if ("reasoningText" in part.reasoningContent) {
					const reasoning = {
						type: "reasoning",
						text: part.reasoningContent.reasoningText.text
					};
					if (part.reasoningContent.reasoningText.signature) reasoning.providerMetadata = { bedrock: { signature: part.reasoningContent.reasoningText.signature } };
					content.push(reasoning);
				} else if ("redactedReasoning" in part.reasoningContent) content.push({
					type: "reasoning",
					text: "",
					providerMetadata: { bedrock: { redactedData: (_a = part.reasoningContent.redactedReasoning.data) != null ? _a : "" } }
				});
			}
			if (part.toolUse) {
				const isJsonResponseTool = usesJsonResponseTool && part.toolUse.name === "json";
				if (isJsonResponseTool) {
					isJsonResponseFromTool = true;
					content.push({
						type: "text",
						text: JSON.stringify(part.toolUse.input)
					});
				} else content.push({
					type: "tool-call",
					toolCallId: (_c = (_b = part.toolUse) == null ? void 0 : _b.toolUseId) != null ? _c : this.config.generateId(),
					toolName: (_e = (_d = part.toolUse) == null ? void 0 : _d.name) != null ? _e : `tool-${this.config.generateId()}`,
					input: JSON.stringify((_g = (_f = part.toolUse) == null ? void 0 : _f.input) != null ? _g : "")
				});
			}
		}
		const providerMetadata = response.trace || response.usage || isJsonResponseFromTool ? { bedrock: {
			...response.trace && typeof response.trace === "object" ? { trace: response.trace } : {},
			...((_h = response.usage) == null ? void 0 : _h.cacheWriteInputTokens) != null && { usage: { cacheWriteInputTokens: response.usage.cacheWriteInputTokens } },
			...isJsonResponseFromTool && { isJsonResponseFromTool: true }
		} } : void 0;
		return {
			content,
			finishReason: mapBedrockFinishReason(response.stopReason, isJsonResponseFromTool),
			usage: {
				inputTokens: (_i = response.usage) == null ? void 0 : _i.inputTokens,
				outputTokens: (_j = response.usage) == null ? void 0 : _j.outputTokens,
				totalTokens: ((_k = response.usage) == null ? void 0 : _k.inputTokens) + ((_l = response.usage) == null ? void 0 : _l.outputTokens),
				cachedInputTokens: (_n = (_m = response.usage) == null ? void 0 : _m.cacheReadInputTokens) != null ? _n : void 0
			},
			response: { headers: responseHeaders },
			warnings,
			...providerMetadata && { providerMetadata }
		};
	}
	async doStream(options) {
		const { command: args, warnings, usesJsonResponseTool } = await this.getArgs(options);
		const url = `${this.getUrl(this.modelId)}/converse-stream`;
		const { value: response, responseHeaders } = await postJsonToApi({
			url,
			headers: await this.getHeaders({ headers: options.headers }),
			body: args,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: BedrockErrorSchema,
				errorToMessage: (error) => `${error.type}: ${error.message}`
			}),
			successfulResponseHandler: createBedrockEventStreamResponseHandler(BedrockStreamSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = "unknown";
		const usage = {
			inputTokens: void 0,
			outputTokens: void 0,
			totalTokens: void 0
		};
		let providerMetadata = void 0;
		let isJsonResponseFromTool = false;
		const contentBlocks = {};
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
					function enqueueError(bedrockError) {
						finishReason = "error";
						controller.enqueue({
							type: "error",
							error: bedrockError
						});
					}
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						enqueueError(chunk.error);
						return;
					}
					const value = chunk.value;
					if (value.internalServerException) {
						enqueueError(value.internalServerException);
						return;
					}
					if (value.modelStreamErrorException) {
						enqueueError(value.modelStreamErrorException);
						return;
					}
					if (value.throttlingException) {
						enqueueError(value.throttlingException);
						return;
					}
					if (value.validationException) {
						enqueueError(value.validationException);
						return;
					}
					if (value.messageStop) finishReason = mapBedrockFinishReason(value.messageStop.stopReason, isJsonResponseFromTool);
					if (value.metadata) {
						usage.inputTokens = (_b = (_a = value.metadata.usage) == null ? void 0 : _a.inputTokens) != null ? _b : usage.inputTokens;
						usage.outputTokens = (_d = (_c = value.metadata.usage) == null ? void 0 : _c.outputTokens) != null ? _d : usage.outputTokens;
						usage.totalTokens = ((_e = usage.inputTokens) != null ? _e : 0) + ((_f = usage.outputTokens) != null ? _f : 0);
						usage.cachedInputTokens = (_h = (_g = value.metadata.usage) == null ? void 0 : _g.cacheReadInputTokens) != null ? _h : usage.cachedInputTokens;
						const cacheUsage = ((_i = value.metadata.usage) == null ? void 0 : _i.cacheWriteInputTokens) != null ? { usage: { cacheWriteInputTokens: value.metadata.usage.cacheWriteInputTokens } } : void 0;
						const trace = value.metadata.trace ? { trace: value.metadata.trace } : void 0;
						if (cacheUsage || trace) providerMetadata = { bedrock: {
							...cacheUsage,
							...trace
						} };
					}
					if (((_j = value.contentBlockStart) == null ? void 0 : _j.contentBlockIndex) != null && !((_l = (_k = value.contentBlockStart) == null ? void 0 : _k.start) == null ? void 0 : _l.toolUse)) {
						const blockIndex = value.contentBlockStart.contentBlockIndex;
						contentBlocks[blockIndex] = { type: "text" };
						controller.enqueue({
							type: "text-start",
							id: String(blockIndex)
						});
					}
					if (((_m = value.contentBlockDelta) == null ? void 0 : _m.delta) && "text" in value.contentBlockDelta.delta && value.contentBlockDelta.delta.text) {
						const blockIndex = value.contentBlockDelta.contentBlockIndex || 0;
						if (contentBlocks[blockIndex] == null) {
							contentBlocks[blockIndex] = { type: "text" };
							controller.enqueue({
								type: "text-start",
								id: String(blockIndex)
							});
						}
						controller.enqueue({
							type: "text-delta",
							id: String(blockIndex),
							delta: value.contentBlockDelta.delta.text
						});
					}
					if (((_n = value.contentBlockStop) == null ? void 0 : _n.contentBlockIndex) != null) {
						const blockIndex = value.contentBlockStop.contentBlockIndex;
						const contentBlock = contentBlocks[blockIndex];
						if (contentBlock != null) {
							if (contentBlock.type === "reasoning") controller.enqueue({
								type: "reasoning-end",
								id: String(blockIndex)
							});
							else if (contentBlock.type === "text") controller.enqueue({
								type: "text-end",
								id: String(blockIndex)
							});
							else if (contentBlock.type === "tool-call") if (contentBlock.isJsonResponseTool) {
								isJsonResponseFromTool = true;
								controller.enqueue({
									type: "text-start",
									id: String(blockIndex)
								});
								controller.enqueue({
									type: "text-delta",
									id: String(blockIndex),
									delta: contentBlock.jsonText
								});
								controller.enqueue({
									type: "text-end",
									id: String(blockIndex)
								});
							} else {
								controller.enqueue({
									type: "tool-input-end",
									id: contentBlock.toolCallId
								});
								controller.enqueue({
									type: "tool-call",
									toolCallId: contentBlock.toolCallId,
									toolName: contentBlock.toolName,
									input: contentBlock.jsonText
								});
							}
							delete contentBlocks[blockIndex];
						}
					}
					if (((_o = value.contentBlockDelta) == null ? void 0 : _o.delta) && "reasoningContent" in value.contentBlockDelta.delta && value.contentBlockDelta.delta.reasoningContent) {
						const blockIndex = value.contentBlockDelta.contentBlockIndex || 0;
						const reasoningContent = value.contentBlockDelta.delta.reasoningContent;
						if ("text" in reasoningContent && reasoningContent.text) {
							if (contentBlocks[blockIndex] == null) {
								contentBlocks[blockIndex] = { type: "reasoning" };
								controller.enqueue({
									type: "reasoning-start",
									id: String(blockIndex)
								});
							}
							controller.enqueue({
								type: "reasoning-delta",
								id: String(blockIndex),
								delta: reasoningContent.text
							});
						} else if ("signature" in reasoningContent && reasoningContent.signature) controller.enqueue({
							type: "reasoning-delta",
							id: String(blockIndex),
							delta: "",
							providerMetadata: { bedrock: { signature: reasoningContent.signature } }
						});
						else if ("data" in reasoningContent && reasoningContent.data) controller.enqueue({
							type: "reasoning-delta",
							id: String(blockIndex),
							delta: "",
							providerMetadata: { bedrock: { redactedData: reasoningContent.data } }
						});
					}
					const contentBlockStart = value.contentBlockStart;
					if (((_p = contentBlockStart == null ? void 0 : contentBlockStart.start) == null ? void 0 : _p.toolUse) != null) {
						const toolUse = contentBlockStart.start.toolUse;
						const blockIndex = contentBlockStart.contentBlockIndex;
						const isJsonResponseTool = usesJsonResponseTool && toolUse.name === "json";
						contentBlocks[blockIndex] = {
							type: "tool-call",
							toolCallId: toolUse.toolUseId,
							toolName: toolUse.name,
							jsonText: "",
							isJsonResponseTool
						};
						if (!isJsonResponseTool) controller.enqueue({
							type: "tool-input-start",
							id: toolUse.toolUseId,
							toolName: toolUse.name
						});
					}
					const contentBlockDelta = value.contentBlockDelta;
					if ((contentBlockDelta == null ? void 0 : contentBlockDelta.delta) && "toolUse" in contentBlockDelta.delta && contentBlockDelta.delta.toolUse) {
						const blockIndex = contentBlockDelta.contentBlockIndex;
						const contentBlock = contentBlocks[blockIndex];
						if ((contentBlock == null ? void 0 : contentBlock.type) === "tool-call") {
							const delta = (_q = contentBlockDelta.delta.toolUse.input) != null ? _q : "";
							if (!contentBlock.isJsonResponseTool) controller.enqueue({
								type: "tool-input-delta",
								id: contentBlock.toolCallId,
								delta
							});
							contentBlock.jsonText += delta;
						}
					}
				},
				flush(controller) {
					if (isJsonResponseFromTool) if (providerMetadata) providerMetadata.bedrock = {
						...providerMetadata.bedrock,
						isJsonResponseFromTool: true
					};
					else providerMetadata = { bedrock: { isJsonResponseFromTool: true } };
					controller.enqueue({
						type: "finish",
						finishReason,
						usage,
						...providerMetadata && { providerMetadata }
					});
				}
			})),
			response: { headers: responseHeaders }
		};
	}
	getUrl(modelId) {
		const encodedModelId = encodeURIComponent(modelId);
		return `${this.config.baseUrl()}/model/${encodedModelId}`;
	}
};
var BedrockStopReasonSchema = union([_enum(BEDROCK_STOP_REASONS), string()]);
var BedrockToolUseSchema = object({
	toolUseId: string(),
	name: string(),
	input: unknown()
});
var BedrockReasoningTextSchema = object({
	signature: string().nullish(),
	text: string()
});
var BedrockRedactedReasoningSchema = object({ data: string() });
var BedrockResponseSchema = object({
	metrics: object({ latencyMs: number() }).nullish(),
	output: object({ message: object({
		content: array(object({
			text: string().nullish(),
			toolUse: BedrockToolUseSchema.nullish(),
			reasoningContent: union([object({ reasoningText: BedrockReasoningTextSchema }), object({ redactedReasoning: BedrockRedactedReasoningSchema })]).nullish()
		})),
		role: string()
	}) }),
	stopReason: BedrockStopReasonSchema,
	trace: unknown().nullish(),
	usage: object({
		inputTokens: number(),
		outputTokens: number(),
		totalTokens: number(),
		cacheReadInputTokens: number().nullish(),
		cacheWriteInputTokens: number().nullish()
	})
});
var BedrockStreamSchema = object({
	contentBlockDelta: object({
		contentBlockIndex: number(),
		delta: union([
			object({ text: string() }),
			object({ toolUse: object({ input: string() }) }),
			object({ reasoningContent: object({ text: string() }) }),
			object({ reasoningContent: object({ signature: string() }) }),
			object({ reasoningContent: object({ data: string() }) })
		]).nullish()
	}).nullish(),
	contentBlockStart: object({
		contentBlockIndex: number(),
		start: object({ toolUse: BedrockToolUseSchema.nullish() }).nullish()
	}).nullish(),
	contentBlockStop: object({ contentBlockIndex: number() }).nullish(),
	internalServerException: record(string(), unknown()).nullish(),
	messageStop: object({
		additionalModelResponseFields: record(string(), unknown()).nullish(),
		stopReason: BedrockStopReasonSchema
	}).nullish(),
	metadata: object({
		trace: unknown().nullish(),
		usage: object({
			cacheReadInputTokens: number().nullish(),
			cacheWriteInputTokens: number().nullish(),
			inputTokens: number(),
			outputTokens: number()
		}).nullish()
	}).nullish(),
	modelStreamErrorException: record(string(), unknown()).nullish(),
	throttlingException: record(string(), unknown()).nullish(),
	validationException: record(string(), unknown()).nullish()
});
var bedrockReasoningMetadataSchema = object({
	signature: string().optional(),
	redactedData: string().optional()
});
var bedrockEmbeddingProviderOptions = object({
	dimensions: union([
		literal(1024),
		literal(512),
		literal(256)
	]).optional(),
	normalize: boolean().optional()
});
var BedrockEmbeddingModel = class {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v2";
		this.provider = "amazon-bedrock";
		this.maxEmbeddingsPerCall = 1;
		this.supportsParallelCalls = true;
	}
	getUrl(modelId) {
		const encodedModelId = encodeURIComponent(modelId);
		return `${this.config.baseUrl()}/model/${encodedModelId}/invoke`;
	}
	async doEmbed({ values, headers, abortSignal, providerOptions }) {
		var _a;
		if (values.length > this.maxEmbeddingsPerCall) throw new TooManyEmbeddingValuesForCallError({
			provider: this.provider,
			modelId: this.modelId,
			maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
			values
		});
		const bedrockOptions = (_a = await parseProviderOptions({
			provider: "bedrock",
			providerOptions,
			schema: bedrockEmbeddingProviderOptions
		})) != null ? _a : {};
		const args = {
			inputText: values[0],
			dimensions: bedrockOptions.dimensions,
			normalize: bedrockOptions.normalize
		};
		const url = this.getUrl(this.modelId);
		const { value: response } = await postJsonToApi({
			url,
			headers: await resolve(combineHeaders(await resolve(this.config.headers), headers)),
			body: args,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: BedrockErrorSchema,
				errorToMessage: (error) => `${error.type}: ${error.message}`
			}),
			successfulResponseHandler: createJsonResponseHandler(BedrockEmbeddingResponseSchema),
			fetch: this.config.fetch,
			abortSignal
		});
		return {
			embeddings: [response.embedding],
			usage: { tokens: response.inputTextTokenCount }
		};
	}
};
var BedrockEmbeddingResponseSchema = object({
	embedding: array(number()),
	inputTextTokenCount: number()
});
var modelMaxImagesPerCall = { "amazon.nova-canvas-v1:0": 5 };
var BedrockImageModel = class {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v2";
		this.provider = "amazon-bedrock";
	}
	get maxImagesPerCall() {
		var _a;
		return (_a = modelMaxImagesPerCall[this.modelId]) != null ? _a : 1;
	}
	getUrl(modelId) {
		const encodedModelId = encodeURIComponent(modelId);
		return `${this.config.baseUrl()}/model/${encodedModelId}/invoke`;
	}
	async doGenerate({ prompt, n, size, aspectRatio, seed, providerOptions, headers, abortSignal }) {
		var _a, _b, _c, _d, _e, _f, _g;
		const warnings = [];
		const [width, height] = size ? size.split("x").map(Number) : [];
		const args = {
			taskType: "TEXT_IMAGE",
			textToImageParams: {
				text: prompt,
				...((_a = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _a.negativeText) ? { negativeText: providerOptions.bedrock.negativeText } : {},
				...((_b = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _b.style) ? { style: providerOptions.bedrock.style } : {}
			},
			imageGenerationConfig: {
				...width ? { width } : {},
				...height ? { height } : {},
				...seed ? { seed } : {},
				...n ? { numberOfImages: n } : {},
				...((_c = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _c.quality) ? { quality: providerOptions.bedrock.quality } : {},
				...((_d = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _d.cfgScale) ? { cfgScale: providerOptions.bedrock.cfgScale } : {}
			}
		};
		if (aspectRatio != void 0) warnings.push({
			type: "unsupported-setting",
			setting: "aspectRatio",
			details: "This model does not support aspect ratio. Use `size` instead."
		});
		const currentDate = (_g = (_f = (_e = this.config._internal) == null ? void 0 : _e.currentDate) == null ? void 0 : _f.call(_e)) != null ? _g : /* @__PURE__ */ new Date();
		const { value: response, responseHeaders } = await postJsonToApi({
			url: this.getUrl(this.modelId),
			headers: await resolve(combineHeaders(await resolve(this.config.headers), headers)),
			body: args,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: BedrockErrorSchema,
				errorToMessage: (error) => `${error.type}: ${error.message}`
			}),
			successfulResponseHandler: createJsonResponseHandler(bedrockImageResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		return {
			images: response.images,
			warnings,
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders
			}
		};
	}
};
var bedrockImageResponseSchema = object({ images: array(string()) });
function createSigV4FetchFunction(getCredentials, fetch$1 = globalThis.fetch) {
	return async (input, init) => {
		var _a, _b;
		const request = input instanceof Request ? input : void 0;
		const originalHeaders = combineHeaders(normalizeHeaders(request == null ? void 0 : request.headers), normalizeHeaders(init == null ? void 0 : init.headers));
		const headersWithUserAgent = withUserAgentSuffix(originalHeaders, `ai-sdk/amazon-bedrock/${VERSION}`, getRuntimeEnvironmentUserAgent());
		let effectiveBody = (_a = init == null ? void 0 : init.body) != null ? _a : void 0;
		if (effectiveBody === void 0 && request && request.body !== null) try {
			effectiveBody = await request.clone().text();
		} catch (e) {}
		const effectiveMethod = (_b = init == null ? void 0 : init.method) != null ? _b : request == null ? void 0 : request.method;
		if ((effectiveMethod == null ? void 0 : effectiveMethod.toUpperCase()) !== "POST" || !effectiveBody) return fetch$1(input, {
			...init,
			headers: headersWithUserAgent
		});
		const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
		const body = prepareBodyString(effectiveBody);
		const credentials = await getCredentials();
		const signer = new AwsV4Signer({
			url,
			method: "POST",
			headers: Object.entries(headersWithUserAgent),
			body,
			region: credentials.region,
			accessKeyId: credentials.accessKeyId,
			secretAccessKey: credentials.secretAccessKey,
			sessionToken: credentials.sessionToken,
			service: "bedrock"
		});
		const signingResult = await signer.sign();
		const signedHeaders = normalizeHeaders(signingResult.headers);
		const combinedHeaders = combineHeaders(headersWithUserAgent, signedHeaders);
		return fetch$1(input, {
			...init,
			body,
			headers: combinedHeaders
		});
	};
}
function prepareBodyString(body) {
	if (typeof body === "string") return body;
	else if (body instanceof Uint8Array) return new TextDecoder().decode(body);
	else if (body instanceof ArrayBuffer) return new TextDecoder().decode(new Uint8Array(body));
	else return JSON.stringify(body);
}
function createApiKeyFetchFunction(apiKey, fetch$1 = globalThis.fetch) {
	return async (input, init) => {
		const originalHeaders = normalizeHeaders(init == null ? void 0 : init.headers);
		const headersWithUserAgent = withUserAgentSuffix(originalHeaders, `ai-sdk/amazon-bedrock/${VERSION}`, getRuntimeEnvironmentUserAgent());
		const finalHeaders = combineHeaders(headersWithUserAgent, { Authorization: `Bearer ${apiKey}` });
		return fetch$1(input, {
			...init,
			headers: finalHeaders
		});
	};
}
function createAmazonBedrock(options = {}) {
	const rawApiKey = loadOptionalSetting({
		settingValue: options.apiKey,
		environmentVariableName: "AWS_BEARER_TOKEN_BEDROCK"
	});
	const apiKey = rawApiKey && rawApiKey.trim().length > 0 ? rawApiKey.trim() : void 0;
	const fetchFunction = apiKey ? createApiKeyFetchFunction(apiKey, options.fetch) : createSigV4FetchFunction(async () => {
		const region = loadSetting({
			settingValue: options.region,
			settingName: "region",
			environmentVariableName: "AWS_REGION",
			description: "AWS region"
		});
		if (options.credentialProvider) try {
			return {
				...await options.credentialProvider(),
				region
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(`AWS credential provider failed: ${errorMessage}. Please ensure your credential provider returns valid AWS credentials with accessKeyId and secretAccessKey properties.`);
		}
		try {
			return {
				region,
				accessKeyId: loadSetting({
					settingValue: options.accessKeyId,
					settingName: "accessKeyId",
					environmentVariableName: "AWS_ACCESS_KEY_ID",
					description: "AWS access key ID"
				}),
				secretAccessKey: loadSetting({
					settingValue: options.secretAccessKey,
					settingName: "secretAccessKey",
					environmentVariableName: "AWS_SECRET_ACCESS_KEY",
					description: "AWS secret access key"
				}),
				sessionToken: loadOptionalSetting({
					settingValue: options.sessionToken,
					environmentVariableName: "AWS_SESSION_TOKEN"
				})
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			if (errorMessage.includes("AWS_ACCESS_KEY_ID") || errorMessage.includes("accessKeyId")) throw new Error(`AWS SigV4 authentication requires AWS credentials. Please provide either:
1. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables
2. Provide accessKeyId and secretAccessKey in options
3. Use a credentialProvider function
4. Use API key authentication with AWS_BEARER_TOKEN_BEDROCK or apiKey option
Original error: ${errorMessage}`);
			if (errorMessage.includes("AWS_SECRET_ACCESS_KEY") || errorMessage.includes("secretAccessKey")) throw new Error(`AWS SigV4 authentication requires both AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY. Please ensure both credentials are provided.
Original error: ${errorMessage}`);
			throw error;
		}
	}, options.fetch);
	const getBaseUrl = () => {
		var _a, _b;
		return (_b = withoutTrailingSlash((_a = options.baseURL) != null ? _a : `https://bedrock-runtime.${loadSetting({
			settingValue: options.region,
			settingName: "region",
			environmentVariableName: "AWS_REGION",
			description: "AWS region"
		})}.amazonaws.com`)) != null ? _b : `https://bedrock-runtime.us-east-1.amazonaws.com`;
	};
	const getHeaders = () => {
		var _a;
		const baseHeaders = (_a = options.headers) != null ? _a : {};
		return withUserAgentSuffix(baseHeaders, `ai-sdk/amazon-bedrock/${VERSION}`);
	};
	const createChatModel = (modelId) => new BedrockChatLanguageModel(modelId, {
		baseUrl: getBaseUrl,
		headers: getHeaders,
		fetch: fetchFunction,
		generateId
	});
	const provider = function(modelId) {
		if (new.target) throw new Error("The Amazon Bedrock model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	const createEmbeddingModel = (modelId) => new BedrockEmbeddingModel(modelId, {
		baseUrl: getBaseUrl,
		headers: getHeaders,
		fetch: fetchFunction
	});
	const createImageModel = (modelId) => new BedrockImageModel(modelId, {
		baseUrl: getBaseUrl,
		headers: getHeaders,
		fetch: fetchFunction
	});
	provider.languageModel = createChatModel;
	provider.embedding = createEmbeddingModel;
	provider.textEmbedding = createEmbeddingModel;
	provider.textEmbeddingModel = createEmbeddingModel;
	provider.image = createImageModel;
	provider.imageModel = createImageModel;
	provider.tools = anthropicTools;
	return provider;
}
var bedrock = createAmazonBedrock();
export { VERSION, bedrock, createAmazonBedrock };
