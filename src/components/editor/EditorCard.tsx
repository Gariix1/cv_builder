import type { ReactNode } from "react";

interface EditorCardProps {
  title: string;
  meta?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const EditorCard = ({
  title,
  meta,
  actions,
  children,
}: EditorCardProps) => {
  return (
    <div className="editor-card">
      <div className="editor-card__header">
        <div>
          <p className="editor-card__title">{title}</p>
          {meta ? <p className="editor-card__meta">{meta}</p> : null}
        </div>
        {actions ? <div className="editor-card__actions">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
};
