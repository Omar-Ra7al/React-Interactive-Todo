export default function todosReducer(currentState, action) {
  if (action.type === "add") {
    const newTodos = [
      ...currentState,
      {
        id:
          currentState.length == 0
            ? 0
            : currentState[currentState.length - 1].id + 1,
        title: action.payload,
        checked: false,
      },
    ];

    localStorage.setItem("todos", JSON.stringify(newTodos));
    return newTodos;
    //
  } else if (action.type === "delete") {
    const newTodos = currentState.filter((todo) => {
      return todo.id !== action.payload;
    });

    localStorage.setItem("todos", JSON.stringify(newTodos));
    return newTodos;
    //
  } else if (action.type === "update") {
    const newTodos = currentState.map((todo) => {
      if (todo.id === action.payload.id) {
        return { ...todo, title: action.payload.editValue };
      } else {
        return todo;
      }
    });

    localStorage.setItem("todos", JSON.stringify(newTodos));
    return newTodos;

    //
  } else if (action.type === "check") {
    const newTodos = currentState.map((todo) => {
      if (todo.id === action.payload) {
        return { ...todo, checked: !todo.checked };
      } else {
        return todo;
      }
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return newTodos;
  } else if (action.type === "clear-completed") {
    const newTodos = currentState.filter((todo) => {
      return !todo.checked;
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return newTodos;
  }
}
