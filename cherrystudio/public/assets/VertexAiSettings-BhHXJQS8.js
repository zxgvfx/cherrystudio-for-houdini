import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import { n as UiDataSlot } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import "./es2015-CF8XujIC.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { i as PopoverTrigger, n as PopoverAnchor, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { t as Input$1 } from "./textarea-Dr3K8nxm.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as ChevronDown } from "./chevron-down-DajPJ_aT.js";
import { t as EyeOff } from "./eye-off-DA-NyhOr.js";
import { t as Eye } from "./eye-DgGv-EmO.js";
import { t as Info } from "./info-C47BhUEU.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import { a as useProviderAuthConfig, c as useProviderMutations, n as useProvider } from "./useProvider-DFQPidMA.js";
import "./Scrollbar-DJ9MDpuH.js";
import { a as ProviderSettingsSubtitle, n as ProviderHelpText, r as ProviderHelpTextRow, t as ProviderHelpLink } from "./ProviderSettingsPrimitives-CY4ckszT.js";
const DEFAULT_VERTEX_AI_LOCATIONS = [
	{
		value: "global",
		label: "global"
	},
	{
		value: "us-central1",
		label: "us-central1"
	},
	{
		value: "us-east1",
		label: "us-east1"
	},
	{
		value: "us-west1",
		label: "us-west1"
	},
	{
		value: "europe-west1",
		label: "europe-west1"
	},
	{
		value: "europe-west4",
		label: "europe-west4"
	},
	{
		value: "asia-east1",
		label: "asia-east1"
	},
	{
		value: "asia-northeast1",
		label: "asia-northeast1"
	},
	{
		value: "asia-southeast1",
		label: "asia-southeast1"
	}
];
var getStringField = (value, field) => {
	const fieldValue = value[field];
	if (typeof fieldValue !== "string") return;
	return fieldValue.trim() || void 0;
};
function parseVertexAIServiceAccountJson(value) {
	const trimmed = value.trim().replace(/^\uFEFF/, "");
	if (!trimmed.startsWith("{")) return;
	try {
		const parsed = JSON.parse(trimmed);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
		const credentials = parsed;
		const privateKey = getStringField(credentials, "private_key");
		const clientEmail = getStringField(credentials, "client_email");
		if (!privateKey || !clientEmail) return;
		return {
			privateKey,
			clientEmail,
			projectId: getStringField(credentials, "project_id")
		};
	} catch {
		return;
	}
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("VertexAiSettings");
var VertexAiSettings = ({ providerId }) => {
	const { t } = useTranslation();
	const { provider } = useProvider(providerId);
	const { data: authConfig } = useProviderAuthConfig(providerId);
	const { updateAuthConfig: saveAuthConfigToServer } = useProviderMutations(providerId);
	const gcpConfig = authConfig?.type === "iam-gcp" ? authConfig : null;
	const credentials = gcpConfig?.credentials;
	const [localProjectId, setLocalProjectId] = (0, import_react.useState)(gcpConfig?.project ?? "");
	const [localLocation, setLocalLocation] = (0, import_react.useState)(gcpConfig?.location ?? "");
	const [localPrivateKey, setLocalPrivateKey] = (0, import_react.useState)(credentials?.privateKey ?? "");
	const [localClientEmail, setLocalClientEmail] = (0, import_react.useState)(credentials?.clientEmail ?? "");
	const [serviceAccountJson, setServiceAccountJson] = (0, import_react.useState)("");
	const [serviceAccountJsonError, setServiceAccountJsonError] = (0, import_react.useState)(false);
	const [showClientEmail, setShowClientEmail] = (0, import_react.useState)(false);
	const [showPrivateKey, setShowPrivateKey] = (0, import_react.useState)(false);
	const [showProjectId, setShowProjectId] = (0, import_react.useState)(false);
	const [dropdownOpen, setDropdownOpen] = (0, import_react.useState)(false);
	const isDraftDirtyRef = (0, import_react.useRef)(false);
	const activeSaveRequestsRef = (0, import_react.useRef)(0);
	const isJsonImportingRef = (0, import_react.useRef)(false);
	const isSelectingLocationRef = (0, import_react.useRef)(false);
	const resetLocalAuthConfig = (0, import_react.useCallback)(() => {
		setLocalProjectId(gcpConfig?.project ?? "");
		setLocalLocation(gcpConfig?.location ?? "");
		setLocalPrivateKey(credentials?.privateKey ?? "");
		setLocalClientEmail(credentials?.clientEmail ?? "");
		if (!serviceAccountJsonError) {
			setServiceAccountJson("");
			setServiceAccountJsonError(false);
		}
	}, [
		credentials?.clientEmail,
		credentials?.privateKey,
		gcpConfig?.location,
		gcpConfig?.project,
		serviceAccountJsonError
	]);
	(0, import_react.useEffect)(() => {
		if (!isDraftDirtyRef.current && activeSaveRequestsRef.current === 0) resetLocalAuthConfig();
	}, [resetLocalAuthConfig]);
	const markDraftDirty = () => {
		isDraftDirtyRef.current = true;
	};
	const apiKeyWebsite = provider?.websites?.apiKey;
	const saveAuthConfig = async () => {
		activeSaveRequestsRef.current++;
		try {
			await saveAuthConfigToServer({
				type: "iam-gcp",
				project: localProjectId,
				location: localLocation,
				credentials: {
					privateKey: localPrivateKey,
					clientEmail: localClientEmail
				}
			});
			if (activeSaveRequestsRef.current === 1) isDraftDirtyRef.current = false;
		} catch (error) {
			logger.error("Failed to save Vertex AI auth config", {
				providerId,
				error
			});
			toast.error(t("settings.provider.save_failed"));
			if (activeSaveRequestsRef.current === 1) {
				isDraftDirtyRef.current = false;
				resetLocalAuthConfig();
			}
		} finally {
			activeSaveRequestsRef.current--;
		}
	};
	const handleServiceAccountJsonChange = async (e) => {
		const value = e.target.value;
		setServiceAccountJson(value);
		if (serviceAccountJsonError) setServiceAccountJsonError(false);
		const trimmed = value.trim();
		if (!trimmed) return;
		const parsed = parseVertexAIServiceAccountJson(trimmed);
		if (parsed) {
			setLocalPrivateKey(parsed.privateKey);
			setLocalClientEmail(parsed.clientEmail);
			if (parsed.projectId) setLocalProjectId(parsed.projectId);
			isJsonImportingRef.current = true;
			activeSaveRequestsRef.current++;
			try {
				await saveAuthConfigToServer({
					type: "iam-gcp",
					project: parsed.projectId ?? localProjectId,
					location: localLocation,
					credentials: {
						privateKey: parsed.privateKey,
						clientEmail: parsed.clientEmail
					}
				});
				setTimeout(() => {
					setServiceAccountJson("");
				}, 0);
				setServiceAccountJsonError(false);
				toast.success(t("settings.provider.vertex_ai.service_account.json_parse_success"));
			} catch (error) {
				logger.error("Failed to save Vertex AI auth config from JSON import", {
					providerId,
					error
				});
				toast.error(t("settings.provider.save_failed"));
				setServiceAccountJsonError(true);
			} finally {
				activeSaveRequestsRef.current--;
				isJsonImportingRef.current = false;
			}
		}
	};
	const handleServiceAccountJsonBlur = async () => {
		if (isJsonImportingRef.current) return;
		const value = serviceAccountJson.trim();
		if (!value) return;
		const parsed = parseVertexAIServiceAccountJson(value);
		if (!parsed) {
			toast.error(t("settings.provider.vertex_ai.service_account.json_parse_error"));
			setServiceAccountJsonError(true);
			return;
		}
		setLocalPrivateKey(parsed.privateKey);
		setLocalClientEmail(parsed.clientEmail);
		if (parsed.projectId) setLocalProjectId(parsed.projectId);
		activeSaveRequestsRef.current++;
		try {
			await saveAuthConfigToServer({
				type: "iam-gcp",
				project: parsed.projectId ?? localProjectId,
				location: localLocation,
				credentials: {
					privateKey: parsed.privateKey,
					clientEmail: parsed.clientEmail
				}
			});
			setServiceAccountJson("");
			setServiceAccountJsonError(false);
			toast.success(t("settings.provider.vertex_ai.service_account.json_parse_success"));
		} catch (error) {
			logger.error("Failed to save Vertex AI auth config from JSON import", {
				providerId,
				error
			});
			toast.error(t("settings.provider.save_failed"));
			setServiceAccountJsonError(true);
		} finally {
			activeSaveRequestsRef.current--;
		}
	};
	const handleLocationSelect = (value) => {
		setLocalLocation(value);
		setDropdownOpen(false);
		saveAuthConfigWithLocation(value);
		isSelectingLocationRef.current = false;
	};
	const saveAuthConfigWithLocation = async (locationValue) => {
		const trimmedLocation = locationValue.trim();
		const previousLocation = localLocation;
		activeSaveRequestsRef.current++;
		try {
			await saveAuthConfigToServer({
				type: "iam-gcp",
				project: localProjectId,
				location: trimmedLocation,
				credentials: {
					privateKey: localPrivateKey,
					clientEmail: localClientEmail
				}
			});
			if (activeSaveRequestsRef.current === 1) isDraftDirtyRef.current = false;
		} catch (error) {
			logger.error("Failed to save Vertex AI auth config with location", {
				providerId,
				error
			});
			toast.error(t("settings.provider.save_failed"));
			setLocalLocation(previousLocation);
			if (activeSaveRequestsRef.current === 1) isDraftDirtyRef.current = false;
		} finally {
			activeSaveRequestsRef.current--;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.vertex-ai-settings",
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mt-1.5",
				children: t("settings.provider.vertex_ai.service_account.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "settings.vertex-ai-settings.status",
				className: "mt-1.5 flex gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2.5 text-foreground text-sm",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					className: "mt-0.5 size-4 shrink-0 text-primary",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.provider.vertex_ai.service_account.description") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1.5 flex items-baseline gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
					className: "mt-0",
					children: t("settings.provider.vertex_ai.service_account.json_input")
				}), apiKeyWebsite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpLink, {
					target: "_blank",
					href: apiKeyWebsite,
					className: "mx-0",
					children: t("settings.provider.get_api_key")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
				className: "mt-1.5 min-h-10 w-full px-3 py-1.5 text-sm",
				value: serviceAccountJson,
				placeholder: t("settings.provider.vertex_ai.service_account.json_input_placeholder"),
				onChange: handleServiceAccountJsonChange,
				onBlur: handleServiceAccountJsonBlur,
				spellCheck: false,
				rows: 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, {
				className: serviceAccountJsonError ? "text-destructive" : void 0,
				children: serviceAccountJsonError ? t("settings.provider.vertex_ai.service_account.json_parse_error") : t("settings.provider.vertex_ai.service_account.json_input_help")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mt-1.5",
				children: t("settings.provider.vertex_ai.service_account.client_email")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-1.5 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "w-full pr-10",
					type: showClientEmail ? "text" : "password",
					value: localClientEmail,
					placeholder: t("settings.provider.vertex_ai.service_account.client_email_placeholder"),
					onChange: (e) => {
						markDraftDirty();
						setLocalClientEmail(e.target.value);
					},
					onBlur: saveAuthConfig
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShowClientEmail(!showClientEmail),
					className: "-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground",
					"aria-label": t("settings.provider.vertex_ai.service_account.toggle_client_email_visibility"),
					children: showClientEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("settings.provider.vertex_ai.service_account.client_email_help") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mt-1.5",
				children: t("settings.provider.vertex_ai.service_account.private_key")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-1.5 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					className: "min-h-10 w-full resize-none overflow-y-auto px-3 py-1.5 pr-10 text-sm",
					style: {
						WebkitTextSecurity: showPrivateKey ? "none" : "disc",
						maxHeight: localPrivateKey ? "52px" : "32px"
					},
					value: localPrivateKey,
					placeholder: t("settings.provider.vertex_ai.service_account.private_key_placeholder"),
					onChange: (e) => {
						markDraftDirty();
						setLocalPrivateKey(e.target.value);
					},
					onBlur: saveAuthConfig,
					spellCheck: false,
					rows: localPrivateKey ? 2 : 1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShowPrivateKey(!showPrivateKey),
					className: "-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground",
					"aria-label": t("settings.provider.vertex_ai.service_account.toggle_private_key_visibility"),
					children: showPrivateKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("settings.provider.vertex_ai.service_account.private_key_help") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
					className: "mt-1.5",
					children: t("settings.provider.vertex_ai.project_id")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-1.5 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "w-full pr-10",
						type: showProjectId ? "text" : "password",
						value: localProjectId,
						placeholder: t("settings.provider.vertex_ai.project_id_placeholder"),
						onChange: (e) => {
							markDraftDirty();
							setLocalProjectId(e.target.value);
						},
						onBlur: saveAuthConfig
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShowProjectId(!showProjectId),
						className: "-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground",
						"aria-label": t("settings.provider.vertex_ai.service_account.toggle_project_id_visibility"),
						children: showProjectId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("settings.provider.vertex_ai.project_id_help") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
					className: "mt-1.5",
					children: t("settings.provider.vertex_ai.location")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					open: dropdownOpen,
					onOpenChange: setDropdownOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverAnchor, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-1.5 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-full pr-10",
								"aria-invalid": !localLocation.trim(),
								value: localLocation,
								placeholder: t("settings.provider.vertex_ai.location_placeholder"),
								onChange: (e) => {
									markDraftDirty();
									setLocalLocation(e.target.value);
								},
								onClick: () => setDropdownOpen(true),
								onFocus: () => setDropdownOpen(true),
								onBlur: () => {
									if (!isSelectingLocationRef.current) saveAuthConfig();
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onMouseDown: (e) => e.preventDefault(),
									className: "-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground",
									"aria-label": t("settings.provider.vertex_ai.select_location"),
									"aria-haspopup": "listbox",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
								}) })
							})]
						}) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						className: "max-h-60 w-[var(--radix-popover-trigger-width)] overflow-y-auto p-1",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-ui": "settings.vertex-ai-settings.listbox",
							role: "listbox",
							"aria-label": t("settings.provider.vertex_ai.location"),
							children: DEFAULT_VERTEX_AI_LOCATIONS.map((loc) => {
								const isSelected = localLocation === loc.value;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"data-ui": "settings.vertex-ai-settings.option",
									type: "button",
									role: "option",
									"aria-selected": isSelected,
									onMouseDown: () => {
										isSelectingLocationRef.current = true;
									},
									onClick: () => handleLocationSelect(loc.value),
									className: "w-full cursor-pointer rounded px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground",
									children: loc.label
								}, loc.value);
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("settings.provider.vertex_ai.location_help") }) })
			] })
		]
	});
};
var VertexAiSettings_default = VertexAiSettings;
export { VertexAiSettings_default as default };
