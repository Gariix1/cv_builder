import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import type { CV, Experience, PersonalInfo, Profile } from "../models/cv.schema";
import { DEFAULT_CV } from "../models/cv.schema";
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
  };
}

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

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
            const index = state.cv.experience.findIndex(
              (item) => item.id === id,
            );
            if (index < 0) {
              return state;
            }

            const nextIndex = direction === "up" ? index - 1 : index + 1;
            if (nextIndex < 0 || nextIndex >= state.cv.experience.length) {
              return state;
            }

            const next = [...state.cv.experience];
            [next[index], next[nextIndex]] = [next[nextIndex], next[index]];

            return {
              cv: {
                ...state.cv,
                experience: next,
              },
            };
          }),
      },
    },
  })),
);
