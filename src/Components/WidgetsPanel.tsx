import { ChartBarIcon } from "@heroicons/react/24/outline";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { useDrag } from "react-dnd";
import useStore from "../store/store";
import { DragItem } from "../types/types";
import { useRef } from "react";


const widgetDesigns = {
  A: {
    icon: <ChartBarIcon className="h-10 w-10 text-blue-500" />,
    color: "bg-blue-100",
    label: "Line Chart",
  },
  B: {
    icon: <ChartPieIcon className="h-10 w-10 text-green-500" />,
    color: "bg-green-100",
    label: "Pie Chart",
  },

};

const WidgetsPanel = () => {
  const { widgets } = useStore();

  return (
    <div className="grid grid-cols-2 gap-4 max-w-fit">
      {widgets.map((widget, index) => (
        <DraggableWidget key={index} widget={widget} />
      ))}
    </div>
  );
};

const DraggableWidget = ({ widget }: { widget: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "widget",
    item: { widget } as DragItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dragRef = useRef<HTMLDivElement>(null);
  drag(dragRef);


  const design = widgetDesigns[widget] || {
    icon: null,
    color: "bg-amber-300",
    label: widget, 
  };

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      className={`w-fit rounded-lg ${design.color}`}
    >
      <div className="flex items-center gap-2 py-2 px-3">
        {design.icon}
        <span className="text-xs">{design.label}</span> 
      </div>
    </div>
  );
};

export default WidgetsPanel;
