import { generateUID } from "../helper";
import { AppContext } from "./index";

export function initFoodList(
  state: AppContext,
  {
    payload,
  }: { payload: { numberOfFoods: number; area: { w: number; h: number } } }
) {
  state.food = Array.from({ length: payload.numberOfFoods }, (_, i) => i).map(
    (_) => ({
      energy: 10,
      id: generateUID(),
      position: {
        x: Math.random() * payload.area.w,
        y: Math.random() * payload.area.h,
      },
    })
  );
}
