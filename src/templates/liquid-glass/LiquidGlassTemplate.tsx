import type { ForwardedRef } from "react";
import { forwardRef } from "react";

import type { CV } from "../../models/cv.schema";
import { SectionTitle } from "../../components/sections/SectionTitle";
import { TagList } from "../../components/sections/TagList";

interface LiquidGlassTemplateProps {
  cv: CV;
}

const LiquidGlassTemplateBase = (
  { cv }: LiquidGlassTemplateProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { profile, personal, experience, skills } = cv;
  const location = [personal.city, personal.country].filter(Boolean).join(", ");

  return (
    <article ref={ref} className="cv-page glass-surface" data-template>
      <div className="cv-glow" aria-hidden="true" />
      <header className="cv-header">
        <div className="cv-identity">
          <div className="cv-identity__title">
            <h1 className="cv-name">{profile.fullName}</h1>
            <p className="cv-role">{profile.title}</p>
            {profile.subtitle ? (
              <p className="cv-subtitle">{profile.subtitle}</p>
            ) : null}
          </div>
          {profile.photo ? (
            <div className="cv-photo">
              <img src={profile.photo} alt={profile.fullName} />
            </div>
          ) : null}
        </div>
        <div className="cv-contact">
          {location ? <span>{location}</span> : null}
          {personal.phone ? <span>{personal.phone}</span> : null}
          {personal.email ? <span>{personal.email}</span> : null}
          {personal.linkedin ? <span>{personal.linkedin}</span> : null}
          {personal.github ? <span>{personal.github}</span> : null}
          {personal.website ? <span>{personal.website}</span> : null}
        </div>
      </header>

      <div className="cv-body">
        <div className="cv-column cv-column--left">
          {profile.summary ? (
            <section className="cv-section">
              <SectionTitle title="Summary" />
              <p className="cv-summary">{profile.summary}</p>
            </section>
          ) : null}

          {skills.length > 0 ? (
            <section className="cv-section">
              <SectionTitle title="Skills" />
              <div className="cv-skill-groups">
                {skills.map((group) => (
                  <div key={group.category} className="cv-skill-group">
                    <p className="cv-skill-category">{group.category}</p>
                    <TagList items={group.skills} />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <div className="cv-column cv-column--right">
          {experience.length > 0 ? (
            <section className="cv-section">
              <SectionTitle title="Experience" />
              <div className="cv-experience-list">
                {experience.map((item) => (
                  <article key={item.id} className="cv-experience">
                    <div className="cv-experience__header">
                      <div>
                        <p className="cv-experience__role">{item.role}</p>
                        <p className="cv-experience__company">{item.company}</p>
                      </div>
                      <p className="cv-experience__dates">
                        {item.startDate}
                        {item.endDate ? ` - ${item.endDate}` : ""}
                      </p>
                    </div>
                    {item.description ? (
                      <p className="cv-experience__description">{item.description}</p>
                    ) : null}
                    {item.bullets.length > 0 ? (
                      <ul className="cv-experience__bullets">
                        {item.bullets.map((bullet, index) => (
                          <li key={`${item.id}-bullet-${index}`}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                    <TagList items={item.techStack} />
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export const LiquidGlassTemplate = forwardRef<HTMLDivElement, LiquidGlassTemplateProps>(
  LiquidGlassTemplateBase,
);

LiquidGlassTemplate.displayName = "LiquidGlassTemplate";
