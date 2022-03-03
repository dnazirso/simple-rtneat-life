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

  const handleSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 0) return;
    if (e.target.id === "cells") {
      context.setSettings({
        ...context.settings,
        nbCells: Number(e.target.value),
      });
    }
    if (e.target.id === "palets") {
      context.setSettings({
        ...context.settings,
        nbPalets: Number(e.target.value),
      });
    }
    if (e.target.id === "tick") {
      context.setSettings({
        ...context.settings,
        tickDelay: Number(e.target.value),
      });
    }
  };

  return (
    <div className="Settings">
      <label htmlFor="cells">number of cells</label>
      <input
        id="cells"
        type="number"
        placeholder="number of cells"
        value={context.settings.nbCells}
        onChange={handleSettings}
      />
      <label htmlFor="palets">number of palets</label>
      <input
        id="palets"
        type="number"
        placeholder="number of palets"
        value={context.settings.nbPalets}
        onChange={handleSettings}
      />
      <label htmlFor="tick">tick delay: {context.settings.tickDelay}ms</label>
      <input
        id="tick"
        type="range"
        min={1}
        max={200}
        placeholder="tick delay"
        value={context.settings.tickDelay}
        onChange={handleSettings}
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
