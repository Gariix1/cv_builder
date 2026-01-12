import type { ReactNode } from "react";

interface EditorSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const EditorSection = ({
  title,
  description,
  children,
}: EditorSectionProps) => {
  return (
    <section className="editor-section">
      <header className="editor-section__header">
        <div>
          <h3 className="editor-section__title">{title}</h3>
          {description ? (
            <p className="editor-section__description">{description}</p>
          ) : null}
        </div>
      </header>
      <div className="editor-section__body">{children}</div>
    </section>
  );
};
