import { ICell } from "../../models/Cell";

export default function Cell({
  position,
  energy,
  zone,
}: ICell & { zone: boolean }) {
  return (
    <>
      <div
        className={"Sprite Cell" + (energy < 50 ? "  Dying" : "")}
        style={{
          top: position.y,
          left: position.x,
          transform: `translate(-11px, -5.5px) rotate(${position.a}deg) `,
        }}
      />
      {zone && (
        <div
          className="Sprite Zone"
          style={{
            top: position.y,
            left: position.x,
          }}
        />
      )}
    </>
  );
}
