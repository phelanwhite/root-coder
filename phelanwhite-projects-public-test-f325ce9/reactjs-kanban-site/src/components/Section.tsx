import { SectionType } from "@/assets/type";
import React, { FC } from "react";
import Task from "./Task";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { dataInit } from "@/assets/data";

interface Props {
  section: SectionType;
}

const Section: FC<Props> = ({ section }) => {
  const tasks = dataInit.tasks.filter((task) => task.sectionId === section.id);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id, data: { type: "section", section } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-stone-100 rounded max-w-[300px] w-full h-[500px] p-2 shadow"
    >
      <div
        {...attributes}
        {...listeners}
        className="py-2 px-4 rounded bg-stone-200 mb-4"
      >
        {section.title}
      </div>
      <div className="flex flex-col gap-2">
        <SortableContext items={tasks.map((task) => task.id)}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Section;
