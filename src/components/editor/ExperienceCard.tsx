import type { ChangeEvent } from "react";

import { useI18n } from "../../i18n";
import type { Experience } from "../../models/cv.schema";
import { useCVStore } from "../../store/cvStore";
import { joinCommaList, joinLines, splitCommaList, splitLines } from "../../utils/textList";
import { TextInput, Textarea } from "../ui";
import { EditorCard } from "./EditorCard";
import { EditorItemActions } from "./EditorItemActions";
import { FieldGrid } from "./FieldGrid";
import {
  EXPERIENCE_FIELDS,
  type ExperienceFieldValues,
} from "./config/experienceFields";

interface ExperienceCardProps {
  item: Experience;
  index: number;
  total: number;
}

export const ExperienceCard = ({
  item,
  index,
  total,
}: ExperienceCardProps) => {
  const { t } = useI18n();
  const updateExperience = useCVStore((state) => state.actions.experience.update);
  const removeExperience = useCVStore((state) => state.actions.experience.remove);
  const moveExperience = useCVStore((state) => state.actions.experience.move);

  const onFieldValueChange = (field: keyof ExperienceFieldValues, value: string) => {
    updateExperience(item.id, { [field]: value } as Partial<Experience>);
  };

  const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateExperience(item.id, { description: event.target.value });
  };

  const onBulletsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateExperience(item.id, { bullets: splitLines(event.target.value) });
  };

  const onTechStackChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateExperience(item.id, { techStack: splitCommaList(event.target.value) });
  };

  const actions = (
    <EditorItemActions
      onMoveUp={() => moveExperience(item.id, "up")}
      onMoveDown={() => moveExperience(item.id, "down")}
      onRemove={() => removeExperience(item.id)}
      disableUp={index === 0}
      disableDown={index === total - 1}
    />
  );

  const fieldValues: ExperienceFieldValues = {
    company: item.company,
    role: item.role,
    startDate: item.startDate,
    endDate: item.endDate,
  };

  return (
    <EditorCard
      title={`${t("sectionExperience")} ${index + 1}`}
      meta={item.company || t("editorMetaNewRole")}
      actions={actions}
    >
      <FieldGrid
        fields={EXPERIENCE_FIELDS}
        values={fieldValues}
        onChange={onFieldValueChange}
        keyPrefix={item.id}
      />
      <Textarea
        label={t("fieldDescriptionLabel")}
        value={item.description}
        onChange={onDescriptionChange}
        placeholder={t("fieldDescriptionPlaceholder")}
        rows={3}
      />
      <Textarea
        label={t("fieldBulletsLabel")}
        hint={t("fieldBulletsHint")}
        value={joinLines(item.bullets)}
        onChange={onBulletsChange}
        placeholder={t("fieldBulletsPlaceholder")}
        rows={3}
      />
      <TextInput
        label={t("fieldTechStackLabel")}
        hint={t("fieldTechStackHint")}
        value={joinCommaList(item.techStack)}
        onChange={onTechStackChange}
        placeholder={t("fieldTechStackPlaceholder")}
      />
    </EditorCard>
  );
};
