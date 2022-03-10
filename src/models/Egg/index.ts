import { generateUID } from "../../helper";
import { ICell } from "../Cell";
import { IGenome } from "../Genome";

export interface IEgg extends ICell {
  hatchDelay: number;
}

export default class Egg implements IEgg {
  id: string;
  position: { x: number; y: number; a: number };
  energy: number;
  genome: IGenome;
  speed: number;
  acceleration: number;
  hatchDelay: number;

  constructor({ w, h }: { w: number; h: number }, genome: IGenome) {
    this.id = generateUID();
    this.position = {
      x: Math.random() * w,
      y: Math.random() * h,
      a: Math.random() * 360,
    };
    this.energy = 200 + Math.round(5 * (Math.random() - 0.5));
    this.genome = genome;
    this.speed = 1;
    this.acceleration = 0;
    this.hatchDelay = 20 + Math.round(10 * (Math.random() - 0.5));
  }
}
