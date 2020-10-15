import { GameStatus } from '../model/game-status';
import { LeakyTextGame } from '../model/text-with-gaps';
import { WordStatus } from '../model/word-status';

export const leakyGameMock: LeakyTextGame = {
  id: 59,
  status: GameStatus.NOT_STARTED,
  missingWords: [
    {
      id: 48,
      content: 'a',
      status: WordStatus.IDLE,
    },
    {
      id: 44,
      content: 'ca',
      status: WordStatus.IDLE,
    },
    {
      id: 46,
      content: 'povest',
      status: WordStatus.IDLE,
    },
    {
      id: 43,
      content: 'odata',
      status: WordStatus.IDLE,
    },
    {
      id: 57,
      content: 'poate',
      status: WordStatus.IDLE,
    },
    {
      id: 42,
      content: 'fost',
      status: WordStatus.IDLE,
    },
  ],
  textWithGaps: [
    {
      id: 41,
      content: 'A',
      position: 0,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 45,
      content: 'in',
      position: 4,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 47,
      content: ',',
      position: 6,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 49,
      content: 'fost',
      position: 8,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 50,
      content: 'ca',
      position: 9,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 51,
      content: 'niciodata',
      position: 10,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 52,
      content: '.',
      position: 11,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 53,
      content: 'Odata',
      position: 12,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 54,
      content: ',',
      position: 13,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 55,
      content: 'odata',
      position: 14,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 56,
      content: ',',
      position: 15,
      status: WordStatus.ORIGINAL,
    },
    {
      id: 58,
      content: '.',
      position: 17,
      status: WordStatus.ORIGINAL,
    },
  ],
};
