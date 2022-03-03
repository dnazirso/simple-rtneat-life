import { Component } from "react";
import Food from "../../models/Food";
import { IEgg } from "../../models/Egg";
import { IAppContext, Props } from "../AppContext";

export interface IFoodReducer {
  foods: Food[];
  initFoods: () => void;
  addFood: (egg: IEgg) => void;
}

export const initialFoods: IFoodReducer = {
  foods: [],
  initFoods: () => {},
  addFood: (egg: IEgg) => {},
};

export default function FoodReducer(
  app: Component<Props, IAppContext>
): IFoodReducer {
  function addFood() {
    const foods = [...app.state.foods, new Food(app.state.settings.area)];
    app.setState({ ...app.state, foods });
  }
  function initFoods() {
    const foods = Array.from(
      { length: app.state.settings.nbPalets },
      (_, i) => i
    ).map((_) => new Food(app.state.settings.area));

    app.setState({ foods });
  }

  return {
    foods: [],
    addFood,
    initFoods,
  };
}
