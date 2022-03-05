import { ICell } from "../../models/Cell";

export default function Cell({
  id,
  position,
  energy,
  zone,
  selectCell,
  isBest,
}: ICell & { zone: boolean; selectCell: Function; isBest: boolean }) {
  const handleSelection = () => {
    selectCell(id);
  };
  return (
    <>
      <div
        onClick={handleSelection}
        className={
          "Sprite Cell" +
          (energy < 50 ? "  Dying" : "") +
          (isBest ? " Best" : "")
        }
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
