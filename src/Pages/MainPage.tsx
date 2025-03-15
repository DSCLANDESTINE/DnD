import DraggableDrawer from "../Components/DraggableDrawer";

import Dropzone from "../Components/DropZone";
export default function MainPage() {
  return (
    <div className="w-10/12 h-10/12 mx-auto">
      <DraggableDrawer />
      <div className="flex flex-col mt-20 w-full h-full mx-auto">
        <Dropzone />
      </div>
    </div>
  );
}
