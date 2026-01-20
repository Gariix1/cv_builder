import { useCVStore } from "../../store/cvStore";
import { useI18n } from "../../i18n";
import { EditorListSection } from "./EditorListSection";
import { ExperienceCard } from "./ExperienceCard";

export const ExperienceEditor = () => {
  const { t } = useI18n();
  const experiences = useCVStore((state) => state.cv.experience);
  const addExperience = useCVStore((state) => state.actions.experience.add);

  return (
    <EditorListSection
      title={t("sectionExperience")}
      description={t("editorDescriptionExperience")}
      items={experiences}
      addLabel={t("editorAddExperience")}
      onAdd={addExperience}
      emptyState={t("editorEmptyExperience")}
      renderItem={(item, index, total) => (
        <ExperienceCard
          key={item.id}
          item={item}
          index={index}
          total={total}
        />
      )}
    />
  );
};
