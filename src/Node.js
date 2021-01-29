import React, { useState } from "react";
import "./styles.css";
import { Resizable } from "re-resizable";
import { useDraggable, useDroppable } from "@dnd-kit/core";
export const Node = ({ id, translate, children }) => {
  const { setNodeRef: drop, isOver, over, node } = useDroppable({
    id
  });
  const {
    attributes,
    listeners,
    setNodeRef: drag,
    isDragging,
    over: dragOver,
    node: dragNode
  } = useDraggable({
    id: id
  });

  const transform = translate
    ? {
        transform: `translate3d(${translate.x}px, ${translate.y}px, 0)`
      }
    : undefined;

  console.log("Drop isOver", id, isOver, over);
  console.log("Drag isOver", id, isDragging, dragOver);
  let makeMeDrag = null;
  return (
    <div style={transform} className="node">
      <Resizable
        defaultSize={{
          width: 320,
          height: 200
        }}
      >
        <div
          ref={elm => {
            //drag(elm);
            makeMeDrag = elm;
            drop(elm);
          }}
          className="dropZone"
          onClick={event => drag(makeMeDrag)}
        >
          <button {...listeners} {...attributes}>
            Drag me
          </button>
          {children}
        </div>
      </Resizable>
    </div>
  );
};
