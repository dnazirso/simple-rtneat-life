import { useAppSelector } from "../../core/store";
import Cell from "../Cell";
import Food from "../Food";
import "./App.css";

function App() {
  const { cells } = useAppSelector((state) => state.cells);
  const { food } = useAppSelector((state) => state.foods);

  return (
    <div className="App">
      {cells.map((c) => (
        <Cell key={c.id} />
      ))}
      {food.map((c) => (
        <Food key={c.id} />
      ))}
    </div>
  );
}

export default App;
