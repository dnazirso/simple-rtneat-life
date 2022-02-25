export default function Egg({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="Sprite"
      style={{
        height: 5,
        width: 5,
        backgroundColor: "wheat",
        borderRadius: 5,
        border: "lightgrey 1px solid",
        top: y,
        left: x,
      }}
    />
  );
}
