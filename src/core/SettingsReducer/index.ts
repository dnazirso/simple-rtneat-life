import { Component } from "react";
import { ISettings } from "../../models/Settings";
import { IAppContext, Props } from "../AppContext";

export interface ISettingsReducer {
  settings: ISettings;
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
  setSettings: (settings: ISettings) => {},
  saveToLocalStorage: () => {},
  getContextFromLocalStorage: () => {},
};

export default function SettingsReducer(
  app: Component<Props, IAppContext>
): ISettingsReducer {
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
    setSettings,
    saveToLocalStorage,
    getContextFromLocalStorage,
  };
}
