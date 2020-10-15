import { WordStateReducer } from './word.reducer';

export interface GameState {
  gameId: number;
  missingWords: WordStateReducer;
  textWithGaps: WordStateReducer;
  wordsToBeEvaluated: number[];
  totalCountWordsToBeEvaluated: number;
}

export const initialWordState: GameState = {
  gameId: null,
  missingWords: new WordStateReducer(),
  textWithGaps: new WordStateReducer(),
  wordsToBeEvaluated: [],
  totalCountWordsToBeEvaluated: 0,
};
