import { A as unknown, D as string, O as tuple, S as object, T as record, d as array, f as boolean, k as union, m as discriminatedUnion, o as _enum, v as literal, x as number, y as looseObject } from "./types-BaLzBUv4.js";
import { A as isNonNullable, F as loadApiKey, G as resolve, I as loadOptionalSetting, P as lazySchema, Q as zodSchema, U as postJsonToApi, V as parseProviderOptions, X as withUserAgentSuffix, Y as validateTypes, Z as withoutTrailingSlash, _ as createProviderToolFactoryWithOutputSchema, a as combineHeaders, c as convertToBase64, ct as NoSuchModelError, dt as UnsupportedFunctionalityError, f as createEventSourceResponseHandler, g as createProviderToolFactory, h as createJsonResponseHandler, m as createJsonErrorResponseHandler, rt as InvalidArgumentError, tt as APICallError, w as generateId, y as createToolNameMapping } from "./dist-CVWZ5WHT.js";
var VERSION = "3.0.48";
var anthropicFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: lazySchema(() => zodSchema(object({
		type: literal("error"),
		error: object({
			type: string(),
			message: string()
		})
	}))),
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
			type: literal("compaction"),
			content: string()
		}),
		object({
			type: literal("tool_use"),
			id: string(),
			name: string(),
			input: unknown(),
			caller: union([
				object({
					type: literal("code_execution_20250825"),
					tool_id: string()
				}),
				object({
					type: literal("code_execution_20260120"),
					tool_id: string()
				}),
				object({ type: literal("direct") })
			]).optional()
		}),
		object({
			type: literal("server_tool_use"),
			id: string(),
			name: string(),
			input: record(string(), unknown()).nullish()
		}),
		object({
			type: literal("mcp_tool_use"),
			id: string(),
			name: string(),
			input: unknown(),
			server_name: string()
		}),
		object({
			type: literal("mcp_tool_result"),
			tool_use_id: string(),
			is_error: boolean(),
			content: array(union([string(), object({
				type: literal("text"),
				text: string()
			})]))
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
					source: union([object({
						type: literal("base64"),
						media_type: literal("application/pdf"),
						data: string()
					}), object({
						type: literal("text"),
						media_type: literal("text/plain"),
						data: string()
					})])
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
				return_code: number(),
				content: array(object({
					type: literal("code_execution_output"),
					file_id: string()
				})).optional().default([])
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
		}),
		object({
			type: literal("tool_search_tool_result"),
			tool_use_id: string(),
			content: union([object({
				type: literal("tool_search_tool_search_result"),
				tool_references: array(object({
					type: literal("tool_reference"),
					tool_name: string()
				}))
			}), object({
				type: literal("tool_search_tool_result_error"),
				error_code: string()
			})])
		})
	])),
	stop_reason: string().nullish(),
	stop_sequence: string().nullish(),
	usage: looseObject({
		input_tokens: number(),
		output_tokens: number(),
		cache_creation_input_tokens: number().nullish(),
		cache_read_input_tokens: number().nullish(),
		iterations: array(object({
			type: union([literal("compaction"), literal("message")]),
			input_tokens: number(),
			output_tokens: number()
		})).nullish()
	}),
	container: object({
		expires_at: string(),
		id: string(),
		skills: array(object({
			type: union([literal("anthropic"), literal("custom")]),
			skill_id: string(),
			version: string()
		})).nullish()
	}).nullish(),
	context_management: object({ applied_edits: array(union([
		object({
			type: literal("clear_tool_uses_20250919"),
			cleared_tool_uses: number(),
			cleared_input_tokens: number()
		}),
		object({
			type: literal("clear_thinking_20251015"),
			cleared_thinking_turns: number(),
			cleared_input_tokens: number()
		}),
		object({ type: literal("compact_20260112") })
	])) }).nullish()
})));
var anthropicMessagesChunkSchema = lazySchema(() => zodSchema(discriminatedUnion("type", [
	object({
		type: literal("message_start"),
		message: object({
			id: string().nullish(),
			model: string().nullish(),
			role: string().nullish(),
			usage: looseObject({
				input_tokens: number(),
				cache_creation_input_tokens: number().nullish(),
				cache_read_input_tokens: number().nullish()
			}),
			content: array(discriminatedUnion("type", [object({
				type: literal("tool_use"),
				id: string(),
				name: string(),
				input: unknown(),
				caller: union([
					object({
						type: literal("code_execution_20250825"),
						tool_id: string()
					}),
					object({
						type: literal("code_execution_20260120"),
						tool_id: string()
					}),
					object({ type: literal("direct") })
				]).optional()
			})])).nullish(),
			stop_reason: string().nullish(),
			container: object({
				expires_at: string(),
				id: string()
			}).nullish()
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
				name: string(),
				input: record(string(), unknown()).optional(),
				caller: union([
					object({
						type: literal("code_execution_20250825"),
						tool_id: string()
					}),
					object({
						type: literal("code_execution_20260120"),
						tool_id: string()
					}),
					object({ type: literal("direct") })
				]).optional()
			}),
			object({
				type: literal("redacted_thinking"),
				data: string()
			}),
			object({
				type: literal("compaction"),
				content: string().nullish()
			}),
			object({
				type: literal("server_tool_use"),
				id: string(),
				name: string(),
				input: record(string(), unknown()).nullish()
			}),
			object({
				type: literal("mcp_tool_use"),
				id: string(),
				name: string(),
				input: unknown(),
				server_name: string()
			}),
			object({
				type: literal("mcp_tool_result"),
				tool_use_id: string(),
				is_error: boolean(),
				content: array(union([string(), object({
					type: literal("text"),
					text: string()
				})]))
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
						source: union([object({
							type: literal("base64"),
							media_type: literal("application/pdf"),
							data: string()
						}), object({
							type: literal("text"),
							media_type: literal("text/plain"),
							data: string()
						})])
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
					return_code: number(),
					content: array(object({
						type: literal("code_execution_output"),
						file_id: string()
					})).optional().default([])
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
			}),
			object({
				type: literal("tool_search_tool_result"),
				tool_use_id: string(),
				content: union([object({
					type: literal("tool_search_tool_search_result"),
					tool_references: array(object({
						type: literal("tool_reference"),
						tool_name: string()
					}))
				}), object({
					type: literal("tool_search_tool_result_error"),
					error_code: string()
				})])
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
				type: literal("compaction_delta"),
				content: string().nullish()
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
			input_tokens: number().nullish(),
			output_tokens: number(),
			cache_creation_input_tokens: number().nullish(),
			cache_read_input_tokens: number().nullish(),
			iterations: array(object({
				type: union([literal("compaction"), literal("message")]),
				input_tokens: number(),
				output_tokens: number()
			})).nullish()
		}),
		context_management: object({ applied_edits: array(union([
			object({
				type: literal("clear_tool_uses_20250919"),
				cleared_tool_uses: number(),
				cleared_input_tokens: number()
			}),
			object({
				type: literal("clear_thinking_20251015"),
				cleared_thinking_turns: number(),
				cleared_input_tokens: number()
			}),
			object({ type: literal("compact_20260112") })
		])) }).nullish()
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
var anthropicLanguageModelOptions = object({
	sendReasoning: boolean().optional(),
	structuredOutputMode: _enum([
		"outputFormat",
		"jsonTool",
		"auto"
	]).optional(),
	thinking: discriminatedUnion("type", [
		object({ type: literal("adaptive") }),
		object({
			type: literal("enabled"),
			budgetTokens: number().optional()
		}),
		object({ type: literal("disabled") })
	]).optional(),
	disableParallelToolUse: boolean().optional(),
	cacheControl: object({
		type: literal("ephemeral"),
		ttl: union([literal("5m"), literal("1h")]).optional()
	}).optional(),
	mcpServers: array(object({
		type: literal("url"),
		name: string(),
		url: string(),
		authorizationToken: string().nullish(),
		toolConfiguration: object({
			enabled: boolean().nullish(),
			allowedTools: array(string()).nullish()
		}).nullish()
	})).optional(),
	container: object({
		id: string().optional(),
		skills: array(object({
			type: union([literal("anthropic"), literal("custom")]),
			skillId: string(),
			version: string().optional()
		})).optional()
	}).optional(),
	toolStreaming: boolean().optional(),
	effort: _enum([
		"low",
		"medium",
		"high",
		"max"
	]).optional(),
	speed: _enum(["fast", "standard"]).optional(),
	contextManagement: object({ edits: array(discriminatedUnion("type", [
		object({
			type: literal("clear_tool_uses_20250919"),
			trigger: discriminatedUnion("type", [object({
				type: literal("input_tokens"),
				value: number()
			}), object({
				type: literal("tool_uses"),
				value: number()
			})]).optional(),
			keep: object({
				type: literal("tool_uses"),
				value: number()
			}).optional(),
			clearAtLeast: object({
				type: literal("input_tokens"),
				value: number()
			}).optional(),
			clearToolInputs: boolean().optional(),
			excludeTools: array(string()).optional()
		}),
		object({
			type: literal("clear_thinking_20251015"),
			keep: union([literal("all"), object({
				type: literal("thinking_turns"),
				value: number()
			})]).optional()
		}),
		object({
			type: literal("compact_20260112"),
			trigger: object({
				type: literal("input_tokens"),
				value: number()
			}).optional(),
			pauseAfterCompaction: boolean().optional(),
			instructions: string().optional()
		})
	])) }).optional()
});
var MAX_CACHE_BREAKPOINTS = 4;
function getCacheControl(providerMetadata) {
	var _a;
	const anthropic2 = providerMetadata == null ? void 0 : providerMetadata.anthropic;
	return (_a = anthropic2 == null ? void 0 : anthropic2.cacheControl) != null ? _a : anthropic2 == null ? void 0 : anthropic2.cache_control;
}
var CacheControlValidator = class {
	constructor() {
		this.breakpointCount = 0;
		this.warnings = [];
	}
	getCacheControl(providerMetadata, context) {
		const cacheControlValue = getCacheControl(providerMetadata);
		if (!cacheControlValue) return;
		if (!context.canCache) {
			this.warnings.push({
				type: "unsupported",
				feature: "cache_control on non-cacheable context",
				details: `cache_control cannot be set on ${context.type}. It will be ignored.`
			});
			return;
		}
		this.breakpointCount++;
		if (this.breakpointCount > MAX_CACHE_BREAKPOINTS) {
			this.warnings.push({
				type: "unsupported",
				feature: "cacheControl breakpoint limit",
				details: `Maximum ${MAX_CACHE_BREAKPOINTS} cache breakpoints exceeded (found ${this.breakpointCount}). This breakpoint will be ignored.`
			});
			return;
		}
		return cacheControlValue;
	}
	getWarnings() {
		return this.warnings;
	}
};
var textEditor_20250728ArgsSchema = lazySchema(() => zodSchema(object({ maxCharacters: number().optional() })));
var factory = createProviderToolFactory({
	id: "anthropic.text_editor_20250728",
	inputSchema: lazySchema(() => zodSchema(object({
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
		insert_text: string().optional(),
		old_str: string().optional(),
		view_range: array(number().int()).optional()
	})))
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
	title: string().nullable(),
	pageAge: string().nullable(),
	encryptedContent: string(),
	type: literal("web_search_result")
}))));
var factory2 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.web_search_20250305",
	inputSchema: lazySchema(() => zodSchema(object({ query: string() }))),
	outputSchema: webSearch_20250305OutputSchema,
	supportsDeferredResults: true
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
		title: string().nullable(),
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
var factory3 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.web_fetch_20250910",
	inputSchema: lazySchema(() => zodSchema(object({ url: string() }))),
	outputSchema: webFetch_20250910OutputSchema,
	supportsDeferredResults: true
});
var webFetch_20250910 = (args = {}) => {
	return factory3(args);
};
async function prepareTools({ tools, toolChoice, disableParallelToolUse, cacheControlValidator, supportsStructuredOutput }) {
	var _a;
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
			const anthropicOptions = (_a = tool.providerOptions) == null ? void 0 : _a.anthropic;
			const deferLoading = anthropicOptions == null ? void 0 : anthropicOptions.deferLoading;
			const allowedCallers = anthropicOptions == null ? void 0 : anthropicOptions.allowedCallers;
			anthropicTools2.push({
				name: tool.name,
				description: tool.description,
				input_schema: tool.inputSchema,
				cache_control: cacheControl,
				...supportsStructuredOutput === true && tool.strict != null ? { strict: tool.strict } : {},
				...deferLoading != null ? { defer_loading: deferLoading } : {},
				...allowedCallers != null ? { allowed_callers: allowedCallers } : {},
				...tool.inputExamples != null ? { input_examples: tool.inputExamples.map((example) => example.input) } : {}
			});
			if (supportsStructuredOutput === true) betas.add("structured-outputs-2025-11-13");
			if (tool.inputExamples != null || allowedCallers != null) betas.add("advanced-tool-use-2025-11-20");
			break;
		}
		case "provider":
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
				case "anthropic.code_execution_20260120":
					anthropicTools2.push({
						type: "code_execution_20260120",
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
				case "anthropic.computer_20251124":
					betas.add("computer-use-2025-11-24");
					anthropicTools2.push({
						name: "computer",
						type: "computer_20251124",
						display_width_px: tool.args.displayWidthPx,
						display_height_px: tool.args.displayHeightPx,
						display_number: tool.args.displayNumber,
						enable_zoom: tool.args.enableZoom,
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
				case "anthropic.tool_search_regex_20251119":
					betas.add("advanced-tool-use-2025-11-20");
					anthropicTools2.push({
						type: "tool_search_tool_regex_20251119",
						name: "tool_search_tool_regex"
					});
					break;
				case "anthropic.tool_search_bm25_20251119":
					betas.add("advanced-tool-use-2025-11-20");
					anthropicTools2.push({
						type: "tool_search_tool_bm25_20251119",
						name: "tool_search_tool_bm25"
					});
					break;
				default:
					toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`
					});
					break;
			}
			break;
		default:
			toolWarnings.push({
				type: "unsupported",
				feature: `tool ${tool}`
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
		default: throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${type}` });
	}
}
function convertAnthropicMessagesUsage({ usage, rawUsage }) {
	var _a, _b;
	const cacheCreationTokens = (_a = usage.cache_creation_input_tokens) != null ? _a : 0;
	const cacheReadTokens = (_b = usage.cache_read_input_tokens) != null ? _b : 0;
	let inputTokens;
	let outputTokens;
	if (usage.iterations && usage.iterations.length > 0) {
		const totals = usage.iterations.reduce((acc, iter) => ({
			input: acc.input + iter.input_tokens,
			output: acc.output + iter.output_tokens
		}), {
			input: 0,
			output: 0
		});
		inputTokens = totals.input;
		outputTokens = totals.output;
	} else {
		inputTokens = usage.input_tokens;
		outputTokens = usage.output_tokens;
	}
	return {
		inputTokens: {
			total: inputTokens + cacheCreationTokens + cacheReadTokens,
			noCache: inputTokens,
			cacheRead: cacheReadTokens,
			cacheWrite: cacheCreationTokens
		},
		outputTokens: {
			total: outputTokens,
			text: void 0,
			reasoning: void 0
		},
		raw: rawUsage != null ? rawUsage : usage
	};
}
var codeExecution_20250522OutputSchema = lazySchema(() => zodSchema(object({
	type: literal("code_execution_result"),
	stdout: string(),
	stderr: string(),
	return_code: number(),
	content: array(object({
		type: literal("code_execution_output"),
		file_id: string()
	})).optional().default([])
})));
var factory4 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.code_execution_20250522",
	inputSchema: lazySchema(() => zodSchema(object({ code: string() }))),
	outputSchema: codeExecution_20250522OutputSchema
});
var codeExecution_20250522 = (args = {}) => {
	return factory4(args);
};
var codeExecution_20250825OutputSchema = lazySchema(() => zodSchema(discriminatedUnion("type", [
	object({
		type: literal("code_execution_result"),
		stdout: string(),
		stderr: string(),
		return_code: number(),
		content: array(object({
			type: literal("code_execution_output"),
			file_id: string()
		})).optional().default([])
	}),
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
var factory5 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.code_execution_20250825",
	inputSchema: lazySchema(() => zodSchema(discriminatedUnion("type", [
		object({
			type: literal("programmatic-tool-call"),
			code: string()
		}),
		object({
			type: literal("bash_code_execution"),
			command: string()
		}),
		discriminatedUnion("command", [
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
		])
	]))),
	outputSchema: codeExecution_20250825OutputSchema,
	supportsDeferredResults: true
});
var codeExecution_20250825 = (args = {}) => {
	return factory5(args);
};
var toolSearchRegex_20251119OutputSchema = lazySchema(() => zodSchema(array(object({
	type: literal("tool_reference"),
	toolName: string()
}))));
var factory6 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.tool_search_regex_20251119",
	inputSchema: lazySchema(() => zodSchema(object({
		pattern: string(),
		limit: number().optional()
	}))),
	outputSchema: toolSearchRegex_20251119OutputSchema,
	supportsDeferredResults: true
});
var toolSearchRegex_20251119 = (args = {}) => {
	return factory6(args);
};
function convertToString(data) {
	if (typeof data === "string") return Buffer.from(data, "base64").toString("utf-8");
	if (data instanceof Uint8Array) return new TextDecoder().decode(data);
	if (data instanceof URL) throw new UnsupportedFunctionalityError({ functionality: "URL-based text documents are not supported for citations" });
	throw new UnsupportedFunctionalityError({ functionality: `unsupported data type for text documents: ${typeof data}` });
}
function isUrlData(data) {
	return data instanceof URL || isUrlString(data);
}
function isUrlString(data) {
	return typeof data === "string" && /^https?:\/\//i.test(data);
}
function getUrlString(data) {
	return data instanceof URL ? data.toString() : data;
}
async function convertToAnthropicMessagesPrompt({ prompt, sendReasoning, warnings, cacheControlValidator, toolNameMapping }) {
	var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
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
											source: isUrlData(part.data) ? {
												type: "url",
												url: getUrlString(part.data)
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
												source: isUrlData(part.data) ? {
													type: "url",
													url: getUrlString(part.data)
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
												source: isUrlData(part.data) ? {
													type: "url",
													url: getUrlString(part.data)
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
								if (part.type === "tool-approval-response") continue;
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
											var _a2;
											switch (contentPart.type) {
												case "text": return {
													type: "text",
													text: contentPart.text
												};
												case "image-data": return {
													type: "image",
													source: {
														type: "base64",
														media_type: contentPart.mediaType,
														data: contentPart.data
													}
												};
												case "image-url": return {
													type: "image",
													source: {
														type: "url",
														url: contentPart.url
													}
												};
												case "file-url": return {
													type: "document",
													source: {
														type: "url",
														url: contentPart.url
													}
												};
												case "file-data":
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
													warnings.push({
														type: "other",
														message: `unsupported tool content part type: ${contentPart.type} with media type: ${contentPart.mediaType}`
													});
													return;
												case "custom": {
													const anthropicOptions = (_a2 = contentPart.providerOptions) == null ? void 0 : _a2.anthropic;
													if ((anthropicOptions == null ? void 0 : anthropicOptions.type) === "tool-reference") return {
														type: "tool_reference",
														tool_name: anthropicOptions.toolName
													};
													warnings.push({
														type: "other",
														message: `unsupported custom tool content part`
													});
													return;
												}
												default:
													warnings.push({
														type: "other",
														message: `unsupported tool content part type: ${contentPart.type}`
													});
													return;
											}
										}).filter(isNonNullable);
										break;
									case "text":
									case "error-text":
										contentValue = output.value;
										break;
									case "execution-denied":
										contentValue = (_e = output.reason) != null ? _e : "Tool execution denied.";
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
				const mcpToolUseIds = /* @__PURE__ */ new Set();
				for (let j = 0; j < block.messages.length; j++) {
					const message = block.messages[j];
					const isLastMessage = j === block.messages.length - 1;
					const { content } = message;
					for (let k = 0; k < content.length; k++) {
						const part = content[k];
						const isLastContentPart = k === content.length - 1;
						const cacheControl = (_f = validator.getCacheControl(part.providerOptions, {
							type: "assistant message part",
							canCache: true
						})) != null ? _f : isLastContentPart ? validator.getCacheControl(message.providerOptions, {
							type: "assistant message",
							canCache: true
						}) : void 0;
						switch (part.type) {
							case "text": {
								const textMetadata = (_g = part.providerOptions) == null ? void 0 : _g.anthropic;
								if ((textMetadata == null ? void 0 : textMetadata.type) === "compaction") anthropicContent.push({
									type: "compaction",
									content: part.text,
									cache_control: cacheControl
								});
								else anthropicContent.push({
									type: "text",
									text: isLastBlock && isLastMessage && isLastContentPart ? part.text.trim() : part.text,
									cache_control: cacheControl
								});
								break;
							}
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
							case "tool-call": {
								if (part.providerExecuted) {
									const providerToolName = toolNameMapping.toProviderToolName(part.toolName);
									if (((_i = (_h = part.providerOptions) == null ? void 0 : _h.anthropic) == null ? void 0 : _i.type) === "mcp-tool-use") {
										mcpToolUseIds.add(part.toolCallId);
										const serverName = (_k = (_j = part.providerOptions) == null ? void 0 : _j.anthropic) == null ? void 0 : _k.serverName;
										if (serverName == null || typeof serverName !== "string") {
											warnings.push({
												type: "other",
												message: "mcp tool use server name is required and must be a string"
											});
											break;
										}
										anthropicContent.push({
											type: "mcp_tool_use",
											id: part.toolCallId,
											name: part.toolName,
											input: part.input,
											server_name: serverName,
											cache_control: cacheControl
										});
									} else if (providerToolName === "code_execution" && part.input != null && typeof part.input === "object" && "type" in part.input && typeof part.input.type === "string" && (part.input.type === "bash_code_execution" || part.input.type === "text_editor_code_execution")) anthropicContent.push({
										type: "server_tool_use",
										id: part.toolCallId,
										name: part.input.type,
										input: part.input,
										cache_control: cacheControl
									});
									else if (providerToolName === "code_execution" && part.input != null && typeof part.input === "object" && "type" in part.input && part.input.type === "programmatic-tool-call") {
										const { type: _, ...inputWithoutType } = part.input;
										anthropicContent.push({
											type: "server_tool_use",
											id: part.toolCallId,
											name: "code_execution",
											input: inputWithoutType,
											cache_control: cacheControl
										});
									} else if (providerToolName === "code_execution" || providerToolName === "web_fetch" || providerToolName === "web_search") anthropicContent.push({
										type: "server_tool_use",
										id: part.toolCallId,
										name: providerToolName,
										input: part.input,
										cache_control: cacheControl
									});
									else if (providerToolName === "tool_search_tool_regex" || providerToolName === "tool_search_tool_bm25") anthropicContent.push({
										type: "server_tool_use",
										id: part.toolCallId,
										name: providerToolName,
										input: part.input,
										cache_control: cacheControl
									});
									else warnings.push({
										type: "other",
										message: `provider executed tool call for tool ${part.toolName} is not supported`
									});
									break;
								}
								const callerOptions = (_l = part.providerOptions) == null ? void 0 : _l.anthropic;
								const caller = (callerOptions == null ? void 0 : callerOptions.caller) ? (callerOptions.caller.type === "code_execution_20250825" || callerOptions.caller.type === "code_execution_20260120") && callerOptions.caller.toolId ? {
									type: callerOptions.caller.type,
									tool_id: callerOptions.caller.toolId
								} : callerOptions.caller.type === "direct" ? { type: "direct" } : void 0 : void 0;
								anthropicContent.push({
									type: "tool_use",
									id: part.toolCallId,
									name: part.toolName,
									input: part.input,
									...caller && { caller },
									cache_control: cacheControl
								});
								break;
							}
							case "tool-result": {
								const providerToolName = toolNameMapping.toProviderToolName(part.toolName);
								if (mcpToolUseIds.has(part.toolCallId)) {
									const output = part.output;
									if (output.type !== "json" && output.type !== "error-json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									anthropicContent.push({
										type: "mcp_tool_result",
										tool_use_id: part.toolCallId,
										is_error: output.type === "error-json",
										content: output.value,
										cache_control: cacheControl
									});
								} else if (providerToolName === "code_execution") {
									const output = part.output;
									if (output.type === "error-text" || output.type === "error-json") {
										let errorInfo = {};
										try {
											if (typeof output.value === "string") errorInfo = JSON.parse(output.value);
											else if (typeof output.value === "object" && output.value !== null) errorInfo = output.value;
										} catch (e) {}
										if (errorInfo.type === "code_execution_tool_result_error") anthropicContent.push({
											type: "code_execution_tool_result",
											tool_use_id: part.toolCallId,
											content: {
												type: "code_execution_tool_result_error",
												error_code: (_m = errorInfo.errorCode) != null ? _m : "unknown"
											},
											cache_control: cacheControl
										});
										else anthropicContent.push({
											type: "bash_code_execution_tool_result",
											tool_use_id: part.toolCallId,
											cache_control: cacheControl,
											content: {
												type: "bash_code_execution_tool_result_error",
												error_code: (_n = errorInfo.errorCode) != null ? _n : "unknown"
											}
										});
										break;
									}
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
												return_code: codeExecutionOutput.return_code,
												content: (_o = codeExecutionOutput.content) != null ? _o : []
											},
											cache_control: cacheControl
										});
									} else {
										const codeExecutionOutput = await validateTypes({
											value: output.value,
											schema: codeExecution_20250825OutputSchema
										});
										if (codeExecutionOutput.type === "code_execution_result") anthropicContent.push({
											type: "code_execution_tool_result",
											tool_use_id: part.toolCallId,
											content: {
												type: codeExecutionOutput.type,
												stdout: codeExecutionOutput.stdout,
												stderr: codeExecutionOutput.stderr,
												return_code: codeExecutionOutput.return_code,
												content: (_p = codeExecutionOutput.content) != null ? _p : []
											},
											cache_control: cacheControl
										});
										else if (codeExecutionOutput.type === "bash_code_execution_result" || codeExecutionOutput.type === "bash_code_execution_tool_result_error") anthropicContent.push({
											type: "bash_code_execution_tool_result",
											tool_use_id: part.toolCallId,
											cache_control: cacheControl,
											content: codeExecutionOutput
										});
										else anthropicContent.push({
											type: "text_editor_code_execution_tool_result",
											tool_use_id: part.toolCallId,
											cache_control: cacheControl,
											content: codeExecutionOutput
										});
									}
									break;
								}
								if (providerToolName === "web_fetch") {
									const output = part.output;
									if (output.type === "error-json") {
										let errorValue = {};
										try {
											if (typeof output.value === "string") errorValue = JSON.parse(output.value);
											else if (typeof output.value === "object" && output.value !== null) errorValue = output.value;
										} catch (e) {
											const extractedErrorCode = (_q = output.value) == null ? void 0 : _q.errorCode;
											errorValue = { errorCode: typeof extractedErrorCode === "string" ? extractedErrorCode : "unknown" };
										}
										anthropicContent.push({
											type: "web_fetch_tool_result",
											tool_use_id: part.toolCallId,
											content: {
												type: "web_fetch_tool_result_error",
												error_code: (_r = errorValue.errorCode) != null ? _r : "unknown"
											},
											cache_control: cacheControl
										});
										break;
									}
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
								if (providerToolName === "web_search") {
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
								if (providerToolName === "tool_search_tool_regex" || providerToolName === "tool_search_tool_bm25") {
									const output = part.output;
									if (output.type !== "json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									const toolReferences = (await validateTypes({
										value: output.value,
										schema: toolSearchRegex_20251119OutputSchema
									})).map((ref) => ({
										type: "tool_reference",
										tool_name: ref.toolName
									}));
									anthropicContent.push({
										type: "tool_search_tool_result",
										tool_use_id: part.toolCallId,
										content: {
											type: "tool_search_tool_search_result",
											tool_references: toolReferences
										},
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
		case "max_tokens":
		case "model_context_window_exceeded": return "length";
		case "compaction": return "other";
		default: return "other";
	}
}
function createCitationSource(citation, citationDocuments, generateId3) {
	var _a;
	if (citation.type === "web_search_result_location") return {
		type: "source",
		sourceType: "url",
		id: generateId3(),
		url: citation.url,
		title: citation.title,
		providerMetadata: { anthropic: {
			citedText: citation.cited_text,
			encryptedIndex: citation.encrypted_index
		} }
	};
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
		this.specificationVersion = "v3";
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
	get providerOptionsName() {
		const provider = this.config.provider;
		const dotIndex = provider.indexOf(".");
		return dotIndex === -1 ? provider : provider.substring(0, dotIndex);
	}
	get supportedUrls() {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).supportedUrls) == null ? void 0 : _b.call(_a)) != null ? _c : {};
	}
	async getArgs({ userSuppliedBetas, prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, providerOptions, stream }) {
		var _a, _b, _c, _d, _e, _f;
		const warnings = [];
		if (frequencyPenalty != null) warnings.push({
			type: "unsupported",
			feature: "frequencyPenalty"
		});
		if (presencePenalty != null) warnings.push({
			type: "unsupported",
			feature: "presencePenalty"
		});
		if (seed != null) warnings.push({
			type: "unsupported",
			feature: "seed"
		});
		if (temperature != null && temperature > 1) {
			warnings.push({
				type: "unsupported",
				feature: "temperature",
				details: `${temperature} exceeds anthropic maximum of 1.0. clamped to 1.0`
			});
			temperature = 1;
		} else if (temperature != null && temperature < 0) {
			warnings.push({
				type: "unsupported",
				feature: "temperature",
				details: `${temperature} is below anthropic minimum of 0. clamped to 0`
			});
			temperature = 0;
		}
		if ((responseFormat == null ? void 0 : responseFormat.type) === "json") {
			if (responseFormat.schema == null) warnings.push({
				type: "unsupported",
				feature: "responseFormat",
				details: "JSON response format requires a schema. The response format is ignored."
			});
		}
		const providerOptionsName = this.providerOptionsName;
		const canonicalOptions = await parseProviderOptions({
			provider: "anthropic",
			providerOptions,
			schema: anthropicLanguageModelOptions
		});
		const customProviderOptions = providerOptionsName !== "anthropic" ? await parseProviderOptions({
			provider: providerOptionsName,
			providerOptions,
			schema: anthropicLanguageModelOptions
		}) : null;
		const usedCustomProviderKey = customProviderOptions != null;
		const anthropicOptions = Object.assign({}, canonicalOptions != null ? canonicalOptions : {}, customProviderOptions != null ? customProviderOptions : {});
		const { maxOutputTokens: maxOutputTokensForModel, supportsStructuredOutput: modelSupportsStructuredOutput, isKnownModel } = getModelCapabilities(this.modelId);
		const supportsStructuredOutput = ((_a = this.config.supportsNativeStructuredOutput) != null ? _a : true) && modelSupportsStructuredOutput;
		const structureOutputMode = (_b = anthropicOptions == null ? void 0 : anthropicOptions.structuredOutputMode) != null ? _b : "auto";
		const useStructuredOutput = structureOutputMode === "outputFormat" || structureOutputMode === "auto" && supportsStructuredOutput;
		const jsonResponseTool = (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && !useStructuredOutput ? {
			type: "function",
			name: "json",
			description: "Respond with a JSON object.",
			inputSchema: responseFormat.schema
		} : void 0;
		const contextManagement = anthropicOptions == null ? void 0 : anthropicOptions.contextManagement;
		const cacheControlValidator = new CacheControlValidator();
		const toolNameMapping = createToolNameMapping({
			tools,
			providerToolNames: {
				"anthropic.code_execution_20250522": "code_execution",
				"anthropic.code_execution_20250825": "code_execution",
				"anthropic.code_execution_20260120": "code_execution",
				"anthropic.computer_20241022": "computer",
				"anthropic.computer_20250124": "computer",
				"anthropic.text_editor_20241022": "str_replace_editor",
				"anthropic.text_editor_20250124": "str_replace_editor",
				"anthropic.text_editor_20250429": "str_replace_based_edit_tool",
				"anthropic.text_editor_20250728": "str_replace_based_edit_tool",
				"anthropic.bash_20241022": "bash",
				"anthropic.bash_20250124": "bash",
				"anthropic.memory_20250818": "memory",
				"anthropic.web_search_20250305": "web_search",
				"anthropic.web_fetch_20250910": "web_fetch",
				"anthropic.tool_search_regex_20251119": "tool_search_tool_regex",
				"anthropic.tool_search_bm25_20251119": "tool_search_tool_bm25"
			}
		});
		const { prompt: messagesPrompt, betas } = await convertToAnthropicMessagesPrompt({
			prompt,
			sendReasoning: (_c = anthropicOptions == null ? void 0 : anthropicOptions.sendReasoning) != null ? _c : true,
			warnings,
			cacheControlValidator,
			toolNameMapping
		});
		const thinkingType = (_d = anthropicOptions == null ? void 0 : anthropicOptions.thinking) == null ? void 0 : _d.type;
		const isThinking = thinkingType === "enabled" || thinkingType === "adaptive";
		let thinkingBudget = thinkingType === "enabled" ? (_e = anthropicOptions == null ? void 0 : anthropicOptions.thinking) == null ? void 0 : _e.budgetTokens : void 0;
		const maxTokens = maxOutputTokens != null ? maxOutputTokens : maxOutputTokensForModel;
		const baseArgs = {
			model: this.modelId,
			max_tokens: maxTokens,
			temperature,
			top_k: topK,
			top_p: topP,
			stop_sequences: stopSequences,
			...isThinking && { thinking: {
				type: thinkingType,
				...thinkingBudget != null && { budget_tokens: thinkingBudget }
			} },
			...(anthropicOptions == null ? void 0 : anthropicOptions.effort) && { output_config: { effort: anthropicOptions.effort } },
			...(anthropicOptions == null ? void 0 : anthropicOptions.speed) && { speed: anthropicOptions.speed },
			...(anthropicOptions == null ? void 0 : anthropicOptions.cacheControl) && { cache_control: anthropicOptions.cacheControl },
			...useStructuredOutput && (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && { output_format: {
				type: "json_schema",
				schema: responseFormat.schema
			} },
			...(anthropicOptions == null ? void 0 : anthropicOptions.mcpServers) && anthropicOptions.mcpServers.length > 0 && { mcp_servers: anthropicOptions.mcpServers.map((server) => ({
				type: server.type,
				name: server.name,
				url: server.url,
				authorization_token: server.authorizationToken,
				tool_configuration: server.toolConfiguration ? {
					allowed_tools: server.toolConfiguration.allowedTools,
					enabled: server.toolConfiguration.enabled
				} : void 0
			})) },
			...(anthropicOptions == null ? void 0 : anthropicOptions.container) && { container: anthropicOptions.container.skills && anthropicOptions.container.skills.length > 0 ? {
				id: anthropicOptions.container.id,
				skills: anthropicOptions.container.skills.map((skill) => ({
					type: skill.type,
					skill_id: skill.skillId,
					version: skill.version
				}))
			} : anthropicOptions.container.id },
			system: messagesPrompt.system,
			messages: messagesPrompt.messages,
			...contextManagement && { context_management: { edits: contextManagement.edits.map((edit) => {
				const strategy = edit.type;
				switch (strategy) {
					case "clear_tool_uses_20250919": return {
						type: edit.type,
						...edit.trigger !== void 0 && { trigger: edit.trigger },
						...edit.keep !== void 0 && { keep: edit.keep },
						...edit.clearAtLeast !== void 0 && { clear_at_least: edit.clearAtLeast },
						...edit.clearToolInputs !== void 0 && { clear_tool_inputs: edit.clearToolInputs },
						...edit.excludeTools !== void 0 && { exclude_tools: edit.excludeTools }
					};
					case "clear_thinking_20251015": return {
						type: edit.type,
						...edit.keep !== void 0 && { keep: edit.keep }
					};
					case "compact_20260112": return {
						type: edit.type,
						...edit.trigger !== void 0 && { trigger: edit.trigger },
						...edit.pauseAfterCompaction !== void 0 && { pause_after_compaction: edit.pauseAfterCompaction },
						...edit.instructions !== void 0 && { instructions: edit.instructions }
					};
					default:
						warnings.push({
							type: "other",
							message: `Unknown context management strategy: ${strategy}`
						});
						return;
				}
			}).filter((edit) => edit !== void 0) } }
		};
		if (isThinking) {
			if (thinkingType === "enabled" && thinkingBudget == null) {
				warnings.push({
					type: "compatibility",
					feature: "extended thinking",
					details: "thinking budget is required when thinking is enabled. using default budget of 1024 tokens."
				});
				baseArgs.thinking = {
					type: "enabled",
					budget_tokens: 1024
				};
				thinkingBudget = 1024;
			}
			if (baseArgs.temperature != null) {
				baseArgs.temperature = void 0;
				warnings.push({
					type: "unsupported",
					feature: "temperature",
					details: "temperature is not supported when thinking is enabled"
				});
			}
			if (topK != null) {
				baseArgs.top_k = void 0;
				warnings.push({
					type: "unsupported",
					feature: "topK",
					details: "topK is not supported when thinking is enabled"
				});
			}
			if (topP != null) {
				baseArgs.top_p = void 0;
				warnings.push({
					type: "unsupported",
					feature: "topP",
					details: "topP is not supported when thinking is enabled"
				});
			}
			baseArgs.max_tokens = maxTokens + (thinkingBudget != null ? thinkingBudget : 0);
		} else if (topP != null && temperature != null) {
			warnings.push({
				type: "unsupported",
				feature: "topP",
				details: `topP is not supported when temperature is set. topP is ignored.`
			});
			baseArgs.top_p = void 0;
		}
		if (isKnownModel && baseArgs.max_tokens > maxOutputTokensForModel) {
			if (maxOutputTokens != null) warnings.push({
				type: "unsupported",
				feature: "maxOutputTokens",
				details: `${baseArgs.max_tokens} (maxOutputTokens + thinkingBudget) is greater than ${this.modelId} ${maxOutputTokensForModel} max output tokens. The max output tokens have been limited to ${maxOutputTokensForModel}.`
			});
			baseArgs.max_tokens = maxOutputTokensForModel;
		}
		if ((anthropicOptions == null ? void 0 : anthropicOptions.mcpServers) && anthropicOptions.mcpServers.length > 0) betas.add("mcp-client-2025-04-04");
		if (contextManagement) {
			betas.add("context-management-2025-06-27");
			if (contextManagement.edits.some((e) => e.type === "compact_20260112")) betas.add("compact-2026-01-12");
		}
		if ((anthropicOptions == null ? void 0 : anthropicOptions.container) && anthropicOptions.container.skills && anthropicOptions.container.skills.length > 0) {
			betas.add("code-execution-2025-08-25");
			betas.add("skills-2025-10-02");
			betas.add("files-api-2025-04-14");
			if (!(tools == null ? void 0 : tools.some((tool) => tool.type === "provider" && (tool.id === "anthropic.code_execution_20250825" || tool.id === "anthropic.code_execution_20260120")))) warnings.push({
				type: "other",
				message: "code execution tool is required when using skills"
			});
		}
		if (anthropicOptions == null ? void 0 : anthropicOptions.effort) betas.add("effort-2025-11-24");
		if ((anthropicOptions == null ? void 0 : anthropicOptions.speed) === "fast") betas.add("fast-mode-2026-02-01");
		if (stream && ((_f = anthropicOptions == null ? void 0 : anthropicOptions.toolStreaming) != null ? _f : true)) betas.add("fine-grained-tool-streaming-2025-05-14");
		if (useStructuredOutput && (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null) betas.add("structured-outputs-2025-11-13");
		const { tools: anthropicTools2, toolChoice: anthropicToolChoice, toolWarnings, betas: toolsBetas } = await prepareTools(jsonResponseTool != null ? {
			tools: [...tools != null ? tools : [], jsonResponseTool],
			toolChoice: { type: "required" },
			disableParallelToolUse: true,
			cacheControlValidator,
			supportsStructuredOutput: false
		} : {
			tools: tools != null ? tools : [],
			toolChoice,
			disableParallelToolUse: anthropicOptions == null ? void 0 : anthropicOptions.disableParallelToolUse,
			cacheControlValidator,
			supportsStructuredOutput
		});
		const cacheWarnings = cacheControlValidator.getWarnings();
		return {
			args: {
				...baseArgs,
				tools: anthropicTools2,
				tool_choice: anthropicToolChoice,
				stream: stream === true ? true : void 0
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
			usesJsonResponseTool: jsonResponseTool != null,
			toolNameMapping,
			providerOptionsName,
			usedCustomProviderKey
		};
	}
	async getHeaders({ betas, headers }) {
		return combineHeaders(await resolve(this.config.headers), headers, betas.size > 0 ? { "anthropic-beta": Array.from(betas).join(",") } : {});
	}
	async getBetasFromHeaders(requestHeaders) {
		var _a, _b;
		const configBetaHeader = (_a = (await resolve(this.config.headers))["anthropic-beta"]) != null ? _a : "";
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
		var _a, _b, _c, _d, _e, _f;
		const { args, warnings, betas, usesJsonResponseTool, toolNameMapping, providerOptionsName, usedCustomProviderKey } = await this.getArgs({
			...options,
			stream: false,
			userSuppliedBetas: await this.getBetasFromHeaders(options.headers)
		});
		const citationDocuments = [...this.extractCitationDocuments(options.prompt)];
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
		const mcpToolCalls = {};
		const serverToolCalls = {};
		let isJsonResponseFromTool = false;
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
			case "compaction":
				content.push({
					type: "text",
					text: part.content,
					providerMetadata: { anthropic: { type: "compaction" } }
				});
				break;
			case "tool_use":
				if (usesJsonResponseTool && part.name === "json") {
					isJsonResponseFromTool = true;
					content.push({
						type: "text",
						text: JSON.stringify(part.input)
					});
				} else {
					const caller = part.caller;
					const callerInfo = caller ? {
						type: caller.type,
						toolId: "tool_id" in caller ? caller.tool_id : void 0
					} : void 0;
					content.push({
						type: "tool-call",
						toolCallId: part.id,
						toolName: part.name,
						input: JSON.stringify(part.input),
						...callerInfo && { providerMetadata: { anthropic: { caller: callerInfo } } }
					});
				}
				break;
			case "server_tool_use":
				if (part.name === "text_editor_code_execution" || part.name === "bash_code_execution") content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: toolNameMapping.toCustomToolName("code_execution"),
					input: JSON.stringify({
						type: part.name,
						...part.input
					}),
					providerExecuted: true
				});
				else if (part.name === "web_search" || part.name === "code_execution" || part.name === "web_fetch") {
					const inputToSerialize = part.name === "code_execution" && part.input != null && typeof part.input === "object" && "code" in part.input && !("type" in part.input) ? {
						type: "programmatic-tool-call",
						...part.input
					} : part.input;
					content.push({
						type: "tool-call",
						toolCallId: part.id,
						toolName: toolNameMapping.toCustomToolName(part.name),
						input: JSON.stringify(inputToSerialize),
						providerExecuted: true
					});
				} else if (part.name === "tool_search_tool_regex" || part.name === "tool_search_tool_bm25") {
					serverToolCalls[part.id] = part.name;
					content.push({
						type: "tool-call",
						toolCallId: part.id,
						toolName: toolNameMapping.toCustomToolName(part.name),
						input: JSON.stringify(part.input),
						providerExecuted: true
					});
				}
				break;
			case "mcp_tool_use":
				mcpToolCalls[part.id] = {
					type: "tool-call",
					toolCallId: part.id,
					toolName: part.name,
					input: JSON.stringify(part.input),
					providerExecuted: true,
					dynamic: true,
					providerMetadata: { anthropic: {
						type: "mcp-tool-use",
						serverName: part.server_name
					} }
				};
				content.push(mcpToolCalls[part.id]);
				break;
			case "mcp_tool_result":
				content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: mcpToolCalls[part.tool_use_id].toolName,
					isError: part.is_error,
					result: part.content,
					dynamic: true,
					providerMetadata: mcpToolCalls[part.tool_use_id].providerMetadata
				});
				break;
			case "web_fetch_tool_result":
				if (part.content.type === "web_fetch_result") {
					citationDocuments.push({
						title: (_a = part.content.content.title) != null ? _a : part.content.url,
						mediaType: part.content.content.source.media_type
					});
					content.push({
						type: "tool-result",
						toolCallId: part.tool_use_id,
						toolName: toolNameMapping.toCustomToolName("web_fetch"),
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
						}
					});
				} else if (part.content.type === "web_fetch_tool_result_error") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("web_fetch"),
					isError: true,
					result: {
						type: "web_fetch_tool_result_error",
						errorCode: part.content.error_code
					}
				});
				break;
			case "web_search_tool_result":
				if (Array.isArray(part.content)) {
					content.push({
						type: "tool-result",
						toolCallId: part.tool_use_id,
						toolName: toolNameMapping.toCustomToolName("web_search"),
						result: part.content.map((result) => {
							var _a2;
							return {
								url: result.url,
								title: result.title,
								pageAge: (_a2 = result.page_age) != null ? _a2 : null,
								encryptedContent: result.encrypted_content,
								type: result.type
							};
						})
					});
					for (const result of part.content) content.push({
						type: "source",
						sourceType: "url",
						id: this.generateId(),
						url: result.url,
						title: result.title,
						providerMetadata: { anthropic: { pageAge: (_b = result.page_age) != null ? _b : null } }
					});
				} else content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("web_search"),
					isError: true,
					result: {
						type: "web_search_tool_result_error",
						errorCode: part.content.error_code
					}
				});
				break;
			case "code_execution_tool_result":
				if (part.content.type === "code_execution_result") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("code_execution"),
					result: {
						type: part.content.type,
						stdout: part.content.stdout,
						stderr: part.content.stderr,
						return_code: part.content.return_code,
						content: (_c = part.content.content) != null ? _c : []
					}
				});
				else if (part.content.type === "code_execution_tool_result_error") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("code_execution"),
					isError: true,
					result: {
						type: "code_execution_tool_result_error",
						errorCode: part.content.error_code
					}
				});
				break;
			case "bash_code_execution_tool_result":
			case "text_editor_code_execution_tool_result":
				content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("code_execution"),
					result: part.content
				});
				break;
			case "tool_search_tool_result": {
				let providerToolName = serverToolCalls[part.tool_use_id];
				if (providerToolName == null) {
					const bm25CustomName = toolNameMapping.toCustomToolName("tool_search_tool_bm25");
					const regexCustomName = toolNameMapping.toCustomToolName("tool_search_tool_regex");
					if (bm25CustomName !== "tool_search_tool_bm25") providerToolName = "tool_search_tool_bm25";
					else if (regexCustomName !== "tool_search_tool_regex") providerToolName = "tool_search_tool_regex";
					else providerToolName = "tool_search_tool_regex";
				}
				if (part.content.type === "tool_search_tool_search_result") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName(providerToolName),
					result: part.content.tool_references.map((ref) => ({
						type: ref.type,
						toolName: ref.tool_name
					}))
				});
				else content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName(providerToolName),
					isError: true,
					result: {
						type: "tool_search_tool_result_error",
						errorCode: part.content.error_code
					}
				});
				break;
			}
		}
		return {
			content,
			finishReason: {
				unified: mapAnthropicStopReason({
					finishReason: response.stop_reason,
					isJsonResponseFromTool
				}),
				raw: (_d = response.stop_reason) != null ? _d : void 0
			},
			usage: convertAnthropicMessagesUsage({ usage: response.usage }),
			request: { body: args },
			response: {
				id: (_e = response.id) != null ? _e : void 0,
				modelId: (_f = response.model) != null ? _f : void 0,
				headers: responseHeaders,
				body: rawResponse
			},
			warnings,
			providerMetadata: (() => {
				var _a2, _b2, _c2, _d2, _e2;
				const anthropicMetadata = {
					usage: response.usage,
					cacheCreationInputTokens: (_a2 = response.usage.cache_creation_input_tokens) != null ? _a2 : null,
					stopSequence: (_b2 = response.stop_sequence) != null ? _b2 : null,
					iterations: response.usage.iterations ? response.usage.iterations.map((iter) => ({
						type: iter.type,
						inputTokens: iter.input_tokens,
						outputTokens: iter.output_tokens
					})) : null,
					container: response.container ? {
						expiresAt: response.container.expires_at,
						id: response.container.id,
						skills: (_d2 = (_c2 = response.container.skills) == null ? void 0 : _c2.map((skill) => ({
							type: skill.type,
							skillId: skill.skill_id,
							version: skill.version
						}))) != null ? _d2 : null
					} : null,
					contextManagement: (_e2 = mapAnthropicResponseContextManagement(response.context_management)) != null ? _e2 : null
				};
				const providerMetadata = { anthropic: anthropicMetadata };
				if (usedCustomProviderKey && providerOptionsName !== "anthropic") providerMetadata[providerOptionsName] = anthropicMetadata;
				return providerMetadata;
			})()
		};
	}
	async doStream(options) {
		var _a, _b;
		const { args: body, warnings, betas, usesJsonResponseTool, toolNameMapping, providerOptionsName, usedCustomProviderKey } = await this.getArgs({
			...options,
			stream: true,
			userSuppliedBetas: await this.getBetasFromHeaders(options.headers)
		});
		const citationDocuments = [...this.extractCitationDocuments(options.prompt)];
		const url = this.buildRequestUrl(true);
		const { responseHeaders, value: response } = await postJsonToApi({
			url,
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
		let finishReason = {
			unified: "other",
			raw: void 0
		};
		const usage = {
			input_tokens: 0,
			output_tokens: 0,
			cache_creation_input_tokens: 0,
			cache_read_input_tokens: 0,
			iterations: null
		};
		const contentBlocks = {};
		const mcpToolCalls = {};
		const serverToolCalls = {};
		let contextManagement = null;
		let rawUsage = void 0;
		let cacheCreationInputTokens = null;
		let stopSequence = null;
		let container = null;
		let isJsonResponseFromTool = false;
		let blockType = void 0;
		const generateId3 = this.generateId;
		const [streamForFirstChunk, streamForConsumer] = response.pipeThrough(new TransformStream({
			start(controller) {
				controller.enqueue({
					type: "stream-start",
					warnings
				});
			},
			transform(chunk, controller) {
				var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
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
						const part = value.content_block;
						const contentBlockType = part.type;
						blockType = contentBlockType;
						switch (contentBlockType) {
							case "text":
								if (usesJsonResponseTool) return;
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
									providerMetadata: { anthropic: { redactedData: part.data } }
								});
								return;
							case "compaction":
								contentBlocks[value.index] = { type: "text" };
								controller.enqueue({
									type: "text-start",
									id: String(value.index),
									providerMetadata: { anthropic: { type: "compaction" } }
								});
								return;
							case "tool_use":
								if (usesJsonResponseTool && part.name === "json") {
									isJsonResponseFromTool = true;
									contentBlocks[value.index] = { type: "text" };
									controller.enqueue({
										type: "text-start",
										id: String(value.index)
									});
								} else {
									const caller = part.caller;
									const callerInfo = caller ? {
										type: caller.type,
										toolId: "tool_id" in caller ? caller.tool_id : void 0
									} : void 0;
									const initialInput = part.input && Object.keys(part.input).length > 0 ? JSON.stringify(part.input) : "";
									contentBlocks[value.index] = {
										type: "tool-call",
										toolCallId: part.id,
										toolName: part.name,
										input: initialInput,
										firstDelta: initialInput.length === 0,
										...callerInfo && { caller: callerInfo }
									};
									controller.enqueue({
										type: "tool-input-start",
										id: part.id,
										toolName: part.name
									});
								}
								return;
							case "server_tool_use":
								if ([
									"web_fetch",
									"web_search",
									"code_execution",
									"text_editor_code_execution",
									"bash_code_execution"
								].includes(part.name)) {
									const providerToolName = part.name === "text_editor_code_execution" || part.name === "bash_code_execution" ? "code_execution" : part.name;
									const customToolName = toolNameMapping.toCustomToolName(providerToolName);
									contentBlocks[value.index] = {
										type: "tool-call",
										toolCallId: part.id,
										toolName: customToolName,
										input: "",
										providerExecuted: true,
										firstDelta: true,
										providerToolName: part.name
									};
									controller.enqueue({
										type: "tool-input-start",
										id: part.id,
										toolName: customToolName,
										providerExecuted: true
									});
								} else if (part.name === "tool_search_tool_regex" || part.name === "tool_search_tool_bm25") {
									serverToolCalls[part.id] = part.name;
									const customToolName = toolNameMapping.toCustomToolName(part.name);
									contentBlocks[value.index] = {
										type: "tool-call",
										toolCallId: part.id,
										toolName: customToolName,
										input: "",
										providerExecuted: true,
										firstDelta: true,
										providerToolName: part.name
									};
									controller.enqueue({
										type: "tool-input-start",
										id: part.id,
										toolName: customToolName,
										providerExecuted: true
									});
								}
								return;
							case "web_fetch_tool_result":
								if (part.content.type === "web_fetch_result") {
									citationDocuments.push({
										title: (_a2 = part.content.content.title) != null ? _a2 : part.content.url,
										mediaType: part.content.content.source.media_type
									});
									controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: toolNameMapping.toCustomToolName("web_fetch"),
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
										}
									});
								} else if (part.content.type === "web_fetch_tool_result_error") controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("web_fetch"),
									isError: true,
									result: {
										type: "web_fetch_tool_result_error",
										errorCode: part.content.error_code
									}
								});
								return;
							case "web_search_tool_result":
								if (Array.isArray(part.content)) {
									controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: toolNameMapping.toCustomToolName("web_search"),
										result: part.content.map((result) => {
											var _a3;
											return {
												url: result.url,
												title: result.title,
												pageAge: (_a3 = result.page_age) != null ? _a3 : null,
												encryptedContent: result.encrypted_content,
												type: result.type
											};
										})
									});
									for (const result of part.content) controller.enqueue({
										type: "source",
										sourceType: "url",
										id: generateId3(),
										url: result.url,
										title: result.title,
										providerMetadata: { anthropic: { pageAge: (_b2 = result.page_age) != null ? _b2 : null } }
									});
								} else controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("web_search"),
									isError: true,
									result: {
										type: "web_search_tool_result_error",
										errorCode: part.content.error_code
									}
								});
								return;
							case "code_execution_tool_result":
								if (part.content.type === "code_execution_result") controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("code_execution"),
									result: {
										type: part.content.type,
										stdout: part.content.stdout,
										stderr: part.content.stderr,
										return_code: part.content.return_code,
										content: (_c = part.content.content) != null ? _c : []
									}
								});
								else if (part.content.type === "code_execution_tool_result_error") controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("code_execution"),
									isError: true,
									result: {
										type: "code_execution_tool_result_error",
										errorCode: part.content.error_code
									}
								});
								return;
							case "bash_code_execution_tool_result":
							case "text_editor_code_execution_tool_result":
								controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("code_execution"),
									result: part.content
								});
								return;
							case "tool_search_tool_result": {
								let providerToolName = serverToolCalls[part.tool_use_id];
								if (providerToolName == null) {
									const bm25CustomName = toolNameMapping.toCustomToolName("tool_search_tool_bm25");
									const regexCustomName = toolNameMapping.toCustomToolName("tool_search_tool_regex");
									if (bm25CustomName !== "tool_search_tool_bm25") providerToolName = "tool_search_tool_bm25";
									else if (regexCustomName !== "tool_search_tool_regex") providerToolName = "tool_search_tool_regex";
									else providerToolName = "tool_search_tool_regex";
								}
								if (part.content.type === "tool_search_tool_search_result") controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName(providerToolName),
									result: part.content.tool_references.map((ref) => ({
										type: ref.type,
										toolName: ref.tool_name
									}))
								});
								else controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName(providerToolName),
									isError: true,
									result: {
										type: "tool_search_tool_result_error",
										errorCode: part.content.error_code
									}
								});
								return;
							}
							case "mcp_tool_use":
								mcpToolCalls[part.id] = {
									type: "tool-call",
									toolCallId: part.id,
									toolName: part.name,
									input: JSON.stringify(part.input),
									providerExecuted: true,
									dynamic: true,
									providerMetadata: { anthropic: {
										type: "mcp-tool-use",
										serverName: part.server_name
									} }
								};
								controller.enqueue(mcpToolCalls[part.id]);
								return;
							case "mcp_tool_result":
								controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: mcpToolCalls[part.tool_use_id].toolName,
									isError: part.is_error,
									result: part.content,
									dynamic: true,
									providerMetadata: mcpToolCalls[part.tool_use_id].providerMetadata
								});
								return;
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
									if (!(usesJsonResponseTool && contentBlock.toolName === "json")) {
										controller.enqueue({
											type: "tool-input-end",
											id: contentBlock.toolCallId
										});
										let finalInput = contentBlock.input === "" ? "{}" : contentBlock.input;
										if (contentBlock.providerToolName === "code_execution") try {
											const parsed = JSON.parse(finalInput);
											if (parsed != null && typeof parsed === "object" && "code" in parsed && !("type" in parsed)) finalInput = JSON.stringify({
												type: "programmatic-tool-call",
												...parsed
											});
										} catch (e) {}
										controller.enqueue({
											type: "tool-call",
											toolCallId: contentBlock.toolCallId,
											toolName: contentBlock.toolName,
											input: finalInput,
											providerExecuted: contentBlock.providerExecuted,
											...contentBlock.caller && { providerMetadata: { anthropic: { caller: contentBlock.caller } } }
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
							case "compaction_delta":
								if (value.delta.content != null) controller.enqueue({
									type: "text-delta",
									id: String(value.index),
									delta: value.delta.content
								});
								return;
							case "input_json_delta": {
								const contentBlock = contentBlocks[value.index];
								let delta = value.delta.partial_json;
								if (delta.length === 0) return;
								if (isJsonResponseFromTool) {
									if ((contentBlock == null ? void 0 : contentBlock.type) !== "text") return;
									controller.enqueue({
										type: "text-delta",
										id: String(value.index),
										delta
									});
								} else {
									if ((contentBlock == null ? void 0 : contentBlock.type) !== "tool-call") return;
									if (contentBlock.firstDelta && (contentBlock.providerToolName === "bash_code_execution" || contentBlock.providerToolName === "text_editor_code_execution")) delta = `{"type": "${contentBlock.providerToolName}",${delta.substring(1)}`;
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
						usage.input_tokens = value.message.usage.input_tokens;
						usage.cache_read_input_tokens = (_d = value.message.usage.cache_read_input_tokens) != null ? _d : 0;
						usage.cache_creation_input_tokens = (_e = value.message.usage.cache_creation_input_tokens) != null ? _e : 0;
						rawUsage = { ...value.message.usage };
						cacheCreationInputTokens = (_f = value.message.usage.cache_creation_input_tokens) != null ? _f : null;
						if (value.message.container != null) container = {
							expiresAt: value.message.container.expires_at,
							id: value.message.container.id,
							skills: null
						};
						if (value.message.stop_reason != null) finishReason = {
							unified: mapAnthropicStopReason({
								finishReason: value.message.stop_reason,
								isJsonResponseFromTool
							}),
							raw: value.message.stop_reason
						};
						controller.enqueue({
							type: "response-metadata",
							id: (_g = value.message.id) != null ? _g : void 0,
							modelId: (_h = value.message.model) != null ? _h : void 0
						});
						if (value.message.content != null) for (let contentIndex = 0; contentIndex < value.message.content.length; contentIndex++) {
							const part = value.message.content[contentIndex];
							if (part.type === "tool_use") {
								const caller = part.caller;
								const callerInfo = caller ? {
									type: caller.type,
									toolId: "tool_id" in caller ? caller.tool_id : void 0
								} : void 0;
								controller.enqueue({
									type: "tool-input-start",
									id: part.id,
									toolName: part.name
								});
								const inputStr = JSON.stringify((_i = part.input) != null ? _i : {});
								controller.enqueue({
									type: "tool-input-delta",
									id: part.id,
									delta: inputStr
								});
								controller.enqueue({
									type: "tool-input-end",
									id: part.id
								});
								controller.enqueue({
									type: "tool-call",
									toolCallId: part.id,
									toolName: part.name,
									input: inputStr,
									...callerInfo && { providerMetadata: { anthropic: { caller: callerInfo } } }
								});
							}
						}
						return;
					case "message_delta":
						if (value.usage.input_tokens != null && usage.input_tokens !== value.usage.input_tokens) usage.input_tokens = value.usage.input_tokens;
						usage.output_tokens = value.usage.output_tokens;
						if (value.usage.cache_read_input_tokens != null) usage.cache_read_input_tokens = value.usage.cache_read_input_tokens;
						if (value.usage.cache_creation_input_tokens != null) {
							usage.cache_creation_input_tokens = value.usage.cache_creation_input_tokens;
							cacheCreationInputTokens = value.usage.cache_creation_input_tokens;
						}
						if (value.usage.iterations != null) usage.iterations = value.usage.iterations;
						finishReason = {
							unified: mapAnthropicStopReason({
								finishReason: value.delta.stop_reason,
								isJsonResponseFromTool
							}),
							raw: (_j = value.delta.stop_reason) != null ? _j : void 0
						};
						stopSequence = (_k = value.delta.stop_sequence) != null ? _k : null;
						container = value.delta.container != null ? {
							expiresAt: value.delta.container.expires_at,
							id: value.delta.container.id,
							skills: (_m = (_l = value.delta.container.skills) == null ? void 0 : _l.map((skill) => ({
								type: skill.type,
								skillId: skill.skill_id,
								version: skill.version
							}))) != null ? _m : null
						} : null;
						if (value.context_management) contextManagement = mapAnthropicResponseContextManagement(value.context_management);
						rawUsage = {
							...rawUsage,
							...value.usage
						};
						return;
					case "message_stop": {
						const anthropicMetadata = {
							usage: rawUsage != null ? rawUsage : null,
							cacheCreationInputTokens,
							stopSequence,
							iterations: usage.iterations ? usage.iterations.map((iter) => ({
								type: iter.type,
								inputTokens: iter.input_tokens,
								outputTokens: iter.output_tokens
							})) : null,
							container,
							contextManagement
						};
						const providerMetadata = { anthropic: anthropicMetadata };
						if (usedCustomProviderKey && providerOptionsName !== "anthropic") providerMetadata[providerOptionsName] = anthropicMetadata;
						controller.enqueue({
							type: "finish",
							finishReason,
							usage: convertAnthropicMessagesUsage({
								usage,
								rawUsage
							}),
							providerMetadata
						});
						return;
					}
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
		})).tee();
		const firstChunkReader = streamForFirstChunk.getReader();
		try {
			await firstChunkReader.read();
			let result = await firstChunkReader.read();
			if (((_a = result.value) == null ? void 0 : _a.type) === "raw") result = await firstChunkReader.read();
			if (((_b = result.value) == null ? void 0 : _b.type) === "error") {
				const error = result.value.error;
				throw new APICallError({
					message: error.message,
					url,
					requestBodyValues: body,
					statusCode: error.type === "overloaded_error" ? 529 : 500,
					responseHeaders,
					responseBody: JSON.stringify(error),
					isRetryable: error.type === "overloaded_error"
				});
			}
		} finally {
			firstChunkReader.cancel().catch(() => {});
			firstChunkReader.releaseLock();
		}
		return {
			stream: streamForConsumer,
			request: { body },
			response: { headers: responseHeaders }
		};
	}
};
function getModelCapabilities(modelId) {
	if (modelId.includes("claude-sonnet-4-6") || modelId.includes("claude-opus-4-6")) return {
		maxOutputTokens: 128e3,
		supportsStructuredOutput: true,
		isKnownModel: true
	};
	else if (modelId.includes("claude-sonnet-4-5") || modelId.includes("claude-opus-4-5") || modelId.includes("claude-haiku-4-5")) return {
		maxOutputTokens: 64e3,
		supportsStructuredOutput: true,
		isKnownModel: true
	};
	else if (modelId.includes("claude-opus-4-1")) return {
		maxOutputTokens: 32e3,
		supportsStructuredOutput: true,
		isKnownModel: true
	};
	else if (modelId.includes("claude-sonnet-4-") || modelId.includes("claude-3-7-sonnet")) return {
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
function mapAnthropicResponseContextManagement(contextManagement) {
	return contextManagement ? { appliedEdits: contextManagement.applied_edits.map((edit) => {
		switch (edit.type) {
			case "clear_tool_uses_20250919": return {
				type: edit.type,
				clearedToolUses: edit.cleared_tool_uses,
				clearedInputTokens: edit.cleared_input_tokens
			};
			case "clear_thinking_20251015": return {
				type: edit.type,
				clearedThinkingTurns: edit.cleared_thinking_turns,
				clearedInputTokens: edit.cleared_input_tokens
			};
			case "compact_20260112": return { type: edit.type };
		}
	}).filter((edit) => edit !== void 0) } : null;
}
var bash_20241022 = createProviderToolFactory({
	id: "anthropic.bash_20241022",
	inputSchema: lazySchema(() => zodSchema(object({
		command: string(),
		restart: boolean().optional()
	})))
});
var bash_20250124 = createProviderToolFactory({
	id: "anthropic.bash_20250124",
	inputSchema: lazySchema(() => zodSchema(object({
		command: string(),
		restart: boolean().optional()
	})))
});
var codeExecution_20260120OutputSchema = lazySchema(() => zodSchema(discriminatedUnion("type", [
	object({
		type: literal("code_execution_result"),
		stdout: string(),
		stderr: string(),
		return_code: number(),
		content: array(object({
			type: literal("code_execution_output"),
			file_id: string()
		})).optional().default([])
	}),
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
var factory7 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.code_execution_20260120",
	inputSchema: lazySchema(() => zodSchema(discriminatedUnion("type", [
		object({
			type: literal("programmatic-tool-call"),
			code: string()
		}),
		object({
			type: literal("bash_code_execution"),
			command: string()
		}),
		discriminatedUnion("command", [
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
		])
	]))),
	outputSchema: codeExecution_20260120OutputSchema,
	supportsDeferredResults: true
});
var codeExecution_20260120 = (args = {}) => {
	return factory7(args);
};
var computer_20241022 = createProviderToolFactory({
	id: "anthropic.computer_20241022",
	inputSchema: lazySchema(() => zodSchema(object({
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
	})))
});
var computer_20250124 = createProviderToolFactory({
	id: "anthropic.computer_20250124",
	inputSchema: lazySchema(() => zodSchema(object({
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
	})))
});
var computer_20251124 = createProviderToolFactory({
	id: "anthropic.computer_20251124",
	inputSchema: lazySchema(() => zodSchema(object({
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
			"screenshot",
			"zoom"
		]),
		coordinate: tuple([number().int(), number().int()]).optional(),
		duration: number().optional(),
		region: tuple([
			number().int(),
			number().int(),
			number().int(),
			number().int()
		]).optional(),
		scroll_amount: number().optional(),
		scroll_direction: _enum([
			"up",
			"down",
			"left",
			"right"
		]).optional(),
		start_coordinate: tuple([number().int(), number().int()]).optional(),
		text: string().optional()
	})))
});
var memory_20250818 = createProviderToolFactory({
	id: "anthropic.memory_20250818",
	inputSchema: lazySchema(() => zodSchema(discriminatedUnion("command", [
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
	])))
});
var textEditor_20241022 = createProviderToolFactory({
	id: "anthropic.text_editor_20241022",
	inputSchema: lazySchema(() => zodSchema(object({
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
		insert_text: string().optional(),
		old_str: string().optional(),
		view_range: array(number().int()).optional()
	})))
});
var textEditor_20250124 = createProviderToolFactory({
	id: "anthropic.text_editor_20250124",
	inputSchema: lazySchema(() => zodSchema(object({
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
		insert_text: string().optional(),
		old_str: string().optional(),
		view_range: array(number().int()).optional()
	})))
});
var textEditor_20250429 = createProviderToolFactory({
	id: "anthropic.text_editor_20250429",
	inputSchema: lazySchema(() => zodSchema(object({
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
		insert_text: string().optional(),
		old_str: string().optional(),
		view_range: array(number().int()).optional()
	})))
});
var toolSearchBm25_20251119OutputSchema = lazySchema(() => zodSchema(array(object({
	type: literal("tool_reference"),
	toolName: string()
}))));
var factory8 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.tool_search_bm25_20251119",
	inputSchema: lazySchema(() => zodSchema(object({
		query: string(),
		limit: number().optional()
	}))),
	outputSchema: toolSearchBm25_20251119OutputSchema,
	supportsDeferredResults: true
});
var toolSearchBm25_20251119 = (args = {}) => {
	return factory8(args);
};
var anthropicTools = {
	bash_20241022,
	bash_20250124,
	codeExecution_20250522,
	codeExecution_20250825,
	codeExecution_20260120,
	computer_20241022,
	computer_20250124,
	computer_20251124,
	memory_20250818,
	textEditor_20241022,
	textEditor_20250124,
	textEditor_20250429,
	textEditor_20250728,
	webFetch_20250910,
	webSearch_20250305,
	toolSearchRegex_20251119,
	toolSearchBm25_20251119
};
function createAnthropic(options = {}) {
	var _a, _b;
	const baseURL = (_a = withoutTrailingSlash(loadOptionalSetting({
		settingValue: options.baseURL,
		environmentVariableName: "ANTHROPIC_BASE_URL"
	}))) != null ? _a : "https://api.anthropic.com/v1";
	const providerName = (_b = options.name) != null ? _b : "anthropic.messages";
	if (options.apiKey && options.authToken) throw new InvalidArgumentError({
		argument: "apiKey/authToken",
		message: "Both apiKey and authToken were provided. Please use only one authentication method."
	});
	const getHeaders = () => {
		const authHeaders = options.authToken ? { Authorization: `Bearer ${options.authToken}` } : { "x-api-key": loadApiKey({
			apiKey: options.apiKey,
			environmentVariableName: "ANTHROPIC_API_KEY",
			description: "Anthropic"
		}) };
		return withUserAgentSuffix({
			"anthropic-version": "2023-06-01",
			...authHeaders,
			...options.headers
		}, `ai-sdk/anthropic/${VERSION}`);
	};
	const createChatModel = (modelId) => {
		var _a2;
		return new AnthropicMessagesLanguageModel(modelId, {
			provider: providerName,
			baseURL,
			headers: getHeaders,
			fetch: options.fetch,
			generateId: (_a2 = options.generateId) != null ? _a2 : generateId,
			supportedUrls: () => ({
				"image/*": [/^https?:\/\/.*$/],
				"application/pdf": [/^https?:\/\/.*$/]
			})
		});
	};
	const provider = function(modelId) {
		if (new.target) throw new Error("The Anthropic model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	provider.specificationVersion = "v3";
	provider.languageModel = createChatModel;
	provider.chat = createChatModel;
	provider.messages = createChatModel;
	provider.embeddingModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "embeddingModel"
		});
	};
	provider.textEmbeddingModel = provider.embeddingModel;
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
function forwardAnthropicContainerIdFromLastStep({ steps }) {
	var _a, _b, _c;
	for (let i = steps.length - 1; i >= 0; i--) {
		const containerId = (_c = (_b = (_a = steps[i].providerMetadata) == null ? void 0 : _a.anthropic) == null ? void 0 : _b.container) == null ? void 0 : _c.id;
		if (containerId) return { providerOptions: { anthropic: { container: { id: containerId } } } };
	}
}
export { forwardAnthropicContainerIdFromLastStep as i, anthropic as n, createAnthropic as r, VERSION as t };
