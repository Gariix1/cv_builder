import type { Profile } from "../../../models/cv.schema";

interface PhotoBlockProps {
  profile: Profile;
}

const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "CV";
  }

  const initials = parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return initials || "CV";
};

export const PhotoBlock = ({ profile }: PhotoBlockProps) => {
  const initials = getInitials(profile.fullName);

  return (
    <div className="cv-sidebar__photo">
      <div className="cv-photo">
        {profile.photo ? (
          <img src={profile.photo} alt={profile.fullName} />
        ) : (
          <span className="cv-photo__initials">{initials}</span>
        )}
      </div>
    </div>
  );
};
