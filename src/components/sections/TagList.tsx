import { hasText } from "../../utils/validation";

interface TagListProps {
  items: string[];
}

export const TagList = ({ items }: TagListProps) => {
  const visibleItems = items.filter(hasText);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="tag-list">
      {visibleItems.map((item, index) => (
        <span key={`${item}-${index}`} className="tag">
          {item}
        </span>
      ))}
    </div>
  );
};
