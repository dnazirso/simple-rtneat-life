import CellModel from "../../models/CellModel";
import { AppContext } from "./index";

export default function computeEachCellBehavior(state: AppContext) {
  state.cells = state.cells.map((c: CellModel) => {
    const cell = CellModel.cast(c);
    const closestFood = state.food.sort((a, b) => {
      const dista = Math.sqrt(
        a.position.x - cell.position.x + (a.position.y - cell.position.y)
      );
      const distb = Math.sqrt(
        b.position.x - cell.position.x + (b.position.y - cell.position.y)
      );
      if (dista === distb) return 0;
      if (dista > distb) return 1;
      else return -1;
    });
    cell.behave(closestFood);
    return cell;
  });
}
