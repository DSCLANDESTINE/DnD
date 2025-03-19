import { useDrag, useDrop } from "react-dnd";
import useStore from "../store/store";
import { DragItem } from "../types/types";
import { useRef } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

const Dropzone = () => {
  const {
    droppedComponents,
    addComponent,
    removeComponent,
    moveComponent,
    getComponent,
  } = useStore();
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
      className="p-4 border-2 border-dashed border-gray-300 rounded-lg"
    >
     
      <div className=" grid gap-3 grid-cols-1 md:grid-cols-2 min-h-[400px] max-h-screen overflow-auto">
        {droppedComponents.map((componentName, index) => (
          <DraggableDroppedComponent
            key={index}
            index={index}
            componentName={componentName}
            moveComponent={moveComponent}
            removeComponent={removeComponent}
            getComponent={getComponent}
          />
        ))}
      </div>
    </div>
  );
};

const DraggableDroppedComponent = ({
  index,
  componentName,
  moveComponent,
  removeComponent,
  getComponent,
}: {
  index: number;
  componentName: string;
  moveComponent: (fromIndex: number, toIndex: number) => void;
  removeComponent: (index: number) => void;
  getComponent: (componentName: string) => React.ComponentType<any> | null;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "dropped-component",
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const isDraggingRight = dragIndex < hoverIndex;
      const isDraggingLeft = dragIndex > hoverIndex;

      if (
        Math.abs(hoverClientX - hoverMiddleX) >
        Math.abs(hoverClientY - hoverMiddleY)
      ) {
        if (isDraggingRight && hoverClientX < hoverMiddleX) return;
        if (isDraggingLeft && hoverClientX > hoverMiddleX) return;
      } else {
        if (isDraggingRight && hoverClientY < hoverMiddleY) return;
        if (isDraggingLeft && hoverClientY > hoverMiddleY) return;
      }

      moveComponent(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "dropped-component",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const Component = getComponent(componentName);
  if (!Component) {
    return null;
  }

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg"
    >
      <Component />
      <button
        onClick={() => removeComponent(index)}
        className="p-1 text-red-500 hover:text-red-700"
      >
        <TrashIcon className="h-7 w-7" />
      </button>
    </div>
  );
};

export default Dropzone;
