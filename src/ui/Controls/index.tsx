import { useContext } from "react";
import AppContext from "../../core/AppContext";

export default function Controls() {
  const context = useContext(AppContext);

  const handleSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 0) return;
    if (e.target.id === "tick") {
      context.setSettings({
        ...context.settings,
        tickDelay: Number(e.target.value),
      });
    }
  };

  const handlePause = () => context.setPause(!context.pause);
  const handleZoneSettings = () => {
    context.setShowCellZone(!context.ShowCellZone);
  };
  const handleRepeat = () => {
    context.setPause(false);
    context.emptyCells();
    context.initEggs();
    context.initFoods();
  };
  const handleNextFrame = () => {
    context.behave();
    context.hatch();
  };

  return (
    <>
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
      <span>
        <label htmlFor="zone">Cell area of ​​influence:</label>
        <input
          id="zone"
          type="checkbox"
          checked={context.ShowCellZone}
          onChange={handleZoneSettings}
        />
      </span>
      <div>
        <div onClick={handlePause}>{context.pause ? <>▶</> : <>❙❙</>}</div>
        {context.pause && <div onClick={handleNextFrame}>+1</div>}
        <div onClick={handleRepeat}>⭯</div>
      </div>
    </>
  );
}
