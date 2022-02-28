import { CellProps } from "../../core/cellSlice";

export default function Cell(cell: CellProps) {
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
