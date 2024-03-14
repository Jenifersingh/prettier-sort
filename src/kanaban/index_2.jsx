import React, { useState } from "react";
import { Column, Section } from "./column";

import styles from "./styles.module.css";
import { Card, SortableCard } from "./card";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { allData, sectionData } from "./mock";
import { InfiniteContainer } from "./infinite/container";
import { InfiniteElement } from "./infinite/element";
import { modifyColumnId } from "./infinite/event.emitter";
import { SortableContext } from "@dnd-kit/sortable";
import { SectionTitle } from "./section";

export function Kanban() {
  const [sections, setSections] = useState(mockData);

  const [activeItem, setActiveItem] = useState(null);

  const onDragStart = ({ active }) => {
    setActiveItem(active.data.current.item);
  };

  return (
    <div className={styles.kanban}>
      <DndContext onDragStart={onDragStart}>
        {sections.map((data) => {
          return (
            <Column key={data.id}>
              <SortableContext items={data.items.map((item) => item.id)}>
                {data.items.map((item, index) => {
                  if (typeof item === "string") {
                    return (
                      <SectionTitle key={`card ${item}`} data={{ id: item }} />
                    );
                  }
                  return (
                    <SortableCard
                      data={item}
                      container={{ id: data.id }}
                      index={index}
                      key={`card ${item}`}
                    />
                  );
                })}
              </SortableContext>
            </Column>
          );
        })}
        <DragOverlay>
          <Card data={{ ...activeItem, id: "overlay" }} />
        </DragOverlay>
      </DndContext>
    </div>
  );
}

let mockData = [
  {
    id: "section 1",
    items: [
      {
        id: 1,
        height: "40px",
      },
      {
        id: 2,
        height: "70px",
      },
      {
        id: 3,
        height: "100px",
      },
    ],
  },
  {
    id: "section 2",
    items: [
      {
        id: 4,
        height: "100px",
      },

      {
        id: 5,
        height: "40px",
      },

      {
        id: 6,
        height: "20px",
      },
      "block 1",

      {
        id: 7,
        height: "40px",
      },

      {
        id: 8,
        height: "40px",
      },

      {
        id: 9,
        height: "40px",
      },
      "block 2",

      {
        id: 10,
        height: "40px",
      },

      {
        id: 11,
        height: "40px",
      },

      {
        id: 12,
        height: "40px",
      },
      "block 3",

      {
        id: 13,
        height: "40px",
      },

      {
        id: 14,
        height: "40px",
      },

      {
        id: 15,
        height: "40px",
      },
    ],
  },
];
