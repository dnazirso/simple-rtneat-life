import { IEgg } from "../../models/Egg";

export default function Egg({
  id,
  position,
  selectCell,
}: IEgg & { selectCell: Function }) {
  const handleSelection = () => {
    selectCell(id);
  };
  return (
    <div
      onClick={handleSelection}
      className="Sprite Egg"
      style={{
        top: position.y,
        left: position.x,
      }}
    />
  );
}
