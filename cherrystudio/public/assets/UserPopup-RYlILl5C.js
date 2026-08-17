import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { C as string, D as uuid, O as uuidv4, S as strictObject, _ as object, c as discriminatedUnion, n as _enum, p as literal, u as int } from "./schemas-CV_EtlSZ.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import { n as UiDataSlot } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { r as AvatarImage, t as Avatar } from "./avatar-DSfDf9Q4.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { n as emoji_avatar_default, t as EmojiPicker_default } from "./EmojiPicker-Bc4FQRGq.js";
import { a as RowFlex, n as Center, r as ColFlex } from "./flex-Cbul8ND0.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { i as SafeExtSchema, t as AbsoluteFilePathSchema } from "./file-BaEpIJyZ.js";
import { b as CanonicalFilePathSchema, r as toFileUrl } from "./file-C52KaMrN.js";
import { r as MessageIdSchema } from "./message-B_yl0O_K.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { n as createPopup } from "./popup-BLG-Gue5.js";
import { o as isEmoji } from "./naming-C7JIUN29.js";
import { p as prepareEntityImageBytes, s as checkEntityImageSize } from "./image-BfuhOMOH.js";
const TimestampSchema = int().nonnegative();
const ContentHashSchema = string().regex(/^([a-z0-9]+(?:-[a-z0-9]+)*):([0-9a-f]+)$/, "contentHash must be `{algorithm}:{lowercase hex}`").brand();
const SafeNameSchema = string().min(1).max(255).refine((s) => !s.includes("\0"), "Name must not contain null bytes").refine((s) => !/[/\\]/.test(s), "Name must not contain path separators").refine((s) => !/^\.\.?$/.test(s), "Name must not be . or ..").refine((s) => s.trim().length > 0, "Name must not be all whitespace");
const FileEntryIdSchema = uuid();
_enum(["internal", "external"]);
const CleanupPolicySchema = _enum(["manual", "delete_when_unreferenced"]);
var CommonEntryFields = {
	id: FileEntryIdSchema,
	name: SafeNameSchema,
	ext: SafeExtSchema.nullable(),
	cleanupPolicy: CleanupPolicySchema,
	createdAt: TimestampSchema,
	updatedAt: TimestampSchema
};
discriminatedUnion("origin", [strictObject({
	...CommonEntryFields,
	origin: literal("internal"),
	size: int().nonnegative(),
	contentHash: ContentHashSchema.nullable(),
	deletedAt: TimestampSchema.optional()
}), strictObject({
	...CommonEntryFields,
	origin: literal("external"),
	externalPath: CanonicalFilePathSchema
})]).brand();
_enum([
	"present",
	"missing",
	"unknown"
]);
discriminatedUnion("kind", [strictObject({
	kind: literal("entry"),
	entryId: FileEntryIdSchema
}), strictObject({
	kind: literal("path"),
	path: AbsoluteFilePathSchema
})]);
const refCommonFields = Object.freeze({
	id: uuidv4(),
	fileEntryId: FileEntryIdSchema,
	createdAt: TimestampSchema,
	updatedAt: TimestampSchema
});
const createRefSchema = (shape) => object({
	...refCommonFields,
	...shape
});
const chatMessageSourceType = "chat_message";
const chatMessageRoleSchema = _enum(["attachment", "tool_output"]);
const chatMessageFileRefSchema = createRefSchema({
	sourceType: literal(chatMessageSourceType),
	sourceId: MessageIdSchema,
	role: chatMessageRoleSchema
});
const agentSessionMessageSourceType = "agent_session_message";
const agentSessionMessageRoleSchema = _enum(["attachment"]);
const agentSessionMessageFileRefSchema = createRefSchema({
	sourceType: literal(agentSessionMessageSourceType),
	sourceId: MessageIdSchema,
	role: agentSessionMessageRoleSchema
});
const paintingSourceType = "painting";
const paintingRoleSchema = _enum(["output", "input"]);
const paintingFileRefSchema = createRefSchema({
	sourceType: literal(paintingSourceType),
	sourceId: uuidv4(),
	role: paintingRoleSchema
});
const jobRoleSchema = _enum(["input", "mask"]);
const jobFileRefSchema = createRefSchema({
	sourceType: literal("job"),
	sourceId: uuid(),
	role: jobRoleSchema
});
function defineSingleFileRef(sourceType) {
	const refFields = {
		sourceType: literal(sourceType),
		sourceId: string().min(1)
	};
	return {
		sourceType,
		refFields,
		schema: object({
			...refCommonFields,
			...refFields
		})
	};
}
const providerLogoRef = defineSingleFileRef("provider_logo");
const miniAppLogoRef = defineSingleFileRef("mini_app_logo");
_enum([
	chatMessageSourceType,
	agentSessionMessageSourceType,
	paintingSourceType,
	"job",
	providerLogoRef.sourceType,
	miniAppLogoRef.sourceType
]);
discriminatedUnion("sourceType", [
	chatMessageFileRefSchema,
	agentSessionMessageFileRefSchema,
	paintingFileRefSchema,
	jobFileRefSchema,
	providerLogoRef.schema,
	miniAppLogoRef.schema
]);
var import_react = /* @__PURE__ */ __toESM(require_react());
function avatarStoredId(avatar) {
	if (!avatar || !avatar.startsWith("file:") || avatar.startsWith("file://")) return void 0;
	return avatar.slice(5);
}
function useAvatar() {
	const [avatar] = usePreference("app.user.avatar");
	const [resolvedSrc, setResolvedSrc] = (0, import_react.useState)();
	const storedId = avatarStoredId(avatar);
	(0, import_react.useEffect)(() => {
		if (!storedId) {
			setResolvedSrc(void 0);
			return;
		}
		let active = true;
		ipcApi.request("file.batch_get_physical_paths", { ids: [storedId] }).then((paths) => {
			if (!active) return;
			const path = paths[storedId];
			setResolvedSrc(path ? toFileUrl(path) : void 0);
		}).catch(() => {
			if (active) setResolvedSrc(void 0);
		});
		return () => {
			active = false;
		};
	}, [storedId]);
	if (storedId) return resolvedSrc ?? "data:image/svg+xml,%3csvg%20width='1158'%20height='1158'%20viewBox='0%200%201158%201158'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='1158'%20height='1158'%20fill='%237EDBC2'%20fill-opacity='0.25'/%3e%3ccircle%20cx='579.5'%20cy='447'%20r='202'%20fill='%2349B8A3'%20fill-opacity='0.97'/%3e%3cpath%20d='M579.5%20689C796.272%20689%20972%20864.728%20972%201081.5C972%201081.67%20971.998%201081.83%20971.998%201082H972V1158H187V1082H187.002C187.002%201081.83%20187%201081.67%20187%201081.5C187%20864.728%20362.728%20689%20579.5%20689Z'%20fill='%236ACBB9'%20fill-opacity='0.42'/%3e%3c/svg%3e";
	return avatar || "data:image/svg+xml,%3csvg%20width='1158'%20height='1158'%20viewBox='0%200%201158%201158'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='1158'%20height='1158'%20fill='%237EDBC2'%20fill-opacity='0.25'/%3e%3ccircle%20cx='579.5'%20cy='447'%20r='202'%20fill='%2349B8A3'%20fill-opacity='0.97'/%3e%3cpath%20d='M579.5%20689C796.272%20689%20972%20864.728%20972%201081.5C972%201081.67%20971.998%201081.83%20971.998%201082H972V1158H187V1082H187.002C187.002%201081.83%20187%201081.67%20187%201081.5C187%20864.728%20362.728%20689%20579.5%20689Z'%20fill='%236ACBB9'%20fill-opacity='0.42'/%3e%3c/svg%3e";
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var PopupContainer = ({ open, resolve }) => {
	const [userName, setUserName] = usePreference("app.user.name");
	const [avatarPopoverOpen, setAvatarPopoverOpen] = (0, import_react.useState)(false);
	const [avatarPopoverView, setAvatarPopoverView] = (0, import_react.useState)("menu");
	const fileInputRef = (0, import_react.useRef)(null);
	const { t } = useTranslation();
	const avatar = useAvatar();
	const onOpenChange = (nextOpen) => {
		if (!nextOpen) resolve({});
	};
	const handleEmojiClick = async (emoji) => {
		try {
			await ipcApi.request("profile.set_avatar", {
				kind: "emoji",
				emoji
			});
			setAvatarPopoverOpen(false);
			setAvatarPopoverView("menu");
		} catch (error) {
			toast.error(error.message);
		}
	};
	const handleReset = async () => {
		try {
			await ipcApi.request("profile.set_avatar", { kind: "default" });
			setAvatarPopoverOpen(false);
			setAvatarPopoverView("menu");
		} catch (error) {
			toast.error(error.message);
		}
	};
	const handleUploadAvatar = async (file) => {
		const sizeError = checkEntityImageSize(file);
		if (sizeError) {
			toast.error(sizeError);
			return;
		}
		try {
			const data = await prepareEntityImageBytes(file);
			await ipcApi.request("profile.set_avatar", {
				kind: "image",
				data
			});
			setAvatarPopoverOpen(false);
			setAvatarPopoverView("menu");
		} catch (error) {
			toast.error(error.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "w-[300px] gap-0 p-0 sm:max-w-[300px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "sr-only",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("settings.general.user_name.label") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
					className: "mt-[30px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColFlex, {
						className: "items-center gap-2.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							open: avatarPopoverOpen,
							onOpenChange: (visible) => {
								setAvatarPopoverOpen(visible);
								if (!visible) setAvatarPopoverView("menu");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									"aria-label": t("common.avatar"),
									className: "size-20 rounded-[25%] p-0 text-foreground shadow-none transition-opacity hover:bg-transparent hover:text-foreground hover:opacity-80 focus-visible:bg-transparent focus-visible:opacity-80",
									children: isEmoji(avatar) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(emoji_avatar_default, {
										size: 80,
										fontSize: 40,
										children: avatar
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
										className: "size-20 rounded-[25%]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
											src: avatar,
											className: "object-cover"
										})
									})
								}) })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								className: "w-auto p-2",
								align: "center",
								sideOffset: 6,
								children: avatarPopoverView === "emoji" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiPicker_default, { onEmojiClick: handleEmojiClick }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ColFlex, {
									className: "w-40 gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											ref: fileInputRef,
											className: "hidden",
											type: "file",
											accept: "image/png, image/jpeg, image/gif, image/webp",
											onChange: (event) => {
												const file = event.target.files?.[0];
												event.target.value = "";
												if (file) handleUploadAvatar(file);
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											className: "w-full justify-center",
											onClick: () => fileInputRef.current?.click(),
											children: t("settings.general.image_upload")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											className: "w-full justify-center",
											onClick: () => setAvatarPopoverView("emoji"),
											children: t("settings.general.emoji_picker")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											className: "w-full justify-center",
											onClick: () => void handleReset(),
											children: t("settings.general.avatar.reset")
										})
									]
								})
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowFlex, {
					className: "items-center gap-2.5 p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: t("settings.general.user_name.placeholder"),
						value: userName,
						onChange: (e) => setUserName(e.target.value.trim()),
						className: "w-full flex-1 text-center",
						maxLength: 30
					})
				})
			]
		})
	});
};
var UserPopup_default = createPopup(PopupContainer, { dismissResult: {} });
export { useAvatar as n, UserPopup_default as t };
