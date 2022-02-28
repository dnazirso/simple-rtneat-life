import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../core/store";
import Cell from "../Cell";
import Egg from "../Egg";
import Food from "../Food";

export default function PetriBox() {
  const navigate = useNavigate();
  const { food, eggs, cells } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (food.length === 0 && cells.length === 0 && eggs.length === 0) {
      navigate("/");
    }
  }, [cells.length, eggs.length, food.length, navigate]);

  return (
    <div className="Petri">
      <div className="PetriBox">
        {food.map((f) => (
          <Food key={f.id} {...f} />
        ))}
        {eggs.map((c) => (
          <Egg key={c.id} {...c} />
        ))}
        {cells.map((c) => (
          <Cell key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
