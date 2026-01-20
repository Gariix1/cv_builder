import type { ReactNode } from "react";

import { CVSection } from "./CVSection";

interface CVSectionListProps<T> {
  title: string;
  items: T[];
  className?: string;
  renderItem: (item: T, index: number) => ReactNode;
}

export function CVSectionList<T>({
  title,
  items,
  className,
  renderItem,
}: CVSectionListProps<T>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <CVSection title={title}>
      <div className={className}>{items.map(renderItem)}</div>
    </CVSection>
  );
}
