import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Genome } from "../genetic";
import { EggProps } from "../eggSlice";

export type CellProps = {
  id: string;
  position: {
    x: number;
    y: number;
    a: number;
  };
  energy: number;
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
    addCell: (state, { payload }: { payload: { egg: EggProps } }) => {
      if (state.cells.some((c) => c.id === payload.egg.id)) return;
      const cell: CellProps = {
        ...payload.egg,
        energy: Math.round(100 + (Math.random() - 0.5) * 10),
        position: {
          x: payload.egg.position.x,
          y: payload.egg.position.y,
          a: Math.random() * 360,
        },
      };
      state.cells = [...state.cells, cell];
    },
    depleteEnergy: (
      state,
      { payload: { id } }: { payload: { id: string } }
    ) => {
      const index = state.cells.findIndex((c) => c.id === id);
      state.cells[index].energy--;
    },
    removeCell: (state, { payload: { id } }: { payload: { id: string } }) => {
      state.cells = state.cells.filter((c) => c.id !== id);
    },
  },
});

export const selectCell = (state: RootState) => state.cells;

export const { addCell, removeCell, depleteEnergy } = CellSlice.actions;

export default CellSlice.reducer;
