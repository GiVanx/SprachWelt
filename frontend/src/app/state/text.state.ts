import { Word } from '../model/word';

export interface TextState {
  activeTextId: string;
  missingWords: Word[];
  textWithGaps: Word[];
  wordsToBeEvaluated: Map<number, Word>;
}

export const initialWordState: TextState = {
  activeTextId: null,
  missingWords: [],
  textWithGaps: [],
  wordsToBeEvaluated: new Map(),
};
