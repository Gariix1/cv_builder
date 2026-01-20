import type { PersonalInfo, Profile } from "../../../models/cv.schema";
import { validateEmail, validateUrl } from "../../../utils/validation";
import type { FieldDescriptor } from "../FieldGrid";

export type ProfileFieldValues = Pick<Profile, "fullName" | "title" | "subtitle">;

export const PROFILE_FIELDS: Array<FieldDescriptor<ProfileFieldValues>> = [
  {
    key: "fullName",
    labelKey: "fieldFullNameLabel",
    placeholderKey: "fieldFullNamePlaceholder",
    required: true,
  },
  {
    key: "title",
    labelKey: "fieldTitleLabel",
    placeholderKey: "fieldTitlePlaceholder",
    required: true,
  },
  {
    key: "subtitle",
    labelKey: "fieldSubtitleLabel",
    placeholderKey: "fieldSubtitlePlaceholder",
  },
];

export const PERSONAL_FIELDS: Array<FieldDescriptor<PersonalInfo>> = [
  { key: "city", labelKey: "fieldCityLabel", placeholderKey: "fieldCityPlaceholder" },
  {
    key: "country",
    labelKey: "fieldCountryLabel",
    placeholderKey: "fieldCountryPlaceholder",
  },
  {
    key: "phone",
    labelKey: "fieldPhoneLabel",
    placeholderKey: "fieldPhonePlaceholder",
    type: "tel",
  },
  {
    key: "email",
    labelKey: "fieldEmailLabel",
    placeholderKey: "fieldEmailPlaceholder",
    type: "email",
    required: true,
    validate: (value) => validateEmail(value),
  },
  {
    key: "linkedin",
    labelKey: "fieldLinkedInLabel",
    placeholderKey: "fieldLinkedInPlaceholder",
    validate: (value) => validateUrl(value),
  },
  {
    key: "github",
    labelKey: "fieldGitHubLabel",
    placeholderKey: "fieldGitHubPlaceholder",
    validate: (value) => validateUrl(value),
  },
  {
    key: "website",
    labelKey: "fieldWebsiteLabel",
    placeholderKey: "fieldWebsitePlaceholder",
    type: "url",
    validate: (value) => validateUrl(value),
  },
];
