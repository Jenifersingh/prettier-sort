import React, { memo } from "react";

import styles from "./styles.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { InfiniteElement } from "../infinite/element";

export function Card({ data }) {
  return (
    <div className={styles.card} style={{ height: data.height }}>
      {data.id}
    </div>
  );
}

export function SortableCard2({ data, container, index }) {
  const { listeners, attributes, setNodeRef, transform, transition } =
    useSortable({
      id: data.id,
      data: {
        container: container,
        index: index,
        item: data,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: data.height,
  };

  return (
    <div
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
      //   id={data.id}
    >
      <Card data={data} />
    </div>
  );
}

export const SortableCard = memo(({ data, container, index, ...provided }) => {
  const { listeners, attributes, setNodeRef, transform, transition } =
    useSortable({
      id: data.id,
      data: {
        container: container,
        index: index,
        item: data,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
      //   id={data.id}
    >
      <InfiniteElement itemId={data.id} {...provided}>
        <Card data={data} />
      </InfiniteElement>
    </div>
  );
});
