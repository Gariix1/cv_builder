import { useCVStore } from "../../store/cvStore";
import { useI18n } from "../../i18n";
import { EditorListSection } from "./EditorListSection";
import { EducationCard } from "./EducationCard";

export const EducationEditor = () => {
  const { t } = useI18n();
  const education = useCVStore((state) => state.cv.education);
  const addEducation = useCVStore((state) => state.actions.education.add);

  return (
    <EditorListSection
      title={t("sectionEducation")}
      description={t("editorDescriptionEducation")}
      items={education}
      addLabel={t("editorAddEducation")}
      onAdd={addEducation}
      emptyState={t("editorEmptyEducation")}
      renderItem={(item, index, total) => (
        <EducationCard
          key={item.id}
          item={item}
          index={index}
          total={total}
        />
      )}
    />
  );
};
