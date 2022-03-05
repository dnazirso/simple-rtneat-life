import { generateUID } from "../../helper";
import { NUMBER_OF_INPUT_NODES, NUMBER_OF_OUTPUT_NODES } from "./Constants";
import Connection from "./Connection";

export interface INode {
  id: string;
  x: number;
  y: number;
  connections: Connection[];
  output: number;
}

export default class Node implements INode {
  id: string;
  x: number;
  y: number;
  connections: Connection[];
  output: number = 0;

  constructor({
    x,
    y,
    connections,
  }: {
    x: number;
    y: number;
    connections: Connection[];
  }) {
    this.id = generateUID();
    this.x = x;
    this.y = y;
    this.connections = connections;
  }

  Calculate() {
    let result = 0;
    for (let i = 0; i < this.connections.length; i++) {
      if (this.connections[i].enabled && this.connections[i].from) {
        result += this.connections[i].weigth * this.connections[i].from.output;
      }
    }
    this.output = result;
  }
}

export function initNodes() {
  const nodes: Node[] = [];
  const divider =
    NUMBER_OF_INPUT_NODES - 1 === 0 ? 1 : NUMBER_OF_INPUT_NODES - 1;
  for (let index = 0; index < NUMBER_OF_INPUT_NODES; index++) {
    nodes.push(
      new Node({
        x: 0,
        y: index / divider,
        connections: [],
      })
    );
  }
  for (let index = 0; index < NUMBER_OF_OUTPUT_NODES; index++) {
    nodes.push(
      new Node({
        x: 1,
        y: index / divider,
        connections: [],
      })
    );
  }
  return nodes;
}
