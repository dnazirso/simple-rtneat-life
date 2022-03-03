import { useContext } from "react";
import AppContext from "../../core/AppContext";
import Neuron from "./Neuron";

export default function NeuralNetwork() {
  const { selected, cells } = useContext(AppContext);
  const cell = cells.find((c) => c.id === selected);
  return cell ? (
    <div className="NeuralNetWork">
      <div>selected cell: {cell.id}</div>
      <Neuron cell={cell} />
    </div>
  ) : null;
}
