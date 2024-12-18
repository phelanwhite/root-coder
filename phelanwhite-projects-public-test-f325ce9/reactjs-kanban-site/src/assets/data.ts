import { v4 } from "uuid";

export const sections = [
  {
    id: 1,
    title: "Section 1",
    content: "This is section 1 content",
    position: 0,
  },
  {
    id: 2,
    title: "Section 2",
    content: "This is section 2 content",
    position: 1,
  },
  {
    id: 3,
    title: "Section 3",
    content: "This is section 3 content",
    position: 2,
  },
];

export const tasks = [
  {
    id: v4(),
    title: "Task 1",
    description: "This is task 1 description",
    status: "To Do",
    position: 0,
    sectionId: 1,
  },
  {
    id: v4(),
    title: "Task 2",
    description: "This is task 2 description",
    status: "In Progress",
    position: 1,
    sectionId: 1,
  },
  {
    id: v4(),
    title: "Task 3",
    description: "This is task 3 description",
    status: "Done",
    position: 0,
    sectionId: 2,
  },
  {
    id: v4(),
    title: "Task 4",
    description: "This is task 4 description",
    status: "Done",
    position: 0,
    sectionId: 3,
  },
];

export const dataInit = {
  sections,
  tasks,
};
