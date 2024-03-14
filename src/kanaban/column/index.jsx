import React, { Fragment } from "react";

import styles from "./styles.module.css";
import { Card } from "../card";
import { SortableContext } from "@dnd-kit/sortable";
import { modifyColumnId } from "../infinite/event.emitter";

export function Column({ children }) {
  //   let SectionContainer = isSection ? Section : Fragment;

  return <div className={styles.column}>{children}</div>;
}

export function Section({ children, items, data }) {
  return (
    <div
      className={styles.section}
      id={`${modifyColumnId("scrollElement" + data.id)}`}
    >
      <SortableContext items={items}>{children}</SortableContext>
    </div>
  );
}
