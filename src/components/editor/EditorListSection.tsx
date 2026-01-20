import type { ReactNode } from "react";

import { Button } from "../ui";
import { EditorSection } from "./EditorSection";
import { EditorStack } from "./EditorStack";

interface EditorListSectionProps<T> {
  title: string;
  description?: string;
  items: T[];
  addLabel: string;
  onAdd: () => void;
  emptyState?: ReactNode;
  renderItem: (item: T, index: number, total: number) => ReactNode;
}

export function EditorListSection<T>({
  title,
  description,
  items,
  addLabel,
  onAdd,
  emptyState,
  renderItem,
}: EditorListSectionProps<T>) {
  return (
    <EditorSection title={title} description={description}>
      <EditorStack>
        {items.length === 0 && emptyState ? (
          <div className="editor-empty">{emptyState}</div>
        ) : null}
        {items.map((item, index) => renderItem(item, index, items.length))}
        <Button type="button" variant="primary" onClick={onAdd}>
          {addLabel}
        </Button>
      </EditorStack>
    </EditorSection>
  );
}
