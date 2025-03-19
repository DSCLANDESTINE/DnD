import { ComponentType } from "react";

export type ComponentMap = {
  [key: string]: ComponentType;
};

export interface DragItem {
  widget: string;
}

export interface DroppedComponentDragItem {
  index: number;
}