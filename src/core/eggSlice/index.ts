import { createSlice } from "@reduxjs/toolkit";
import { Genome } from "../genetic";
import { generateUID } from "../helper";
import { RootState } from "../store";

export type IEgg = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  genome: Genome | null;
};

type EggContext = {
  eggs: IEgg[];
};

const initialState: EggContext = {
  eggs: [],
};

function newEgg({ w, h }: { w: number; h: number }) {
  return {
    genome: null,
    id: generateUID(),
    position: {
      x: Math.random() * w,
      y: Math.random() * h,
    },
  };
}

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
      ).map((_) => newEgg(payload.area));
    },
    removeEgg: (state, { payload }: { payload: { id: string } }) => {
      state.eggs = state.eggs.filter((e) => e.id !== payload.id);
    },
  },
});

export const selectEgg = (state: RootState) => state.eggs;

export const { initEggs, removeEgg } = EggSlice.actions;

export default EggSlice.reducer;
