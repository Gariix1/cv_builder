import type { Profile } from "../../../models/cv.schema";
import { hasText } from "../../../utils/validation";

interface CompactHeaderProps {
  profile: Profile;
}

export const CompactHeader = ({ profile }: CompactHeaderProps) => {
  const hasName = hasText(profile.fullName);
  const hasTitle = hasText(profile.title);

  if (!hasName && !hasTitle) {
    return null;
  }

  return (
    <header className="cv-compact-header">
      {hasName ? (
        <h2 className="cv-compact-header__name">{profile.fullName}</h2>
      ) : null}
      {hasTitle ? (
        <p className="cv-compact-header__title">{profile.title}</p>
      ) : null}
    </header>
  );
};
