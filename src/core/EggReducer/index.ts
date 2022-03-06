import { Component } from "react";
import Cell from "../../models/Cell";
import Egg from "../../models/Egg";
import Genome from "../../models/Genome";
import Neat from "../../models/Genome/neat";
import { IAppContext, Props } from "../AppContext";

export interface IEggReducer {
  eggs: Egg[];
  initEggs: () => void;
  addEgg: () => void;
  hatch: () => void;
  initEggsFromLastGenerationBestCell: () => void;
}

export const initialEggs: IEggReducer = {
  eggs: [],
  initEggs: () => {},
  initEggsFromLastGenerationBestCell: () => {},
  addEgg: () => {},
  hatch: () => {},
};

export default function EggReducer(
  app: Component<Props, IAppContext>
): IEggReducer {
  function addEgg() {
    const eggs = [...app.state.eggs, new Egg(app.state.settings.area, Neat())];
    app.setState({ ...app.state, eggs });
  }

  function initEggs() {
    const eggs = Array.from(
      { length: app.state.settings.nbCells },
      (_, i) => i
    ).map((_) => {
      return new Egg(app.state.settings.area, Neat());
    });

    app.setState({ eggs });
  }

  function initEggsFromLastGenerationBestCell() {
    const { best } = app.state;
    if (!best) return;
    const eggs = Array.from(
      { length: app.state.settings.nbCells },
      (_, i) => i
    ).map((_) => {
      const genome = new Genome(
        [...best.cell.genome.nodes],
        [...best.cell.genome.connections]
      );
      return new Egg(app.state.settings.area, Neat(genome));
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
    initEggsFromLastGenerationBestCell,
  };
}
