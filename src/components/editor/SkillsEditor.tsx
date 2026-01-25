import { useCVStore } from "../../store/cvStore";
import { useI18n } from "../../i18n";
import { EditorListSection } from "./EditorListSection";
import { SkillGroupCard } from "./SkillGroupCard";

export const SkillsEditor = () => {
  const { t } = useI18n();
  const skills = useCVStore((state) => state.cv.skills);
  const addSkillGroup = useCVStore((state) => state.actions.skills.add);

  return (
    <EditorListSection
      title={t("sectionSkills")}
      description={t("editorDescriptionSkills")}
      items={skills}
      addLabel={t("editorAddSkillGroup")}
      onAdd={addSkillGroup}
      emptyState={t("editorEmptySkills")}
      renderItem={(item, index, total) => (
        <SkillGroupCard
          key={item.id}
          item={item}
          index={index}
          total={total}
        />
      )}
    />
  );
};
