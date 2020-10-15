import { GameState } from '../state/game.state';
import { GameStatus } from './game-status';
import { Word } from './word';

export class LeakyTextGame {
  id: number;
  status: GameStatus;
  missingWords: Word[];
  textWithGaps: Word[];
}
