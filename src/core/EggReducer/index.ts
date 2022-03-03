import { Component } from "react";
import Cell from "../../models/Cell";
import Egg from "../../models/Egg";
import Genome from "../../models/Genome";
import { initNodes } from "../../models/Genome/Node";
import { IAppContext, Props } from "../AppContext";

export interface IEggReducer {
  eggs: Egg[];
  initEggs: () => void;
  addEgg: () => void;
  hatch: () => void;
}

export const initialEggs: IEggReducer = {
  eggs: [],
  initEggs: () => {},
  addEgg: () => {},
  hatch: () => {},
};

export default function EggReducer(
  app: Component<Props, IAppContext>
): IEggReducer {
  function addEgg() {
    const nodes = initNodes();
    const genome = new Genome(nodes, []);
    const eggs = [...app.state.eggs, new Egg(app.state.settings.area, genome)];
    app.setState({ ...app.state, eggs });
  }

  function initEggs() {
    const eggs = Array.from(
      { length: app.state.settings.nbCells },
      (_, i) => i
    ).map((_) => {
      const nodes = initNodes();
      const genome = new Genome(nodes, []);
      return new Egg(app.state.settings.area, genome);
    });

    app.setState({ eggs });
  }

  function hatch() {
    const allEggs = app.state.eggs.map((egg) => {
      egg.hatchDelay--;
      return egg;
    });
    const eggs = allEggs.filter((egg) => egg.hatchDelay > 0);
    const cells = allEggs
      .filter((egg) => egg.hatchDelay <= 0)
      .map((egg) => new Cell(egg));
    app.setState({ eggs, cells: [...app.state.cells, ...cells] });
  }

  return {
    eggs: [],
    addEgg,
    initEggs,
    hatch,
  };
}
