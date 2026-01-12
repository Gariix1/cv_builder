import type { ChangeEvent } from "react";

import type { PersonalInfo, Profile } from "../../models/cv.schema";
import { useCVStore } from "../../store/cvStore";
import { TextInput } from "../ui/TextInput";
import { Textarea } from "../ui/Textarea";
import { EditorSection } from "./EditorSection";

export const ProfileEditor = () => {
  const profile = useCVStore((state) => state.cv.profile);
  const personal = useCVStore((state) => state.cv.personal);
  const updateProfile = useCVStore((state) => state.actions.profile.update);
  const updatePersonal = useCVStore((state) => state.actions.personal.update);

  const onProfileChange =
    (field: keyof Profile) => (event: ChangeEvent<HTMLInputElement>) => {
      updateProfile({ [field]: event.target.value } as Partial<Profile>);
    };

  const onProfileSummaryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateProfile({ summary: event.target.value });
  };

  const onPersonalChange =
    (field: keyof PersonalInfo) => (event: ChangeEvent<HTMLInputElement>) => {
      updatePersonal({ [field]: event.target.value } as Partial<PersonalInfo>);
    };

  return (
    <EditorSection
      title="Profile"
      description="Core identity and contact information."
    >
      <div className="editor-grid">
        <TextInput
          label="Full name"
          value={profile.fullName}
          onChange={onProfileChange("fullName")}
          placeholder="Full name"
        />
        <TextInput
          label="Title"
          value={profile.title}
          onChange={onProfileChange("title")}
          placeholder="Professional title"
        />
        <TextInput
          label="Subtitle"
          value={profile.subtitle ?? ""}
          onChange={onProfileChange("subtitle")}
          placeholder="Tagline or focus"
        />
        <TextInput
          label="Photo (base64)"
          value={profile.photo ?? ""}
          onChange={onProfileChange("photo")}
          placeholder="data:image/png;base64,..."
        />
      </div>
      <Textarea
        label="Summary"
        value={profile.summary}
        onChange={onProfileSummaryChange}
        placeholder="Short professional summary"
        rows={4}
      />
      <div className="editor-grid">
        <TextInput
          label="City"
          value={personal.city}
          onChange={onPersonalChange("city")}
          placeholder="City"
        />
        <TextInput
          label="Country"
          value={personal.country}
          onChange={onPersonalChange("country")}
          placeholder="Country"
        />
        <TextInput
          label="Phone"
          value={personal.phone}
          onChange={onPersonalChange("phone")}
          placeholder="Phone"
        />
        <TextInput
          label="Email"
          value={personal.email}
          onChange={onPersonalChange("email")}
          placeholder="Email"
        />
        <TextInput
          label="LinkedIn"
          value={personal.linkedin ?? ""}
          onChange={onPersonalChange("linkedin")}
          placeholder="linkedin.com/in/..."
        />
        <TextInput
          label="GitHub"
          value={personal.github ?? ""}
          onChange={onPersonalChange("github")}
          placeholder="github.com/..."
        />
        <TextInput
          label="Website"
          value={personal.website ?? ""}
          onChange={onPersonalChange("website")}
          placeholder="portfolio.com"
        />
      </div>
    </EditorSection>
  );
};
