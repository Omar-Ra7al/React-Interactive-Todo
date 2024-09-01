import "./App.css";
import TodosParent from "./components/TodosParent";
import TodosProvider from "./contexts/TodosContext";

function App() {
  return (
    <TodosProvider>
      <TodosParent />
    </TodosProvider>
  );
}

export default App;

// Rafce >> from es7 will creat a function and wexport it by depend on the file name >> shortchut 