import IFood from "../../models/FoodModel";

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
