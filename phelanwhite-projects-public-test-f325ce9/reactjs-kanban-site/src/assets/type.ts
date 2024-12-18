import { UniqueIdentifier } from "@dnd-kit/core";

export type SectionType = {
  id: UniqueIdentifier;
  title: string;
  content: string;
  position: number;
};
export type TaskType = {
  id: UniqueIdentifier;
  title: string;
  description: string;
  status: string;
  position: number;
  sectionId: number;
};
