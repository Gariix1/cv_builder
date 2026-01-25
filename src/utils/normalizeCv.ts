import type {
  CV,
  Certificate,
  Education,
  Experience,
  PersonalInfo,
  Profile,
  SkillGroup,
} from "../models/cv.schema";
import { DEFAULT_CV } from "../models/cv.schema";
import { createId } from "./id";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const normalizeString = (value: unknown, fallback: string) => {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
};

const normalizeOptionalString = (value: unknown, fallback?: string) => {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
};

const normalizeStringArray = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .map((item) => normalizeOptionalString(item, ""))
    .map((item) => (item ?? "").trim())
    .filter(Boolean);
};

const normalizeProfile = (value: unknown, fallback: Profile): Profile => {
  const data = isRecord(value) ? value : {};

  return {
    fullName: normalizeString(data.fullName, fallback.fullName),
    title: normalizeString(data.title, fallback.title),
    subtitle: normalizeOptionalString(data.subtitle, fallback.subtitle),
    photo: normalizeOptionalString(data.photo, fallback.photo),
    summary: normalizeString(data.summary, fallback.summary),
  };
};

const normalizePersonal = (
  value: unknown,
  fallback: PersonalInfo,
): PersonalInfo => {
  const data = isRecord(value) ? value : {};

  return {
    city: normalizeString(data.city, fallback.city),
    country: normalizeString(data.country, fallback.country),
    phone: normalizeString(data.phone, fallback.phone),
    email: normalizeString(data.email, fallback.email),
    linkedin: normalizeOptionalString(data.linkedin, fallback.linkedin),
    github: normalizeOptionalString(data.github, fallback.github),
    website: normalizeOptionalString(data.website, fallback.website),
  };
};

const normalizeExperience = (value: unknown): Experience => {
  const data = isRecord(value) ? value : {};

  return {
    id: normalizeOptionalString(data.id) ?? createId(),
    company: normalizeString(data.company, ""),
    role: normalizeString(data.role, ""),
    startDate: normalizeString(data.startDate, ""),
    endDate: normalizeOptionalString(data.endDate),
    description: normalizeString(data.description, ""),
    bullets: normalizeStringArray(data.bullets),
    techStack: normalizeStringArray(data.techStack),
  };
};

const normalizeEducationStatus = (value: unknown, fallback: Education["status"]) =>
  value === "completed" || value === "in-progress" ? value : fallback;

const normalizeEducation = (value: unknown): Education => {
  const data = isRecord(value) ? value : {};

  return {
    id: normalizeOptionalString(data.id) ?? createId(),
    institution: normalizeString(data.institution, ""),
    degree: normalizeString(data.degree, ""),
    startDate: normalizeString(data.startDate, ""),
    endDate: normalizeOptionalString(data.endDate),
    status: normalizeEducationStatus(data.status, "in-progress"),
  };
};

const normalizeCertificate = (value: unknown): Certificate => {
  const data = isRecord(value) ? value : {};

  return {
    id: normalizeOptionalString(data.id) ?? createId(),
    name: normalizeString(data.name, ""),
    issuer: normalizeString(data.issuer, ""),
    year: normalizeString(data.year, ""),
    link: normalizeOptionalString(data.link),
  };
};

const normalizeSkillGroup = (value: unknown): SkillGroup => {
  const data = isRecord(value) ? value : {};

  return {
    id: normalizeOptionalString(data.id) ?? createId(),
    category: normalizeString(data.category, ""),
    skills: normalizeStringArray(data.skills),
  };
};

const normalizeList = <T,>(
  value: unknown,
  fallback: T[],
  normalizeItem: (item: unknown) => T,
) => {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.map((item) => normalizeItem(item));
};

export const normalizeCV = (input: unknown, fallback: CV = DEFAULT_CV): CV => {
  const data = isRecord(input) ? input : {};

  return {
    profile: normalizeProfile(data.profile, fallback.profile),
    personal: normalizePersonal(data.personal, fallback.personal),
    experience: normalizeList(
      data.experience,
      fallback.experience,
      normalizeExperience,
    ),
    education: normalizeList(
      data.education,
      fallback.education,
      normalizeEducation,
    ),
    certificates: normalizeList(
      data.certificates,
      fallback.certificates,
      normalizeCertificate,
    ),
    skills: normalizeList(data.skills, fallback.skills, normalizeSkillGroup),
  };
};
