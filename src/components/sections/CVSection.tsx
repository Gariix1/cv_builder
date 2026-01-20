import type { ReactNode } from "react";

import { SectionTitle } from "./SectionTitle";

interface CVSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const CVSection = ({ title, children, className }: CVSectionProps) => {
  return (
    <section className={["cv-section", className].filter(Boolean).join(" ")}>
      <SectionTitle title={title} />
      {children}
    </section>
  );
};
