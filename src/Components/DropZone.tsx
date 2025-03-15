
import { useDrop } from "react-dnd";
import useStore from "../store/store";
import { DragItem } from "../types/types";
import { useRef } from "react";

const Dropzone = () => {
  const { droppedComponents, addComponent, getComponent } = useStore();
  const dropRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "widget",
    drop: (item: DragItem) => {
      addComponent(item.widget);
    },
  }));

  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className="h-fit min-h-[400px] w-11/12 mx-auto border-2 border-gray-200 border-dashed p-2.5 grid grid-cols-2 gap-5"
    >
      {droppedComponents.map((componentName, index) => {
        const Component = getComponent(componentName);
        if (!Component) {
          return null;
        }
        return <Component key={index} />;
      })}
    </div>
  );
};

export default Dropzone;
