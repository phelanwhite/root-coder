import { TaskType } from "@/assets/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { FC } from "react";

interface Props {
  task: TaskType;
}

const Task: FC<Props> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id, data: { type: "task", task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-stone-200 px-4 py-2 rounded shadow"
    >
      {task.title}
    </div>
  );
};

export default Task;
