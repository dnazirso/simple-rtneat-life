import { generateUID } from "../../helper";
import { IEgg } from "../Egg";
import { IFood } from "../Food";
import { Genome } from "../genetic";

export interface ICell {
  id: string;
  position: {
    x: number;
    y: number;
    a: number;
  };
  energy: number;
  genome: Genome | null;
  speed: number;
}

export default class Cell implements ICell {
  id: string;
  position: { x: number; y: number; a: number };
  energy: number;
  genome: Genome | null;
  speed: number;

  constructor();
  constructor(cell: ICell);
  constructor(egg: IEgg);
  constructor(obj?: ICell) {
    this.id = obj?.id ?? generateUID();
    this.genome = obj?.genome ?? null;
    this.position = obj?.position ?? {
      x: Math.random() * 100,
      y: Math.random() * 100,
      a: Math.random() * 360,
    };
    this.energy = obj?.energy ?? 1000 + Math.round(5 * (Math.random() - 0.5));
    this.speed = obj?.speed ?? 1;
  }

  behave() {
    this.moveForward();
    this.moveForward();
    this.changeDirection(Math.random() * 360);
    this.moveForward();
    this.moveForward();
  }

  seekClosestFood(foods: IFood[], updateFood: (foods: IFood[]) => void) {
    const closestFood = foods.sort((a, b) => {
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
    this.eat(closestFood, updateFood);
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

  eat(foods: IFood[], updateFood: (foods: IFood[]) => void) {
    const newFoods = foods.filter((food) => {
      const hasCollid =
        food.position.x < this.position.x + 20 &&
        food.position.x > this.position.x - 20 &&
        food.position.y < this.position.y + 20 &&
        food.position.y > this.position.y - 20;

      if (hasCollid) this.energy += food.energy;

      return !hasCollid;
    });

    updateFood(newFoods);
  }
}
