import type { ReactNode } from "react";

interface EditorGridProps {
  children: ReactNode;
  className?: string;
}

export const EditorGrid = ({ children, className }: EditorGridProps) => {
  return (
    <div className={["editor-grid", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};
