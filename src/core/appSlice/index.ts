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
    computeBehaviors: (state) => {
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
        const eaten = cell.behave(closestFood[0] || null);
        if (eaten) state.food = state.food.filter((f) => f.id !== eaten);
        return cell;
      });
    },
  },
});

export const selectApp = (state: RootState) => state.app;

export const { initFood, initEggs, addCell, depleteEnergy, computeBehaviors } =
  AppSlice.actions;

export default AppSlice.reducer;
