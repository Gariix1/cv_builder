import type { ReactNode } from "react";

import { useI18n, type TranslationKey } from "../../../i18n";
import type { PersonalInfo } from "../../../models/cv.schema";
import { CVSectionList } from "../../../components/sections";

interface ContactSectionProps {
  personal: PersonalInfo;
}

type ContactType =
  | "location"
  | "phone"
  | "email"
  | "linkedin"
  | "github"
  | "website";

interface ContactItem {
  label: string;
  value: string;
  type: ContactType;
}

const icons: Record<ContactType, ReactNode> = {
  location: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 13.5c1.93 0 3.5-1.57 3.5-3.5S13.93 6.5 12 6.5 8.5 8.07 8.5 10s1.57 3.5 3.5 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.5 4.5h3l1.5 4-2 1.5a12.5 12.5 0 0 0 5.5 5.5l1.5-2 4 1.5v3a1 1 0 0 1-1 1A15 15 0 0 1 5.5 5.5a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 6.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m4 7 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.5 9.5h3v8h-3zM8 6.5a1.5 1.5 0 1 0 0 .01Z"
        fill="currentColor"
      />
      <path
        d="M13 9.5h2.6v1.1a3.1 3.1 0 0 1 2.8-1.3c2 0 3.6 1.4 3.6 4v4.2h-3v-3.8c0-1.2-.6-2-1.7-2s-1.8.8-1.8 2v3.8h-3z"
        fill="currentColor"
      />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.08.5-.18.5-.4v-1.4c-2.1.46-2.6-1-2.6-1-.35-.9-.86-1.1-.86-1.1-.7-.48.05-.47.05-.47.78.06 1.2.8 1.2.8.68 1.2 1.8.86 2.2.66.07-.5.27-.86.5-1.06-1.7-.2-3.5-.86-3.5-3.8 0-.84.3-1.5.8-2.05-.08-.2-.35-1 .08-2.08 0 0 .66-.2 2.1.8a7 7 0 0 1 3.8 0c1.45-1 2.1-.8 2.1-.8.43 1.08.16 1.88.08 2.08.5.54.8 1.2.8 2.05 0 2.95-1.8 3.6-3.5 3.8.28.24.53.72.53 1.45v2.15c0 .22.14.5.52.4A8.5 8.5 0 0 0 12 3.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4.5 12h15M12 3.5c2.5 3 2.5 14 0 17M12 3.5c-2.5 3-2.5 14 0 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

const ContactIcon = ({ type }: { type: ContactType }) => (
  <span className="cv-contact-icon" aria-hidden="true">
    {icons[type]}
  </span>
);

const ContactItem = ({ item }: { item: ContactItem }) => (
  <div className="cv-contact-item">
    <ContactIcon type={item.type} />
    <div className="cv-contact-content">
      <span className="cv-contact-label">{item.label}</span>
      <span className="cv-contact-value">{item.value}</span>
    </div>
  </div>
);

export const buildContactItems = (
  personal: PersonalInfo,
  t: (key: TranslationKey) => string,
): ContactItem[] => {
  const location = [personal.city, personal.country].filter(Boolean).join(", ");
  return [
    { label: t("contactLocationLabel"), value: location, type: "location" },
    { label: t("contactPhoneLabel"), value: personal.phone, type: "phone" },
    { label: t("contactEmailLabel"), value: personal.email, type: "email" },
    { label: t("contactLinkedInLabel"), value: personal.linkedin, type: "linkedin" },
    { label: t("contactGithubLabel"), value: personal.github, type: "github" },
    { label: t("contactWebsiteLabel"), value: personal.website, type: "website" },
  ].filter((item) => item.value) as ContactItem[];
};

export const ContactSectionList = ({
  title,
  items,
}: {
  title: string;
  items: ContactItem[];
}) => {
  return (
    <CVSectionList
      title={title}
      items={items}
      className="cv-contact-list"
      renderItem={(item) => <ContactItem key={item.label} item={item} />}
    />
  );
};

export const ContactSection = ({ personal }: ContactSectionProps) => {
  const { t } = useI18n();
  const items = buildContactItems(personal, t);

  return <ContactSectionList title={t("sectionContact")} items={items} />;
};

export type { ContactItem };
