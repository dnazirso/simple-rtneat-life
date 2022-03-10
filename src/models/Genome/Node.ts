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

  constructor({ x, y, id }: { x: number; y: number; id?: string }) {
    this.id = id ?? generateUID();
    this.x = x;
    this.y = y;
    this.connections = [];
  }

  Calculate() {
    let result = 0;
    this.output = 0;
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
  for (let index = 0; index < NUMBER_OF_INPUT_NODES; index++) {
    nodes.push(
      new Node({
        x: 0,
        y: index / NUMBER_OF_INPUT_NODES,
      })
    );
  }
  for (let index = 0; index < NUMBER_OF_OUTPUT_NODES; index++) {
    nodes.push(
      new Node({
        x: 1,
        y:
          index / NUMBER_OF_OUTPUT_NODES +
          1 / (2 * (NUMBER_OF_OUTPUT_NODES + 1)),
      })
    );
  }
  return nodes;
}
