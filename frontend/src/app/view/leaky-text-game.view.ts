import { GameState } from '../state/game.state';
import { GameStatus } from '../model/game-status';
import { Word } from '../model/word.model';

export class LeakyTextGameView {
  id: number;
  status: GameStatus;
  missingWords?: Word[];
  textWithGaps?: Word[];
}
