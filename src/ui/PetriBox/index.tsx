import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/store";
import { STOP } from "../../core/timerSaga";
import Cell from "../Cell";
import Egg from "../Egg";
import Food from "../Food";

export default function PetriBox() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cells } = useAppSelector((state) => state.cells);
  const { foods } = useAppSelector((state) => state.foods);
  const { eggs } = useAppSelector((state) => state.eggs);

  useEffect(() => {
    if (foods.length === 0 && cells.length === 0 && eggs.length === 0) {
      dispatch({ type: STOP });
      navigate("/");
    }
    if (cells.length === 0 && eggs.length === 0) {
      dispatch({ type: STOP });
    }
  }, [cells.length, dispatch, eggs.length, foods.length, navigate]);

  return (
    <div className="Petri">
      <div className="PetriBox">
        {foods.map((f) => (
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
