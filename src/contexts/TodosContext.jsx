import "../styles/loader.css";
import { createContext, useContext, useReducer, useState } from "react";
import todosReducer from "../Reducers/todosReducer";

export const TodosContext = createContext();
export default function TodosProvider({ children }) {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  // << Start Set Popup msg and open it states
  const [popupMsg, setPopupMsg] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  // End Set Popup msg and open it states // >>

  const [todosState, dispatch] = useReducer(todosReducer, initialTodos);

  function handelOpenPopupandMsg(msgTitle) {
    setPopupMsg(`${msgTitle} `);
    setOpenPopup(true);
    setTimeout(() => {
      setOpenPopup(false);
    }, 3000);
  }

  return (
    <TodosContext.Provider
      value={{
        todosState,
        dispatch,
        popupObj: { popupMsg, openPopup, handelOpenPopupandMsg },
      }}>
      {children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => {
  return useContext(TodosContext).todosState;
};
export const useSetTodos = () => {
  return useContext(TodosContext).dispatch;
};
export const useHandlePopup = () => {
  return useContext(TodosContext).popupObj;
};
