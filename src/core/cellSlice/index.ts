import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IEgg from "../../models/EggModel";
import CellModel from "../../models/CellModel";

const COST = 1;

type CellContext = {
  cells: CellModel[];
};

const initialState: CellContext = {
  cells: [],
};

const CellSlice = createSlice({
  name: "CellsInfo",
  initialState,
  reducers: {
    addCell: (state, { payload }: { payload: { egg: IEgg } }) => {
      if (state.cells.some((c) => c.id === payload.egg.id)) return;
      const cell: CellModel = new CellModel(payload.egg);
      state.cells = [...state.cells, cell];
    },
    depleteEnergy: (state) => {
      state.cells = state.cells.reduce((acc: CellModel[], cell) => {
        if (cell.energy - COST <= 0) {
          return acc;
        } else {
          return [...acc, { ...cell, energy: cell.energy - COST }];
        }
      }, []);
    },
    computeOutputs: (state) => {
      state.cells = state.cells.map((c) => {
        const cell = CellModel.cast(c);
        cell.moveForward();
        cell.changeDirection(Math.random() * 360);
        return cell;
      });
    },
  },
});

export const selectCell = (state: RootState) => state.cells;

export const { addCell, depleteEnergy, computeOutputs } = CellSlice.actions;

export default CellSlice.reducer;
