import { Genome } from "../../core/genetic";
import IEgg from "../EggModel";

export interface ICell {
  id: string;
  position: {
    x: number;
    y: number;
    a: number;
  };
  energy: number;
  genome: Genome | null;
}

export default class CellModel implements ICell {
  constructor({ id, genome, position }: IEgg) {
    this.id = id;
    this.genome = genome;
    this.position = { ...position, a: Math.random() * 360 };
    this.energy = Math.round(1000 + (Math.random() - 0.5) * 10);
    this.speed = Math.round(10 + (Math.random() - 0.5) * 10);
  }
  id: string;
  position: {
    x: number;
    y: number;
    a: number;
  };
  energy: number;
  genome: Genome | null;

  speed: number;

  static cast(cell: ICell) {
    const newCell = new CellModel(cell);
    newCell.energy = cell.energy;
    newCell.position.a = cell.position.a;
    return newCell;
  }

  moveForward() {
    const angle = this.position.a * (Math.PI / 180);
    this.position.x = this.position.x + Math.cos(Math.PI - angle) * this.speed;
    this.position.y = this.position.y - Math.sin(Math.PI - angle) * this.speed;
    this.energy--;
  }

  changeDirection(a: number) {
    this.position.a = a;
  }

  eat(energy: number) {
    this.energy += energy;
  }
}
