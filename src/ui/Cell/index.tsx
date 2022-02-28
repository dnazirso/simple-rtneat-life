import { ICell } from "../../models/CellModel";

export default function Cell(cell: ICell) {
  const { position } = cell;

  return (
    <div
      className="Sprite Cell"
      style={{
        top: position.y,
        left: position.x,
        transform: `rotate(${position.a}deg)`,
      }}
    />
  );
}
