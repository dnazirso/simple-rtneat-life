import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../core/AppContext";

export default function Settings() {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const handleStart = () => {
    context.initFoods();
    context.initEggs();

    navigate("/petri");
  };

  return (
    <div className="Settings">
      <label htmlFor="cells">number of cells</label>
      <input
        id="cells"
        type="number"
        placeholder="number of cells"
        value={context.settings.nbCells}
        onChange={(e) =>
          context.setSettings({
            ...context.settings,
            nbCells: Number(e.target.value),
          })
        }
      />
      <label htmlFor="palets">number of palets</label>
      <input
        id="palets"
        type="number"
        placeholder="number of palets"
        value={context.settings.nbPalets}
        onChange={(e) =>
          context.setSettings({
            ...context.settings,
            nbPalets: Number(e.target.value),
          })
        }
      />
      <label htmlFor="tick">tick delay</label>
      <input
        id="tick"
        type="number"
        placeholder="tick delay"
        value={context.settings.tickDelay}
        onChange={(e) =>
          context.setSettings({
            ...context.settings,
            tickDelay: Number(e.target.value),
          })
        }
      />
      <button
        disabled={
          context.settings.nbCells === 0 || context.settings.nbPalets === 0
        }
        onClick={handleStart}
      >
        Start
      </button>
    </div>
  );
}
