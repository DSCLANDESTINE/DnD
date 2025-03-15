import React from "react";
import MainPage from "./Pages/MainPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <MainPage />
    </DndProvider>
  );
};

export default App;
