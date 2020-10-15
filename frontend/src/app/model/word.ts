import { WordStatus } from './word-status';

export class Word {
  id: number;
  content: string;
  position?: number;
  status?: WordStatus;

  constructor(
    id: number,
    content: string,
    position: number,
    status: WordStatus
  ) {
    this.id = id;
    this.content = content;
    this.position = position;
    this.status = status;
  }
}
