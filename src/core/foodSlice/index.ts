import { createSlice } from "@reduxjs/toolkit";
import { generateUID } from "../helper";
import { RootState } from "../store";

export type FoodProps = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  energie: number;
};

type FoodContext = {
  food: FoodProps[];
};

const initialState: FoodContext = {
  food: [],
};

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
      state.food = Array.from(
        { length: payload.numberOfFoods },
        (_, i) => i
      ).map((_) => ({
        energie: 10,
        id: generateUID(),
        position: {
          x: Math.random() * payload.area.w,
          y: Math.random() * payload.area.h,
        },
      }));
    },
  },
});

export const selectFood = (state: RootState) => state.foods;

export const { initFood } = FoodSlice.actions;

export default FoodSlice.reducer;
