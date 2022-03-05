import { Component } from "react";
import { ISettings } from "../../models/Settings";
import { IAppContext, Props } from "../AppContext";

export interface ISettingsReducer {
  settings: ISettings;
  pause: boolean;
  ShowCellZone: boolean;
  selected: string | null;
  generation: number;
  run: () => void;
  repeate: () => void;
  launchNextGeneration: () => void;
  setGeneration: (generation: number) => void;
  setPause: (pause: boolean) => void;
  setSelected: (selected: string | null) => void;
  setShowCellZone: (ShowCellZone: boolean) => void;
  setSettings: (settings: ISettings) => void;
  saveToLocalStorage: () => void;
  getContextFromLocalStorage: () => void;
}

export const initialSettings: ISettingsReducer = {
  settings: {
    tickDelay: 30,
    nbCells: 10,
    nbPalets: 50,
    area: {
      h: 500,
      w: 500,
    },
  },
  pause: false,
  ShowCellZone: false,
  selected: null,
  generation: 1,
  run: () => {},
  repeate: () => {},
  launchNextGeneration: () => {},
  setGeneration: (generation: number) => {},
  setPause: (pause: boolean) => {},
  setSelected: (selected: string | null) => {},
  setShowCellZone: (ShowCellZone: boolean) => {},
  setSettings: (settings: ISettings) => {},
  saveToLocalStorage: () => {},
  getContextFromLocalStorage: () => {},
};

export default function SettingsReducer(
  app: Component<Props, IAppContext>
): ISettingsReducer {
  function run() {
    app.state.behave();
    app.state.hatch();
    const best = app.state.cells.sort(
      (a, b) => b.genome.score - a.genome.score
    )[0];

    if (best && best.genome.score > app.state.best.genome.score) {
      app.setState({ best });
    }
  }

  function repeate() {
    app.state.setGeneration(1);
    app.state.setSelected(null);
    app.state.setPause(false);
    app.state.emptyCells();
    app.state.initEggs();
    app.state.initFoods();
  }

  function launchNextGeneration() {
    app.state.setGeneration(app.state.generation + 1);
    app.state.setSelected(null);
    app.state.setPause(false);
    app.state.initEggsFromLastGenerationBestCell();
    app.state.initFoods();
  }

  function setGeneration(generation: number) {
    app.setState({ generation });
  }

  function setPause(pause: boolean) {
    app.setState({ pause });
  }

  function setSelected(selected: string | null) {
    app.setState({ selected });
  }

  function setShowCellZone(ShowCellZone: boolean) {
    app.setState({ ShowCellZone });
  }

  function setSettings(settings: ISettings) {
    app.setState({ settings });
  }

  function saveToLocalStorage() {
    persistContext(app.state);
  }

  function persistContext(partialContext: Partial<IAppContext>) {
    const stringyfiedContext = JSON.stringify(partialContext);
    localStorage.setItem("context", stringyfiedContext);
  }

  function getContextFromLocalStorage() {
    const partialContextString = localStorage.getItem("context");
    if (partialContextString && partialContextString.length > 0) {
      const partialContext = JSON.parse(partialContextString);
      app.setState({ ...partialContext });
    }
  }

  return {
    ...initialSettings,
    run,
    repeate,
    launchNextGeneration,
    setGeneration,
    setShowCellZone,
    setPause,
    setSelected,
    setSettings,
    saveToLocalStorage,
    getContextFromLocalStorage,
  };
}
