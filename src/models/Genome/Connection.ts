import Node from "./Node";

export interface IConnection {
  id: string;
  from: Node;
  to: Node;
  weigth: number;
  enabled: boolean;
}

export default class Connection implements IConnection {
  id: string;
  from: Node;
  to: Node;
  weigth: number = (Math.random() - 0.5) * 2;
  enabled: boolean = true;

  constructor({ from, to }: { from: Node; to: Node }) {
    this.id = from.id + to.id;
    this.from = from;
    this.to = to;
  }
}
