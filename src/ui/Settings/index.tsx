import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initFood, initEggs } from "../../core/appSlice";
import { useAppDispatch } from "../../core/store";
import { START } from "../../core/timerSaga";

export default function Settings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [things, SetThings] = useState({
    nbCells: 10,
    nbPalets: 50,
  });

  const handleStart = () => {
    dispatch(
      initFood({ area: { h: 500, w: 500 }, numberOfFoods: things.nbPalets })
    );
    dispatch(
      initEggs({ area: { h: 500, w: 500 }, numberOfEggs: things.nbCells })
    );
    dispatch({ type: START });

    navigate("/petri");
  };

  return (
    <div className="Settings">
      <label htmlFor="cells">number of cells</label>
      <input
        id="cells"
        type="number"
        placeholder="number of cells"
        value={things.nbCells}
        onChange={(e) =>
          SetThings({ ...things, nbCells: Number(e.target.value) })
        }
      />
      <label htmlFor="palets">number of palets</label>
      <input
        id="palets"
        type="number"
        placeholder="number of palets"
        value={things.nbPalets}
        onChange={(e) =>
          SetThings({ ...things, nbPalets: Number(e.target.value) })
        }
      />
      <button
        disabled={things.nbCells === 0 || things.nbPalets === 0}
        onClick={handleStart}
      >
        Start
      </button>
    </div>
  );
}
