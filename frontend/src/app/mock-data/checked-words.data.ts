import { Word } from '../model/word.model';
import { WordStatus } from '../model/word-status';

export const checkedWordsMock: Word[] = [
  {
    id: 1,
    content: 'waren',
    status: WordStatus.OK,
  },
  {
    id: 2,
    content: 'das',
    status: WordStatus.WRONG,
  },
  {
    content: 'Jahre',
    id: 3,
    status: WordStatus.OK,
  },
];
