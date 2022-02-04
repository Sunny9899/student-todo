import './App.css';
import {Todo} from "./components/Todos";

function App() {
  return (
    <div className="outterScreen">
      <div className="App">
        <h1 className="title">Todo...</h1>
      <Todo />
      </div>
    </div>
  );
}

export default App;
