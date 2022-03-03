import { generateUID } from "../../helper";
import { ICell } from "../Cell";
import { Genome } from "../genetic";

export interface IEgg extends ICell {
  hatchDelay: number;
}

export default class Egg implements IEgg {
  id: string;
  position: { x: number; y: number; a: number };
  energy: number;
  genome: Genome | null;
  speed: number;
  hatchDelay: number;

  constructor({ w, h }: { w: number; h: number }) {
    this.id = generateUID();
    this.position = {
      x: Math.random() * w,
      y: Math.random() * h,
      a: Math.random() * 360,
    };
    this.energy = 1000 + Math.round(5 * (Math.random() - 0.5));
    this.genome = null;
    this.speed = 1;
    this.hatchDelay = 20 + Math.round(10 * (Math.random() - 0.5));
  }
}
