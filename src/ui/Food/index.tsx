import { IFood } from "../../core/foodSlice";

export default function Food({ position }: IFood) {
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
