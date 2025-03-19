import { create } from "zustand";
import componentMap from "../Components/Map";

interface StoreState {
  widgets: string[];
  droppedComponents: string[];
  addComponent: (componentName: string) => void;
  removeComponent: (index: number) => void;
  moveComponent: (fromIndex: number, toIndex: number) => void;
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

  removeComponent: (index) => {
    set((state) => ({
      droppedComponents: state.droppedComponents.filter((_, i) => i !== index),
    }));
  },

  moveComponent: (fromIndex, toIndex) => {
    set((state) => {
      const newComponents = [...state.droppedComponents];
      const [movedComponent] = newComponents.splice(fromIndex, 1);
      newComponents.splice(toIndex, 0, movedComponent);
      return { droppedComponents: newComponents };
    });
  },

  getComponent: (componentName) => componentMap[componentName] || null,
}));

export default useStore;
