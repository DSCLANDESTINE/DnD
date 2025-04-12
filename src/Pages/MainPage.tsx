import DraggableDrawer from "../Components/DraggableDrawer";
import RGBChart from "../Components/RGBChart"

import Dropzone from "../Components/DropZone";
export default function MainPage() {
  return (
    <div className="w-11/12 h-10/12 mx-auto">

      <DraggableDrawer />
      <div className="flex flex-col pt-10 w-full h-full mx-auto">
        <RGBChart/>
        <Dropzone />
      </div>
    </div>
  );
}
