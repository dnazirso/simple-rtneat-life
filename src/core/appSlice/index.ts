import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IEgg from "../../models/EggModel";
import CellModel from "../../models/CellModel";
import IFood from "../../models/FoodModel";
import { initEggsList } from "./initEggsList";
import { initFoodList } from "./initFoodList";

const COST = 1;

export type AppContext = {
  cells: CellModel[];
  eggs: IEgg[];
  food: IFood[];
};

const initialState: AppContext = {
  cells: [],
  eggs: [],
  food: [],
};

const AppSlice = createSlice({
  name: "AppInfo",
  initialState,
  reducers: {
    initFood: initFoodList,
    initEggs: initEggsList,
    addCell: (state, { payload }: { payload: { egg: IEgg } }) => {
      if (state.cells.some((c) => c.id === payload.egg.id)) return;
      const cell: CellModel = new CellModel(payload.egg);
      state.cells = [...state.cells, cell];
      state.eggs = state.eggs.filter((e) => e.id !== payload.egg.id);
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

export const selectApp = (state: RootState) => state.app;

export const { initFood, initEggs, addCell, depleteEnergy, computeOutputs } =
  AppSlice.actions;

export default AppSlice.reducer;
