import React, { useState } from "react";
import { Column, Section } from "./column";

import styles from "./styles.module.css";
import { Card, SortableCard } from "./card";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { allData, sectionData } from "./mock";
import { InfiniteContainer } from "./infinite/container";
import { InfiniteElement } from "./infinite/element";
import { modifyColumnId } from "./infinite/event.emitter";

export function Kanban() {
  const [sections, setSections] = useState(sectionData);

  function onDragOver({ active, over }) {
    if (!active || !over) {
      return;
    }
    let activeId = active.id;
    let overId = over.id;

    if (activeId === overId) return;

    console.log(active.data.current.container, active);

    let activeContainerId = active.data.current.container.id;
    let overContainerId = over.data.current.container.id;

    console.log(sections[activeContainerId]);

    sections[activeContainerId] = sections[activeContainerId].filter(
      (data) => data.id !== active.id,
    );

    let activeData = active.data.current.item;
    let overIndex = over.data.current.index;

    let updatedSections = [
      ...sections[overContainerId].slice(0, overIndex),
      activeData,
      ...sections[overContainerId].slice(
        overIndex,
        sections[overContainerId].length,
      ),
    ];

    setSections((state) => {
      state[overContainerId] = updatedSections;

      return { ...state };
    });
  }

  return (
    <div className={styles.kanban}>
      <DndContext onDragOver={onDragOver}>
        {allData.map((data) => (
          <Column key={data.id} id={data.id}>
            {data.sections.map((section) => {
              let items = sections[section.id].map((item) => item.id);
              return (
                <Section items={items} key={section.id} data={section}>
                  <InfiniteContainer
                    scrollOffset={300}
                    scrollElemSelector={`#${modifyColumnId(
                      "scrollElement" + section.id,
                    )}`}
                  >
                    {(provided) => {
                      return sections[section.id].map((card, index) => (
                        <SortableCard
                          index={index}
                          data={card}
                          container={section}
                          {...provided}
                          key={card.id}
                        />
                      ));
                    }}
                  </InfiniteContainer>

                  {/* {sections[section.id].map((card, index) => (
                    <SortableCard
                      key={card.id}
                      index={index}
                      data={card}
                      container={section}
                    />
                  ))} */}
                </Section>
              );
            })}
          </Column>
        ))}
        {/* <Column>
          <Section>
            <Card />
          </Section>
        </Column>
        <Column>
          <Section>
            <Card />
          </Section>
          <Section>
            <Card />
          </Section>
          <Section>
            <Card />
          </Section>
          <Section>
            <Card />
          </Section>
        </Column> */}
        <DragOverlay>
          <Card data={{ id: "overlay" }} />
        </DragOverlay>
      </DndContext>
    </div>
  );
}
