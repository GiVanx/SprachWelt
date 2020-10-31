import { GameStatus } from '../model/game-status';
import { LeakyTextGame } from '../model/leaky-text-game.model';
import { Word } from '../model/word.model';
import { StateReducer } from './word.reducer';

export interface GameState {
  game: StateReducer<LeakyTextGame>;
  missingWords: StateReducer<Word>;
  textWithGaps: StateReducer<Word>;
  wordsToBeEvaluated: number[];
  totalCountWordsToBeEvaluated: number;
  activeGameId: number;
  activeGameSentAtLeastOnce: boolean;
}

export const initialGameState: GameState = {
  game: new StateReducer(),
  missingWords: new StateReducer(),
  textWithGaps: new StateReducer(),
  wordsToBeEvaluated: [],
  totalCountWordsToBeEvaluated: 0,
  activeGameId: null,
  activeGameSentAtLeastOnce: false,
};
