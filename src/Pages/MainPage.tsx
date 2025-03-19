import DraggableDrawer from "../Components/DraggableDrawer";

import Dropzone from "../Components/DropZone";
export default function MainPage() {
  return (
    <div className="w-11/12 h-10/12 mx-auto">
      <DraggableDrawer />
      <div className="flex flex-col pt-10 w-full h-full mx-auto">
        <Dropzone />
      </div>
    </div>
  );
}
