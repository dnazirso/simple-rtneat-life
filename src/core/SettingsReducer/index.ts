import { Component } from "react";
import { ISettings } from "../../models/Settings";
import { IAppContext, Props } from "../AppContext";

export interface ISettingsReducer {
  settings: ISettings;
  pause: boolean;
  ShowCellZone: boolean;
  selected: string | null;
  setPause: (pause: boolean) => void;
  setSelected: (selected: string | null) => void;
  setShowCellZone: (ShowCellZone: boolean) => void;
  setSettings: (settings: ISettings) => void;
  saveToLocalStorage: () => void;
  getContextFromLocalStorage: () => void;
}

export const initialSettings: ISettingsReducer = {
  settings: {
    tickDelay: 100,
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
    setShowCellZone,
    setPause,
    setSelected,
    setSettings,
    saveToLocalStorage,
    getContextFromLocalStorage,
  };
}
