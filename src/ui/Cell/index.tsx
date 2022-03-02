import clsx from "clsx";
import { ICell } from "../../core/cellSlice";

export default function Cell(cell: ICell) {
  const { position } = cell;

  return (
    <>
      <div
        className={clsx("Sprite Cell", cell.energy < 50 && "Dying")}
        style={{
          top: position.y,
          left: position.x,
          transform: `translate(-11px, -5.5px) rotate(${position.a}deg) `,
        }}
      />
      <div
        className="Sprite Zone"
        style={{
          top: position.y,
          left: position.x,
        }}
      />
    </>
  );
}
