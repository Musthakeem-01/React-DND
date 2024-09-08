import React from "react";
import "./App.css";
import KanbanBoard from "./components/KandanBoard"; // Corrected spelling

function App() {
  return (
    <div className="App">
      <KanbanBoard /> {/* Ensure the component name matches the import */}
    </div>
  );
}

export default App;
