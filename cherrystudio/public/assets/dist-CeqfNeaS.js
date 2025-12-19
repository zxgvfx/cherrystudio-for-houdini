import { A as unknown, f as _enum, k as array, l as boolean, n as discriminatedUnion, q as literal, r as looseObject, t as number, u as object, v as record, x as string, y as tuple, z as union } from "./schemas-Bbbixa2f.js";
import { m as NoSuchModelError, p as UnsupportedFunctionalityError } from "./types-Db4HyS8d.js";
import { B as loadApiKey, C as loadOptionalSetting, F as parseProviderOptions, G as postJsonToApi, H as resolve, L as validateTypes, M as withUserAgentSuffix, N as withoutTrailingSlash, O as zodSchema, c as combineHeaders, e as convertToBase64, g as createEventSourceResponseHandler, i as createJsonErrorResponseHandler, j as createJsonResponseHandler, l as createProviderDefinedToolFactory, m as createProviderDefinedToolFactoryWithOutputSchema, q as generateId, z as lazySchema } from "./dist-K3A05YNJ.js";
var VERSION = "2.0.49";
var anthropicErrorDataSchema = lazySchema(() => zodSchema(object({
	type: literal("error"),
	error: object({
		type: string(),
		message: string()
	})
})));
var anthropicFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: anthropicErrorDataSchema,
	errorToMessage: (data) => data.error.message
});
var anthropicMessagesResponseSchema = lazySchema(() => zodSchema(object({
	type: literal("message"),
	id: string().nullish(),
	model: string().nullish(),
	content: array(discriminatedUnion("type", [
		object({
			type: literal("text"),
			text: string(),
			citations: array(discriminatedUnion("type", [
				object({
					type: literal("web_search_result_location"),
					cited_text: string(),
					url: string(),
					title: string(),
					encrypted_index: string()
				}),
				object({
					type: literal("page_location"),
					cited_text: string(),
					document_index: number(),
					document_title: string().nullable(),
					start_page_number: number(),
					end_page_number: number()
				}),
				object({
					type: literal("char_location"),
					cited_text: string(),
					document_index: number(),
					document_title: string().nullable(),
					start_char_index: number(),
					end_char_index: number()
				})
			])).optional()
		}),
		object({
			type: literal("thinking"),
			thinking: string(),
			signature: string()
		}),
		object({
			type: literal("redacted_thinking"),
			data: string()
		}),
		object({
			type: literal("tool_use"),
			id: string(),
			name: string(),
			input: unknown()
		}),
		object({
			type: literal("server_tool_use"),
			id: string(),
			name: string(),
			input: record(string(), unknown()).nullish()
		}),
		object({
			type: literal("web_fetch_tool_result"),
			tool_use_id: string(),
			content: union([object({
				type: literal("web_fetch_result"),
				url: string(),
				retrieved_at: string(),
				content: object({
					type: literal("document"),
					title: string().nullable(),
					citations: object({ enabled: boolean() }).optional(),
					source: object({
						type: literal("text"),
						media_type: string(),
						data: string()
					})
				})
			}), object({
				type: literal("web_fetch_tool_result_error"),
				error_code: string()
			})])
		}),
		object({
			type: literal("web_search_tool_result"),
			tool_use_id: string(),
			content: union([array(object({
				type: literal("web_search_result"),
				url: string(),
				title: string(),
				encrypted_content: string(),
				page_age: string().nullish()
			})), object({
				type: literal("web_search_tool_result_error"),
				error_code: string()
			})])
		}),
		object({
			type: literal("code_execution_tool_result"),
			tool_use_id: string(),
			content: union([object({
				type: literal("code_execution_result"),
				stdout: string(),
				stderr: string(),
				return_code: number()
			}), object({
				type: literal("code_execution_tool_result_error"),
				error_code: string()
			})])
		}),
		object({
			type: literal("bash_code_execution_tool_result"),
			tool_use_id: string(),
			content: discriminatedUnion("type", [object({
				type: literal("bash_code_execution_result"),
				content: array(object({
					type: literal("bash_code_execution_output"),
					file_id: string()
				})),
				stdout: string(),
				stderr: string(),
				return_code: number()
			}), object({
				type: literal("bash_code_execution_tool_result_error"),
				error_code: string()
			})])
		}),
		object({
			type: literal("text_editor_code_execution_tool_result"),
			tool_use_id: string(),
			content: discriminatedUnion("type", [
				object({
					type: literal("text_editor_code_execution_tool_result_error"),
					error_code: string()
				}),
				object({
					type: literal("text_editor_code_execution_view_result"),
					content: string(),
					file_type: string(),
					num_lines: number().nullable(),
					start_line: number().nullable(),
					total_lines: number().nullable()
				}),
				object({
					type: literal("text_editor_code_execution_create_result"),
					is_file_update: boolean()
				}),
				object({
					type: literal("text_editor_code_execution_str_replace_result"),
					lines: array(string()).nullable(),
					new_lines: number().nullable(),
					new_start: number().nullable(),
					old_lines: number().nullable(),
					old_start: number().nullable()
				})
			])
		})
	])),
	stop_reason: string().nullish(),
	stop_sequence: string().nullish(),
	usage: looseObject({
		input_tokens: number(),
		output_tokens: number(),
		cache_creation_input_tokens: number().nullish(),
		cache_read_input_tokens: number().nullish()
	}),
	container: object({
		expires_at: string(),
		id: string(),
		skills: array(object({
			type: union([literal("anthropic"), literal("custom")]),
			skill_id: string(),
			version: string()
		})).nullish()
	}).nullish()
})));
var anthropicMessagesChunkSchema = lazySchema(() => zodSchema(discriminatedUnion("type", [
	object({
		type: literal("message_start"),
		message: object({
			id: string().nullish(),
			model: string().nullish(),
			usage: looseObject({
				input_tokens: number(),
				cache_creation_input_tokens: number().nullish(),
				cache_read_input_tokens: number().nullish()
			})
		})
	}),
	object({
		type: literal("content_block_start"),
		index: number(),
		content_block: discriminatedUnion("type", [
			object({
				type: literal("text"),
				text: string()
			}),
			object({
				type: literal("thinking"),
				thinking: string()
			}),
			object({
				type: literal("tool_use"),
				id: string(),
				name: string()
			}),
			object({
				type: literal("redacted_thinking"),
				data: string()
			}),
			object({
				type: literal("server_tool_use"),
				id: string(),
				name: string(),
				input: record(string(), unknown()).nullish()
			}),
			object({
				type: literal("web_fetch_tool_result"),
				tool_use_id: string(),
				content: union([object({
					type: literal("web_fetch_result"),
					url: string(),
					retrieved_at: string(),
					content: object({
						type: literal("document"),
						title: string().nullable(),
						citations: object({ enabled: boolean() }).optional(),
						source: object({
							type: literal("text"),
							media_type: string(),
							data: string()
						})
					})
				}), object({
					type: literal("web_fetch_tool_result_error"),
					error_code: string()
				})])
			}),
			object({
				type: literal("web_search_tool_result"),
				tool_use_id: string(),
				content: union([array(object({
					type: literal("web_search_result"),
					url: string(),
					title: string(),
					encrypted_content: string(),
					page_age: string().nullish()
				})), object({
					type: literal("web_search_tool_result_error"),
					error_code: string()
				})])
			}),
			object({
				type: literal("code_execution_tool_result"),
				tool_use_id: string(),
				content: union([object({
					type: literal("code_execution_result"),
					stdout: string(),
					stderr: string(),
					return_code: number()
				}), object({
					type: literal("code_execution_tool_result_error"),
					error_code: string()
				})])
			}),
			object({
				type: literal("bash_code_execution_tool_result"),
				tool_use_id: string(),
				content: discriminatedUnion("type", [object({
					type: literal("bash_code_execution_result"),
					content: array(object({
						type: literal("bash_code_execution_output"),
						file_id: string()
					})),
					stdout: string(),
					stderr: string(),
					return_code: number()
				}), object({
					type: literal("bash_code_execution_tool_result_error"),
					error_code: string()
				})])
			}),
			object({
				type: literal("text_editor_code_execution_tool_result"),
				tool_use_id: string(),
				content: discriminatedUnion("type", [
					object({
						type: literal("text_editor_code_execution_tool_result_error"),
						error_code: string()
					}),
					object({
						type: literal("text_editor_code_execution_view_result"),
						content: string(),
						file_type: string(),
						num_lines: number().nullable(),
						start_line: number().nullable(),
						total_lines: number().nullable()
					}),
					object({
						type: literal("text_editor_code_execution_create_result"),
						is_file_update: boolean()
					}),
					object({
						type: literal("text_editor_code_execution_str_replace_result"),
						lines: array(string()).nullable(),
						new_lines: number().nullable(),
						new_start: number().nullable(),
						old_lines: number().nullable(),
						old_start: number().nullable()
					})
				])
			})
		])
	}),
	object({
		type: literal("content_block_delta"),
		index: number(),
		delta: discriminatedUnion("type", [
			object({
				type: literal("input_json_delta"),
				partial_json: string()
			}),
			object({
				type: literal("text_delta"),
				text: string()
			}),
			object({
				type: literal("thinking_delta"),
				thinking: string()
			}),
			object({
				type: literal("signature_delta"),
				signature: string()
			}),
			object({
				type: literal("citations_delta"),
				citation: discriminatedUnion("type", [
					object({
						type: literal("web_search_result_location"),
						cited_text: string(),
						url: string(),
						title: string(),
						encrypted_index: string()
					}),
					object({
						type: literal("page_location"),
						cited_text: string(),
						document_index: number(),
						document_title: string().nullable(),
						start_page_number: number(),
						end_page_number: number()
					}),
					object({
						type: literal("char_location"),
						cited_text: string(),
						document_index: number(),
						document_title: string().nullable(),
						start_char_index: number(),
						end_char_index: number()
					})
				])
			})
		])
	}),
	object({
		type: literal("content_block_stop"),
		index: number()
	}),
	object({
		type: literal("error"),
		error: object({
			type: string(),
			message: string()
		})
	}),
	object({
		type: literal("message_delta"),
		delta: object({
			stop_reason: string().nullish(),
			stop_sequence: string().nullish(),
			container: object({
				expires_at: string(),
				id: string(),
				skills: array(object({
					type: union([literal("anthropic"), literal("custom")]),
					skill_id: string(),
					version: string()
				})).nullish()
			}).nullish()
		}),
		usage: looseObject({
			output_tokens: number(),
			cache_creation_input_tokens: number().nullish()
		})
	}),
	object({ type: literal("message_stop") }),
	object({ type: literal("ping") })
])));
var anthropicReasoningMetadataSchema = lazySchema(() => zodSchema(object({
	signature: string().optional(),
	redactedData: string().optional()
})));
var anthropicFilePartProviderOptions = object({
	citations: object({ enabled: boolean() }).optional(),
	title: string().optional(),
	context: string().optional()
});
var anthropicProviderOptions = object({
	sendReasoning: boolean().optional(),
	structuredOutputMode: _enum([
		"outputFormat",
		"jsonTool",
		"auto"
	]).optional(),
	thinking: object({
		type: union([literal("enabled"), literal("disabled")]),
		budgetTokens: number().optional()
	}).optional(),
	disableParallelToolUse: boolean().optional(),
	cacheControl: object({
		type: literal("ephemeral"),
		ttl: union([literal("5m"), literal("1h")]).optional()
	}).optional(),
	container: object({
		id: string().optional(),
		skills: array(object({
			type: union([literal("anthropic"), literal("custom")]),
			skillId: string(),
			version: string().optional()
		})).optional()
	}).optional(),
	effort: _enum([
		"low",
		"medium",
		"high"
	]).optional()
});
var MAX_CACHE_BREAKPOINTS = 4;
function getCacheControl(providerMetadata) {
	var _a;
	const anthropic2 = providerMetadata == null ? void 0 : providerMetadata.anthropic;
	const cacheControlValue = (_a = anthropic2 == null ? void 0 : anthropic2.cacheControl) != null ? _a : anthropic2 == null ? void 0 : anthropic2.cache_control;
	return cacheControlValue;
}
var CacheControlValidator = class {
	constructor() {
		this.breakpointCount = 0;
		this.warnings = [];
	}
	getCacheControl(providerMetadata, context) {
		const cacheControlValue = getCacheControl(providerMetadata);
		if (!cacheControlValue) return void 0;
		if (!context.canCache) {
			this.warnings.push({
				type: "unsupported-setting",
				setting: "cacheControl",
				details: `cache_control cannot be set on ${context.type}. It will be ignored.`
			});
			return void 0;
		}
		this.breakpointCount++;
		if (this.breakpointCount > MAX_CACHE_BREAKPOINTS) {
			this.warnings.push({
				type: "unsupported-setting",
				setting: "cacheControl",
				details: `Maximum ${MAX_CACHE_BREAKPOINTS} cache breakpoints exceeded (found ${this.breakpointCount}). This breakpoint will be ignored.`
			});
			return void 0;
		}
		return cacheControlValue;
	}
	getWarnings() {
		return this.warnings;
	}
};
var textEditor_20250728ArgsSchema = lazySchema(() => zodSchema(object({ maxCharacters: number().optional() })));
var textEditor_20250728InputSchema = lazySchema(() => zodSchema(object({
	command: _enum([
		"view",
		"create",
		"str_replace",
		"insert"
	]),
	path: string(),
	file_text: string().optional(),
	insert_line: number().int().optional(),
	new_str: string().optional(),
	old_str: string().optional(),
	view_range: array(number().int()).optional()
})));
var factory = createProviderDefinedToolFactory({
	id: "anthropic.text_editor_20250728",
	name: "str_replace_based_edit_tool",
	inputSchema: textEditor_20250728InputSchema
});
var textEditor_20250728 = (args = {}) => {
	return factory(args);
};
var webSearch_20250305ArgsSchema = lazySchema(() => zodSchema(object({
	maxUses: number().optional(),
	allowedDomains: array(string()).optional(),
	blockedDomains: array(string()).optional(),
	userLocation: object({
		type: literal("approximate"),
		city: string().optional(),
		region: string().optional(),
		country: string().optional(),
		timezone: string().optional()
	}).optional()
})));
var webSearch_20250305OutputSchema = lazySchema(() => zodSchema(array(object({
	url: string(),
	title: string(),
	pageAge: string().nullable(),
	encryptedContent: string(),
	type: literal("web_search_result")
}))));
var webSearch_20250305InputSchema = lazySchema(() => zodSchema(object({ query: string() })));
var factory2 = createProviderDefinedToolFactoryWithOutputSchema({
	id: "anthropic.web_search_20250305",
	name: "web_search",
	inputSchema: webSearch_20250305InputSchema,
	outputSchema: webSearch_20250305OutputSchema
});
var webSearch_20250305 = (args = {}) => {
	return factory2(args);
};
var webFetch_20250910ArgsSchema = lazySchema(() => zodSchema(object({
	maxUses: number().optional(),
	allowedDomains: array(string()).optional(),
	blockedDomains: array(string()).optional(),
	citations: object({ enabled: boolean() }).optional(),
	maxContentTokens: number().optional()
})));
var webFetch_20250910OutputSchema = lazySchema(() => zodSchema(object({
	type: literal("web_fetch_result"),
	url: string(),
	content: object({
		type: literal("document"),
		title: string(),
		citations: object({ enabled: boolean() }).optional(),
		source: union([object({
			type: literal("base64"),
			mediaType: literal("application/pdf"),
			data: string()
		}), object({
			type: literal("text"),
			mediaType: literal("text/plain"),
			data: string()
		})])
	}),
	retrievedAt: string().nullable()
})));
var webFetch_20250910InputSchema = lazySchema(() => zodSchema(object({ url: string() })));
var factory3 = createProviderDefinedToolFactoryWithOutputSchema({
	id: "anthropic.web_fetch_20250910",
	name: "web_fetch",
	inputSchema: webFetch_20250910InputSchema,
	outputSchema: webFetch_20250910OutputSchema
});
var webFetch_20250910 = (args = {}) => {
	return factory3(args);
};
async function prepareTools({ tools, toolChoice, disableParallelToolUse, cacheControlValidator }) {
	tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
	const toolWarnings = [];
	const betas = /* @__PURE__ */ new Set();
	const validator = cacheControlValidator || new CacheControlValidator();
	if (tools == null) return {
		tools: void 0,
		toolChoice: void 0,
		toolWarnings,
		betas
	};
	const anthropicTools2 = [];
	for (const tool of tools) switch (tool.type) {
		case "function": {
			const cacheControl = validator.getCacheControl(tool.providerOptions, {
				type: "tool definition",
				canCache: true
			});
			anthropicTools2.push({
				name: tool.name,
				description: tool.description,
				input_schema: tool.inputSchema,
				cache_control: cacheControl
			});
			break;
		}
		case "provider-defined":
			switch (tool.id) {
				case "anthropic.code_execution_20250522":
					betas.add("code-execution-2025-05-22");
					anthropicTools2.push({
						type: "code_execution_20250522",
						name: "code_execution",
						cache_control: void 0
					});
					break;
				case "anthropic.code_execution_20250825":
					betas.add("code-execution-2025-08-25");
					anthropicTools2.push({
						type: "code_execution_20250825",
						name: "code_execution"
					});
					break;
				case "anthropic.computer_20250124":
					betas.add("computer-use-2025-01-24");
					anthropicTools2.push({
						name: "computer",
						type: "computer_20250124",
						display_width_px: tool.args.displayWidthPx,
						display_height_px: tool.args.displayHeightPx,
						display_number: tool.args.displayNumber,
						cache_control: void 0
					});
					break;
				case "anthropic.computer_20241022":
					betas.add("computer-use-2024-10-22");
					anthropicTools2.push({
						name: "computer",
						type: "computer_20241022",
						display_width_px: tool.args.displayWidthPx,
						display_height_px: tool.args.displayHeightPx,
						display_number: tool.args.displayNumber,
						cache_control: void 0
					});
					break;
				case "anthropic.text_editor_20250124":
					betas.add("computer-use-2025-01-24");
					anthropicTools2.push({
						name: "str_replace_editor",
						type: "text_editor_20250124",
						cache_control: void 0
					});
					break;
				case "anthropic.text_editor_20241022":
					betas.add("computer-use-2024-10-22");
					anthropicTools2.push({
						name: "str_replace_editor",
						type: "text_editor_20241022",
						cache_control: void 0
					});
					break;
				case "anthropic.text_editor_20250429":
					betas.add("computer-use-2025-01-24");
					anthropicTools2.push({
						name: "str_replace_based_edit_tool",
						type: "text_editor_20250429",
						cache_control: void 0
					});
					break;
				case "anthropic.text_editor_20250728": {
					const args = await validateTypes({
						value: tool.args,
						schema: textEditor_20250728ArgsSchema
					});
					anthropicTools2.push({
						name: "str_replace_based_edit_tool",
						type: "text_editor_20250728",
						max_characters: args.maxCharacters,
						cache_control: void 0
					});
					break;
				}
				case "anthropic.bash_20250124":
					betas.add("computer-use-2025-01-24");
					anthropicTools2.push({
						name: "bash",
						type: "bash_20250124",
						cache_control: void 0
					});
					break;
				case "anthropic.bash_20241022":
					betas.add("computer-use-2024-10-22");
					anthropicTools2.push({
						name: "bash",
						type: "bash_20241022",
						cache_control: void 0
					});
					break;
				case "anthropic.memory_20250818":
					betas.add("context-management-2025-06-27");
					anthropicTools2.push({
						name: "memory",
						type: "memory_20250818"
					});
					break;
				case "anthropic.web_fetch_20250910": {
					betas.add("web-fetch-2025-09-10");
					const args = await validateTypes({
						value: tool.args,
						schema: webFetch_20250910ArgsSchema
					});
					anthropicTools2.push({
						type: "web_fetch_20250910",
						name: "web_fetch",
						max_uses: args.maxUses,
						allowed_domains: args.allowedDomains,
						blocked_domains: args.blockedDomains,
						citations: args.citations,
						max_content_tokens: args.maxContentTokens,
						cache_control: void 0
					});
					break;
				}
				case "anthropic.web_search_20250305": {
					const args = await validateTypes({
						value: tool.args,
						schema: webSearch_20250305ArgsSchema
					});
					anthropicTools2.push({
						type: "web_search_20250305",
						name: "web_search",
						max_uses: args.maxUses,
						allowed_domains: args.allowedDomains,
						blocked_domains: args.blockedDomains,
						user_location: args.userLocation,
						cache_control: void 0
					});
					break;
				}
				default:
					toolWarnings.push({
						type: "unsupported-tool",
						tool
					});
					break;
			}
			break;
		default:
			toolWarnings.push({
				type: "unsupported-tool",
				tool
			});
			break;
	}
	if (toolChoice == null) return {
		tools: anthropicTools2,
		toolChoice: disableParallelToolUse ? {
			type: "auto",
			disable_parallel_tool_use: disableParallelToolUse
		} : void 0,
		toolWarnings,
		betas
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto": return {
			tools: anthropicTools2,
			toolChoice: {
				type: "auto",
				disable_parallel_tool_use: disableParallelToolUse
			},
			toolWarnings,
			betas
		};
		case "required": return {
			tools: anthropicTools2,
			toolChoice: {
				type: "any",
				disable_parallel_tool_use: disableParallelToolUse
			},
			toolWarnings,
			betas
		};
		case "none": return {
			tools: void 0,
			toolChoice: void 0,
			toolWarnings,
			betas
		};
		case "tool": return {
			tools: anthropicTools2,
			toolChoice: {
				type: "tool",
				name: toolChoice.toolName,
				disable_parallel_tool_use: disableParallelToolUse
			},
			toolWarnings,
			betas
		};
		default: {
			const _exhaustiveCheck = type;
			throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${_exhaustiveCheck}` });
		}
	}
}
var codeExecution_20250522OutputSchema = lazySchema(() => zodSchema(object({
	type: literal("code_execution_result"),
	stdout: string(),
	stderr: string(),
	return_code: number()
})));
var codeExecution_20250522InputSchema = lazySchema(() => zodSchema(object({ code: string() })));
var factory4 = createProviderDefinedToolFactoryWithOutputSchema({
	id: "anthropic.code_execution_20250522",
	name: "code_execution",
	inputSchema: codeExecution_20250522InputSchema,
	outputSchema: codeExecution_20250522OutputSchema
});
var codeExecution_20250522 = (args = {}) => {
	return factory4(args);
};
var codeExecution_20250825OutputSchema = lazySchema(() => zodSchema(discriminatedUnion("type", [
	object({
		type: literal("bash_code_execution_result"),
		content: array(object({
			type: literal("bash_code_execution_output"),
			file_id: string()
		})),
		stdout: string(),
		stderr: string(),
		return_code: number()
	}),
	object({
		type: literal("bash_code_execution_tool_result_error"),
		error_code: string()
	}),
	object({
		type: literal("text_editor_code_execution_tool_result_error"),
		error_code: string()
	}),
	object({
		type: literal("text_editor_code_execution_view_result"),
		content: string(),
		file_type: string(),
		num_lines: number().nullable(),
		start_line: number().nullable(),
		total_lines: number().nullable()
	}),
	object({
		type: literal("text_editor_code_execution_create_result"),
		is_file_update: boolean()
	}),
	object({
		type: literal("text_editor_code_execution_str_replace_result"),
		lines: array(string()).nullable(),
		new_lines: number().nullable(),
		new_start: number().nullable(),
		old_lines: number().nullable(),
		old_start: number().nullable()
	})
])));
var codeExecution_20250825InputSchema = lazySchema(() => zodSchema(discriminatedUnion("type", [object({
	type: literal("bash_code_execution"),
	command: string()
}), discriminatedUnion("command", [
	object({
		type: literal("text_editor_code_execution"),
		command: literal("view"),
		path: string()
	}),
	object({
		type: literal("text_editor_code_execution"),
		command: literal("create"),
		path: string(),
		file_text: string().nullish()
	}),
	object({
		type: literal("text_editor_code_execution"),
		command: literal("str_replace"),
		path: string(),
		old_str: string(),
		new_str: string()
	})
])])));
var factory5 = createProviderDefinedToolFactoryWithOutputSchema({
	id: "anthropic.code_execution_20250825",
	name: "code_execution",
	inputSchema: codeExecution_20250825InputSchema,
	outputSchema: codeExecution_20250825OutputSchema
});
var codeExecution_20250825 = (args = {}) => {
	return factory5(args);
};
function convertToString(data) {
	if (typeof data === "string") return Buffer.from(data, "base64").toString("utf-8");
	if (data instanceof Uint8Array) return new TextDecoder().decode(data);
	if (data instanceof URL) throw new UnsupportedFunctionalityError({ functionality: "URL-based text documents are not supported for citations" });
	throw new UnsupportedFunctionalityError({ functionality: `unsupported data type for text documents: ${typeof data}` });
}
async function convertToAnthropicMessagesPrompt({ prompt, sendReasoning, warnings, cacheControlValidator }) {
	var _a, _b, _c, _d, _e;
	const betas = /* @__PURE__ */ new Set();
	const blocks = groupIntoBlocks(prompt);
	const validator = cacheControlValidator || new CacheControlValidator();
	let system = void 0;
	const messages = [];
	async function shouldEnableCitations(providerMetadata) {
		var _a2, _b2;
		const anthropicOptions = await parseProviderOptions({
			provider: "anthropic",
			providerOptions: providerMetadata,
			schema: anthropicFilePartProviderOptions
		});
		return (_b2 = (_a2 = anthropicOptions == null ? void 0 : anthropicOptions.citations) == null ? void 0 : _a2.enabled) != null ? _b2 : false;
	}
	async function getDocumentMetadata(providerMetadata) {
		const anthropicOptions = await parseProviderOptions({
			provider: "anthropic",
			providerOptions: providerMetadata,
			schema: anthropicFilePartProviderOptions
		});
		return {
			title: anthropicOptions == null ? void 0 : anthropicOptions.title,
			context: anthropicOptions == null ? void 0 : anthropicOptions.context
		};
	}
	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		const isLastBlock = i === blocks.length - 1;
		const type = block.type;
		switch (type) {
			case "system":
				if (system != null) throw new UnsupportedFunctionalityError({ functionality: "Multiple system messages that are separated by user/assistant messages" });
				system = block.messages.map(({ content, providerOptions }) => ({
					type: "text",
					text: content,
					cache_control: validator.getCacheControl(providerOptions, {
						type: "system message",
						canCache: true
					})
				}));
				break;
			case "user": {
				const anthropicContent = [];
				for (const message of block.messages) {
					const { role, content } = message;
					switch (role) {
						case "user":
							for (let j = 0; j < content.length; j++) {
								const part = content[j];
								const isLastPart = j === content.length - 1;
								const cacheControl = (_a = validator.getCacheControl(part.providerOptions, {
									type: "user message part",
									canCache: true
								})) != null ? _a : isLastPart ? validator.getCacheControl(message.providerOptions, {
									type: "user message",
									canCache: true
								}) : void 0;
								switch (part.type) {
									case "text":
										anthropicContent.push({
											type: "text",
											text: part.text,
											cache_control: cacheControl
										});
										break;
									case "file":
										if (part.mediaType.startsWith("image/")) anthropicContent.push({
											type: "image",
											source: part.data instanceof URL ? {
												type: "url",
												url: part.data.toString()
											} : {
												type: "base64",
												media_type: part.mediaType === "image/*" ? "image/jpeg" : part.mediaType,
												data: convertToBase64(part.data)
											},
											cache_control: cacheControl
										});
										else if (part.mediaType === "application/pdf") {
											betas.add("pdfs-2024-09-25");
											const enableCitations = await shouldEnableCitations(part.providerOptions);
											const metadata = await getDocumentMetadata(part.providerOptions);
											anthropicContent.push({
												type: "document",
												source: part.data instanceof URL ? {
													type: "url",
													url: part.data.toString()
												} : {
													type: "base64",
													media_type: "application/pdf",
													data: convertToBase64(part.data)
												},
												title: (_b = metadata.title) != null ? _b : part.filename,
												...metadata.context && { context: metadata.context },
												...enableCitations && { citations: { enabled: true } },
												cache_control: cacheControl
											});
										} else if (part.mediaType === "text/plain") {
											const enableCitations = await shouldEnableCitations(part.providerOptions);
											const metadata = await getDocumentMetadata(part.providerOptions);
											anthropicContent.push({
												type: "document",
												source: part.data instanceof URL ? {
													type: "url",
													url: part.data.toString()
												} : {
													type: "text",
													media_type: "text/plain",
													data: convertToString(part.data)
												},
												title: (_c = metadata.title) != null ? _c : part.filename,
												...metadata.context && { context: metadata.context },
												...enableCitations && { citations: { enabled: true } },
												cache_control: cacheControl
											});
										} else throw new UnsupportedFunctionalityError({ functionality: `media type: ${part.mediaType}` });
										break;
								}
							}
							break;
						case "tool":
							for (let i2 = 0; i2 < content.length; i2++) {
								const part = content[i2];
								const isLastPart = i2 === content.length - 1;
								const cacheControl = (_d = validator.getCacheControl(part.providerOptions, {
									type: "tool result part",
									canCache: true
								})) != null ? _d : isLastPart ? validator.getCacheControl(message.providerOptions, {
									type: "tool result message",
									canCache: true
								}) : void 0;
								const output = part.output;
								let contentValue;
								switch (output.type) {
									case "content":
										contentValue = output.value.map((contentPart) => {
											switch (contentPart.type) {
												case "text": return {
													type: "text",
													text: contentPart.text
												};
												case "media":
													if (contentPart.mediaType.startsWith("image/")) return {
														type: "image",
														source: {
															type: "base64",
															media_type: contentPart.mediaType,
															data: contentPart.data
														}
													};
													if (contentPart.mediaType === "application/pdf") {
														betas.add("pdfs-2024-09-25");
														return {
															type: "document",
															source: {
																type: "base64",
																media_type: contentPart.mediaType,
																data: contentPart.data
															}
														};
													}
													throw new UnsupportedFunctionalityError({ functionality: `media type: ${contentPart.mediaType}` });
											}
										});
										break;
									case "text":
									case "error-text":
										contentValue = output.value;
										break;
									case "json":
									case "error-json":
									default:
										contentValue = JSON.stringify(output.value);
										break;
								}
								anthropicContent.push({
									type: "tool_result",
									tool_use_id: part.toolCallId,
									content: contentValue,
									is_error: output.type === "error-text" || output.type === "error-json" ? true : void 0,
									cache_control: cacheControl
								});
							}
							break;
						default: {
							const _exhaustiveCheck = role;
							throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
						}
					}
				}
				messages.push({
					role: "user",
					content: anthropicContent
				});
				break;
			}
			case "assistant": {
				const anthropicContent = [];
				for (let j = 0; j < block.messages.length; j++) {
					const message = block.messages[j];
					const isLastMessage = j === block.messages.length - 1;
					const { content } = message;
					for (let k = 0; k < content.length; k++) {
						const part = content[k];
						const isLastContentPart = k === content.length - 1;
						const cacheControl = (_e = validator.getCacheControl(part.providerOptions, {
							type: "assistant message part",
							canCache: true
						})) != null ? _e : isLastContentPart ? validator.getCacheControl(message.providerOptions, {
							type: "assistant message",
							canCache: true
						}) : void 0;
						switch (part.type) {
							case "text":
								anthropicContent.push({
									type: "text",
									text: isLastBlock && isLastMessage && isLastContentPart ? part.text.trim() : part.text,
									cache_control: cacheControl
								});
								break;
							case "reasoning":
								if (sendReasoning) {
									const reasoningMetadata = await parseProviderOptions({
										provider: "anthropic",
										providerOptions: part.providerOptions,
										schema: anthropicReasoningMetadataSchema
									});
									if (reasoningMetadata != null) if (reasoningMetadata.signature != null) {
										validator.getCacheControl(part.providerOptions, {
											type: "thinking block",
											canCache: false
										});
										anthropicContent.push({
											type: "thinking",
											thinking: part.text,
											signature: reasoningMetadata.signature
										});
									} else if (reasoningMetadata.redactedData != null) {
										validator.getCacheControl(part.providerOptions, {
											type: "redacted thinking block",
											canCache: false
										});
										anthropicContent.push({
											type: "redacted_thinking",
											data: reasoningMetadata.redactedData
										});
									} else warnings.push({
										type: "other",
										message: "unsupported reasoning metadata"
									});
									else warnings.push({
										type: "other",
										message: "unsupported reasoning metadata"
									});
								} else warnings.push({
									type: "other",
									message: "sending reasoning content is disabled for this model"
								});
								break;
							case "tool-call":
								if (part.providerExecuted) {
									if (part.toolName === "code_execution" && part.input != null && typeof part.input === "object" && "type" in part.input && typeof part.input.type === "string" && (part.input.type === "bash_code_execution" || part.input.type === "text_editor_code_execution")) anthropicContent.push({
										type: "server_tool_use",
										id: part.toolCallId,
										name: part.input.type,
										input: part.input,
										cache_control: cacheControl
									});
									else if (part.toolName === "code_execution" || part.toolName === "web_fetch" || part.toolName === "web_search") anthropicContent.push({
										type: "server_tool_use",
										id: part.toolCallId,
										name: part.toolName,
										input: part.input,
										cache_control: cacheControl
									});
									else warnings.push({
										type: "other",
										message: `provider executed tool call for tool ${part.toolName} is not supported`
									});
									break;
								}
								anthropicContent.push({
									type: "tool_use",
									id: part.toolCallId,
									name: part.toolName,
									input: part.input,
									cache_control: cacheControl
								});
								break;
							case "tool-result":
								if (part.toolName === "code_execution") {
									const output = part.output;
									if (output.type !== "json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									if (output.value == null || typeof output.value !== "object" || !("type" in output.value) || typeof output.value.type !== "string") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output value is not a valid code execution result for tool ${part.toolName}`
										});
										break;
									}
									if (output.value.type === "code_execution_result") {
										const codeExecutionOutput = await validateTypes({
											value: output.value,
											schema: codeExecution_20250522OutputSchema
										});
										anthropicContent.push({
											type: "code_execution_tool_result",
											tool_use_id: part.toolCallId,
											content: {
												type: codeExecutionOutput.type,
												stdout: codeExecutionOutput.stdout,
												stderr: codeExecutionOutput.stderr,
												return_code: codeExecutionOutput.return_code
											},
											cache_control: cacheControl
										});
									} else {
										const codeExecutionOutput = await validateTypes({
											value: output.value,
											schema: codeExecution_20250825OutputSchema
										});
										anthropicContent.push(codeExecutionOutput.type === "bash_code_execution_result" || codeExecutionOutput.type === "bash_code_execution_tool_result_error" ? {
											type: "bash_code_execution_tool_result",
											tool_use_id: part.toolCallId,
											cache_control: cacheControl,
											content: codeExecutionOutput
										} : {
											type: "text_editor_code_execution_tool_result",
											tool_use_id: part.toolCallId,
											cache_control: cacheControl,
											content: codeExecutionOutput
										});
									}
									break;
								}
								if (part.toolName === "web_fetch") {
									const output = part.output;
									if (output.type !== "json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									const webFetchOutput = await validateTypes({
										value: output.value,
										schema: webFetch_20250910OutputSchema
									});
									anthropicContent.push({
										type: "web_fetch_tool_result",
										tool_use_id: part.toolCallId,
										content: {
											type: "web_fetch_result",
											url: webFetchOutput.url,
											retrieved_at: webFetchOutput.retrievedAt,
											content: {
												type: "document",
												title: webFetchOutput.content.title,
												citations: webFetchOutput.content.citations,
												source: {
													type: webFetchOutput.content.source.type,
													media_type: webFetchOutput.content.source.mediaType,
													data: webFetchOutput.content.source.data
												}
											}
										},
										cache_control: cacheControl
									});
									break;
								}
								if (part.toolName === "web_search") {
									const output = part.output;
									if (output.type !== "json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									const webSearchOutput = await validateTypes({
										value: output.value,
										schema: webSearch_20250305OutputSchema
									});
									anthropicContent.push({
										type: "web_search_tool_result",
										tool_use_id: part.toolCallId,
										content: webSearchOutput.map((result) => ({
											url: result.url,
											title: result.title,
											page_age: result.pageAge,
											encrypted_content: result.encryptedContent,
											type: result.type
										})),
										cache_control: cacheControl
									});
									break;
								}
								warnings.push({
									type: "other",
									message: `provider executed tool result for tool ${part.toolName} is not supported`
								});
								break;
						}
					}
				}
				messages.push({
					role: "assistant",
					content: anthropicContent
				});
				break;
			}
			default: {
				const _exhaustiveCheck = type;
				throw new Error(`content type: ${_exhaustiveCheck}`);
			}
		}
	}
	return {
		prompt: {
			system,
			messages
		},
		betas
	};
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
function mapAnthropicStopReason({ finishReason, isJsonResponseFromTool }) {
	switch (finishReason) {
		case "pause_turn":
		case "end_turn":
		case "stop_sequence": return "stop";
		case "refusal": return "content-filter";
		case "tool_use": return isJsonResponseFromTool ? "stop" : "tool-calls";
		case "max_tokens": return "length";
		default: return "unknown";
	}
}
function createCitationSource(citation, citationDocuments, generateId3) {
	var _a;
	if (citation.type !== "page_location" && citation.type !== "char_location") return;
	const documentInfo = citationDocuments[citation.document_index];
	if (!documentInfo) return;
	return {
		type: "source",
		sourceType: "document",
		id: generateId3(),
		mediaType: documentInfo.mediaType,
		title: (_a = citation.document_title) != null ? _a : documentInfo.title,
		filename: documentInfo.filename,
		providerMetadata: { anthropic: citation.type === "page_location" ? {
			citedText: citation.cited_text,
			startPageNumber: citation.start_page_number,
			endPageNumber: citation.end_page_number
		} : {
			citedText: citation.cited_text,
			startCharIndex: citation.start_char_index,
			endCharIndex: citation.end_char_index
		} }
	};
}
var AnthropicMessagesLanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v2";
		var _a;
		this.modelId = modelId;
		this.config = config;
		this.generateId = (_a = config.generateId) != null ? _a : generateId;
	}
	supportsUrl(url) {
		return url.protocol === "https:";
	}
	get provider() {
		return this.config.provider;
	}
	get supportedUrls() {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).supportedUrls) == null ? void 0 : _b.call(_a)) != null ? _c : {};
	}
	async getArgs({ userSuppliedBetas, prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, providerOptions }) {
		var _a, _b, _c, _d, _e;
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
				details: `${temperature} exceeds anthropic maximum of 1.0. clamped to 1.0`
			});
			temperature = 1;
		} else if (temperature != null && temperature < 0) {
			warnings.push({
				type: "unsupported-setting",
				setting: "temperature",
				details: `${temperature} is below anthropic minimum of 0. clamped to 0`
			});
			temperature = 0;
		}
		if ((responseFormat == null ? void 0 : responseFormat.type) === "json") {
			if (responseFormat.schema == null) warnings.push({
				type: "unsupported-setting",
				setting: "responseFormat",
				details: "JSON response format requires a schema. The response format is ignored."
			});
			else if (tools != null) warnings.push({
				type: "unsupported-setting",
				setting: "tools",
				details: "JSON response format does not support tools. The provided tools are ignored."
			});
		}
		const anthropicOptions = await parseProviderOptions({
			provider: "anthropic",
			providerOptions,
			schema: anthropicProviderOptions
		});
		const { maxOutputTokens: maxOutputTokensForModel, supportsStructuredOutput, isKnownModel } = getModelCapabilities(this.modelId);
		const structureOutputMode = (_a = anthropicOptions == null ? void 0 : anthropicOptions.structuredOutputMode) != null ? _a : "jsonTool";
		const useStructuredOutput = structureOutputMode === "outputFormat" || structureOutputMode === "auto" && supportsStructuredOutput;
		const jsonResponseTool = (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && !useStructuredOutput ? {
			type: "function",
			name: "json",
			description: "Respond with a JSON object.",
			inputSchema: responseFormat.schema
		} : void 0;
		const cacheControlValidator = new CacheControlValidator();
		const { prompt: messagesPrompt, betas } = await convertToAnthropicMessagesPrompt({
			prompt,
			sendReasoning: (_b = anthropicOptions == null ? void 0 : anthropicOptions.sendReasoning) != null ? _b : true,
			warnings,
			cacheControlValidator
		});
		const isThinking = ((_c = anthropicOptions == null ? void 0 : anthropicOptions.thinking) == null ? void 0 : _c.type) === "enabled";
		const thinkingBudget = (_d = anthropicOptions == null ? void 0 : anthropicOptions.thinking) == null ? void 0 : _d.budgetTokens;
		const maxTokens = maxOutputTokens != null ? maxOutputTokens : maxOutputTokensForModel;
		const baseArgs = {
			model: this.modelId,
			max_tokens: maxTokens,
			temperature,
			top_k: topK,
			top_p: topP,
			stop_sequences: stopSequences,
			...isThinking && { thinking: {
				type: "enabled",
				budget_tokens: thinkingBudget
			} },
			...(anthropicOptions == null ? void 0 : anthropicOptions.effort) && { output_config: { effort: anthropicOptions.effort } },
			...useStructuredOutput && (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && { output_format: {
				type: "json_schema",
				schema: responseFormat.schema
			} },
			...(anthropicOptions == null ? void 0 : anthropicOptions.container) && { container: {
				id: anthropicOptions.container.id,
				skills: (_e = anthropicOptions.container.skills) == null ? void 0 : _e.map((skill) => ({
					type: skill.type,
					skill_id: skill.skillId,
					version: skill.version
				}))
			} },
			system: messagesPrompt.system,
			messages: messagesPrompt.messages
		};
		if (isThinking) {
			if (thinkingBudget == null) throw new UnsupportedFunctionalityError({ functionality: "thinking requires a budget" });
			if (baseArgs.temperature != null) {
				baseArgs.temperature = void 0;
				warnings.push({
					type: "unsupported-setting",
					setting: "temperature",
					details: "temperature is not supported when thinking is enabled"
				});
			}
			if (topK != null) {
				baseArgs.top_k = void 0;
				warnings.push({
					type: "unsupported-setting",
					setting: "topK",
					details: "topK is not supported when thinking is enabled"
				});
			}
			if (topP != null) {
				baseArgs.top_p = void 0;
				warnings.push({
					type: "unsupported-setting",
					setting: "topP",
					details: "topP is not supported when thinking is enabled"
				});
			}
			baseArgs.max_tokens = maxTokens + thinkingBudget;
		}
		if (isKnownModel && baseArgs.max_tokens > maxOutputTokensForModel) {
			if (maxOutputTokens != null) warnings.push({
				type: "unsupported-setting",
				setting: "maxOutputTokens",
				details: `${baseArgs.max_tokens} (maxOutputTokens + thinkingBudget) is greater than ${this.modelId} ${maxOutputTokensForModel} max output tokens. The max output tokens have been limited to ${maxOutputTokensForModel}.`
			});
			baseArgs.max_tokens = maxOutputTokensForModel;
		}
		if ((anthropicOptions == null ? void 0 : anthropicOptions.container) && anthropicOptions.container.skills && anthropicOptions.container.skills.length > 0) {
			betas.add("code-execution-2025-08-25");
			betas.add("skills-2025-10-02");
			betas.add("files-api-2025-04-14");
			if (!(tools == null ? void 0 : tools.some((tool) => tool.type === "provider-defined" && tool.id === "anthropic.code_execution_20250825"))) warnings.push({
				type: "other",
				message: "code execution tool is required when using skills"
			});
		}
		if (anthropicOptions == null ? void 0 : anthropicOptions.effort) betas.add("effort-2025-11-24");
		if (useStructuredOutput) betas.add("structured-outputs-2025-11-13");
		const { tools: anthropicTools2, toolChoice: anthropicToolChoice, toolWarnings, betas: toolsBetas } = await prepareTools(jsonResponseTool != null ? {
			tools: [jsonResponseTool],
			toolChoice: {
				type: "tool",
				toolName: jsonResponseTool.name
			},
			disableParallelToolUse: true,
			cacheControlValidator
		} : {
			tools: tools != null ? tools : [],
			toolChoice,
			disableParallelToolUse: anthropicOptions == null ? void 0 : anthropicOptions.disableParallelToolUse,
			cacheControlValidator
		});
		const cacheWarnings = cacheControlValidator.getWarnings();
		return {
			args: {
				...baseArgs,
				tools: anthropicTools2,
				tool_choice: anthropicToolChoice
			},
			warnings: [
				...warnings,
				...toolWarnings,
				...cacheWarnings
			],
			betas: /* @__PURE__ */ new Set([
				...betas,
				...toolsBetas,
				...userSuppliedBetas
			]),
			usesJsonResponseTool: jsonResponseTool != null
		};
	}
	async getHeaders({ betas, headers }) {
		return combineHeaders(await resolve(this.config.headers), headers, betas.size > 0 ? { "anthropic-beta": Array.from(betas).join(",") } : {});
	}
	async getBetasFromHeaders(requestHeaders) {
		var _a, _b;
		const configHeaders = await resolve(this.config.headers);
		const configBetaHeader = (_a = configHeaders["anthropic-beta"]) != null ? _a : "";
		const requestBetaHeader = (_b = requestHeaders == null ? void 0 : requestHeaders["anthropic-beta"]) != null ? _b : "";
		return new Set([...configBetaHeader.toLowerCase().split(","), ...requestBetaHeader.toLowerCase().split(",")].map((beta) => beta.trim()).filter((beta) => beta !== ""));
	}
	buildRequestUrl(isStreaming) {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).buildRequestUrl) == null ? void 0 : _b.call(_a, this.config.baseURL, isStreaming)) != null ? _c : `${this.config.baseURL}/messages`;
	}
	transformRequestBody(args) {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).transformRequestBody) == null ? void 0 : _b.call(_a, args)) != null ? _c : args;
	}
	extractCitationDocuments(prompt) {
		const isCitationPart = (part) => {
			var _a, _b;
			if (part.type !== "file") return false;
			if (part.mediaType !== "application/pdf" && part.mediaType !== "text/plain") return false;
			const anthropic2 = (_a = part.providerOptions) == null ? void 0 : _a.anthropic;
			const citationsConfig = anthropic2 == null ? void 0 : anthropic2.citations;
			return (_b = citationsConfig == null ? void 0 : citationsConfig.enabled) != null ? _b : false;
		};
		return prompt.filter((message) => message.role === "user").flatMap((message) => message.content).filter(isCitationPart).map((part) => {
			var _a;
			const filePart = part;
			return {
				title: (_a = filePart.filename) != null ? _a : "Untitled Document",
				filename: filePart.filename,
				mediaType: filePart.mediaType
			};
		});
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h;
		const { args, warnings, betas, usesJsonResponseTool } = await this.getArgs({
			...options,
			userSuppliedBetas: await this.getBetasFromHeaders(options.headers)
		});
		const citationDocuments = this.extractCitationDocuments(options.prompt);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: this.buildRequestUrl(false),
			headers: await this.getHeaders({
				betas,
				headers: options.headers
			}),
			body: this.transformRequestBody(args),
			failedResponseHandler: anthropicFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(anthropicMessagesResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const content = [];
		for (const part of response.content) switch (part.type) {
			case "text":
				if (!usesJsonResponseTool) {
					content.push({
						type: "text",
						text: part.text
					});
					if (part.citations) for (const citation of part.citations) {
						const source = createCitationSource(citation, citationDocuments, this.generateId);
						if (source) content.push(source);
					}
				}
				break;
			case "thinking":
				content.push({
					type: "reasoning",
					text: part.thinking,
					providerMetadata: { anthropic: { signature: part.signature } }
				});
				break;
			case "redacted_thinking":
				content.push({
					type: "reasoning",
					text: "",
					providerMetadata: { anthropic: { redactedData: part.data } }
				});
				break;
			case "tool_use":
				content.push(usesJsonResponseTool ? {
					type: "text",
					text: JSON.stringify(part.input)
				} : {
					type: "tool-call",
					toolCallId: part.id,
					toolName: part.name,
					input: JSON.stringify(part.input)
				});
				break;
			case "server_tool_use":
				if (part.name === "text_editor_code_execution" || part.name === "bash_code_execution") content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: "code_execution",
					input: JSON.stringify({
						type: part.name,
						...part.input
					}),
					providerExecuted: true
				});
				else if (part.name === "web_search" || part.name === "code_execution" || part.name === "web_fetch") content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: part.name,
					input: JSON.stringify(part.input),
					providerExecuted: true
				});
				break;
			case "web_fetch_tool_result":
				if (part.content.type === "web_fetch_result") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: "web_fetch",
					result: {
						type: "web_fetch_result",
						url: part.content.url,
						retrievedAt: part.content.retrieved_at,
						content: {
							type: part.content.content.type,
							title: part.content.content.title,
							citations: part.content.content.citations,
							source: {
								type: part.content.content.source.type,
								mediaType: part.content.content.source.media_type,
								data: part.content.content.source.data
							}
						}
					},
					providerExecuted: true
				});
				else if (part.content.type === "web_fetch_tool_result_error") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: "web_fetch",
					isError: true,
					result: {
						type: "web_fetch_tool_result_error",
						errorCode: part.content.error_code
					},
					providerExecuted: true
				});
				break;
			case "web_search_tool_result":
				if (Array.isArray(part.content)) {
					content.push({
						type: "tool-result",
						toolCallId: part.tool_use_id,
						toolName: "web_search",
						result: part.content.map((result) => {
							var _a2;
							return {
								url: result.url,
								title: result.title,
								pageAge: (_a2 = result.page_age) != null ? _a2 : null,
								encryptedContent: result.encrypted_content,
								type: result.type
							};
						}),
						providerExecuted: true
					});
					for (const result of part.content) content.push({
						type: "source",
						sourceType: "url",
						id: this.generateId(),
						url: result.url,
						title: result.title,
						providerMetadata: { anthropic: { pageAge: (_a = result.page_age) != null ? _a : null } }
					});
				} else content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: "web_search",
					isError: true,
					result: {
						type: "web_search_tool_result_error",
						errorCode: part.content.error_code
					},
					providerExecuted: true
				});
				break;
			case "code_execution_tool_result":
				if (part.content.type === "code_execution_result") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: "code_execution",
					result: {
						type: part.content.type,
						stdout: part.content.stdout,
						stderr: part.content.stderr,
						return_code: part.content.return_code
					},
					providerExecuted: true
				});
				else if (part.content.type === "code_execution_tool_result_error") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: "code_execution",
					isError: true,
					result: {
						type: "code_execution_tool_result_error",
						errorCode: part.content.error_code
					},
					providerExecuted: true
				});
				break;
			case "bash_code_execution_tool_result":
			case "text_editor_code_execution_tool_result":
				content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: "code_execution",
					result: part.content,
					providerExecuted: true
				});
				break;
		}
		return {
			content,
			finishReason: mapAnthropicStopReason({
				finishReason: response.stop_reason,
				isJsonResponseFromTool: usesJsonResponseTool
			}),
			usage: {
				inputTokens: response.usage.input_tokens,
				outputTokens: response.usage.output_tokens,
				totalTokens: response.usage.input_tokens + response.usage.output_tokens,
				cachedInputTokens: (_b = response.usage.cache_read_input_tokens) != null ? _b : void 0
			},
			request: { body: args },
			response: {
				id: (_c = response.id) != null ? _c : void 0,
				modelId: (_d = response.model) != null ? _d : void 0,
				headers: responseHeaders,
				body: rawResponse
			},
			warnings,
			providerMetadata: { anthropic: {
				usage: response.usage,
				cacheCreationInputTokens: (_e = response.usage.cache_creation_input_tokens) != null ? _e : null,
				stopSequence: (_f = response.stop_sequence) != null ? _f : null,
				container: response.container ? {
					expiresAt: response.container.expires_at,
					id: response.container.id,
					skills: (_h = (_g = response.container.skills) == null ? void 0 : _g.map((skill) => ({
						type: skill.type,
						skillId: skill.skill_id,
						version: skill.version
					}))) != null ? _h : null
				} : null
			} }
		};
	}
	async doStream(options) {
		const { args, warnings, betas, usesJsonResponseTool } = await this.getArgs({
			...options,
			userSuppliedBetas: await this.getBetasFromHeaders(options.headers)
		});
		const citationDocuments = this.extractCitationDocuments(options.prompt);
		const body = {
			...args,
			stream: true
		};
		const { responseHeaders, value: response } = await postJsonToApi({
			url: this.buildRequestUrl(true),
			headers: await this.getHeaders({
				betas,
				headers: options.headers
			}),
			body: this.transformRequestBody(body),
			failedResponseHandler: anthropicFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(anthropicMessagesChunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = "unknown";
		const usage = {
			inputTokens: void 0,
			outputTokens: void 0,
			totalTokens: void 0
		};
		const contentBlocks = {};
		let rawUsage = void 0;
		let cacheCreationInputTokens = null;
		let stopSequence = null;
		let container = null;
		let blockType = void 0;
		const generateId3 = this.generateId;
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					const value = chunk.value;
					switch (value.type) {
						case "ping": return;
						case "content_block_start": {
							const contentBlockType = value.content_block.type;
							blockType = contentBlockType;
							switch (contentBlockType) {
								case "text":
									contentBlocks[value.index] = { type: "text" };
									controller.enqueue({
										type: "text-start",
										id: String(value.index)
									});
									return;
								case "thinking":
									contentBlocks[value.index] = { type: "reasoning" };
									controller.enqueue({
										type: "reasoning-start",
										id: String(value.index)
									});
									return;
								case "redacted_thinking":
									contentBlocks[value.index] = { type: "reasoning" };
									controller.enqueue({
										type: "reasoning-start",
										id: String(value.index),
										providerMetadata: { anthropic: { redactedData: value.content_block.data } }
									});
									return;
								case "tool_use":
									contentBlocks[value.index] = usesJsonResponseTool ? { type: "text" } : {
										type: "tool-call",
										toolCallId: value.content_block.id,
										toolName: value.content_block.name,
										input: "",
										firstDelta: true
									};
									controller.enqueue(usesJsonResponseTool ? {
										type: "text-start",
										id: String(value.index)
									} : {
										type: "tool-input-start",
										id: value.content_block.id,
										toolName: value.content_block.name
									});
									return;
								case "server_tool_use":
									if ([
										"web_fetch",
										"web_search",
										"code_execution",
										"text_editor_code_execution",
										"bash_code_execution"
									].includes(value.content_block.name)) {
										contentBlocks[value.index] = {
											type: "tool-call",
											toolCallId: value.content_block.id,
											toolName: value.content_block.name,
											input: "",
											providerExecuted: true,
											firstDelta: true
										};
										const mappedToolName = value.content_block.name === "text_editor_code_execution" || value.content_block.name === "bash_code_execution" ? "code_execution" : value.content_block.name;
										controller.enqueue({
											type: "tool-input-start",
											id: value.content_block.id,
											toolName: mappedToolName,
											providerExecuted: true
										});
									}
									return;
								case "web_fetch_tool_result": {
									const part = value.content_block;
									if (part.content.type === "web_fetch_result") controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: "web_fetch",
										result: {
											type: "web_fetch_result",
											url: part.content.url,
											retrievedAt: part.content.retrieved_at,
											content: {
												type: part.content.content.type,
												title: part.content.content.title,
												citations: part.content.content.citations,
												source: {
													type: part.content.content.source.type,
													mediaType: part.content.content.source.media_type,
													data: part.content.content.source.data
												}
											}
										},
										providerExecuted: true
									});
									else if (part.content.type === "web_fetch_tool_result_error") controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: "web_fetch",
										isError: true,
										result: {
											type: "web_fetch_tool_result_error",
											errorCode: part.content.error_code
										},
										providerExecuted: true
									});
									return;
								}
								case "web_search_tool_result": {
									const part = value.content_block;
									if (Array.isArray(part.content)) {
										controller.enqueue({
											type: "tool-result",
											toolCallId: part.tool_use_id,
											toolName: "web_search",
											result: part.content.map((result) => {
												var _a2;
												return {
													url: result.url,
													title: result.title,
													pageAge: (_a2 = result.page_age) != null ? _a2 : null,
													encryptedContent: result.encrypted_content,
													type: result.type
												};
											}),
											providerExecuted: true
										});
										for (const result of part.content) controller.enqueue({
											type: "source",
											sourceType: "url",
											id: generateId3(),
											url: result.url,
											title: result.title,
											providerMetadata: { anthropic: { pageAge: (_a = result.page_age) != null ? _a : null } }
										});
									} else controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: "web_search",
										isError: true,
										result: {
											type: "web_search_tool_result_error",
											errorCode: part.content.error_code
										},
										providerExecuted: true
									});
									return;
								}
								case "code_execution_tool_result": {
									const part = value.content_block;
									if (part.content.type === "code_execution_result") controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: "code_execution",
										result: {
											type: part.content.type,
											stdout: part.content.stdout,
											stderr: part.content.stderr,
											return_code: part.content.return_code
										},
										providerExecuted: true
									});
									else if (part.content.type === "code_execution_tool_result_error") controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: "code_execution",
										isError: true,
										result: {
											type: "code_execution_tool_result_error",
											errorCode: part.content.error_code
										},
										providerExecuted: true
									});
									return;
								}
								case "bash_code_execution_tool_result":
								case "text_editor_code_execution_tool_result": {
									const part = value.content_block;
									controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: "code_execution",
										result: part.content,
										providerExecuted: true
									});
									return;
								}
								default: {
									const _exhaustiveCheck = contentBlockType;
									throw new Error(`Unsupported content block type: ${_exhaustiveCheck}`);
								}
							}
						}
						case "content_block_stop":
							if (contentBlocks[value.index] != null) {
								const contentBlock = contentBlocks[value.index];
								switch (contentBlock.type) {
									case "text":
										controller.enqueue({
											type: "text-end",
											id: String(value.index)
										});
										break;
									case "reasoning":
										controller.enqueue({
											type: "reasoning-end",
											id: String(value.index)
										});
										break;
									case "tool-call":
										if (!usesJsonResponseTool) {
											controller.enqueue({
												type: "tool-input-end",
												id: contentBlock.toolCallId
											});
											const toolName = contentBlock.toolName === "text_editor_code_execution" || contentBlock.toolName === "bash_code_execution" ? "code_execution" : contentBlock.toolName;
											controller.enqueue({
												type: "tool-call",
												toolCallId: contentBlock.toolCallId,
												toolName,
												input: contentBlock.input,
												providerExecuted: contentBlock.providerExecuted
											});
										}
										break;
								}
								delete contentBlocks[value.index];
							}
							blockType = void 0;
							return;
						case "content_block_delta": {
							const deltaType = value.delta.type;
							switch (deltaType) {
								case "text_delta":
									if (usesJsonResponseTool) return;
									controller.enqueue({
										type: "text-delta",
										id: String(value.index),
										delta: value.delta.text
									});
									return;
								case "thinking_delta":
									controller.enqueue({
										type: "reasoning-delta",
										id: String(value.index),
										delta: value.delta.thinking
									});
									return;
								case "signature_delta":
									if (blockType === "thinking") controller.enqueue({
										type: "reasoning-delta",
										id: String(value.index),
										delta: "",
										providerMetadata: { anthropic: { signature: value.delta.signature } }
									});
									return;
								case "input_json_delta": {
									const contentBlock = contentBlocks[value.index];
									let delta = value.delta.partial_json;
									if (delta.length === 0) return;
									if (usesJsonResponseTool) {
										if ((contentBlock == null ? void 0 : contentBlock.type) !== "text") return;
										controller.enqueue({
											type: "text-delta",
											id: String(value.index),
											delta
										});
									} else {
										if ((contentBlock == null ? void 0 : contentBlock.type) !== "tool-call") return;
										if (contentBlock.firstDelta && (contentBlock.toolName === "bash_code_execution" || contentBlock.toolName === "text_editor_code_execution")) delta = `{"type": "${contentBlock.toolName}",${delta.substring(1)}`;
										controller.enqueue({
											type: "tool-input-delta",
											id: contentBlock.toolCallId,
											delta
										});
										contentBlock.input += delta;
										contentBlock.firstDelta = false;
									}
									return;
								}
								case "citations_delta": {
									const citation = value.delta.citation;
									const source = createCitationSource(citation, citationDocuments, generateId3);
									if (source) controller.enqueue(source);
									return;
								}
								default: {
									const _exhaustiveCheck = deltaType;
									throw new Error(`Unsupported delta type: ${_exhaustiveCheck}`);
								}
							}
						}
						case "message_start":
							usage.inputTokens = value.message.usage.input_tokens;
							usage.cachedInputTokens = (_b = value.message.usage.cache_read_input_tokens) != null ? _b : void 0;
							rawUsage = { ...value.message.usage };
							cacheCreationInputTokens = (_c = value.message.usage.cache_creation_input_tokens) != null ? _c : null;
							controller.enqueue({
								type: "response-metadata",
								id: (_d = value.message.id) != null ? _d : void 0,
								modelId: (_e = value.message.model) != null ? _e : void 0
							});
							return;
						case "message_delta":
							usage.outputTokens = value.usage.output_tokens;
							usage.totalTokens = ((_f = usage.inputTokens) != null ? _f : 0) + ((_g = value.usage.output_tokens) != null ? _g : 0);
							finishReason = mapAnthropicStopReason({
								finishReason: value.delta.stop_reason,
								isJsonResponseFromTool: usesJsonResponseTool
							});
							stopSequence = (_h = value.delta.stop_sequence) != null ? _h : null;
							container = value.delta.container != null ? {
								expiresAt: value.delta.container.expires_at,
								id: value.delta.container.id,
								skills: (_j = (_i = value.delta.container.skills) == null ? void 0 : _i.map((skill) => ({
									type: skill.type,
									skillId: skill.skill_id,
									version: skill.version
								}))) != null ? _j : null
							} : null;
							rawUsage = {
								...rawUsage,
								...value.usage
							};
							return;
						case "message_stop":
							controller.enqueue({
								type: "finish",
								finishReason,
								usage,
								providerMetadata: { anthropic: {
									usage: rawUsage != null ? rawUsage : null,
									cacheCreationInputTokens,
									stopSequence,
									container
								} }
							});
							return;
						case "error":
							controller.enqueue({
								type: "error",
								error: value.error
							});
							return;
						default: {
							const _exhaustiveCheck = value;
							throw new Error(`Unsupported chunk type: ${_exhaustiveCheck}`);
						}
					}
				}
			})),
			request: { body },
			response: { headers: responseHeaders }
		};
	}
};
function getModelCapabilities(modelId) {
	if (modelId.includes("claude-sonnet-4-5") || modelId.includes("claude-opus-4-5")) return {
		maxOutputTokens: 64e3,
		supportsStructuredOutput: true,
		isKnownModel: true
	};
	else if (modelId.includes("claude-opus-4-1")) return {
		maxOutputTokens: 32e3,
		supportsStructuredOutput: true,
		isKnownModel: true
	};
	else if (modelId.includes("claude-sonnet-4-") || modelId.includes("claude-3-7-sonnet") || modelId.includes("claude-haiku-4-5")) return {
		maxOutputTokens: 64e3,
		supportsStructuredOutput: false,
		isKnownModel: true
	};
	else if (modelId.includes("claude-opus-4-")) return {
		maxOutputTokens: 32e3,
		supportsStructuredOutput: false,
		isKnownModel: true
	};
	else if (modelId.includes("claude-3-5-haiku")) return {
		maxOutputTokens: 8192,
		supportsStructuredOutput: false,
		isKnownModel: true
	};
	else if (modelId.includes("claude-3-haiku")) return {
		maxOutputTokens: 4096,
		supportsStructuredOutput: false,
		isKnownModel: true
	};
	else return {
		maxOutputTokens: 4096,
		supportsStructuredOutput: false,
		isKnownModel: false
	};
}
var bash_20241022InputSchema = lazySchema(() => zodSchema(object({
	command: string(),
	restart: boolean().optional()
})));
var bash_20241022 = createProviderDefinedToolFactory({
	id: "anthropic.bash_20241022",
	name: "bash",
	inputSchema: bash_20241022InputSchema
});
var bash_20250124InputSchema = lazySchema(() => zodSchema(object({
	command: string(),
	restart: boolean().optional()
})));
var bash_20250124 = createProviderDefinedToolFactory({
	id: "anthropic.bash_20250124",
	name: "bash",
	inputSchema: bash_20250124InputSchema
});
var computer_20241022InputSchema = lazySchema(() => zodSchema(object({
	action: _enum([
		"key",
		"type",
		"mouse_move",
		"left_click",
		"left_click_drag",
		"right_click",
		"middle_click",
		"double_click",
		"screenshot",
		"cursor_position"
	]),
	coordinate: array(number().int()).optional(),
	text: string().optional()
})));
var computer_20241022 = createProviderDefinedToolFactory({
	id: "anthropic.computer_20241022",
	name: "computer",
	inputSchema: computer_20241022InputSchema
});
var computer_20250124InputSchema = lazySchema(() => zodSchema(object({
	action: _enum([
		"key",
		"hold_key",
		"type",
		"cursor_position",
		"mouse_move",
		"left_mouse_down",
		"left_mouse_up",
		"left_click",
		"left_click_drag",
		"right_click",
		"middle_click",
		"double_click",
		"triple_click",
		"scroll",
		"wait",
		"screenshot"
	]),
	coordinate: tuple([number().int(), number().int()]).optional(),
	duration: number().optional(),
	scroll_amount: number().optional(),
	scroll_direction: _enum([
		"up",
		"down",
		"left",
		"right"
	]).optional(),
	start_coordinate: tuple([number().int(), number().int()]).optional(),
	text: string().optional()
})));
var computer_20250124 = createProviderDefinedToolFactory({
	id: "anthropic.computer_20250124",
	name: "computer",
	inputSchema: computer_20250124InputSchema
});
var memory_20250818InputSchema = lazySchema(() => zodSchema(discriminatedUnion("command", [
	object({
		command: literal("view"),
		path: string(),
		view_range: tuple([number(), number()]).optional()
	}),
	object({
		command: literal("create"),
		path: string(),
		file_text: string()
	}),
	object({
		command: literal("str_replace"),
		path: string(),
		old_str: string(),
		new_str: string()
	}),
	object({
		command: literal("insert"),
		path: string(),
		insert_line: number(),
		insert_text: string()
	}),
	object({
		command: literal("delete"),
		path: string()
	}),
	object({
		command: literal("rename"),
		old_path: string(),
		new_path: string()
	})
])));
var memory_20250818 = createProviderDefinedToolFactory({
	id: "anthropic.memory_20250818",
	name: "memory",
	inputSchema: memory_20250818InputSchema
});
var textEditor_20241022InputSchema = lazySchema(() => zodSchema(object({
	command: _enum([
		"view",
		"create",
		"str_replace",
		"insert",
		"undo_edit"
	]),
	path: string(),
	file_text: string().optional(),
	insert_line: number().int().optional(),
	new_str: string().optional(),
	old_str: string().optional(),
	view_range: array(number().int()).optional()
})));
var textEditor_20241022 = createProviderDefinedToolFactory({
	id: "anthropic.text_editor_20241022",
	name: "str_replace_editor",
	inputSchema: textEditor_20241022InputSchema
});
var textEditor_20250124InputSchema = lazySchema(() => zodSchema(object({
	command: _enum([
		"view",
		"create",
		"str_replace",
		"insert",
		"undo_edit"
	]),
	path: string(),
	file_text: string().optional(),
	insert_line: number().int().optional(),
	new_str: string().optional(),
	old_str: string().optional(),
	view_range: array(number().int()).optional()
})));
var textEditor_20250124 = createProviderDefinedToolFactory({
	id: "anthropic.text_editor_20250124",
	name: "str_replace_editor",
	inputSchema: textEditor_20250124InputSchema
});
var textEditor_20250429InputSchema = lazySchema(() => zodSchema(object({
	command: _enum([
		"view",
		"create",
		"str_replace",
		"insert"
	]),
	path: string(),
	file_text: string().optional(),
	insert_line: number().int().optional(),
	new_str: string().optional(),
	old_str: string().optional(),
	view_range: array(number().int()).optional()
})));
var textEditor_20250429 = createProviderDefinedToolFactory({
	id: "anthropic.text_editor_20250429",
	name: "str_replace_based_edit_tool",
	inputSchema: textEditor_20250429InputSchema
});
var anthropicTools = {
	bash_20241022,
	bash_20250124,
	codeExecution_20250522,
	codeExecution_20250825,
	computer_20241022,
	computer_20250124,
	memory_20250818,
	textEditor_20241022,
	textEditor_20250124,
	textEditor_20250429,
	textEditor_20250728,
	webFetch_20250910,
	webSearch_20250305
};
function createAnthropic(options = {}) {
	var _a, _b;
	const baseURL = (_a = withoutTrailingSlash(loadOptionalSetting({
		settingValue: options.baseURL,
		environmentVariableName: "ANTHROPIC_BASE_URL"
	}))) != null ? _a : "https://api.anthropic.com/v1";
	const providerName = (_b = options.name) != null ? _b : "anthropic.messages";
	const getHeaders = () => withUserAgentSuffix({
		"anthropic-version": "2023-06-01",
		"x-api-key": loadApiKey({
			apiKey: options.apiKey,
			environmentVariableName: "ANTHROPIC_API_KEY",
			description: "Anthropic"
		}),
		...options.headers
	}, `ai-sdk/anthropic/${VERSION}`);
	const createChatModel = (modelId) => {
		var _a2;
		return new AnthropicMessagesLanguageModel(modelId, {
			provider: providerName,
			baseURL,
			headers: getHeaders,
			fetch: options.fetch,
			generateId: (_a2 = options.generateId) != null ? _a2 : generateId,
			supportedUrls: () => ({ "image/*": [/^https?:\/\/.*$/] })
		});
	};
	const provider = function(modelId) {
		if (new.target) throw new Error("The Anthropic model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	provider.languageModel = createChatModel;
	provider.chat = createChatModel;
	provider.messages = createChatModel;
	provider.textEmbeddingModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "textEmbeddingModel"
		});
	};
	provider.imageModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "imageModel"
		});
	};
	provider.tools = anthropicTools;
	return provider;
}
var anthropic = createAnthropic();
export { VERSION as b, anthropic as c, createAnthropic as d };
