import { create } from "zustand";

import componentMap from "../Components/componentTypes";

interface StoreState {
  widgets: string[];
  droppedComponents: string[];
  addComponent: (componentName: string) => void;
  removeComponent: (index: number) => void;
  getComponent: (componentName: string) => React.ComponentType<any> | null;
}

const useStore = create<StoreState>((set) => ({
  widgets: ["A", "B"],
  droppedComponents: [],

  addComponent: (componentName) => {
    set((state) => ({
      droppedComponents: [...state.droppedComponents, componentName],
    }));
  },

  removeComponent: (index) =>
    set((state) => ({
      droppedComponents: state.droppedComponents.filter((_, i) => i !== index),
    })),

  getComponent: (componentName) => componentMap[componentName] || null,
}));

export default useStore;
