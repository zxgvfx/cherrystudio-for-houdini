import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as DataApiDevtools } from "./dataApiDevtools-D0Xh4YeJ.js";
let ErrorCode = /* @__PURE__ */ function(ErrorCode$1) {
	ErrorCode$1["BAD_REQUEST"] = "BAD_REQUEST";
	ErrorCode$1["UNAUTHORIZED"] = "UNAUTHORIZED";
	ErrorCode$1["NOT_FOUND"] = "NOT_FOUND";
	ErrorCode$1["METHOD_NOT_ALLOWED"] = "METHOD_NOT_ALLOWED";
	ErrorCode$1["CONFLICT"] = "CONFLICT";
	ErrorCode$1["VALIDATION_ERROR"] = "VALIDATION_ERROR";
	ErrorCode$1["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
	ErrorCode$1["PERMISSION_DENIED"] = "PERMISSION_DENIED";
	ErrorCode$1["INVALID_OPERATION"] = "INVALID_OPERATION";
	ErrorCode$1["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
	ErrorCode$1["DATABASE_ERROR"] = "DATABASE_ERROR";
	ErrorCode$1["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
	ErrorCode$1["TIMEOUT"] = "TIMEOUT";
	ErrorCode$1["MIGRATION_ERROR"] = "MIGRATION_ERROR";
	ErrorCode$1["RESOURCE_LOCKED"] = "RESOURCE_LOCKED";
	ErrorCode$1["CONCURRENT_MODIFICATION"] = "CONCURRENT_MODIFICATION";
	ErrorCode$1["DATA_INCONSISTENT"] = "DATA_INCONSISTENT";
	return ErrorCode$1;
}({});
const ERROR_STATUS_MAP = {
	[ErrorCode.BAD_REQUEST]: 400,
	[ErrorCode.INVALID_OPERATION]: 400,
	[ErrorCode.UNAUTHORIZED]: 401,
	[ErrorCode.PERMISSION_DENIED]: 403,
	[ErrorCode.NOT_FOUND]: 404,
	[ErrorCode.METHOD_NOT_ALLOWED]: 405,
	[ErrorCode.CONFLICT]: 409,
	[ErrorCode.VALIDATION_ERROR]: 422,
	[ErrorCode.RATE_LIMIT_EXCEEDED]: 429,
	[ErrorCode.INTERNAL_SERVER_ERROR]: 500,
	[ErrorCode.DATABASE_ERROR]: 500,
	[ErrorCode.SERVICE_UNAVAILABLE]: 503,
	[ErrorCode.TIMEOUT]: 504,
	[ErrorCode.RESOURCE_LOCKED]: 423,
	[ErrorCode.CONCURRENT_MODIFICATION]: 409,
	[ErrorCode.DATA_INCONSISTENT]: 409,
	[ErrorCode.MIGRATION_ERROR]: 500
};
const ERROR_MESSAGES = {
	[ErrorCode.BAD_REQUEST]: "Bad request: Invalid request format or parameters",
	[ErrorCode.UNAUTHORIZED]: "Unauthorized: Authentication required",
	[ErrorCode.NOT_FOUND]: "Not found: Requested resource does not exist",
	[ErrorCode.METHOD_NOT_ALLOWED]: "Method not allowed: HTTP method not supported for this endpoint",
	[ErrorCode.CONFLICT]: "Conflict: Resource already exists or conflicts with existing data",
	[ErrorCode.VALIDATION_ERROR]: "Validation error: Request data does not meet requirements",
	[ErrorCode.RATE_LIMIT_EXCEEDED]: "Rate limit exceeded: Too many requests",
	[ErrorCode.PERMISSION_DENIED]: "Permission denied: Insufficient permissions for this operation",
	[ErrorCode.INVALID_OPERATION]: "Invalid operation: Operation not allowed in current state",
	[ErrorCode.INTERNAL_SERVER_ERROR]: "Internal server error: An unexpected error occurred",
	[ErrorCode.DATABASE_ERROR]: "Database error: Failed to access or modify data",
	[ErrorCode.SERVICE_UNAVAILABLE]: "Service unavailable: The service is temporarily unavailable",
	[ErrorCode.TIMEOUT]: "Timeout: Request timed out waiting for response",
	[ErrorCode.MIGRATION_ERROR]: "Migration error: Failed to migrate data",
	[ErrorCode.RESOURCE_LOCKED]: "Resource locked: Resource is currently locked by another operation",
	[ErrorCode.CONCURRENT_MODIFICATION]: "Concurrent modification: Resource was modified by another user",
	[ErrorCode.DATA_INCONSISTENT]: "Data inconsistent: Data integrity violation detected"
};
const RETRYABLE_ERROR_CODES = new Set([
	ErrorCode.SERVICE_UNAVAILABLE,
	ErrorCode.TIMEOUT,
	ErrorCode.RATE_LIMIT_EXCEEDED,
	ErrorCode.DATABASE_ERROR,
	ErrorCode.INTERNAL_SERVER_ERROR,
	ErrorCode.RESOURCE_LOCKED
]);
function isRetryableErrorCode(code) {
	return RETRYABLE_ERROR_CODES.has(code);
}
var DataApiError = class DataApiError extends Error {
	code;
	status;
	details;
	requestContext;
	constructor(code, message, status, details, requestContext) {
		super(message);
		this.name = "DataApiError";
		this.code = code;
		this.status = status;
		this.details = details;
		this.requestContext = requestContext;
		if (Error.captureStackTrace) Error.captureStackTrace(this, DataApiError);
	}
	get isRetryable() {
		return isRetryableErrorCode(this.code);
	}
	get isClientError() {
		return this.status >= 400 && this.status < 500;
	}
	get isServerError() {
		return this.status >= 500 && this.status < 600;
	}
	toJSON() {
		return {
			code: this.code,
			message: this.message,
			status: this.status,
			details: this.details,
			requestContext: this.requestContext
		};
	}
	static fromJSON(error) {
		return new DataApiError(error.code, error.message, error.status, error.details, error.requestContext);
	}
	static fromError(error, code = ErrorCode.INTERNAL_SERVER_ERROR, requestContext) {
		return new DataApiError(code, error.message, ERROR_STATUS_MAP[code], {
			originalError: error.message,
			context: error.name
		}, requestContext);
	}
};
var DataApiErrorFactory = class {
	static create(code, customMessage, details, requestContext) {
		return new DataApiError(code, customMessage || ERROR_MESSAGES[code], ERROR_STATUS_MAP[code], details, requestContext);
	}
	static validation(fieldErrors, message, requestContext) {
		return new DataApiError(ErrorCode.VALIDATION_ERROR, message || "Request validation failed", ERROR_STATUS_MAP[ErrorCode.VALIDATION_ERROR], { fieldErrors }, requestContext);
	}
	static notFound(resource, id, requestContext) {
		const message = id ? `${resource} with id '${id}' not found` : `${resource} not found`;
		return new DataApiError(ErrorCode.NOT_FOUND, message, ERROR_STATUS_MAP[ErrorCode.NOT_FOUND], {
			resource,
			id
		}, requestContext);
	}
	static database(originalError, operation, requestContext) {
		return new DataApiError(ErrorCode.DATABASE_ERROR, `Database operation failed${operation ? `: ${operation}` : ""}`, ERROR_STATUS_MAP[ErrorCode.DATABASE_ERROR], {
			originalError: originalError.message,
			operation
		}, requestContext);
	}
	static internal(originalError, context, requestContext) {
		const message = context ? `Internal error in ${context}: ${originalError.message}` : `Internal error: ${originalError.message}`;
		return new DataApiError(ErrorCode.INTERNAL_SERVER_ERROR, message, ERROR_STATUS_MAP[ErrorCode.INTERNAL_SERVER_ERROR], {
			originalError: originalError.message,
			context
		}, requestContext);
	}
	static permissionDenied(action, resource, requestContext) {
		const message = resource ? `Permission denied: Cannot ${action} ${resource}` : `Permission denied: Cannot ${action}`;
		return new DataApiError(ErrorCode.PERMISSION_DENIED, message, ERROR_STATUS_MAP[ErrorCode.PERMISSION_DENIED], {
			action,
			resource
		}, requestContext);
	}
	static timeout(operation, timeoutMs, requestContext) {
		const message = operation ? `Request timeout: ${operation}${timeoutMs ? ` (${timeoutMs}ms)` : ""}` : `Request timeout${timeoutMs ? ` (${timeoutMs}ms)` : ""}`;
		return new DataApiError(ErrorCode.TIMEOUT, message, ERROR_STATUS_MAP[ErrorCode.TIMEOUT], {
			operation,
			timeoutMs
		}, requestContext);
	}
	static invalidOperation(operation, reason, requestContext) {
		const message = reason ? `Invalid operation: ${operation} - ${reason}` : `Invalid operation: ${operation}`;
		return new DataApiError(ErrorCode.INVALID_OPERATION, message, ERROR_STATUS_MAP[ErrorCode.INVALID_OPERATION], {
			operation,
			reason
		}, requestContext);
	}
	static conflict(message, resource, requestContext) {
		return new DataApiError(ErrorCode.CONFLICT, message, ERROR_STATUS_MAP[ErrorCode.CONFLICT], {
			resource,
			description: message
		}, requestContext);
	}
	static dataInconsistent(resource, description, requestContext) {
		const message = description ? `Data inconsistent in ${resource}: ${description}` : `Data inconsistent in ${resource}`;
		return new DataApiError(ErrorCode.DATA_INCONSISTENT, message, ERROR_STATUS_MAP[ErrorCode.DATA_INCONSISTENT], {
			resource,
			description
		}, requestContext);
	}
	static resourceLocked(resource, id, lockedBy, requestContext) {
		const message = lockedBy ? `${resource} '${id}' is locked by ${lockedBy}` : `${resource} '${id}' is currently locked`;
		return new DataApiError(ErrorCode.RESOURCE_LOCKED, message, ERROR_STATUS_MAP[ErrorCode.RESOURCE_LOCKED], {
			resource,
			id,
			lockedBy
		}, requestContext);
	}
	static concurrentModification(resource, id, requestContext) {
		return new DataApiError(ErrorCode.CONCURRENT_MODIFICATION, `${resource} '${id}' was modified by another user`, ERROR_STATUS_MAP[ErrorCode.CONCURRENT_MODIFICATION], {
			resource,
			id
		}, requestContext);
	}
};
function isDataApiError(error) {
	return error instanceof DataApiError;
}
function isDataApiNotFoundError(error) {
	return isDataApiError(error) && error.code === ErrorCode.NOT_FOUND;
}
function isSerializedDataApiError(error) {
	return typeof error === "object" && error !== null && "code" in error && "message" in error && "status" in error && typeof error.code === "string" && typeof error.message === "string" && typeof error.status === "number";
}
function toDataApiError(error, context) {
	if (isDataApiError(error)) return error;
	if (isSerializedDataApiError(error)) return DataApiError.fromJSON(error);
	if (isZodError(error)) {
		const fieldErrors = {};
		for (const issue of error.issues) {
			const path = issue.path.length > 0 ? issue.path.join(".") : "_root";
			if (!fieldErrors[path]) fieldErrors[path] = [];
			fieldErrors[path].push(issue.message);
		}
		return DataApiErrorFactory.validation(fieldErrors, `Validation failed${context ? ` in ${context}` : ""}`);
	}
	if (error instanceof Error) return DataApiErrorFactory.internal(error, context);
	return DataApiErrorFactory.create(ErrorCode.INTERNAL_SERVER_ERROR, `Unknown error${context ? ` in ${context}` : ""}: ${String(error)}`, {
		originalError: String(error),
		context
	});
}
function isZodError(error) {
	return error instanceof Error && error.name === "ZodError" && Array.isArray(error.issues);
}
var logger = loggerService.withContext("DataApiService");
var DataApiService = class {
	requestId = 0;
	dataChangeListeners = /* @__PURE__ */ new Map();
	defaultRetryOptions = {
		maxRetries: 2,
		retryDelay: 1e3,
		backoffMultiplier: 2
	};
	constructor() {
		window.api?.dataApi?.onDataChanged?.((effects) => this.dispatchDataChange(effects));
	}
	generateRequestId() {
		return `req_${Date.now()}_${++this.requestId}`;
	}
	configureRetry(options) {
		this.defaultRetryOptions = {
			...this.defaultRetryOptions,
			...options
		};
		logger.debug("Retry options updated", this.defaultRetryOptions);
	}
	getRetryConfig() {
		return { ...this.defaultRetryOptions };
	}
	async sendRequest(request, retryCount = 0) {
		if (!window.api.dataApi.request) throw DataApiErrorFactory.create(ErrorCode.SERVICE_UNAVAILABLE, "Data API not available");
		let errorMetadata;
		DataApiDevtools.recordStart({
			requestId: request.id,
			method: request.method,
			path: request.path,
			query: request.params,
			body: request.body,
			retryAttempt: retryCount
		});
		const requestContext = {
			requestId: request.id,
			path: request.path,
			method: request.method,
			timestamp: Date.now()
		};
		try {
			logger.debug(`Making ${request.method} request to ${request.path}`, { request });
			const response = await Promise.race([window.api.dataApi.request(request), new Promise((_, reject) => setTimeout(() => reject(DataApiErrorFactory.timeout(request.path, 3e3, requestContext)), 3e3))]);
			if (response.error) {
				errorMetadata = response.metadata;
				throw DataApiError.fromJSON(response.error);
			}
			DataApiDevtools.recordSuccess({
				requestId: request.id,
				method: request.method,
				path: request.path,
				response
			});
			logger.debug(`Request succeeded: ${request.method} ${request.path}`, {
				status: response.status,
				hasData: !!response.data
			});
			return response.data;
		} catch (error) {
			const apiError = error instanceof DataApiError ? error : toDataApiError(error, `${request.method} ${request.path}`);
			DataApiDevtools.recordError({
				requestId: request.id,
				method: request.method,
				path: request.path,
				error: apiError,
				status: apiError.status,
				metadata: errorMetadata
			});
			logger.debug(`Request failed: ${request.method} ${request.path}`, apiError);
			if (retryCount < this.defaultRetryOptions.maxRetries && apiError.isRetryable) {
				DataApiDevtools.recordRetry({
					requestId: request.id,
					method: request.method,
					path: request.path,
					retryAttempt: retryCount + 1,
					error: apiError
				});
				logger.debug(`Retrying request attempt ${retryCount + 1}/${this.defaultRetryOptions.maxRetries}: ${request.path}`, {
					error: apiError.message,
					code: apiError.code
				});
				const delay = this.defaultRetryOptions.retryDelay * Math.pow(this.defaultRetryOptions.backoffMultiplier, retryCount);
				await new Promise((resolve) => setTimeout(resolve, delay));
				const retryRequest = {
					...request,
					id: this.generateRequestId()
				};
				return this.sendRequest(retryRequest, retryCount + 1);
			}
			throw apiError;
		}
	}
	async makeRequest(method, path, options = {}) {
		const { params, body, headers, metadata } = options;
		const request = {
			id: this.generateRequestId(),
			method,
			path,
			params,
			body,
			headers,
			metadata: {
				timestamp: Date.now(),
				...metadata
			}
		};
		logger.debug(`Making ${method} request to ${path}`, { request });
		return this.sendRequest(request).catch((error) => {
			logger.error(`Request failed: ${method} ${path}`, error);
			throw toDataApiError(error, `${method} ${path}`);
		});
	}
	async get(path, options) {
		return this.makeRequest("GET", path, {
			params: options?.query,
			headers: options?.headers
		});
	}
	async post(path, options) {
		return this.makeRequest("POST", path, {
			params: options.query,
			body: options.body,
			headers: options.headers
		});
	}
	async put(path, options) {
		return this.makeRequest("PUT", path, {
			params: options.query,
			body: options.body,
			headers: options.headers
		});
	}
	async delete(path, options) {
		return this.makeRequest("DELETE", path, {
			params: options?.query,
			headers: options?.headers
		});
	}
	async patch(path, options) {
		return this.makeRequest("PATCH", path, {
			params: options.query,
			body: options.body,
			headers: options.headers
		});
	}
	onDataChanged(endpoints, listener) {
		const registered = (effects) => listener(effects);
		const endpointList = [...new Set(Array.isArray(endpoints) ? endpoints : [endpoints])];
		for (const endpoint of endpointList) {
			let listeners = this.dataChangeListeners.get(endpoint);
			if (!listeners) {
				listeners = /* @__PURE__ */ new Set();
				this.dataChangeListeners.set(endpoint, listeners);
			}
			listeners.add(registered);
		}
		return () => {
			for (const endpoint of endpointList) {
				const listeners = this.dataChangeListeners.get(endpoint);
				if (!listeners) continue;
				listeners.delete(registered);
				if (listeners.size === 0) this.dataChangeListeners.delete(endpoint);
			}
		};
	}
	dispatchDataChange(effects) {
		const matched = /* @__PURE__ */ new Map();
		for (const effect of effects) {
			const listeners = this.dataChangeListeners.get(effect.endpoint);
			if (!listeners) continue;
			for (const listener of listeners) {
				let batch = matched.get(listener);
				if (!batch) {
					batch = [];
					matched.set(listener, batch);
				}
				batch.push(effect);
			}
		}
		for (const [listener, batch] of matched) try {
			listener(batch);
		} catch (error) {
			logger.error("data change listener failed", error);
		}
	}
};
const dataApiService = new DataApiService();
export { isDataApiError as a, toDataApiError as c, ErrorCode as i, DataApiError as n, isDataApiNotFoundError as o, DataApiErrorFactory as r, isSerializedDataApiError as s, dataApiService as t };
