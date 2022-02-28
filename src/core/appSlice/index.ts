import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IEgg from "../../models/EggModel";
import CellModel from "../../models/CellModel";
import IFood from "../../models/FoodModel";
import { initEggsList } from "./initEggsList";
import { initFoodList } from "./initFoodList";
import addCellToList from "./addCellToList";
import computeEachCellBehavior from "./computeEachCellBehavior";

export const COST = 1;

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

export const AppSlice = createSlice({
  name: "AppInfo",
  initialState,
  reducers: {
    initFood: initFoodList,
    initEggs: initEggsList,
    addCell: addCellToList,
    computeBehaviors: computeEachCellBehavior,
    computeCollision: (state) => {
      state.cells.forEach((c) => {
        state.food = state.food.filter((f) => {
          const hasCollid =
            f.position.x < c.position.x + 20 &&
            f.position.x > c.position.x - 20 &&
            f.position.y < c.position.y + 20 &&
            f.position.y > c.position.y - 20;

          const cell = CellModel.cast(c);
          cell.eat(f.energy);

          return !hasCollid;
        });
      });
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
  },
});

export const selectApp = (state: RootState) => state.app;

export const {
  initFood,
  initEggs,
  addCell,
  depleteEnergy,
  computeBehaviors,
  computeCollision,
} = AppSlice.actions;

export default AppSlice.reducer;
