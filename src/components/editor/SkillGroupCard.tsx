import type { ChangeEvent } from "react";

import { useI18n } from "../../i18n";
import type { SkillGroup } from "../../models/cv.schema";
import { useCVStore } from "../../store/cvStore";
import { joinLines, splitLines } from "../../utils/textList";
import { Textarea } from "../ui";
import { EditorCard } from "./EditorCard";
import { EditorItemActions } from "./EditorItemActions";
import { FieldGrid } from "./FieldGrid";
import {
  SKILL_GROUP_FIELDS,
  type SkillGroupFieldValues,
} from "./config/skillFields";

interface SkillGroupCardProps {
  item: SkillGroup;
  index: number;
  total: number;
}

export const SkillGroupCard = ({
  item,
  index,
  total,
}: SkillGroupCardProps) => {
  const { t } = useI18n();
  const updateSkillGroup = useCVStore((state) => state.actions.skills.update);
  const removeSkillGroup = useCVStore((state) => state.actions.skills.remove);
  const moveSkillGroup = useCVStore((state) => state.actions.skills.move);

  const onFieldChange = (
    field: keyof SkillGroupFieldValues,
    value: string,
  ) => {
    updateSkillGroup(index, { [field]: value } as Partial<SkillGroup>);
  };

  const onSkillsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateSkillGroup(index, { skills: splitLines(event.target.value) });
  };

  const fieldValues: SkillGroupFieldValues = {
    category: item.category,
  };

  return (
    <EditorCard
      title={`${t("editorSkillGroupLabel")} ${index + 1}`}
      meta={item.category || t("editorMetaNewGroup")}
      actions={
        <EditorItemActions
          onMoveUp={() => moveSkillGroup(index, "up")}
          onMoveDown={() => moveSkillGroup(index, "down")}
          onRemove={() => removeSkillGroup(index)}
          disableUp={index === 0}
          disableDown={index === total - 1}
        />
      }
    >
      <FieldGrid
        fields={SKILL_GROUP_FIELDS}
        values={fieldValues}
        onChange={onFieldChange}
        keyPrefix={`skills-${index}`}
      />
      <Textarea
        label={t("fieldSkillsLabel")}
        hint={t("fieldSkillsHint")}
        value={joinLines(item.skills)}
        onChange={onSkillsChange}
        placeholder={t("fieldSkillsPlaceholder")}
        rows={3}
      />
    </EditorCard>
  );
};
