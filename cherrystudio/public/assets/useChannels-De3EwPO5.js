import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { i as formatErrorMessageWithPrefix } from "./error-DgGhUgCT.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { c as useQuery, o as useMutation } from "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DKTI9lZN.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useChannels");
var EMPTY_CHANNELS = Object.freeze([]);
const useChannels = (type) => {
	const { t } = useTranslation();
	const { data, error, isLoading, refetch, mutate } = useQuery("/agent-channels", {
		query: type ? { type } : void 0,
		swrOptions: { keepPreviousData: false }
	});
	const channels = data ?? EMPTY_CHANNELS;
	const { trigger: createTrigger } = useMutation("POST", "/agent-channels", { refresh: ["/agent-channels"] });
	const createChannel = (0, import_react.useCallback)(async (channelData) => {
		try {
			return await createTrigger({ body: channelData });
		} catch (err) {
			logger.error("Failed to create channel", err);
			toast.error(formatErrorMessageWithPrefix(err, t("agent.channels.createError")));
			return null;
		}
	}, [createTrigger, t]);
	const { trigger: updateTrigger } = useMutation("PATCH", "/agent-channels/:channelId", { refresh: ({ args }) => ["/agent-channels", `/agent-channels/${args?.params.channelId}`] });
	const updateChannel = (0, import_react.useCallback)(async (id, updates) => {
		try {
			return await updateTrigger({
				params: { channelId: id },
				body: updates
			});
		} catch (err) {
			logger.error("Failed to update channel", err);
			toast.error(formatErrorMessageWithPrefix(err, t("agent.channels.updateError")));
			return null;
		}
	}, [updateTrigger, t]);
	const { trigger: deleteTrigger } = useMutation("DELETE", "/agent-channels/:channelId", { refresh: ["/agent-channels"] });
	return {
		channels,
		error,
		isLoading,
		refetch,
		mutate,
		createChannel,
		updateChannel,
		deleteChannel: (0, import_react.useCallback)(async (id) => {
			try {
				await deleteTrigger({ params: { channelId: id } });
			} catch (err) {
				logger.error("Failed to delete channel", err);
				toast.error(formatErrorMessageWithPrefix(err, t("agent.channels.deleteError")));
			}
		}, [deleteTrigger, t])
	};
};
export { useChannels as t };
