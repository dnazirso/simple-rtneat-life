import { generateUID } from "../../helper";
import { IEgg } from "../Egg";
import { IFood } from "../Food";
import Genome, { IGenome } from "../Genome";
import { initNodes } from "../Genome/Node";

export interface ICell {
  id: string;
  position: {
    x: number;
    y: number;
    a: number;
  };
  energy: number;
  genome: IGenome;
  speed: number;
  acceleration: number;
}

export default class Cell implements ICell {
  id: string;
  position: { x: number; y: number; a: number };
  energy: number;
  genome: IGenome;
  speed: number;
  acceleration: number;

  constructor();
  constructor(cell: ICell);
  constructor(egg: IEgg);
  constructor(obj?: ICell) {
    this.id = obj?.id ?? generateUID();
    this.genome = obj?.genome ?? new Genome(initNodes(), []);
    this.position = obj?.position ?? {
      x: Math.random() * 100,
      y: Math.random() * 100,
      a: Math.random() * 360,
    };
    this.energy = obj?.energy ?? 1000 + Math.round(5 * (Math.random() - 0.5));
    this.speed = obj?.speed ?? 1;
    this.acceleration = obj?.speed ?? 1;
  }

  behave(foods: IFood[]) {
    if (foods.length === 0) return;
    const food = this.getClosestFood(foods);

    const { x, y } = food.position;

    const output = this.genome.Calculate([x, y]);

    if (output[0] && output[0] !== this.acceleration)
      this.changeAcceleration(output[1]);
    if (output[1] && output[1] !== this.position.a)
      this.changeDirection(output[1]);
    this.move();

    this.energy--;
  }

  getClosestFood(foods: IFood[]) {
    foods.sort((a, b) => {
      const dista = Math.sqrt(
        Math.pow(a.position.x - this.position.x, 2) +
          Math.pow(a.position.y - this.position.y, 2)
      );
      const distb = Math.sqrt(
        Math.pow(b.position.x - this.position.x, 2) +
          Math.pow(b.position.y - this.position.y, 2)
      );
      if (dista === distb) return 0;
      if (dista > distb) return 1;
      else return -1;
    });

    return foods[0];
  }

  move() {
    const angle = this.position.a * (Math.PI / 180);
    this.position.x =
      this.position.x +
      Math.cos(Math.PI - angle) * this.speed * this.acceleration;
    this.position.y =
      this.position.y -
      Math.sin(Math.PI - angle) * this.speed * this.acceleration;
  }

  changeAcceleration(acceleration: number) {
    this.acceleration = acceleration;
  }

  changeDirection(a: number) {
    this.position.a = a;
  }

  eat(foods: IFood[], updateFood: (foods: IFood[]) => void) {
    const newFoods = foods.filter((food) => {
      const hasCollid =
        food.position.x < this.position.x + 20 &&
        food.position.x > this.position.x - 20 &&
        food.position.y < this.position.y + 20 &&
        food.position.y > this.position.y - 20;

      if (hasCollid) {
        this.energy += food.energy;
        this.genome.score++;
      }
      return !hasCollid;
    });

    updateFood(newFoods);
  }
}
