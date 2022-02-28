import { generateUID } from "../helper";
import { AppContext } from "./index";

export function initEggsList(
  state: AppContext,
  {
    payload,
  }: { payload: { numberOfEggs: number; area: { w: number; h: number } } }
) {
  state.eggs = Array.from({ length: payload.numberOfEggs }, (_, i) => i).map(
    (_) => ({
      genome: null,
      id: generateUID(),
      position: {
        x: Math.random() * payload.area.w,
        y: Math.random() * payload.area.h,
      },
    })
  );
}
