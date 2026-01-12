# CV Builder System – Codex Prompt (PRD + Technical Requirements)

> **Purpose**: This document is a complete, production‑grade prompt to be given to **Codex** so it can generate a modern CV Builder system from scratch, following strict architectural, design, and code‑quality standards.

---

## 1. Context

You are building a **web‑based CV Builder system**, not a static resume template.

The system must allow users to:
- Edit structured CV data through an editor UI
- Preview the CV in real time
- Export a **pixel‑perfect A4 PDF**

The design must feel **premium and modern**, inspired by:
- Liquid Glass (Apple‑like translucency)
- Glassmorphism
- Claymorphism

This is a **frontend‑only SPA**, designed for extensibility, reuse, and long‑term maintainability.

---

## 2. Core Objectives

The system must:

- Strictly separate **data (JSON)** from **presentation (templates)**
- Use one main CV template (Liquid Glass / Clay)
- Render changes in real time
- Export an A4 PDF identical to the preview
- Persist data locally
- Follow clean architecture and reusable design patterns

---

## 3. Mandatory Tech Stack

### Framework & Tooling
- React 18+
- Vite
- TypeScript (strict mode enabled)
- Tailwind CSS
- Framer Motion (animations)
- Zustand or React Context (state management)

### PDF Export
- **Single strategy for MVP**: Use DOM-based rendering and export PDF from the same rendered HTML using `html-to-image` + `jsPDF`.
- Do **NOT** use `@react-pdf/renderer` in the MVP to avoid duplicate layout sources.
- The DOM preview is the **single source of truth** for visual output.
- PDF must be generated from the exact same DOM tree used in Preview.
- Units must be defined in **mm** for A4 accuracy.

- Prefer `@react-pdf/renderer`
- Fallback: `html-to-image + jsPDF`
- PDF output **must visually match** the preview

---

## 4. Project Architecture

Use the following structure **exactly**:

```
/src
 ├─ /components
 │   ├─ editor/
 │   ├─ preview/
 │   ├─ sections/
 │   ├─ layout/
 │   └─ ui/
 ├─ /templates
 │   └─ liquid-glass/
 ├─ /store
 │   └─ cvStore.ts
 ├─ /models
 │   └─ cv.schema.ts
 ├─ /utils
 │   ├─ exportPdf.ts
 │   └─ storage.ts
 ├─ /styles
 │   └─ globals.css
 ├─ App.tsx
 └─ main.tsx
```

No flat structure. Components must be modular and reusable.

---

## 5. Data Model (Strict Contract)

All rendering logic must depend **only** on this schema.

### Main CV Interface

```ts
interface CV {
  profile: Profile;
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  skills: SkillGroup[];
}
```

---

### Profile

```ts
interface Profile {
  fullName: string;
  title: string;
  subtitle?: string;
  photo?: string; // base64
  summary: string;
}
```

---

### Personal Info

```ts
interface PersonalInfo {
  city: string;
  country: string;
  phone: string;
  email: string;
  linkedin?: string;
  github?: string;
  website?: string;
}
```

---

### Experience

```ts
interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  bullets: string[];
  techStack: string[];
}
```

---

### Education

```ts
interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
  status: "completed" | "in-progress";
}
```

---

### Certificate

```ts
interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  link?: string;
}
```

---

### Skills

```ts
interface SkillGroup {
  category: string;
  skills: string[];
}
```

---

## 6. Layout Rules (Critical)

### Application Shell
- Use **CSS Grid** for macro layout
- Two main columns:
  - Left: Editor
  - Right: CV Preview (A4)

**Do NOT use Flexbox for page‑level layout.**

---

### CV Layout
- Exact A4 dimensions (210 × 297 mm)
- Internal layout built with CSS Grid
- Fixed proportions
- No overflow or scrollbars in exported PDF

---

### Internal Components
Flexbox may only be used for:
- Lists
- Buttons
- Chips / tags
- Inline alignment

---

## 7. Visual Design Requirements

