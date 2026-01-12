import { ExperienceEditor } from "./ExperienceEditor";
import { ProfileEditor } from "./ProfileEditor";
import { FadeIn } from "../ui/FadeIn";

export const EditorPanel = () => {
  return (
    <div className="editor-surface">
      <FadeIn>
        <header className="editor-hero">
          <p className="editor-hero__eyebrow">CV Builder</p>
          <h1 className="editor-hero__title">Craft your profile</h1>
          <p className="editor-hero__subtitle">
            Edit structured data on the left, preview the A4 layout on the right.
          </p>
        </header>
      </FadeIn>
      <div className="editor-sections">
        <FadeIn delay={0.05}>
          <ProfileEditor />
        </FadeIn>
        <FadeIn delay={0.1}>
          <ExperienceEditor />
        </FadeIn>
      </div>
    </div>
  );
};
