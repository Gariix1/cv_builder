import type { ChangeEvent } from "react";

import { useI18n } from "../../i18n";
import type { PersonalInfo, Profile } from "../../models/cv.schema";
import { useCVStore } from "../../store/cvStore";
import { Textarea } from "../ui";
import { EditorSection } from "./EditorSection";
import { FieldGrid } from "./FieldGrid";
import { PhotoUpload } from "./PhotoUpload";
import {
  PERSONAL_FIELDS,
  PROFILE_FIELDS,
  type ProfileFieldValues,
} from "./config/profileFields";

export const ProfileEditor = () => {
  const { t } = useI18n();
  const profile = useCVStore((state) => state.cv.profile);
  const personal = useCVStore((state) => state.cv.personal);
  const updateProfile = useCVStore((state) => state.actions.profile.update);
  const updatePersonal = useCVStore((state) => state.actions.personal.update);

  const onProfileChange = (field: keyof ProfileFieldValues, value: string) => {
    updateProfile({ [field]: value } as Partial<Profile>);
  };

  const onProfileSummaryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateProfile({ summary: event.target.value });
  };

  const onPersonalChange = (field: keyof PersonalInfo, value: string) => {
    updatePersonal({ [field]: value } as Partial<PersonalInfo>);
  };

  const onPhotoChange = (value: string) => {
    updateProfile({ photo: value });
  };

  const onPhotoClear = () => {
    updateProfile({ photo: "" });
  };

  const profileValues: ProfileFieldValues = {
    fullName: profile.fullName,
    title: profile.title,
    subtitle: profile.subtitle,
  };

  return (
    <EditorSection
      title={t("sectionProfile")}
      description={t("editorDescriptionProfile")}
    >
      <FieldGrid
        fields={PROFILE_FIELDS}
        values={profileValues}
        onChange={onProfileChange}
        keyPrefix="profile"
      />
      <PhotoUpload
        label={t("photoLabel")}
        hint={t("photoHint")}
        value={profile.photo ?? ""}
        onChange={onPhotoChange}
        onClear={onPhotoClear}
      />
      <Textarea
        label={t("fieldSummaryLabel")}
        value={profile.summary}
        onChange={onProfileSummaryChange}
        placeholder={t("fieldSummaryPlaceholder")}
        rows={4}
      />
      <FieldGrid
        fields={PERSONAL_FIELDS}
        values={personal}
        onChange={onPersonalChange}
        keyPrefix="personal"
      />
    </EditorSection>
  );
};
