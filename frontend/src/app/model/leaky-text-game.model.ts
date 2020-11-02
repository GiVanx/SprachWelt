import { GameStatus } from './game-status';

export class LeakyTextGame {
  id: number;
  status: GameStatus;
  missingWords?: number[];
  textWithGaps?: number[];
}
