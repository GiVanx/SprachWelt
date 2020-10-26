import { GameStatus } from '../model/game-status';
import { WordStateReducer } from './word.reducer';

export interface GameState {
  gameId: number;
  gameStatus: GameStatus;
  missingWords: WordStateReducer;
  textWithGaps: WordStateReducer;
  wordsToBeEvaluated: number[];
  totalCountWordsToBeEvaluated: number;
}

export const initialWordState: GameState = {
  gameId: null,
  gameStatus: null,
  missingWords: new WordStateReducer(),
  textWithGaps: new WordStateReducer(),
  wordsToBeEvaluated: [],
  totalCountWordsToBeEvaluated: 0,
};
