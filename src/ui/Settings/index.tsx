import { useNavigate } from "react-router-dom";
import { initEggs } from "../../core/eggSlice";
import { initFood } from "../../core/foodSlice";
import { setSettings } from "../../core/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../core/store";
import { START } from "../../core/timerSaga";

export default function Settings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.settings);

  const handleStart = () => {
    dispatch(
      initFood({ area: { h: 500, w: 500 }, numberOfFoods: settings.nbPalets })
    );
    dispatch(
      initEggs({ area: { h: 500, w: 500 }, numberOfEggs: settings.nbCells })
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
        value={settings.nbCells}
        onChange={(e) =>
          dispatch(
            setSettings({ ...settings, nbCells: Number(e.target.value) })
          )
        }
      />
      <label htmlFor="palets">number of palets</label>
      <input
        id="palets"
        type="number"
        placeholder="number of palets"
        value={settings.nbPalets}
        onChange={(e) =>
          dispatch(
            setSettings({ ...settings, nbPalets: Number(e.target.value) })
          )
        }
      />
      <label htmlFor="tick">tick delay</label>
      <input
        id="tick"
        type="number"
        placeholder="tick delay"
        value={settings.tickDelay}
        onChange={(e) =>
          dispatch(
            setSettings({ ...settings, tickDelay: Number(e.target.value) })
          )
        }
      />
      <button
        disabled={settings.nbCells === 0 || settings.nbPalets === 0}
        onClick={handleStart}
      >
        Start
      </button>
    </div>
  );
}
