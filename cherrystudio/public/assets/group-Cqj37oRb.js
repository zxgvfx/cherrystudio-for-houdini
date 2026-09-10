import { C as string, D as uuid, M as datetime, O as uuidv4, S as strictObject, k as uuidv7, n as _enum, w as union } from "./schemas-1oAyIgyK.js";
import { r as UniqueModelIdSchema } from "./model-BOGgSmTN.js";
const EntityTypeSchema = _enum([
	"assistant",
	"topic",
	"model",
	"agent",
	"knowledge",
	"session"
]);
union([
	uuidv4(),
	uuid({ version: "v5" }),
	uuidv7(),
	UniqueModelIdSchema
]);
const GroupIdSchema = uuidv4();
const GroupNameSchema = string().trim().min(1);
GroupNameSchema.max(64);
strictObject({
	id: GroupIdSchema,
	entityType: EntityTypeSchema,
	name: GroupNameSchema,
	orderKey: string().min(1),
	createdAt: datetime(),
	updatedAt: datetime()
});
export { GroupNameSchema as n, GroupIdSchema as t };
