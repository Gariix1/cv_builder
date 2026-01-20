import type { SkillGroup } from "../../../models/cv.schema";
import type { FieldDescriptor } from "../FieldGrid";

export type SkillGroupFieldValues = Pick<SkillGroup, "category">;

export const SKILL_GROUP_FIELDS: Array<FieldDescriptor<SkillGroupFieldValues>> = [
  {
    key: "category",
    labelKey: "fieldCategoryLabel",
    placeholderKey: "fieldCategoryPlaceholder",
    required: true,
  },
];
