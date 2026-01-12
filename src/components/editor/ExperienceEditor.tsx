import type { ChangeEvent } from "react";

import type { Experience } from "../../models/cv.schema";
import { useCVStore } from "../../store/cvStore";
import { Button } from "../ui/Button";
import { TextInput } from "../ui/TextInput";
import { Textarea } from "../ui/Textarea";
import { EditorSection } from "./EditorSection";

const bulletsToValue = (bullets: string[]) => bullets.join("\n");

const parseBullets = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const techStackToValue = (tech: string[]) => tech.join(", ");

const parseTechStack = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const ExperienceCard = ({
  item,
  index,
  total,
}: {
  item: Experience;
  index: number;
  total: number;
}) => {
  const updateExperience = useCVStore((state) => state.actions.experience.update);
  const removeExperience = useCVStore((state) => state.actions.experience.remove);
  const moveExperience = useCVStore((state) => state.actions.experience.move);

  const onFieldChange =
    (field: keyof Experience) => (event: ChangeEvent<HTMLInputElement>) => {
      updateExperience(item.id, { [field]: event.target.value } as Partial<Experience>);
    };

  const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateExperience(item.id, { description: event.target.value });
  };

  const onBulletsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateExperience(item.id, { bullets: parseBullets(event.target.value) });
  };

  const onTechStackChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateExperience(item.id, { techStack: parseTechStack(event.target.value) });
  };

  return (
    <div className="editor-card">
      <div className="editor-card__header">
        <div>
          <p className="editor-card__title">Experience {index + 1}</p>
          <p className="editor-card__meta">{item.company || "New role"}</p>
        </div>
        <div className="editor-card__actions">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => moveExperience(item.id, "up")}
            disabled={index === 0}
          >
            Up
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => moveExperience(item.id, "down")}
            disabled={index === total - 1}
          >
            Down
          </Button>
          <Button
            type="button"
            variant="soft"
            size="sm"
            onClick={() => removeExperience(item.id)}
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="editor-grid">
        <TextInput
          label="Company"
          value={item.company}
          onChange={onFieldChange("company")}
          placeholder="Company name"
        />
        <TextInput
          label="Role"
          value={item.role}
          onChange={onFieldChange("role")}
          placeholder="Role title"
        />
        <TextInput
          label="Start date"
          value={item.startDate}
          onChange={onFieldChange("startDate")}
          placeholder="2024"
        />
        <TextInput
          label="End date"
          value={item.endDate ?? ""}
          onChange={onFieldChange("endDate")}
          placeholder="Present"
        />
      </div>
      <Textarea
        label="Description"
        value={item.description}
        onChange={onDescriptionChange}
        rows={3}
      />
      <Textarea
        label="Bullets"
        hint="One bullet per line"
        value={bulletsToValue(item.bullets)}
        onChange={onBulletsChange}
        rows={3}
      />
      <TextInput
        label="Tech stack"
        hint="Comma separated"
        value={techStackToValue(item.techStack)}
        onChange={onTechStackChange}
        placeholder="Figma, React, TypeScript"
      />
    </div>
  );
};

export const ExperienceEditor = () => {
  const experiences = useCVStore((state) => state.cv.experience);
  const addExperience = useCVStore((state) => state.actions.experience.add);

  return (
    <EditorSection
      title="Experience"
      description="Add, remove, or reorder professional roles."
    >
      <div className="editor-stack">
        {experiences.map((item, index) => (
          <ExperienceCard
            key={item.id}
            item={item}
            index={index}
            total={experiences.length}
          />
        ))}
        <Button type="button" variant="primary" onClick={addExperience}>
          Add experience
        </Button>
      </div>
    </EditorSection>
  );
};
