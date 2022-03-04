export interface IConnection {
  to: string;
  weigth: number;
  enabled: boolean;
}

export default class Connection implements IConnection {
  to: string;
  weigth: number = Math.random();
  enabled: boolean = true;

  constructor({ to }: { to: string }) {
    this.to = to;
  }
}
