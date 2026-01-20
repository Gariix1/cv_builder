import type { Profile } from "../../../models/cv.schema";

interface ProfileHeroProps {
  profile: Profile;
}

export const ProfileHero = ({ profile }: ProfileHeroProps) => {
  return (
    <header className="cv-hero">
      <div>
        <h1 className="cv-hero__name">{profile.fullName}</h1>
        <p className="cv-hero__title">{profile.title}</p>
        {profile.subtitle ? (
          <p className="cv-hero__subtitle">{profile.subtitle}</p>
        ) : null}
      </div>
      {profile.summary ? (
        <p className="cv-hero__summary">{profile.summary}</p>
      ) : null}
    </header>
  );
};
