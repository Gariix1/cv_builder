import { useI18n } from "../../../i18n";
import type { Experience } from "../../../models/cv.schema";
import { CVSectionList, TagList } from "../../../components/sections";
import { hasText } from "../../../utils/validation";

interface ExperienceSectionProps {
  experience: Experience[];
}

export const hasExperienceContent = (item: Experience) =>
  hasText(item.role) ||
  hasText(item.company) ||
  hasText(item.startDate) ||
  hasText(item.endDate) ||
  hasText(item.description) ||
  item.bullets.some(hasText) ||
  item.techStack.some(hasText);

const ExperienceItem = ({ item }: { item: Experience }) => {
  const showHeader =
    hasText(item.role) ||
    hasText(item.company) ||
    hasText(item.startDate) ||
    hasText(item.endDate);
  const visibleBullets = item.bullets.filter(hasText);
  return (
    <article className="cv-experience">
      {showHeader ? (
        <div className="cv-experience__header">
          <div>
            {hasText(item.role) ? (
              <p className="cv-experience__role">{item.role}</p>
            ) : null}
            {hasText(item.company) ? (
              <p className="cv-experience__company">{item.company}</p>
            ) : null}
          </div>
          {hasText(item.startDate) || hasText(item.endDate) ? (
            <p className="cv-experience__dates">
              {item.startDate}
              {item.endDate ? ` - ${item.endDate}` : ""}
            </p>
          ) : null}
        </div>
      ) : null}
      {item.description ? (
        <p className="cv-experience__description">{item.description}</p>
      ) : null}
      {visibleBullets.length > 0 ? (
        <ul className="cv-experience__bullets">
          {visibleBullets.map((bullet, index) => (
            <li key={`${item.id}-bullet-${index}`}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      <TagList items={item.techStack} />
    </article>
  );
};

export const getVisibleExperience = (experience: Experience[]) =>
  experience.filter(hasExperienceContent);

export const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  const { t } = useI18n();
  const visibleItems = getVisibleExperience(experience);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <CVSectionList
      title={t("sectionExperience")}
      items={visibleItems}
      className="cv-experience-list"
      renderItem={(item) => <ExperienceItem key={item.id} item={item} />}
    />
  );
};
