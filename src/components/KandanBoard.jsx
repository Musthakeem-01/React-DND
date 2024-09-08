import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

function KanbanBoard() {
  // Corrected component name
  const [complete, setCompleted] = useState([]);
  const [inComplete, setInCompleted] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setInCompleted(json.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    let updatedTask;
    if (source.droppableId === "2") {
      updatedTask = removeItemById(draggableId, complete);
      setCompleted(updatedTask);
    } else {
      updatedTask = removeItemById(draggableId, inComplete);
      setInCompleted(updatedTask);
    }

    const task = findItemById(draggableId, [...inComplete, ...complete]);

    if (destination.droppableId === "2") {
      setCompleted([{ ...task, complete: !task.complete }, ...complete]);
    } else {
      setInCompleted([{ ...task, complete: !task.complete }, ...inComplete]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id.toString() === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id.toString() !== id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Column title="Todo" task={inComplete} id="1" />
        <Column title="Done" task={complete} id="2" />
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
