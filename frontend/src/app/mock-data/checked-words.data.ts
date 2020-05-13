import { Word } from '../model/word';
import { WordStatus } from '../model/word-status';

export const checkedWordsMock: Word[] = [
  {
    id: '5e804836986b3a5f225885f3',
    text: 'waren',
    status: WordStatus.OK,
  },
  {
    id: '5e804836986b3a5f225885fe',
    text: 'das',
    status: WordStatus.WRONG,
  },
  {
    text: 'Jahre',
    id: '5e804836986b3a5f225885f6',
    status: WordStatus.OK,
  },
];
