interface TagListProps {
  items: string[];
}

export const TagList = ({ items }: TagListProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="tag-list">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="tag">
          {item}
        </span>
      ))}
    </div>
  );
};
