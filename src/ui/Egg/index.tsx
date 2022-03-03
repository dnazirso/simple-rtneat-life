import { IEgg } from "../../models/Egg";

export default function Egg({ position }: IEgg) {
  return (
    <div
      className="Sprite Egg"
      style={{
        top: position.y,
        left: position.x,
      }}
    />
  );
}
