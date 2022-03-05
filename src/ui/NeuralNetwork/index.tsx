import { useContext } from "react";
import AppContext from "../../core/AppContext";
import Genome from "./Genome";

export default function NeuralNetwork() {
  const { selected, cells } = useContext(AppContext);
  const cell = cells.find((c) => c.id === selected);
  return cell ? (
    <div className="NeuralNetWork">
      <div>selected cell: {cell.id}</div>
      <div>score: {cell.genome.score}</div>
      <Genome genome={cell.genome} />
    </div>
  ) : null;
}
