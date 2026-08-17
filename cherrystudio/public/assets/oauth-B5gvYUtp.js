import { t as loggerService } from "./LoggerService-CbighP69.js";
import { r as resolver_default, t as getLanguageCode } from "./resolver-CZPudlzl.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as SystemProviderIds } from "./systemProviderId-BF_COOhE.js";
var logger = loggerService.withContext("oauth");
var SILICON_CLIENT_ID = "SFaJLLq0y6CAMoyDm81aMu";
var PPIO_CLIENT_ID = "37d0828c96b34936a600b62c";
const oauthWithSiliconFlow = async (setKey) => {
	const authUrl = `https://account.siliconflow.cn/oauth?client_id=${SILICON_CLIENT_ID}`;
	const popup = window.open(authUrl, "oauth", "width=720,height=720,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysOnTop=yes,alwaysRaised=yes");
	const messageHandler = (event) => {
		if (event.data.length > 0 && event.data[0]["secretKey"] !== void 0) {
			setKey(event.data[0]["secretKey"]);
			popup?.close();
			window.removeEventListener("message", messageHandler);
		}
	};
	window.removeEventListener("message", messageHandler);
	window.addEventListener("message", messageHandler);
};
const oauthWithAihubmix = async (setKey) => {
	const authUrl = ` https://console.inferera.com/token?client_id=cherry_studio_oauth&lang=${await getLanguageCode()}&aff=SJyh`;
	const popup = window.open(authUrl, "oauth", "width=720,height=720,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysOnTop=yes,alwaysRaised=yes");
	const messageHandler = async (event) => {
		const data = event.data;
		if (data && data.key === "cherry_studio_oauth_callback") {
			const { iv, encryptedData } = data.data;
			try {
				const decryptedData = await window.api.aes.decrypt(encryptedData, iv, "");
				const { api_keys } = JSON.parse(decryptedData);
				if (api_keys && api_keys.length > 0) {
					setKey(api_keys[0].value);
					popup?.close();
					window.removeEventListener("message", messageHandler);
				}
			} catch (error) {
				logger.error("[oauthWithAihubmix] error", error);
				popup?.close();
				toast.error(resolver_default.t("settings.provider.oauth.error"));
			}
		}
	};
	window.removeEventListener("message", messageHandler);
	window.addEventListener("message", messageHandler);
};
const oauthWithPPIO = async (setKey) => {
	const authUrl = `https://ppio.com/oauth/authorize?invited_by=JYT9GD&client_id=${PPIO_CLIENT_ID}&scope=api%20openid&response_type=code&redirect_uri=${encodeURIComponent("cherrystudio://")}`;
	window.open(authUrl, "oauth", "width=720,height=720,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysOnTop=yes,alwaysRaised=yes");
	if (!setKey) {
		logger.debug("[PPIO OAuth] No setKey callback provided, returning early");
		return;
	}
	logger.debug("[PPIO OAuth] Setting up protocol listener");
	return new Promise((resolve, reject) => {
		const removeListener = ipcApi.on("navigation.protocol_data", async (data) => {
			try {
				const url = new URL(data.url);
				if (!new URLSearchParams(url.search).get("code")) {
					reject(/* @__PURE__ */ new Error("No authorization code received"));
					return;
				}
				reject(/* @__PURE__ */ new Error("PPIO_APP_SECRET not configured. Please set RENDERER_VITE_PPIO_APP_SECRET environment variable."));
				return;
			} catch (error) {
				logger.error("[PPIO OAuth] Error processing callback:", error);
				reject(error);
			} finally {
				removeListener();
			}
		});
	});
};
const oauthWith302AI = async (setKey) => {
	const popup = window.open("https://dash.302.ai/sso/login?app=cherry-ai.com&name=Cherry%20Studio", "oauth", "width=720,height=720,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysOnTop=yes,alwaysRaised=yes");
	const messageHandler = (event) => {
		if (event.data && event.data.data.apikey !== void 0) {
			setKey(event.data.data.apikey);
			popup?.close();
			window.removeEventListener("message", messageHandler);
		}
	};
	window.removeEventListener("message", messageHandler);
	window.addEventListener("message", messageHandler);
};
const oauthWithAiOnly = async (setKey) => {
	const popup = window.open(`https://maas.aiionly.com/login?inviteCode=1755481173663DrZBBOC0&cherryCode=01`, "login", "width=720,height=720,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysOnTop=yes,alwaysRaised=yes");
	const messageHandler = (event) => {
		if (event.data.length > 0 && event.data[0]["secretKey"] !== void 0) {
			setKey(event.data[0]["secretKey"]);
			popup?.close();
			window.removeEventListener("message", messageHandler);
		}
	};
	window.removeEventListener("message", messageHandler);
	window.addEventListener("message", messageHandler);
};
const oauthWithCherryIn = async (setKey, config) => {
	const { oauthServer, apiHost } = config;
	const { authUrl, state } = await ipcApi.request("oauth.start_deep_link_flow", {
		providerId: SystemProviderIds.cherryin,
		oauthServer,
		apiHost
	});
	logger.debug("Opening authorization URL");
	window.open(authUrl, "oauth", "width=720,height=720,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysOnTop=yes,alwaysRaised=yes");
	return new Promise((resolve, reject) => {
		let timeoutId = null;
		const removeListener = ipcApi.on("oauth.deep_link_result", async (result) => {
			if (result.state !== state) return;
			cleanup();
			if ("error" in result) {
				logger.error(`OAuth error: ${result.error}`);
				reject(new Error(result.error));
				return;
			}
			if (!result.apiKeys) {
				reject(/* @__PURE__ */ new Error("No API keys received"));
				return;
			}
			logger.debug("Successfully obtained API keys");
			try {
				await setKey(result.apiKeys);
			} catch (err) {
				reject(err);
				return;
			}
			resolve(result.apiKeys);
		});
		function cleanup() {
			removeListener();
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
		}
		timeoutId = setTimeout(() => {
			logger.warn("Flow timed out");
			cleanup();
			reject(/* @__PURE__ */ new Error("OAuth flow timed out"));
		}, 600 * 1e3);
	});
};
const providerCharge = async (provider) => {
	const { url, width, height } = {
		silicon: {
			url: "https://cloud.siliconflow.cn/expensebill",
			width: 900,
			height: 700
		},
		aihubmix: {
			url: `https://console.inferera.com/topup?client_id=cherry_studio_oauth&lang=${await getLanguageCode()}&aff=SJyh`,
			width: 720,
			height: 900
		},
		ppio: {
			url: "https://ppio.com/user/register?invited_by=JYT9GD&utm_source=github_cherry-studio&redirect=/billing",
			width: 900,
			height: 700
		},
		"302ai": {
			url: "https://dash.302.ai/charge",
			width: 900,
			height: 700
		},
		aionly: {
			url: `https://maas.aiionly.com/recharge`,
			width: 900,
			height: 700
		}
	}[provider];
	window.open(url, "oauth", `width=${width},height=${height},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysOnTop=yes,alwaysRaised=yes`);
};
const providerBills = async (provider) => {
	const { url, width, height } = {
		silicon: {
			url: "https://cloud.siliconflow.cn/bills",
			width: 900,
			height: 700
		},
		aihubmix: {
			url: `https://console.inferera.com/statistics?client_id=cherry_studio_oauth&lang=${await getLanguageCode()}&aff=SJyh`,
			width: 900,
			height: 700
		},
		ppio: {
			url: "https://ppio.com/user/register?invited_by=JYT9GD&utm_source=github_cherry-studio&redirect=/billing/billing-details",
			width: 900,
			height: 700
		},
		"302ai": {
			url: "https://dash.302.ai/charge",
			width: 900,
			height: 700
		},
		aionly: {
			url: `https://maas.aiionly.com/billManagement`,
			width: 900,
			height: 700
		}
	}[provider];
	window.open(url, "oauth", `width=${width},height=${height},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysOnTop=yes,alwaysRaised=yes`);
};
export { oauthWithPPIO as a, providerCharge as c, oauthWithCherryIn as i, oauthWithAiOnly as n, oauthWithSiliconFlow as o, oauthWithAihubmix as r, providerBills as s, oauthWith302AI as t };
