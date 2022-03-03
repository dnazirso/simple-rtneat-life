import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../core/AppContext";
import Cell from "../Cell";
import Egg from "../Egg";
import Food from "../Food";

export default function PetriBox() {
  const navigate = useNavigate();
  const { foods, cells, eggs, settings, behave, hatch } =
    useContext(AppContext);

  useEffect(() => {
    if (foods.length === 0 && cells.length === 0 && eggs.length === 0) {
      navigate("/");
    }
  }, [cells.length, eggs.length, foods.length, navigate]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      behave();
      hatch();
    }, settings.tickDelay);
    return () => {
      clearInterval(intervalID);
    };
  }, [behave, hatch, settings.tickDelay]);

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
