import Connection, { IConnection } from "./Connection";
import { NUMBER_OF_INPUT_NODES, NUMBER_OF_OUTPUT_NODES } from "./Constants";
import Node from "./Node";

export interface IGenome {
  nodes: Node[];
  connections: IConnection[];
  score: number;
  Calculate: (inputs: number[]) => number[];
}

export default class Genome implements IGenome {
  nodes: Node[];
  connections: IConnection[];
  score: number;

  constructor(nodes: Node[], connections: IConnection[]) {
    this.nodes = nodes.map((n) => new Node(n));
    this.connections = connections.map((c) => {
      const fromIndex = this.nodes.findIndex((n) => n.id === c.from.id);
      const toIndex = this.nodes.findIndex((n) => n.id === c.to.id);

      const from = nodes[fromIndex];
      const to = nodes[toIndex];

      return new Connection({ from, to });
    });

    nodes.forEach((n) => {
      n.connections = this.connections.filter((c) => c.to.id === n.id);
    });

    this.score = 0;
  }

  Calculate(inputs: number[]) {
    this.nodes.sort((a, b) => a.x - b.x);

    for (let i = 0; i < NUMBER_OF_INPUT_NODES; i++) {
      this.nodes[i].output = inputs[i];
    }

    for (let i = NUMBER_OF_INPUT_NODES; i < this.nodes.length; i++) {
      this.nodes[i].Calculate();
    }

    let outputs: number[] = [];
    for (
      let i = this.nodes.length - 1;
      i > this.nodes.length - NUMBER_OF_OUTPUT_NODES - 1;
      i--
    ) {
      outputs.push(this.nodes[i].output);
    }

    return outputs;
  }
}
