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
  id: string;
  category: string;
  skills: string[];
}

export const DEFAULT_CV: CV = {
  profile: {
    fullName: "Gary Taboada",
    title: "Especialista en Procesos, Comunicacion y Diseno",
    subtitle: "Linea de enfoque",
    summary:
      "Profesional con formacion tecnica y experiencia en desarrollo de software, soporte funcional y acompanamiento a usuarios, con un fuerte enfoque en la organizacion de procesos, la comunicacion clara y la mejora continua. He trabajado de forma cercana con distintas areas, apoyando la adopcion de herramientas, la documentacion de flujos de trabajo y la resolucion de incidencias, facilitando la comprension de procesos tecnicos a publicos no especializados. Me caracterizo por ser una persona organizada, proactiva, orientada al detalle y con alta capacidad de aprendizaje.",
  },
  personal: {
    city: "Quito",
    country: "Ecuador",
    phone: "+593 992678478",
    email: "fasza212@gmail.com",
    linkedin: "linkedin.com/in/...",
    github: "github.com/...",
    website: "https://portfolio.com",
  },
  experience: [
    {
      id: "exp-1",
      company: "Formos S.A.",
      role: "Desarrollador de Software (Mobile / Web / QA Funcional y Tecnico)",
      startDate: "Septiembre 2025",
      endDate: "Noviembre 2025",
      description:
        "Apoye el desarrollo y validacion de aplicaciones moviles y web, colaborando con diferentes areas en la revision de flujos y funcionalidades.\n\nRealice validaciones funcionales y pruebas de calidad, asegurando el correcto funcionamiento de los sistemas antes de su entrega.\n\nBrinde soporte en la identificacion y seguimiento de incidencias.\n\nColabore en tareas de documentacion y control de cambios, contribuyendo a la mejora continua de los procesos internos.\n\nTrabaje de manera coordinada con el equipo, adaptandome a metodologias y tiempos de entrega.",
      bullets: [
        "Lance un nuevo sistema de diseno...",
      ],
      techStack: [
        "QA funcional",
        "Documentacion",
        "Comunicacion",
        "Trabajo en equipo",
        "Seguimiento continuo",
      ],
    },
    {
      id: "exp-2",
      company: "Industrias ALES C.A.",
      role: "Desarrollado y Soporte de Software",
      startDate: "Mayo 2024",
      endDate: "Diciembre 2024",
      description:
        "Apoye la mejora y actualizacion de sistemas internos, colaborando en la optimizacion de procesos operativos utilizados por distintas areas.\n\nBrinde soporte funcional a usuarios, resolviendo incidencias y asegurando el correcto uso de las herramientas.\n\nAcompanhe la adopcion de mejoras en los sistemas, explicando flujos de trabajo y resolviendo dudas de manera clara y oportuna.\n\nDocumente y valide procesos clave, contribuyendo a la continuidad operativa y lineamientos internos.\n\nTrabaje de forma coordinada con equipos multidisciplinarios, facilitando la comunicacion entre areas tecnicas y no tecnicas.",
      bullets: ["Lance un nuevo sistema de diseno..."],
      techStack: [
        "Procesos",
        "Trabajo colaborativo",
        "Soporte funcional",
        "Documentacion",
        "Comunicacion",
      ],
    },
    {
      id: "exp-3",
      company: "Tecservin Ltda.",
      role: "Desarrollador de Software",
      startDate: "Octubre 2023",
      endDate: "Mayo 2024",
      description:
        "Colabore en el desarrollo y soporte de sistemas de gestion, apoyando la organizacion y automatizacion de procesos internos.\n\nParticipe en la estructuracion de flujos de trabajo mas eficientes, orientados a mejorar la experiencia de los usuarios.\n\nDisene interfaces intuitivas que facilitaron el uso de las herramientas por parte de personas no tecnicas.\n\nMantuve comunicacion constante con usuarios y areas involucradas para identificar necesidades y proponer mejoras.\n\nContribui al seguimiento y validacion de informacion operativa, apoyando la toma de decisiones internas.",
      bullets: ["Lance un nuevo sistema de diseno..."],
      techStack: [
        "Organizacion",
        "Seguimiento continuo",
        "Organizacion",
        "UX funcional",
        "Procesos",
      ],
    },
    {
      id: "exp-4",
      company: "Amauta Tech",
      role: "Pasante de Desarrollo Web / Software",
      startDate: "Enero 2023",
      endDate: "Mayo 2023",
      description:
        "Apoye tareas de desarrollo y mantenimiento de aplicaciones internas.\n\nBrinde soporte basico a usuarios y acompanamiento en el uso de sistemas.\n\nColabore en la documentacion y validacion de funcionalidades, asegurando claridad y correcto funcionamiento.\n\nTrabaje de forma colaborativa con el equipo, adaptandome a procesos y metodologias internas.",
      bullets: ["Lance un nuevo sistema de diseno..."],
      techStack: ["Aprendizaje", "Trabajo en equipo", "Documentacion"],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Instituto Tecnologico Yavirac",
      degree: "Tecnologo Superior en Desarrollo de Software",
      startDate: "2020",
      endDate: "2023",
      status: "completed",
    },
  ],
  certificates: [],
  skills: [
    {
      id: "skill-1",
      category: "Comunicacion y personas",
      skills: [
        "Comunicacion clara",
        "Escucha activa",
        "Empatia",
        "Trabajo en equipo",
      ],
    },
    {
      id: "skill-2",
      category: "Organizacion y procesos",
      skills: [
        "Organizacion",
        "Seguimiento",
        "Gestion del tiempo",
        "Documentacion",
        "Atencion al detalle",
      ],
    },
    {
      id: "skill-3",
      category: "Pensamiento y actitud",
      skills: [
        "Pensamiento critico",
        "Resolucion de problemas",
        "Proactividad",
        "Aprendizaje autonomo",
        "Adaptabilidad",
      ],
    },
    {
      id: "skill-4",
      category: "Soporte y operacion",
      skills: [
        "Soporte funcional",
        "Validacion de flujos",
        "Mejora continua",
        "Orientacion a procesos",
      ],
    },
  ],
};
