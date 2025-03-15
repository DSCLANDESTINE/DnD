import { useDrop } from "react-dnd";
import useStore from "../store/store";
import { DragItem } from "../types/types";
import { useRef } from "react";

import { TrashIcon } from "@heroicons/react/24/outline";

const Dropzone = () => {
  const { droppedComponents, addComponent, removeComponent, getComponent } =
    useStore();
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
      className="p-4 min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg"
    >

      <div className="grid gird-cols-1 lg:grid-cols-2 gap-5">
        {droppedComponents.map((componentName, index) => {
          const Component = getComponent(componentName);
          if (!Component) {
      
            return null;
          }

          return (
            <div
              key={index}
              className="flex flex-col gap-1 items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <Component />
              <button
                onClick={() => removeComponent(index)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropzone;
