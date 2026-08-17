import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { i as formatErrorMessageWithPrefix } from "./error-B2Op57SY.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { c as useQuery, o as useMutation } from "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
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
