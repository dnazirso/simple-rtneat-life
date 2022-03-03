import { IEgg } from "../../models/Egg";

export default function Egg(egg: IEgg) {
  const { position } = egg;

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
