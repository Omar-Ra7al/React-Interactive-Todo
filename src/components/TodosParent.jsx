import "../styles/glowingBtn.css";
import "../styles/header.css";

import { useState, useEffect } from "react";
import {
  useTodos,
  useSetTodos,
  useHandlePopup,
} from "../contexts/TodosContext";

import TodosDetails from "./TodosDetails";
import PopupStatus from "../Popups/PopupStatus";

// React icons
import { GoSun } from "react-icons/go";
import { GiNightSleep } from "react-icons/gi";

export default function TodosParent() {
  //  useReducer >>
  const todosState = useTodos();
  const dispatch = useSetTodos();
  const { popupMsg, openPopup, handelOpenPopupandMsg } = useHandlePopup();

  // States >>
  const [inputValue, setInputValue] = useState("");
  const [todosType, setTodosType] = useState("all");
  const [toggleActive, setToggleActive] = useState({
    all: true,
    notCompleted: false,
    completed: false,
  });

  const [loader, setLoader] = useState(false);
  const [lightNight, setlightNight] = useState(false);

  // <<  Start Loading Todos
  useEffect(() => {
    setLoader(true);
    const loaderTimeout = setTimeout(() => {
      setLoader(false);
    }, 1000);

    return () => clearTimeout(loaderTimeout);
  }, []);
  // End Loading Todos // >>

  // Start Eventhandlers >>
  const handelAdd = () => {
    dispatch({ type: "add", payload: inputValue });
    localStorage.setItem("todos", JSON.stringify(todosState));

    handelOpenPopupandMsg(`Added Task Number ${todosState.length + 1} `);
  };

  const handeLightNightMode = () => {
    setlightNight(!lightNight);
  };

  const lightNightClass = (className) => {
    const mode = lightNight ? `${className} light` : `${className} night`;
    return mode;
  };

  const clearCompleted = () => {
    dispatch({ type: "clear-completed" });
  };
  // End Eventhandlers //>>

  return (
    <div className={lightNightClass("content")}>
      <div className="container">
        <header>
          <p>Todo</p>
          {!lightNight ? (
            <GoSun className="icon-mode" onClick={handeLightNightMode} />
          ) : (
            <GiNightSleep className="icon-mode" onClick={handeLightNightMode} />
          )}
        </header>

        <div className={lightNightClass("addTask-continer")}>
          <input
            type="text"
            placeholder="Create a new todo..."
            className="todo-input-value"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            onClick={() => {
              handelAdd();
              setInputValue("");
            }}>
            Add
          </button>
        </div>

        <div className={lightNightClass("wrapper")}>
          <div className="todos-container">
            {loader ? (
              <span className="loader"></span>
            ) : (
              <TodosDetails todosType={todosType} />
            )}
          </div>

          <div className="change-status">
            <button>
              {todosState.filter((todo) => !todo.checked).length} Todos left
            </button>
            <div>
              {/* All */}
              <button
                onClick={() => {
                  setTodosType("all");
                  setToggleActive({ all: true });
                }}
                className={`${
                  toggleActive.all ? "all glowing-btn  active" : ""
                }`}>
                <span className="glowing-txt">
                  A<span className="faulty-letter">l</span>l
                </span>
              </button>

              {/* Not Completed */}
              <button
                onClick={() => {
                  setTodosType("not-completed");
                  setToggleActive({ notCompleted: true });
                }}
                className={`"not-completed" ${
                  toggleActive.notCompleted ? " glowing-btn  active" : ""
                }`}>
                <span className="glowing-txt">
                  A<span className="faulty-letter">ct</span>ive
                </span>
              </button>

              {/* Completed */}

              <button
                onClick={() => {
                  setTodosType("completed");
                  setToggleActive({ completed: true });
                }}
                className={`"completed" ${
                  toggleActive.completed ? " glowing-btn  active" : ""
                }`}>
                <span className="glowing-txt">
                  C<span className="faulty-letter">om</span>leted
                </span>
              </button>
            </div>
            <button
              onClick={() => {
                clearCompleted();
              }}>
              Clear Completed
            </button>
          </div>
        </div>

        {openPopup ? (
          <PopupStatus status={popupMsg} variant={"succes"} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
