import type { ForwardedRef } from "react";
import { forwardRef } from "react";

import type { CV } from "../../models/cv.schema";
import {
  CertificatesSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  PhotoBlock,
  ProfileHero,
  SkillsSection,
} from "./components";

interface LiquidGlassTemplateProps {
  cv: CV;
}

const LiquidGlassTemplateBase = (
  { cv }: LiquidGlassTemplateProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { profile, personal, experience, skills, education, certificates } = cv;

  return (
    <article ref={ref} className="cv-page glass-surface" data-template>
      <div className="cv-glow" aria-hidden="true" />
      <div className="cv-layout">
        <aside className="cv-sidebar">
          <PhotoBlock profile={profile} />
          <div className="cv-sidebar__sections">
            <ContactSection personal={personal} />
            <EducationSection education={education} />
            <SkillsSection skills={skills} />
            <CertificatesSection certificates={certificates} />
          </div>
        </aside>

        <section className="cv-main">
          <ProfileHero profile={profile} />
          <div className="cv-main-body">
            <ExperienceSection experience={experience} />
          </div>
        </section>
      </div>
    </article>
  );
};

export const LiquidGlassTemplate = forwardRef<HTMLDivElement, LiquidGlassTemplateProps>(
  LiquidGlassTemplateBase,
);

LiquidGlassTemplate.displayName = "LiquidGlassTemplate";
