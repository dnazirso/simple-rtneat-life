import IEgg from "../../models/EggModel";
import CellModel from "../../models/CellModel";
import { AppContext } from "./index";

export default function addCellToList(
  state: AppContext,
  { payload }: { payload: { egg: IEgg } }
) {
  if (state.cells.some((c) => c.id === payload.egg.id)) return;
  const cell: CellModel = new CellModel(payload.egg);
  state.cells = [...state.cells, cell];
  state.eggs = state.eggs.filter((e) => e.id !== payload.egg.id);
}
