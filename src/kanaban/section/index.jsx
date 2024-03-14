import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

export function SectionTitle({ data }) {
  const { listeners, attributes, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: "40px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      block
    </div>
  );
}
