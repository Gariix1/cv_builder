import type { Certificate } from "../../../models/cv.schema";
import { validateUrl, validateYear } from "../../../utils/validation";
import type { FieldDescriptor } from "../FieldGrid";

export type CertificateFieldValues = Pick<
  Certificate,
  "name" | "issuer" | "year" | "link"
>;

export const CERTIFICATE_FIELDS: Array<FieldDescriptor<CertificateFieldValues>> = [
  {
    key: "name",
    labelKey: "fieldCertificateLabel",
    placeholderKey: "fieldCertificatePlaceholder",
    required: true,
  },
  {
    key: "issuer",
    labelKey: "fieldIssuerLabel",
    placeholderKey: "fieldIssuerPlaceholder",
    required: true,
  },
  {
    key: "year",
    labelKey: "fieldYearLabel",
    placeholderKey: "fieldYearPlaceholder",
    required: true,
    validate: (value) => validateYear(value),
  },
  {
    key: "link",
    labelKey: "fieldLinkLabel",
    placeholderKey: "fieldLinkPlaceholder",
    type: "url",
    validate: (value) => validateUrl(value),
  },
];
