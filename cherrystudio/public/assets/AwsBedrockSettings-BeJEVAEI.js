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
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-DDbGMM0m.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { a as RowFlex } from "./flex-Cbul8ND0.js";
import { t as Label } from "./label-BOwZlTgC.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as Info } from "./info-C47BhUEU.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import { a as useProviderAuthConfig, n as useProvider } from "./useProvider-DFQPidMA.js";
import "./Scrollbar-DJ9MDpuH.js";
import { n as useAuthenticationApiKey } from "./useAuthenticationApiKey-Bkj2gxPn.js";
import { a as ProviderSettingsSubtitle, n as ProviderHelpText, r as ProviderHelpTextRow, t as ProviderHelpLink } from "./ProviderSettingsPrimitives-CY4ckszT.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("AwsBedrockSettings");
var AwsBedrockSettings = ({ providerId }) => {
	const { t } = useTranslation();
	const { provider, updateAuthConfig } = useProvider(providerId);
	const { data: authConfig } = useProviderAuthConfig(providerId);
	const { inputApiKey, setInputApiKey, commitInputApiKeyNow } = useAuthenticationApiKey();
	const isIamMode = provider?.authType === "iam-aws";
	const iamConfig = authConfig?.type === "iam-aws" ? authConfig : null;
	const apiKeyAwsConfig = authConfig?.type === "api-key-aws" ? authConfig : null;
	const currentRegion = iamConfig?.region ?? apiKeyAwsConfig?.region ?? "";
	const apiKeyWebsite = provider?.websites?.apiKey;
	const [localAccessKeyId, setLocalAccessKeyId] = (0, import_react.useState)(iamConfig?.accessKeyId ?? "");
	const [localSecretAccessKey, setLocalSecretAccessKey] = (0, import_react.useState)(iamConfig?.secretAccessKey ?? "");
	const [localRegion, setLocalRegion] = (0, import_react.useState)(currentRegion);
	const isIamDraftDirtyRef = (0, import_react.useRef)(false);
	const resetLocalIamConfig = (0, import_react.useCallback)(() => {
		setLocalAccessKeyId(iamConfig?.accessKeyId ?? "");
		setLocalSecretAccessKey(iamConfig?.secretAccessKey ?? "");
		setLocalRegion(currentRegion);
	}, [
		iamConfig?.accessKeyId,
		iamConfig?.secretAccessKey,
		currentRegion
	]);
	(0, import_react.useEffect)(() => {
		if (!isIamDraftDirtyRef.current) resetLocalIamConfig();
	}, [resetLocalIamConfig]);
	const markIamDraftDirty = () => {
		isIamDraftDirtyRef.current = true;
	};
	const ensureRegionProvided = () => {
		if (localRegion.trim().length > 0) return true;
		toast.warning(t("settings.provider.aws-bedrock.region_required"));
		return false;
	};
	const handleAuthTypeChange = async (value) => {
		if (!ensureRegionProvided()) return;
		try {
			const region = localRegion.trim();
			if (value === "iam") await updateAuthConfig({
				type: "iam-aws",
				region
			});
			else await updateAuthConfig({
				type: "api-key-aws",
				region
			});
			isIamDraftDirtyRef.current = false;
		} catch (error) {
			logger.error("Failed to update AWS Bedrock auth type", {
				providerId,
				error
			});
			toast.error(t("settings.provider.save_failed"));
		}
	};
	const saveIamConfig = async () => {
		if (!ensureRegionProvided()) return;
		try {
			await updateAuthConfig({
				type: "iam-aws",
				region: localRegion.trim(),
				accessKeyId: localAccessKeyId,
				secretAccessKey: localSecretAccessKey
			});
			isIamDraftDirtyRef.current = false;
		} catch (error) {
			logger.error("Failed to save AWS Bedrock IAM config", {
				providerId,
				error
			});
			toast.error(t("settings.provider.save_failed"));
			isIamDraftDirtyRef.current = false;
			resetLocalIamConfig();
		}
	};
	const saveApiKeyAwsRegion = async () => {
		try {
			await updateAuthConfig({
				type: "api-key-aws",
				region: localRegion.trim()
			});
			isIamDraftDirtyRef.current = false;
		} catch (error) {
			logger.error("Failed to save AWS Bedrock api-key region", {
				providerId,
				error
			});
			toast.error(t("settings.provider.save_failed"));
			isIamDraftDirtyRef.current = false;
			resetLocalIamConfig();
		}
	};
	const saveRegion = async () => {
		if (!ensureRegionProvided()) return;
		if (isIamMode) await saveIamConfig();
		else await saveApiKeyAwsRegion();
	};
	const authMode = isIamMode ? "iam" : "apiKey";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
			className: "mt-1.5",
			children: t("settings.provider.aws-bedrock.title")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "settings.aws-bedrock-settings.status",
			className: "mt-1.5 flex gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2.5 text-foreground text-sm",
			role: "status",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
				className: "mt-0.5 size-4 shrink-0 text-primary",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.provider.aws-bedrock.description") })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
			className: "mt-4",
			children: t("settings.provider.aws-bedrock.auth_type")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
			className: "mt-1.5 flex flex-col gap-2",
			value: authMode,
			onValueChange: (v) => {
				handleAuthTypeChange(v);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
					value: "iam",
					id: "aws-bedrock-auth-iam",
					className: "mt-0.5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "aws-bedrock-auth-iam",
					className: "cursor-pointer font-normal leading-snug",
					children: t("settings.provider.aws-bedrock.auth_type_iam")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
					value: "apiKey",
					id: "aws-bedrock-auth-apikey",
					className: "mt-0.5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "aws-bedrock-auth-apikey",
					className: "cursor-pointer font-normal leading-snug",
					children: t("settings.provider.aws-bedrock.auth_type_api_key")
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("settings.provider.aws-bedrock.auth_type_help") }) }),
		isIamMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mt-4",
				children: t("settings.provider.aws-bedrock.access_key_id")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "mt-1.5 w-full",
				value: localAccessKeyId,
				placeholder: t("settings.provider.aws-bedrock.access_key_id"),
				onChange: (e) => {
					markIamDraftDirty();
					setLocalAccessKeyId(e.target.value);
				},
				onBlur: saveIamConfig
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("settings.provider.aws-bedrock.access_key_id_help") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mt-4",
				children: t("settings.provider.aws-bedrock.secret_access_key")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "mt-1.5 w-full",
				type: "password",
				value: localSecretAccessKey,
				placeholder: t("settings.provider.aws-bedrock.secret_access_key"),
				onChange: (e) => {
					markIamDraftDirty();
					setLocalSecretAccessKey(e.target.value);
				},
				onBlur: saveIamConfig,
				spellCheck: false
			}),
			apiKeyWebsite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProviderHelpTextRow, {
				className: "justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowFlex, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpLink, {
					target: "_blank",
					href: apiKeyWebsite,
					children: t("settings.provider.get_api_key")
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("settings.provider.aws-bedrock.secret_access_key_help") })]
			})
		] }),
		!isIamMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
				className: "mt-4",
				children: t("settings.provider.aws-bedrock.api_key")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "mt-1.5 w-full",
				type: "password",
				value: inputApiKey,
				placeholder: t("settings.provider.aws-bedrock.api_key"),
				onChange: (e) => setInputApiKey(e.target.value),
				onBlur: () => void commitInputApiKeyNow(),
				spellCheck: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("settings.provider.aws-bedrock.api_key_help") }) })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderSettingsSubtitle, {
			className: "mt-4",
			children: t("settings.provider.aws-bedrock.region")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "mt-1.5 w-full",
			value: localRegion,
			placeholder: "us-east-1",
			onChange: (e) => {
				markIamDraftDirty();
				setLocalRegion(e.target.value);
			},
			onBlur: saveRegion
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpTextRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderHelpText, { children: t("settings.provider.aws-bedrock.region_help") }) })
	] });
};
var AwsBedrockSettings_default = AwsBedrockSettings;
export { AwsBedrockSettings_default as default };
