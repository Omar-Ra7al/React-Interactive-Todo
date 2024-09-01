import { useTodos } from "../contexts/TodosContext";
const DeletePopup = ({ taskId, setOpenDeletePopup, handelDelete }) => {
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup")) {
      setOpenDeletePopup(false);
    }
  };
  const todosState = useTodos();
  const todoNumber = (id) => {
    return todosState.findIndex((t) => t.id === id) + 1;
  };
  return (
    <div className="popup delete" onClick={handleClickOutside}>
      <div className="popup-content">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete task ({todoNumber(taskId)})? This
          action cannot be undone.
        </p>
        <div>
          <button
            onClick={() => {
              handelDelete(taskId);

              setOpenDeletePopup(false);
            }}>
            Delete
          </button>
          <button onClick={() => setOpenDeletePopup(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
