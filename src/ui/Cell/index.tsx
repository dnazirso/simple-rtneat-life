import { ICell } from "../../models/CellModel";

export default function Cell(cell: ICell) {
  const { position } = cell;

  return (
    <>
      <div
        className="Sprite Cell"
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
