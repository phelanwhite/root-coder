import { dataInit } from "@/assets/data";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import Section from "./Section";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { SectionType } from "@/assets/type";
import { createPortal } from "react-dom";

const Board = () => {
  const [sections, setSections] = useState(dataInit.sections);
  const [selectSection, setSelectSection] = useState<SectionType | null>(null);
  return (
    <div>
      {/* title */}
      <div className="text-xl font-semibold">Title1</div>
      <DndContext>
        <div className="flex flex-wrap gap-4">
          <SortableContext items={sections.map((section) => section.id)}>
            {sections.map((section) => {
              return <Section key={section.id} section={section} />;
            })}
          </SortableContext>
        </div>
        {createPortal(
          selectSection && (
            <DragOverlay>
              <Section section={selectSection} />
            </DragOverlay>
          ),
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default Board;
