import {
  PROBABILITY_TO_ADD_CONNECTION,
  PROBABILITY_TO_ADD_NODE,
  PROBABILITY_TO_SHIFT_WEIGTH,
  PROBABILITY_TO_RANDOM_WEIGHT,
  PROBABILITY_TO_TOGGLE_CONNECTION,
  WEIGHT_SHIFT_STRENGTH,
  WEIGHT_RANDOM_STRENGTH,
} from "./Constants";
import Genome from "./";
import Connection from "./Connection";
import Node, { initNodes } from "./Node";

export default function Neat(genome: Genome = new Genome(initNodes(), [])) {
  function Mutate() {
    if (PROBABILITY_TO_ADD_CONNECTION > Math.random()) AddConnection();
    if (PROBABILITY_TO_ADD_NODE > Math.random()) AddNode();
    if (PROBABILITY_TO_SHIFT_WEIGTH > Math.random()) ShiftWeight();
    if (PROBABILITY_TO_RANDOM_WEIGHT > Math.random()) RandomWeight();
    if (PROBABILITY_TO_TOGGLE_CONNECTION > Math.random()) ToggleConnection();
    return genome;
  }

  function AddConnection() {
    const indexA = Math.floor(Math.random() * genome.nodes.length);
    const indexB = Math.floor(Math.random() * genome.nodes.length);
    const nodeA = genome.nodes[indexA];
    const nodeB = genome.nodes[indexB];

    if (nodeA.id === nodeB.id) {
      AddConnection();
      return;
    }

    if (nodeA.x === nodeB.x) {
      AddConnection();
      return;
    }

    if (
      genome.connections.some(
        (c) =>
          (c.from.id === nodeA.id && c.to.id === nodeB.id) ||
          (c.from.id === nodeB.id && c.to.id === nodeA.id)
      )
    ) {
      AddConnection();
      return;
    }

    if (nodeA.x < nodeB.x) {
      const connection = new Connection({ from: nodeA, to: nodeB });
      nodeA.connections.push(connection);
      nodeB.connections.push(connection);
      genome.connections.push(connection);
    } else {
      const connection = new Connection({ from: nodeB, to: nodeA });
      nodeA.connections.push(connection);
      nodeB.connections.push(connection);
      genome.connections.push(connection);
    }
  }

  function AddNode() {
    const index = Math.floor(Math.random() * genome.connections.length);
    const prevConnection = genome.connections[index];

    const nodeA = genome.nodes.find((n) => n.id === prevConnection.from.id);
    if (!nodeA) return;
    const nodeB = genome.nodes.find((n) => n.id === prevConnection.to.id);
    if (!nodeB) return;

    nodeA.connections = nodeA.connections.filter(
      (c) => c.id !== prevConnection.id
    );
    nodeB.connections = nodeB.connections.filter(
      (c) => c.id !== prevConnection.id
    );

    const node = new Node({
      x: (prevConnection.from.x + prevConnection.to.x) / 2,
      y: (prevConnection.from.y + prevConnection.to.y) / 2,
      activation: (Math.random() - 0.5) * 2,
      connections: [],
    });

    const connectionA = new Connection({ from: nodeA, to: node });
    const connectionB = new Connection({ from: node, to: nodeB });
    connectionA.weigth = 1;
    connectionB.weigth = prevConnection.weigth;
    connectionB.enabled = prevConnection.enabled;

    nodeA.connections.push(connectionA);
    nodeB.connections.push(connectionB);
    node.connections.push(connectionA, connectionB);
  }

  function ShiftWeight() {
    genome.connections[
      Math.floor(Math.random() * genome.connections.length)
    ].weigth = (Math.random() - 0.5) * WEIGHT_SHIFT_STRENGTH;
  }

  function RandomWeight() {
    genome.connections[
      Math.floor(Math.random() * genome.connections.length)
    ].weigth = (Math.random() - 0.5) * WEIGHT_RANDOM_STRENGTH;
  }

  function ToggleConnection() {
    const index = Math.floor(Math.random() * genome.connections.length);
    genome.connections[index].enabled = !genome.connections[index].enabled;
  }

  return Mutate();
}
