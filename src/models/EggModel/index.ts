import { Genome } from "../../core/genetic";

export default interface IEgg {
  id: string;
  position: {
    x: number;
    y: number;
  };
  genome: Genome | null;
}
