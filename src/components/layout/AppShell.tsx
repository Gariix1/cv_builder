import type { ReactNode } from "react";

interface AppShellProps {
  editor: ReactNode;
  preview: ReactNode;
  previewControls?: ReactNode;
}

export const AppShell = ({ editor, preview, previewControls }: AppShellProps) => {
  return (
    <div className="app-shell">
      <aside className="editor-pane">{editor}</aside>
      <section className="preview-pane">
        {previewControls}
        {preview}
      </section>
    </div>
  );
};
