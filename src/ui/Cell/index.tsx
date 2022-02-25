export default function Cell({ x, y }: { x: number; y: number }) {
  return (
    <div
      style={{
        position: "absolute",
        height: 20,
        width: 10,
        backgroundColor: "cornflowerblue",
        borderRadius: 5,
        border: "lightgrey 1px solid",
        opacity: 0.75,
        top: y,
        left: x,
      }}
    />
  );
}
