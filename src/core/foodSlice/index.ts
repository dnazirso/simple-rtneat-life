import { createSlice } from "@reduxjs/toolkit";
import { ICell } from "../cellSlice";
import { generateUID } from "../helper";
import { RootState } from "../store";

export type IFood = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  energy: number;
};

export type FoodContext = {
  foods: IFood[];
};

const initialState: FoodContext = {
  foods: [],
};

function newFood({ w, h }: { w: number; h: number }) {
  return {
    energy: 10,
    id: generateUID(),
    position: {
      x: Math.random() * w,
      y: Math.random() * h,
    },
  };
}

const FoodSlice = createSlice({
  name: "FoodInfo",
  initialState,
  reducers: {
    initFood: (
      state,
      {
        payload,
      }: { payload: { numberOfFoods: number; area: { w: number; h: number } } }
    ) => {
      state.foods = Array.from(
        { length: payload.numberOfFoods },
        (_, i) => i
      ).map((_) => newFood(payload.area));
    },
    updateFoods: (
      state,
      { payload: { cells } }: { payload: { cells: ICell[] } }
    ) => {
      const foodIDs: string[] = cells.flatMap((cell: ICell) => cell.digesting);
      state.foods = state.foods.filter((food) => !foodIDs.includes(food.id));
    },
  },
});

export const selectFood = (state: RootState) => state.foods;

export const { initFood, updateFoods } = FoodSlice.actions;

export default FoodSlice.reducer;
