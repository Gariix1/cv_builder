import { useI18n } from "../../i18n";
import type { Education } from "../../models/cv.schema";
import { useCVStore } from "../../store/cvStore";
import { EditorCard } from "./EditorCard";
import { EditorItemActions } from "./EditorItemActions";
import { FieldGrid } from "./FieldGrid";
import {
  EDUCATION_FIELDS,
  EDUCATION_STATUS_OPTIONS,
  type EducationFieldValues,
} from "./config/educationFields";
import { SelectInput } from "../ui";

interface EducationCardProps {
  item: Education;
  index: number;
  total: number;
}

export const EducationCard = ({
  item,
  index,
  total,
}: EducationCardProps) => {
  const { t } = useI18n();
  const updateEducation = useCVStore((state) => state.actions.education.update);
  const removeEducation = useCVStore((state) => state.actions.education.remove);
  const moveEducation = useCVStore((state) => state.actions.education.move);

  const onFieldChange = (field: keyof EducationFieldValues, value: string) => {
    updateEducation(item.id, { [field]: value } as Partial<Education>);
  };

  const fieldValues: EducationFieldValues = {
    institution: item.institution,
    degree: item.degree,
    startDate: item.startDate,
    endDate: item.endDate,
  };

  const statusOptions = EDUCATION_STATUS_OPTIONS.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));

  return (
    <EditorCard
      title={`${t("sectionEducation")} ${index + 1}`}
      meta={item.institution || t("editorMetaNewEducation")}
      actions={
        <EditorItemActions
          onMoveUp={() => moveEducation(item.id, "up")}
          onMoveDown={() => moveEducation(item.id, "down")}
          onRemove={() => removeEducation(item.id)}
          disableUp={index === 0}
          disableDown={index === total - 1}
        />
      }
    >
      <FieldGrid
        fields={EDUCATION_FIELDS}
        values={fieldValues}
        onChange={onFieldChange}
        keyPrefix={item.id}
      />
      <SelectInput
        label={t("fieldStatusLabel")}
        value={item.status}
        options={statusOptions}
        required
        onChange={(event) =>
          updateEducation(item.id, {
            status: event.target.value as Education["status"],
          })
        }
      />
    </EditorCard>
  );
};
