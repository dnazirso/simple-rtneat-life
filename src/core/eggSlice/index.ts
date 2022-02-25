import { createSlice } from "@reduxjs/toolkit";
import { generateUID } from "../helper";
import { RootState } from "../store";

type Egg = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  genome: number | null;
};

type EggContext = {
  eggs: Egg[];
};

const initialState: EggContext = {
  eggs: [],
};

const EggSlice = createSlice({
  name: "EggInfo",
  initialState,
  reducers: {
    initEggs: (
      state,
      {
        payload,
      }: { payload: { numberOfEggs: number; area: { w: number; h: number } } }
    ) => {
      state.eggs = Array.from(
        { length: payload.numberOfEggs },
        (_, i) => i
      ).map((_) => ({
        genome: null,
        id: generateUID(),
        position: {
          x: Math.random() * payload.area.w,
          y: Math.random() * payload.area.h,
        },
      }));
    },
  },
});

export const selectEgg = (state: RootState) => state.eggs;

export const { initEggs } = EggSlice.actions;

export default EggSlice.reducer;
