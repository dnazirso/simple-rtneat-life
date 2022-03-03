import { IConnection } from "./Connections";
import Node from "./Node";

export interface IGenome {
  nodes: Node[];
  connections: IConnection[];
  score: number;
}

export default class Genome implements IGenome {
  nodes: Node[];
  connections: IConnection[];
  score: number;

  constructor(nodes: Node[], connections: IConnection[]) {
    this.nodes = nodes;
    this.connections = connections;
    this.score = 0;
  }
}
