export interface CV {
  profile: Profile;
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  skills: SkillGroup[];
}

export interface Profile {
  fullName: string;
  title: string;
  subtitle?: string;
  photo?: string;
  summary: string;
}

export interface PersonalInfo {
  city: string;
  country: string;
  phone: string;
  email: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  bullets: string[];
  techStack: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
  status: "completed" | "in-progress";
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  link?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const DEFAULT_CV: CV = {
  profile: {
    fullName: "Avery Bennett",
    title: "Product Designer",
    subtitle: "Human-first interfaces and systems",
    summary:
      "Designs elegant, scalable experiences across web and mobile. Focused on clarity, accessibility, and measurable outcomes.",
  },
  personal: {
    city: "Barcelona",
    country: "Spain",
    phone: "+34 600 123 456",
    email: "avery.bennett@email.com",
    linkedin: "linkedin.com/in/averybennett",
    github: "github.com/averyb",
    website: "avery.design",
  },
  experience: [
    {
      id: "exp-1",
      company: "Glassline Studio",
      role: "Lead Product Designer",
      startDate: "2022",
      endDate: "Present",
      description:
        "Led design direction for a modular CV platform used by global teams.",
      bullets: [
        "Shipped a new design system with 45% faster delivery",
        "Partnered with engineering to improve accessibility compliance",
      ],
      techStack: ["Figma", "Design Systems", "Research"],
    },
  ],
  education: [],
  certificates: [],
  skills: [
    {
      category: "Core",
      skills: ["Product Design", "UX Research", "Design Systems"],
    },
  ],
};
