import { Sentence } from '../model/sentence';
import { Word } from '../model/word';

export class SentenceState {
  activeSentenceIndex: number;
  sentences: Sentence[];
  sentenceWithGaps: Word[];
  missingWords: Word[];
  wordsToBeEvaluated: Word[];
}

export const initialSentenceState: SentenceState = {
  activeSentenceIndex: null,
  sentences: null,
  sentenceWithGaps: null,
  missingWords: null,
  wordsToBeEvaluated: null,
};
