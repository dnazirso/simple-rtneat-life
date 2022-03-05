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
}

export default class Cell implements ICell {
  id: string;
  position: { x: number; y: number; a: number };
  energy: number;
  genome: IGenome;
  speed: number;

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
  }

  behave(foods: IFood[]) {
    if (foods.length === 0) return;
    const food = this.getClosestFood(foods);

    const { x, y } = food.position;

    const output = this.genome.Calculate([x, y]);

    if (output[0] > 0.2) this.moveForward();
    if (output[1] !== 0 && this.position.a !== 0)
      this.changeDirection(output[1]);

    this.energy--;
  }

  getClosestFood(foods: IFood[]) {
    foods.sort((a, b) => {
      const dista = Math.sqrt(
        a.position.x - this.position.x + (a.position.y - this.position.y)
      );
      const distb = Math.sqrt(
        b.position.x - this.position.x + (b.position.y - this.position.y)
      );
      if (dista === distb) return 0;
      if (dista > distb) return 1;
      else return -1;
    });

    return foods[0];
  }

  moveForward() {
    const angle = this.position.a * (Math.PI / 180);
    this.position.x = this.position.x + Math.cos(Math.PI - angle) * this.speed;
    this.position.y = this.position.y - Math.sin(Math.PI - angle) * this.speed;
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

      if (hasCollid) this.energy += food.energy;
      this.genome.score++;
      return !hasCollid;
    });

    updateFood(newFoods);
  }
}
