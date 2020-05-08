import { WordStatus } from './word-status';

export class Word {
  id: string;
  text: string;
  position?: number;
  status?: WordStatus;

  constructor(id: string, text: string, position: number, status: WordStatus) {
    this.id = id;
    this.text = text;
    this.position = position;
    this.status = status;
  }
}
