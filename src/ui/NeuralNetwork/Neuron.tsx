import { ICell } from "../../models/Cell";

export default function Neuron({ cell }: { cell: ICell }) {
  return (
    <>
      {cell.genome.nodes.map((n) => (
        <div
          className="Node"
          style={{
            top: n.y * 150,
            left: n.x * 200,
          }}
        />
      ))}
    </>
  );
}
