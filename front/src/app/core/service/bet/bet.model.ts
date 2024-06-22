export interface BetModel {
  id: string;
  name: string;
  runners: BetRunnerModel[];
}

export interface BetRunnerModel {
  id: string;
  name: string;
  odds: string;
  color: string;
}

export interface BetSelectedModel extends BetRunnerModel {
  bet: {
    id: string;
    name: string;
  },
  coins: number;
}
