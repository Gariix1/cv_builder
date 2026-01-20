import type { Experience } from "../../../models/cv.schema";
import type { FieldDescriptor } from "../FieldGrid";

export type ExperienceFieldValues = Pick<
  Experience,
  "company" | "role" | "startDate" | "endDate"
>;

export const EXPERIENCE_FIELDS: Array<FieldDescriptor<ExperienceFieldValues>> = [
  {
    key: "company",
    labelKey: "fieldCompanyLabel",
    placeholderKey: "fieldCompanyPlaceholder",
    required: true,
  },
  {
    key: "role",
    labelKey: "fieldRoleLabel",
    placeholderKey: "fieldRolePlaceholder",
    required: true,
  },
  {
    key: "startDate",
    labelKey: "fieldStartDateLabel",
    placeholderKey: "fieldStartDatePlaceholder",
  },
  {
    key: "endDate",
    labelKey: "fieldEndDateLabel",
    placeholderKey: "fieldEndDatePlaceholder",
  },
];
