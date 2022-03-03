import { generateUID } from "../../helper";

export type IFood = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  energy: number;
};

export default class Food implements IFood {
  id: string;
  position: { x: number; y: number };
  energy: number;

  constructor({ w, h }: { w: number; h: number }) {
    this.id = generateUID();
    this.position = {
      x: Math.random() * w,
      y: Math.random() * h,
    };
    this.energy = 10 + Math.round(5 * (Math.random() - 0.5));
  }
}
