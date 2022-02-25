import { FoodProps } from "../../core/foodSlice";

export default function Food({ position }: FoodProps) {
  return (
    <div
      className="Sprite"
      style={{
        height: 10,
        width: 10,
        backgroundColor: "greenyellow",
        borderRadius: 10,
        border: "lightgrey 1px solid",
        opacity: 0.5,
        top: position.y,
        left: position.x,
      }}
    />
  );
}
