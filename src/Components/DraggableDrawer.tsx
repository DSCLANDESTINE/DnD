import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import IconButton from "@mui/material/IconButton";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { DraggableEvent, DraggableData } from "react-draggable";
import EditIcon from '@mui/icons-material/Edit';
import WidgetsPanel from "./WidgetsPanel";


const CustomDrawer = styled("div")(
  ({ anchor, isOpen }: { anchor: string; isOpen: boolean }) => ({
    position: "fixed",
    backgroundColor: "white",
    border: "1px solid #ccc",
    zIndex: 1000,
    transition: "transform 0.3s ease-in-out",
    ...(anchor === "left" && {
      left: 0,
      top: 0,
      width: 250,
      height: "100vh",
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    }),
    ...(anchor === "right" && {
      right: 0,
      top: 0,
      width: 250,
      height: "100vh",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
    }),
    ...(anchor === "top" && {
      left: 0,
      top: 0,
      width: "100%",
      height: 250,
      transform: isOpen ? "translateY(0)" : "translateY(-100%)",
    }),
    ...(anchor === "bottom" && {
      left: 0,
      bottom: 0,
      width: "100%",
      height: 250,
      transform: isOpen ? "translateY(0)" : "translateY(100%)",
    }),
  })
);


const DraggableIcon = styled("div")({
  position: "fixed",
  width: 50,
  height: 50,
  backgroundColor: "#1976d2",
  borderRadius: "50%",
  cursor: "move",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: 24,
});

const Preview = styled("div")({
  position: "fixed",
  border: "2px dashed #1976d2",
  backgroundColor: "rgba(25, 118, 210, 0.1)",
  zIndex: 999,
});

type Anchor = "left" | "right" | "top" | "bottom";

const DraggableDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<Anchor | null>(null);
  const [anchor, setAnchor] = useState<Anchor>("left");
  const drawerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsOpen(false);
  };

const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
  const { x, y } = data;
  const iconWidth = iconRef.current?.offsetWidth || 0;
  const iconHeight = iconRef.current?.offsetHeight || 0;


  const bottomThreshold = 50; // Adjust this value as needed
  const bottomDistance = Math.abs(window.innerHeight - y - iconHeight);

  const distances = {
    left: Math.abs(x),
    right: Math.abs(window.innerWidth - (x + iconWidth)),
    top: Math.abs(y),
    bottom: bottomDistance < bottomThreshold ? 0 : bottomDistance, // Apply threshold
  };

  console.log("Distances:", distances);

  const closestPosition = Object.keys(distances).reduce((a, b) =>
    distances[a as keyof typeof distances] <
    distances[b as keyof typeof distances]
      ? a
      : b
  ) as Anchor;

  console.log("Closest Position:", closestPosition); // Debugging
  setPreviewPosition(closestPosition);
};

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  const handleDragStop = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _e: DraggableEvent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: DraggableData
  ) => {
    setIsDragging(false);
    if (previewPosition) {
      setAnchor(previewPosition);
      setIsOpen(true);
    }
    setPreviewPosition(null);
  };

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(!isOpen)}
        color="primary"
        style={{ position: "fixed", bottom: 20, left: 20, zIndex: 1000 }}
        aria-label="toggle drawer"
      >
        <DragHandleIcon />
      </IconButton>

      <CustomDrawer ref={drawerRef} anchor={anchor} isOpen={isOpen}>
        <div className="flex flex-col justify-self-end">
          <IconButton onClick={toggleDrawer(false)} aria-label="close drawer">
            <CloseIcon className="text-blue-500" />
          </IconButton>
        </div>
        <div className="ml-4 flex w-fit">
          <button
            className="flex px-6 py-2 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white"
            onMouseDown={handleDragStart}
          >
            <EditIcon />
            <span>
              Edit SideBar
            </span>
          </button>
        </div>
        <div className="flex flex-col p-4">
          <WidgetsPanel/>
        </div>
      </CustomDrawer>
      {isDragging && (
        <>
          <Draggable
            nodeRef={iconRef as React.RefObject<HTMLElement>}
            onDrag={handleDrag}
            onStop={handleDragStop}
            defaultPosition={{ x: 0, y: 0 }}
          >
            <DraggableIcon ref={iconRef}>✥</DraggableIcon>
          </Draggable>

          {previewPosition === "left" && (
            <Preview
              style={{ left: 0, top: 0, width: "250px", height: "100%" }}
            />
          )}
          {previewPosition === "right" && (
            <Preview
              style={{ right: 0, top: 0, width: "250px", height: "100%" }}
            />
          )}
          {previewPosition === "top" && (
            <Preview
              style={{ left: 0, top: 0, width: "100%", height: "250px" }}
            />
          )}
          {previewPosition === "bottom" && (
            <Preview
              style={{ left: 0, bottom: 0, width: "100%", height: "250px" }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DraggableDrawer;
