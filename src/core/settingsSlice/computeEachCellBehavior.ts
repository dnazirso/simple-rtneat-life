import { RootState } from "../store";

export default function computeEachCellBehavior(state: RootState) {
  // state.cells.cells = state.cells.cells.map((c: ICell) => {
  //   const closestFood = state.foods.foods.sort((a, b) => {
  //     const dista = Math.sqrt(
  //       a.position.x - c.position.x + (a.position.y - c.position.y)
  //     );
  //     const distb = Math.sqrt(
  //       b.position.x - c.position.x + (b.position.y - c.position.y)
  //     );
  //     if (dista === distb) return 0;
  //     if (dista > distb) return 1;
  //     else return -1;
  //   });
  //   // c.behave(closestFood);
  //   return c;
  // });
}
