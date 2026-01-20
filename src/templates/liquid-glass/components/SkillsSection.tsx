import { useI18n } from "../../../i18n";
import type { SkillGroup } from "../../../models/cv.schema";
import { CVSectionList, TagList } from "../../../components/sections";
import { hasText } from "../../../utils/validation";

interface SkillsSectionProps {
  skills: SkillGroup[];
}

const SkillGroupItem = ({ group }: { group: SkillGroup }) => (
  <div className="cv-skill-group">
    <p className="cv-skill-category">{group.category}</p>
    <TagList items={group.skills} />
  </div>
);

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const { t } = useI18n();
  const visibleGroups = skills.filter(
    (group) => hasText(group.category) || group.skills.length > 0,
  );

  return (
    <CVSectionList
      title={t("sectionSkills")}
      items={visibleGroups}
      className="cv-skill-groups"
      renderItem={(group, index) => (
        <SkillGroupItem key={`${group.category}-${index}`} group={group} />
      )}
    />
  );
};
