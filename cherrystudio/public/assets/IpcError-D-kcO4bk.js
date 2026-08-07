const IpcErrorCode = {
	ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
	VALIDATION_FAILED: "VALIDATION_FAILED",
	FORBIDDEN_SENDER: "FORBIDDEN_SENDER",
	INTERNAL: "INTERNAL"
};
var IpcError = class IpcError extends Error {
	code;
	data;
	constructor(code, message = code, data) {
		super(message);
		this.name = "IpcError";
		this.code = code;
		if (data !== void 0) this.data = data;
	}
	toJSON() {
		return this.data === void 0 ? {
			code: this.code,
			message: this.message
		} : {
			code: this.code,
			message: this.message,
			data: this.data
		};
	}
	static fromJSON(json) {
		return new IpcError(json.code, json.message, json.data);
	}
	static from(value) {
		if (value instanceof IpcError) return value;
		if (value instanceof Error) return new IpcError(IpcErrorCode.INTERNAL, value.message);
		return new IpcError(IpcErrorCode.INTERNAL, String(value));
	}
};
export { IpcErrorCode as n, IpcError as t };
