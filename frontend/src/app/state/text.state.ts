import { WordStateReducer } from './missing-words.reducer';

export interface TextState {
  activeTextId: string;
  missingWords: WordStateReducer;
  textWithGaps: WordStateReducer;
  wordsToBeEvaluated: string[];
}

export const initialWordState: TextState = {
  activeTextId: null,
  missingWords: new WordStateReducer(),
  textWithGaps: new WordStateReducer(),
  wordsToBeEvaluated: [],
};
