import { useI18n, type TranslationKey } from "../../i18n";
import { FadeIn } from "../ui";
import { CertificatesEditor } from "./CertificatesEditor";
import { EducationEditor } from "./EducationEditor";
import { ExperienceEditor } from "./ExperienceEditor";
import { ProfileEditor } from "./ProfileEditor";
import { SkillsEditor } from "./SkillsEditor";

interface EditorPanelProps {
  storageWarningKey?: TranslationKey | null;
}

export const EditorPanel = ({ storageWarningKey }: EditorPanelProps) => {
  const { t } = useI18n();

  return (
    <div className="editor-surface">
      <FadeIn>
        <header className="editor-hero">
          <p className="editor-hero__eyebrow">{t("appName")}</p>
          <h1 className="editor-hero__title">{t("editorTitle")}</h1>
          <p className="editor-hero__subtitle">{t("editorSubtitle")}</p>
        </header>
      </FadeIn>
      {storageWarningKey ? (
        <div className="editor-alert" role="status">
          {t(storageWarningKey)}
        </div>
      ) : null}
      <div className="editor-sections">
        <FadeIn delay={0.05}>
          <ProfileEditor />
        </FadeIn>
        <FadeIn delay={0.1}>
          <ExperienceEditor />
        </FadeIn>
        <FadeIn delay={0.15}>
          <EducationEditor />
        </FadeIn>
        <FadeIn delay={0.2}>
          <CertificatesEditor />
        </FadeIn>
        <FadeIn delay={0.25}>
          <SkillsEditor />
        </FadeIn>
      </div>
    </div>
  );
};
