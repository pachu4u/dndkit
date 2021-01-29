import "./styles.css";
import { Background } from "./Background";
import { DndContext } from "@dnd-kit/core";
import React, { useState } from "react";
import { Node } from "./Node";
import produce from "immer";
import { ArcherContainer } from "react-archer";

export function Playground() {
  const elements = [
    {
      id: "node1",
      initPos: {
        x: 0,
        y: 0
      },
      deltaPos: {
        x: 0,
        y: 0
      },
      parent: null,
      children: []
    },
    {
      id: "node2",
      initPos: {
        x: 500,
        y: 0
      },
      deltaPos: {
        x: 500,
        y: 0
      },
      parent: null,
      children: []
    }
  ];

  const [nodes, setNodes] = useState(elements);
  const setElementPos = (elements, event, type) => {
    const updatedElements = produce(elements, draft => {
      const element = draft.find(elm => elm.id === event.active.id);
      if (type === "move") {
        element.deltaPos.x = element.initPos.x + event.delta.x;
        element.deltaPos.y = element.initPos.y + event.delta.y;
      } else if (type === "stop") {
        element.initPos = element.deltaPos;
      } else if (type === "cancel") {
        element.deltaPos = element.initPos;
      }
    });
    setNodes(updatedElements);
  };

  const addRelationShip = (child, parent) => {};

  console.log("elements", nodes);
  return (
    <div className="main">
      <DndContext
        onDragStart={() => {}}
        onDragMove={event => {
          //console.log("move", event);
          setElementPos(nodes, event, "move");
        }}
        onDragEnd={event => {
          console.log("END", event);
          setElementPos(nodes, event, "stop");
        }}
        onDragCancel={event => {
          setElementPos(nodes, event, "cancel");
        }}
      >
        {nodes.map(node => {
          return <Node id={node.id} key={node.id} translate={node.deltaPos} />;
        })}
      </DndContext>
    </div>
  );
}
