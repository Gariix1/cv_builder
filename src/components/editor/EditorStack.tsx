import type { ReactNode } from "react";

interface EditorStackProps {
  children: ReactNode;
  className?: string;
}

export const EditorStack = ({ children, className }: EditorStackProps) => {
  return (
    <div className={["editor-stack", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};
