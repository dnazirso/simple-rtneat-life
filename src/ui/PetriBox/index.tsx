import { useAppSelector } from "../../core/store";
import Cell from "../Cell";
import Egg from "../Egg";
import Food from "../Food";

export default function PetriBox() {
  const { cells } = useAppSelector((state) => state.cells);
  const { food } = useAppSelector((state) => state.foods);
  const { eggs } = useAppSelector((state) => state.eggs);

  return (
    <div className="Petri">
      <div className="PetriBox">
        {eggs.map((c) => (
          <Egg key={c.id} x={c.position.x} y={c.position.y} />
        ))}
        {cells.map((c) => (
          <Cell
            key={c.id}
            x={c.position.x}
            y={c.position.y}
            angle={c.position.a}
          />
        ))}
        {food.map((f) => (
          <Food key={f.id} x={f.position.x} y={f.position.y} />
        ))}
      </div>
    </div>
  );
}
