import { createSlice } from "@reduxjs/toolkit";
import { generateUID } from "../helper";
import { RootState } from "../store";

type Cell = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  energie: number;
};

type CellContext = {
  cells: Cell[];
};

const initialState: CellContext = {
  cells: [],
};

const CellSlice = createSlice({
  name: "CellsInfo",
  initialState,
  reducers: {
    initCells: (
      state,
      {
        payload,
      }: { payload: { numberOfCells: number; area: { w: number; h: number } } }
    ) => {
      state.cells = Array.from(
        { length: payload.numberOfCells },
        (_, i) => i
      ).map((c) => ({
        energie: 100,
        id: generateUID(),
        position: {
          x: Math.random() * payload.area.w,
          y: Math.random() * payload.area.h,
        },
      }));
    },
  },
});

export const selectCell = (state: RootState) => state.cells;

export const { initCells } = CellSlice.actions;

export default CellSlice.reducer;
