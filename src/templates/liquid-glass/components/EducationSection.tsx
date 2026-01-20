import { useI18n } from "../../../i18n";
import type { Education } from "../../../models/cv.schema";
import { CVSectionList } from "../../../components/sections";
import { hasText } from "../../../utils/validation";

interface EducationSectionProps {
  education: Education[];
}

const getStatusLabel = (
  status: Education["status"],
  t: (key: "fieldStatusCompleted" | "fieldStatusInProgress") => string,
) => (status === "completed" ? t("fieldStatusCompleted") : t("fieldStatusInProgress"));

export const hasEducationContent = (item: Education) =>
  hasText(item.institution) ||
  hasText(item.degree) ||
  hasText(item.startDate) ||
  hasText(item.endDate);

export const getVisibleEducation = (education: Education[]) =>
  education.filter(hasEducationContent);

const EducationItem = ({
  item,
  statusLabel,
}: {
  item: Education;
  statusLabel: string;
}) => (
  <div className="cv-education">
    <p className="cv-education__institution">{item.institution}</p>
    <p className="cv-education__degree">{item.degree}</p>
    <p className="cv-education__meta">
      {item.startDate}
      {item.endDate ? ` - ${item.endDate}` : ""} · {statusLabel}
    </p>
  </div>
);

export const EducationSection = ({ education }: EducationSectionProps) => {
  const { t } = useI18n();
  const visibleItems = getVisibleEducation(education);

  return (
    <CVSectionList
      title={t("sectionEducation")}
      items={visibleItems}
      className="cv-education-list"
      renderItem={(item) => (
        <EducationItem
          key={item.id}
          item={item}
          statusLabel={getStatusLabel(item.status, t)}
        />
      )}
    />
  );
};
