export interface Genome {
  nodes: Node[];
  connections: Connection[];
}

export interface Node {
  id: string;
  x: number;
  y: number;
  activation: number;
  inovation: number;
}

export interface Connection {
  in: Node;
  out: Node;
  weigth: number;
  enabled: boolean;
}
