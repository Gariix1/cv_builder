import type { Education } from "../../../models/cv.schema";
import { validateYear } from "../../../utils/validation";
import type { FieldDescriptor } from "../FieldGrid";

export type EducationFieldValues = Pick<
  Education,
  "institution" | "degree" | "startDate" | "endDate"
>;

export const EDUCATION_FIELDS: Array<FieldDescriptor<EducationFieldValues>> = [
  {
    key: "institution",
    labelKey: "fieldInstitutionLabel",
    placeholderKey: "fieldInstitutionPlaceholder",
    required: true,
  },
  {
    key: "degree",
    labelKey: "fieldDegreeLabel",
    placeholderKey: "fieldDegreePlaceholder",
    required: true,
  },
  {
    key: "startDate",
    labelKey: "fieldStartDateLabel",
    placeholderKey: "fieldStartDatePlaceholder",
    validate: (value) => validateYear(value),
  },
  {
    key: "endDate",
    labelKey: "fieldEndDateLabel",
    placeholderKey: "fieldEndDatePlaceholder",
    validate: (value) => validateYear(value),
  },
];

export const EDUCATION_STATUS_OPTIONS = [
  { labelKey: "fieldStatusCompleted", value: "completed" },
  { labelKey: "fieldStatusInProgress", value: "in-progress" },
] as const;
