import "../styles/todos.css";
import "../styles/popup.css";

import { useMemo, useState } from "react";

import {
  useTodos,
  useSetTodos,
  useHandlePopup,
} from "../contexts/TodosContext";

// React icons
import { MdDeleteOutline } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";

// Component
import PopupStatus from "../Popups/PopupStatus";
import DeletePopup from "../Popups/DeletePopup";
import UpdatePopup from "../Popups/UpdatePopup";

export default function TodosDetails({ todosType }) {
  // useReducer
  const todosState = useTodos();
  const dispatch = useSetTodos();
  const { popupMsg, openPopup, handelOpenPopupandMsg } = useHandlePopup();

  // States
  const [taskId, setTaksId] = useState(0);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [styleInStatus, setStyleInStatus] = useState("");

  // Start EventHandelrs >>
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

  // Called in <PopupDelete />
  const handelDelete = (id) => {
    setTaksId(id);
    setStyleInStatus("margin-left");
    setTimeout(() => {
      dispatch({ type: "delete", payload: id });
      handelOpenPopupandMsg(`Task ${id + 1} Deleted `);
      setStyleInStatus("");
    }, 1000);
  };

  // End EventHandelrs // >>

  // Filter Todos Dependes on todosType
  let filteredTodo = useMemo(() => {
    if (todosType === "all") {
      return todosState;
    } else if (todosType === "not-completed") {
      return todosState.filter((todo) => !todo.checked);
    } else if (todosType === "completed") {
      return todosState.filter((todo) => todo.checked);
    }
  }, [todosState, todosType]);

  // Todos jsx > maping into filteredTodo
  const todosJsx = useMemo(() => {
    return filteredTodo.map((todo) => (
      <div
        key={todo.id}
        className={todo.id === taskId ? `todos ${styleInStatus}` : "todos"}>
        <div className="todo-title">
          <p
            style={{
              textDecoration: todo.checked ? "line-through" : "",
            }}>
            {todo.title}
          </p>
        </div>
        {/* Start Buttons */}
        <div className="todo-buttons">
          <button
            onClick={() => {
              setOpenDeletePopup(true);
              setTaksId(todo.id);
            }}>
            <MdDeleteOutline />
          </button>

          <button
            onClick={() => {
              setOpenUpdatePopup(true);
              setTaksId(todo.id);
            }}>
            <RxUpdate />
          </button>

          <button
            style={{ backgroundColor: todo.checked ? "#07bf01" : "" }}
            onClick={() => {
              handelCheck(todo.id);
            }}>
            <FaCheckCircle />
          </button>
        </div>
        {/* End Buttons */}
      </div>
    ));
  }, [todosState, todosType, taskId, styleInStatus]);

  return (
    <div>
      {openUpdatePopup ? (
        <UpdatePopup
          setOpenUpdatePopup={setOpenUpdatePopup}
          taskId={taskId}
          handelUpdate={handelUpdate}
        />
      ) : (
        <></>
      )}

      {/* Called Todo jsx >> */}
      {todosJsx}
      {/* Called Todo jsx >> */}

      {openDeletePopup ? (
        <DeletePopup
          setOpenDeletePopup={setOpenDeletePopup}
          taskId={taskId}
          handelDelete={handelDelete}
        />
      ) : (
        <></>
      )}
      {/* Popup Status msg */}
      {openPopup && <PopupStatus status={popupMsg} variant={"succes"} />}
    </div>
  );
}
