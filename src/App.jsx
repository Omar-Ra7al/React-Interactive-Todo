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
