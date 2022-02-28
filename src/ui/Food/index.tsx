import { FoodProps } from "../../core/foodSlice";

export default function Food({ position }: FoodProps) {
  return (
    <div
      className="Sprite Food"
      style={{
        top: position.y,
        left: position.x,
      }}
    />
  );
}
