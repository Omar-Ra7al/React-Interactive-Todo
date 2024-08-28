import { useTodos } from "../contexts/TodosContext";
import { useState } from "react";

export default function UpdatePopup({
  setOpenUpdatePopup,
  taskId,
  handelUpdate,
}) {
  const todosState = useTodos();
  const [editValue, setEditValue] = useState(todosState[taskId].title);

  const handleCancel = () => {
    setOpenUpdatePopup(false); // Close the popup
  };

  const handleUpdate = () => {
    handelUpdate(taskId, editValue);
    setOpenUpdatePopup(false); // Close the popup after updating
  };

  return (
    <div
      className="popup"
      onClick={(e) => {
        if (e.target.className === "popup") handleCancel();
      }}>
      <div className="popup-content">
        <h2>Edit Task ({taskId})</h2>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setEditValue(e.target.value);
            }}
            value={editValue}
          />
          <button onClick={handleUpdate}>Edit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
