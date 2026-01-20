import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import type {
  CV,
  Certificate,
  Education,
  Experience,
  PersonalInfo,
  Profile,
  SkillGroup,
} from "../models/cv.schema";
import { DEFAULT_CV } from "../models/cv.schema";
import { moveItem } from "../utils/array";
import { createId } from "../utils/id";
import { loadCV } from "../utils/storage";

interface CVState {
  cv: CV;
  actions: {
    profile: {
      update: (patch: Partial<Profile>) => void;
    };
    personal: {
      update: (patch: Partial<PersonalInfo>) => void;
    };
    experience: {
      add: () => void;
      update: (id: string, patch: Partial<Experience>) => void;
      remove: (id: string) => void;
      move: (id: string, direction: "up" | "down") => void;
    };
    education: {
      add: () => void;
      update: (id: string, patch: Partial<Education>) => void;
      remove: (id: string) => void;
      move: (id: string, direction: "up" | "down") => void;
    };
    certificates: {
      add: () => void;
      update: (id: string, patch: Partial<Certificate>) => void;
      remove: (id: string) => void;
      move: (id: string, direction: "up" | "down") => void;
    };
    skills: {
      add: () => void;
      update: (index: number, patch: Partial<SkillGroup>) => void;
      remove: (index: number) => void;
      move: (index: number, direction: "up" | "down") => void;
    };
  };
}

const createExperience = (): Experience => ({
  id: createId(),
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
  bullets: [],
  techStack: [],
});

const createEducation = (): Education => ({
  id: createId(),
  institution: "",
  degree: "",
  startDate: "",
  endDate: "",
  status: "in-progress",
});

const createCertificate = (): Certificate => ({
  id: createId(),
  name: "",
  issuer: "",
  year: "",
  link: "",
});

const createSkillGroup = (): SkillGroup => ({
  category: "",
  skills: [],
});

const moveById = <T extends { id: string }>(
  items: T[],
  id: string,
  direction: "up" | "down",
) => {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) {
    return items;
  }

  const nextIndex = direction === "up" ? index - 1 : index + 1;
  return moveItem(items, index, nextIndex);
};

export const useCVStore = create<CVState>()(
  subscribeWithSelector((set) => ({
    cv: loadCV(DEFAULT_CV),
    actions: {
      profile: {
        update: (patch) =>
          set((state) => ({
            cv: {
              ...state.cv,
              profile: { ...state.cv.profile, ...patch },
            },
          })),
      },
      personal: {
        update: (patch) =>
          set((state) => ({
            cv: {
              ...state.cv,
              personal: { ...state.cv.personal, ...patch },
            },
          })),
      },
      experience: {
        add: () =>
          set((state) => ({
            cv: {
              ...state.cv,
              experience: [...state.cv.experience, createExperience()],
            },
          })),
        update: (id, patch) =>
          set((state) => ({
            cv: {
              ...state.cv,
              experience: state.cv.experience.map((item) =>
                item.id === id ? { ...item, ...patch } : item,
              ),
            },
          })),
        remove: (id) =>
          set((state) => ({
            cv: {
              ...state.cv,
              experience: state.cv.experience.filter((item) => item.id !== id),
            },
          })),
        move: (id, direction) =>
          set((state) => {
            const next = moveById(state.cv.experience, id, direction);
            if (next === state.cv.experience) {
              return state;
            }

            return {
              cv: {
                ...state.cv,
                experience: next,
              },
            };
          }),
      },
      education: {
        add: () =>
          set((state) => ({
            cv: {
              ...state.cv,
              education: [...state.cv.education, createEducation()],
            },
          })),
        update: (id, patch) =>
          set((state) => ({
            cv: {
              ...state.cv,
              education: state.cv.education.map((item) =>
                item.id === id ? { ...item, ...patch } : item,
              ),
            },
          })),
        remove: (id) =>
          set((state) => ({
            cv: {
              ...state.cv,
              education: state.cv.education.filter((item) => item.id !== id),
            },
          })),
        move: (id, direction) =>
          set((state) => {
            const next = moveById(state.cv.education, id, direction);
            if (next === state.cv.education) {
              return state;
            }

            return {
              cv: {
                ...state.cv,
                education: next,
              },
            };
          }),
      },
      certificates: {
        add: () =>
          set((state) => ({
            cv: {
              ...state.cv,
              certificates: [...state.cv.certificates, createCertificate()],
            },
          })),
        update: (id, patch) =>
          set((state) => ({
            cv: {
              ...state.cv,
              certificates: state.cv.certificates.map((item) =>
                item.id === id ? { ...item, ...patch } : item,
              ),
            },
          })),
        remove: (id) =>
          set((state) => ({
            cv: {
              ...state.cv,
              certificates: state.cv.certificates.filter(
                (item) => item.id !== id,
              ),
            },
          })),
        move: (id, direction) =>
          set((state) => {
            const next = moveById(state.cv.certificates, id, direction);
            if (next === state.cv.certificates) {
              return state;
            }

            return {
              cv: {
                ...state.cv,
                certificates: next,
              },
            };
          }),
      },
      skills: {
        add: () =>
          set((state) => ({
            cv: {
              ...state.cv,
              skills: [...state.cv.skills, createSkillGroup()],
            },
          })),
        update: (index, patch) =>
          set((state) => {
            if (!state.cv.skills[index]) {
              return state;
            }

            return {
              cv: {
                ...state.cv,
                skills: state.cv.skills.map((item, currentIndex) =>
                  currentIndex === index ? { ...item, ...patch } : item,
                ),
              },
            };
          }),
        remove: (index) =>
          set((state) => ({
            cv: {
              ...state.cv,
              skills: state.cv.skills.filter(
                (_item, currentIndex) => currentIndex !== index,
              ),
            },
          })),
        move: (index, direction) =>
          set((state) => {
            const nextIndex = direction === "up" ? index - 1 : index + 1;
            const next = moveItem(state.cv.skills, index, nextIndex);
            if (next === state.cv.skills) {
              return state;
            }

            return {
              cv: {
                ...state.cv,
                skills: next,
              },
            };
          }),
      },
    },
  })),
);
