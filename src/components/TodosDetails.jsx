import {
  useTodos,
  useSetTodos,
  useHandlePopup,
} from "../contexts/TodosContext";
import UpdatePopup from "../Popups/UpdatePopup";
import { useMemo, useState } from "react";
import "../styles/todos.css";
import "../styles/popup.css";

// React icons
import { MdDeleteOutline } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import PopupStatus from "../Popups/PopupStatus";
import DeletePopup from "../Popups/DeletePopup";

export default function TodosDetails({ todosType }) {
  const todosState = useTodos();
  const dispatch = useSetTodos();

  const { popupMsg, openPopup, handelOpenPopupandMsg } = useHandlePopup();

  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [taskId, setTaksId] = useState(0);
  const [styleInStatus, setStyleInStatus] = useState("");
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const handelUpdate = (id, editValue) => {
    setStyleInStatus("edited");
    setTaksId(id);
    setTimeout(() => {
      setStyleInStatus("");
    }, 1000);

    dispatch({ type: "update", payload: { id, editValue } });
    handelOpenPopupandMsg(`Task ${id + 1} Updated `);
  };

  const handelCheck = (id) => {
    setStyleInStatus("shine");
    setTaksId(id);
    setTimeout(() => {
      setStyleInStatus("");
    }, 1000);

    dispatch({ type: "check", payload: id });
    handelOpenPopupandMsg(`Task ${id + 1} State Changed`);
  };
  /* <<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>> */

  const handelDelete = (id) => {
    setTaksId(id);
    setStyleInStatus("margin-left");
    setTimeout(() => {
      dispatch({ type: "delete", payload: id });
      handelOpenPopupandMsg(`Task ${id + 1} Deleted `);
      setStyleInStatus("");
    }, 1000);
  };

  /* <<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>> */

  let filteredTodo = useMemo(() => {
    if (todosType === "all") {
      return todosState;
    } else if (todosType === "not-completed") {
      return todosState.filter((todo) => !todo.checked);
    } else if (todosType === "completed") {
      return todosState.filter((todo) => todo.checked);
    }
  }, [todosState, todosType]);

  const todosJsx = useMemo(() => {
    return filteredTodo.map((todo) => (
      <div
        key={todo.id}
        className={todo.id === taskId ? `todos ${styleInStatus}` : "todos"}>
        <p
          style={{
            textDecoration: todo.checked ? "line-through" : "",
          }}>
          {todo.title}
        </p>
        <div>
          <button
            onClick={() => {
              setOpenUpdatePopup(true);
              setTaksId(todo.id);
            }}>
            <RxUpdate />
          </button>

          {/* <<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <button
            onClick={() => {
              setOpenDeletePopup(true);
              setTaksId(todo.id);
            }}>
            <MdDeleteOutline />
          </button>
          {/* <<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>> */}

          <button
            style={{ backgroundColor: todo.checked ? "#07bf01" : "" }}
            onClick={() => {
              handelCheck(todo.id);
            }}>
            <FaCheckCircle />
          </button>
        </div>
      </div>
    ));
  }, [todosState, todosType, taskId, styleInStatus]);

  return (
    <div>
      {openUpdatePopup && (
        <UpdatePopup
          setOpenUpdatePopup={setOpenUpdatePopup}
          taskId={taskId}
          handelUpdate={handelUpdate}
        />
      )}
      {todosJsx}
      {openDeletePopup ? (
        <DeletePopup
          setOpenDeletePopup={setOpenDeletePopup}
          taskId={taskId}
          handelDelete={handelDelete}
        />
      ) : (
        ""
      )}
      {openPopup && <PopupStatus status={popupMsg} variant={"succes"} />}
    </div>
  );
}
