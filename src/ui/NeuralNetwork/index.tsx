import { useContext } from "react";
import AppContext from "../../core/AppContext";
import Genome from "./Genome";

export default function NeuralNetwork() {
  const { selected, cells, best } = useContext(AppContext);
  const cell = cells.find((c) => c.id === selected);
  return (
    <>
      <div className="NeuralNetWork">
        <div>best cell: {best.cell.id}</div>
        <div>generation: {best.generation}</div>
        <div>
          score: <strong>{best.cell.genome.score}</strong>
        </div>
        <Genome genome={best.cell.genome} />
      </div>
      <div>
        {cell ? (
          <div className="NeuralNetWork">
            <div>selected cell: {cell.id}</div>
            <div>score: {cell.genome.score}</div>
            <Genome genome={cell.genome} />
          </div>
        ) : null}
      </div>
    </>
  );
}
