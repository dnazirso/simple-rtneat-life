import { generateUID } from "../../helper";
import { NUMBER_OF_INPUT_NODES, NUMBER_OF_OUTPUT_NODES } from "../Constants";

export interface INode {
  id: string;
  x: number;
  y: number;
  activation: number;
}

export default class Node implements INode {
  id: string;
  x: number;
  y: number;
  activation: number;

  constructor({
    x,
    y,
    activation,
  }: {
    x: number;
    y: number;
    activation: number;
  }) {
    this.id = generateUID();
    this.x = x;
    this.y = y;
    this.activation = activation;
  }
}

export function initNodes() {
  const nodes: Node[] = [];
  for (let index = 0; index < NUMBER_OF_INPUT_NODES; index++) {
    nodes.push(
      new Node({
        x: 0,
        y: (1 / NUMBER_OF_INPUT_NODES) * index + 1,
        activation: Math.random(),
      })
    );
  }
  for (let index = 0; index < NUMBER_OF_OUTPUT_NODES; index++) {
    nodes.push(
      new Node({
        x: 0,
        y: (1 / NUMBER_OF_INPUT_NODES) * index + 1,
        activation: Math.random(),
      })
    );
  }
  return nodes;
}
