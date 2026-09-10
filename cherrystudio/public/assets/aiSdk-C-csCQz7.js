import { n as _enum } from "./schemas-1oAyIgyK.js";
import { b as REASONING_EFFORT, w as objectValues } from "./model-BOGgSmTN.js";
const ReasoningEffortOptionSchema = _enum(["default", ...objectValues(REASONING_EFFORT)]);
_enum([
	"maxOutputTokens",
	"temperature",
	"topP",
	"topK",
	"presencePenalty",
	"frequencyPenalty",
	"stopSequences",
	"seed"
]);
export { ReasoningEffortOptionSchema as t };
