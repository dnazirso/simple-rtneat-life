import { generateUID } from "../../helper";
import { NUMBER_OF_INPUT_NODES, NUMBER_OF_OUTPUT_NODES } from "./Constants";
import Connection from "./Connection";

export interface INode {
  id: string;
  x: number;
  y: number;
  activation: number;
  connections: Connection[];
}

export default class Node implements INode {
  id: string;
  x: number;
  y: number;
  activation: number;
  connections: Connection[];

  constructor({
    x,
    y,
    activation,
    connections,
  }: {
    x: number;
    y: number;
    activation: number;
    connections: Connection[];
  }) {
    this.id = generateUID();
    this.x = x;
    this.y = y;
    this.activation = activation;
    this.connections = connections;
  }

  output(inputs: number[]) {
    let result: number = 0;
    for (let index = 0; index < inputs.length; index++) {
      result += inputs[index] * this.activation;
    }
    return result > 0 ? result : 0;
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
        activation: Math.random(),
        connections: [],
      })
    );
  }
  for (let index = 0; index < NUMBER_OF_OUTPUT_NODES; index++) {
    nodes.push(
      new Node({
        x: 1,
        y: index / divider,
        activation: Math.random(),
        connections: [],
      })
    );
  }
  return nodes;
}
