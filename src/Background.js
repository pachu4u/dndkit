import React from "react";
import "./styles.css";

import { useDraggable, DndContext } from "@dnd-kit/core";

export function Background({ id, translate, children }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id
  });

  const transform = translate
    ? {
        transform: `translate3d(${translate.x}px, ${translate.y}px, 0)`
      }
    : undefined;

  return (
    <div className="background" {...listeners} {...attributes}>
      <div ref={setNodeRef} style={transform} className="panning">
        <DndContext>{children}</DndContext>
      </div>
    </div>
  );
}
