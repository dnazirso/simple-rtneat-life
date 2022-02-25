import { CellProps } from "../../core/cellSlice";

export default function Cell({ position }: CellProps) {
  return (
    <div
      className="Sprite"
      style={{
        height: 20,
        width: 10,
        backgroundColor: "cornflowerblue",
        borderRadius: 5,
        border: "lightgrey 1px solid",
        opacity: 0.75,
        top: position.y,
        left: position.x,
        transformOrigin: "center",
        transform: `rotate(${position.a}deg)`,
      }}
    />
  );
}
