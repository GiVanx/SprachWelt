import { WordStatus } from './word-status';

export class Word {
  id: string;
  text: string;
  position?: number;
  status?: WordStatus;

  constructor(text: string, position: number, status: WordStatus) {
    this.text = text;
    this.position = position;
    this.status = status;
  }
}
