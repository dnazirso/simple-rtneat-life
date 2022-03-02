import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const COST = 1;

export type ISettings = {
  tickDelay: number;
  nbCells: number;
  nbPalets: number;
  area: {
    h: number;
    w: number;
  };
};

export type SettingsContext = {
  settings: ISettings;
};

const initialState: SettingsContext = {
  settings: {
    tickDelay: 50,
    nbCells: 10,
    nbPalets: 50,
    area: {
      h: 500,
      w: 500,
    },
  },
};

export const SettingsSlice = createSlice({
  name: "SettingsInfo",
  initialState,
  reducers: {
    setSettings: (state, { payload }: { payload: ISettings }) => {
      state.settings = payload;
    },
  },
});

export const selectSettings = (state: RootState) => state.settings;

export const { setSettings } = SettingsSlice.actions;

export default SettingsSlice.reducer;
