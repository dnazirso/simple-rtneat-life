import { Component } from "react";
import Cell from "../../models/Cell";
import { IEgg } from "../../models/Egg";
import { IFood } from "../../models/Food";
import { IAppContext, Props } from "../AppContext";

const COST = 1;

export interface ICellReducer {
  cells: Cell[];
  best: { cell: Cell; generation: number };
  emptyCells: () => void;
  addCell: (egg: IEgg) => void;
  behave: () => void;
}

export const initialCells: ICellReducer = {
  cells: [],
  best: { cell: new Cell(), generation: 0 },
  emptyCells: () => {},
  addCell: (egg: IEgg) => {},
  behave: () => {},
};

export default function CellReducer(
  app: Component<Props, IAppContext>
): ICellReducer {
  function emptyCells() {
    app.setState({ cells: [] });
  }

  function addCell(egg: IEgg) {
    const cells = [...app.state.cells, new Cell(egg)];
    app.setState({ cells });
  }

  function updateFood(foods: IFood[]) {
    app.setState({ foods });
  }

  function behave() {
    const cells = app.state.cells.reduce((acc: Cell[], cell) => {
      if (cell.energy - COST <= 0) {
        return acc;
      } else {
        cell.behave(app.state.foods);
        cell.eat(app.state.foods, updateFood);
        return [...acc, cell];
      }
    }, []);
    app.setState({ cells });
  }

  return {
    cells: [],
    best: { cell: new Cell(), generation: 0 },
    addCell,
    behave,
    emptyCells,
  };
}
