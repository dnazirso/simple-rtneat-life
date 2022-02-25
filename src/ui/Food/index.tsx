export default function Food({ x, y }: { x: number; y: number }) {
  return (
    <div
      style={{
        position: "absolute",
        height: 10,
        width: 10,
        backgroundColor: "greenyellow",
        borderRadius: 5,
        border: "lightgrey 1px solid",
        opacity: 0.5,
        top: y,
        left: x,
      }}
    />
  );
}
