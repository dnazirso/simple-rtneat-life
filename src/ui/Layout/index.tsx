import Controls from "../Controls";
import NeuralNetwork from "../NeuralNetwork";
import PetriBox from "../PetriBox";

export default function Layout() {
  return (
    <>
      <div className="PanelInfo">
        <Controls />
        <NeuralNetwork />
      </div>
      <PetriBox />
    </>
  );
}
