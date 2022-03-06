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
    const nodeA = new Node(genome.nodes[indexA]);
    const nodeB = new Node(genome.nodes[indexB]);

    if (!nodeA) return;
    if (!nodeB) return;

    if (nodeA.id === nodeB.id) return;
    if (nodeA.x === nodeB.x) return;

    if (genome.connections.find((c) => c.id === nodeA.id + nodeB.id)) return;
    if (genome.connections.find((c) => c.id === nodeB.id + nodeA.id)) return;

    if (nodeA.x < nodeB.x) {
      const connection = new Connection({ from: nodeA, to: nodeB });
      nodeB.connections.push(connection);
      genome.connections.push(connection);
    } else {
      const connection = new Connection({ from: nodeB, to: nodeA });
      nodeA.connections.push(connection);
      genome.connections.push(connection);
    }
  }

  function AddNode() {
    const index = Math.floor(Math.random() * genome.connections.length);
    const prevConnection = genome.connections[index];

    if (!prevConnection) return;

    let nodeA = new Node(prevConnection.from);
    let nodeC = new Node(prevConnection.to);

    genome.connections = genome.connections.filter(
      (c) => c.id !== prevConnection.id
    );

    genome.nodes = genome.nodes.filter((n) => n.id !== nodeA.id);
    genome.nodes = genome.nodes.filter((n) => n.id !== nodeC.id);

    const y = 0.8 / (1 + Math.exp(-(20 * (nodeA.y + nodeC.y) - 10))) + 0.1;

    let nodeB = new Node({
      x: (nodeA.x + nodeC.x) / 2,
      y: y / 2,
      connections: [],
    });

    let connection1 = new Connection({ from: nodeA, to: nodeB });
    let connection2 = new Connection({ from: nodeB, to: nodeC });
    connection1.weigth = 1;
    connection2.weigth = prevConnection.weigth;
    connection2.enabled = prevConnection.enabled;

    genome.connections = [...genome.connections, connection1, connection2];

    nodeA.connections = genome.connections.filter((c) => c.to.id === nodeA.id);
    nodeB.connections = genome.connections.filter((c) => c.to.id === nodeB.id);
    nodeC.connections = genome.connections.filter((c) => c.to.id === nodeC.id);

    genome.nodes = [...genome.nodes, nodeA, nodeB, nodeC];
  }

  function ShiftWeight() {
    const index = Math.floor(Math.random() * genome.connections.length);
    if (!genome.connections[index]) return;
    genome.connections[index].weigth =
      (Math.random() - 0.5) * WEIGHT_SHIFT_STRENGTH;
  }

  function RandomWeight() {
    const index = Math.floor(Math.random() * genome.connections.length);
    if (!genome.connections[index]) return;
    genome.connections[index].weigth =
      (Math.random() - 0.5) * WEIGHT_RANDOM_STRENGTH;
  }

  function ToggleConnection() {
    const index = Math.floor(Math.random() * genome.connections.length);
    if (!genome.connections[index]) return;
    genome.connections[index].enabled = !genome.connections[index].enabled;
  }

  return Mutate();
}
