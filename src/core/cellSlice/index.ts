import { createSlice } from "@reduxjs/toolkit";
import { generateUID } from "../helper";
import { RootState } from "../store";
import { Genome } from "../genetic";

export type CellProps = {
  id: string;
  position: {
    x: number;
    y: number;
    a: number;
  };
  genome: Genome | null;
};

type CellContext = {
  cells: CellProps[];
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
      ).map((_) => ({
        genome: null,
        id: generateUID(),
        position: {
          x: Math.random() * payload.area.w,
          y: Math.random() * payload.area.h,
          a: Math.random() * 360,
        },
      }));
    },
  },
});

export const selectCell = (state: RootState) => state.cells;

export const { initCells } = CellSlice.actions;

export default CellSlice.reducer;
