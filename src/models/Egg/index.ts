import { generateUID } from "../../helper";
import { Genome } from "../genetic";

export type IEgg = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  energy: number;
  genome: Genome | null;
  hatchDelay: number;
};

export default class Egg implements IEgg {
  id: string;
  position: { x: number; y: number };
  energy: number;
  genome: Genome | null;
  hatchDelay: number;

  constructor({ w, h }: { w: number; h: number }) {
    this.id = generateUID();
    this.position = {
      x: Math.random() * w,
      y: Math.random() * h,
    };
    this.energy = 1000 + Math.round(5 * (Math.random() - 0.5));
    this.genome = null;
    this.hatchDelay = 20 + Math.round(10 * (Math.random() - 0.5));
  }
}
