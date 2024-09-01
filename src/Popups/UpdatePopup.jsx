import { useTodos } from "../contexts/TodosContext";
import { useState } from "react";

export default function UpdatePopup({
  setOpenUpdatePopup,
  taskId,
  handelUpdate,
}) {
  const todosState = useTodos();

  const todoNumber = (id) => {
    return todosState.findIndex((t) => t.id === id) + 1;
  };

  const [editValue, setEditValue] = useState(
    todosState[todoNumber(taskId) - 1].title
  );

  return (
    <div
      className="popup update"
      onClick={(e) => {
        if (e.target.className === "popup update") setOpenUpdatePopup(false);
      }}>
      <div className="popup-content">
        <h2>Edit Task ({todoNumber(taskId)})</h2>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setEditValue(e.target.value);
            }}
            value={editValue}
          />
          <button
            onClick={() => {
              handelUpdate(taskId, editValue);
              setOpenUpdatePopup(false);
            }}>
            Edit
          </button>
          <button
            onClick={() => {
              setOpenUpdatePopup(false);
            }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