### Style
- Glassmorphism with real blur (`backdrop-filter: blur(24px)`)
- Claymorphism with soft borders and volumetric shadows
- Rounded corners
- Neutral, modern color palette

### Typography
- Inter / SF Pro / Plus Jakarta
- Fonts must be embedded in PDF export

---

## 8. Editor Requirements

- Editor and Preview must be **fully decoupled**.
- Editor components are responsible only for mutating CV JSON state.
- Preview components must be **pure, read-only, and stateless**.
- No editor logic or controls are allowed inside Preview components.

- Controlled inputs only (no `contenteditable`)
- Add / remove / reorder items
- Auto-save to **LocalStorage (MVP persistence choice)**
- Load persisted CV on startup
- Editor modifies **only the JSON state**, never the template directly


- Controlled inputs only (no `contenteditable`)
- Add / remove / reorder items
- Auto‑save to LocalStorage or IndexedDB
- Load persisted CV on startup
- Editor modifies **only the JSON state**, never the template directly

---

## 9. Preview Requirements

- Live rendering from CV JSON
- Zoom controls
- Light / Dark mode
- Preview must be visually identical to PDF output
- Animations must **never affect layout size, spacing, or pagination**
- Disable or neutralize animations during PDF export


- Live rendering from CV JSON
- Zoom controls
- Light / Dark mode
- Preview must be visually identical to PDF output

---

## 10. PDF Export Requirements

- Button: **Export PDF**
- Filename format: `FullName_CV.pdf`
- No editor UI in PDF
- Exact A4 layout (210 × 297 mm)
- CSS `@media print` rules must be defined
- Fonts must be embedded and consistent
- PDF generation must not introduce reflow or scaling artifacts


- Button: **Export PDF**
- Filename format: `FullName_CV.pdf`
- No editor UI in PDF
- Exact A4 layout
- Embedded fonts

---

## 11. Code Quality Standards (Mandatory)

### Architectural Principles
- SOLID
- DRY
- KISS

### Structural Rules
- Clear separation of concerns (Editor / Preview / Template)
- Business logic must live outside UI components
- Templates must consume data via props only
- No duplicated components or logic
- No hardcoded content inside templates
- No magic numbers (use constants or design tokens)
- No inline styles except Tailwind utility classes


### Principles
- SOLID
- DRY
- KISS

### Rules
- No duplicated components
- No hardcoded content in templates
- No inline styles (except Tailwind utilities)
- Components must be pure and reusable
- No magic numbers

---

## 12. State Management Rules

- Single source of truth (CV store)
- Immutable updates only
- Store actions grouped by domain (profile, experience, etc.)
- No side effects inside UI components
- Persistence logic isolated in utility modules


- Single source of truth (CV store)
- Immutable updates
- Business logic outside UI components
- Clear, grouped actions

---

## 13. Performance & UX

- Smooth animations using Framer Motion
- No layout shifts during editing
- Debounced persistence writes
- Fast re-render on edits
- Preview rendering must remain stable under frequent updates


- Smooth animations
- No layout shifts
- Debounced persistence
- Fast re‑render on edits

---

## 14. What NOT to Do

- Do not build a static CV
- Do not mix editor logic with preview logic
- Do not hardcode section styles
- Do not break A4 proportions
- Do not introduce backend logic

---

## 15. Acceptance Criteria

- Editor updates preview in real time
- Preview DOM is the single visual source for PDF
- PDF output matches preview exactly
- Codebase is modular, readable, and extensible
- Editor and Preview are fully decoupled
- Easy to add new templates
- Prepared for future DOCX export


- Editor updates preview in real time
- PDF output matches preview exactly
- Codebase is modular and readable
- Easy to add new templates
- Prepared for future DOCX export

---

## 16. Initial Implementation Scope

Start by implementing:
1. Project setup (Vite + React + TypeScript)
2. CV schema and state store
3. App shell with Grid layout
4. Liquid Glass CV template
5. Basic editor for Profile and Experience
6. Working PDF export

---

**Build everything from scratch and follow all requirements strictly.**

