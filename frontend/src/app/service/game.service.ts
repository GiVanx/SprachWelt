import { Injectable } from '@angular/core';
import { LeakyTextGame } from '../model/text-with-gaps';
import { Observable, of } from 'rxjs';
import { leakyGameMock } from '../mock-data/leaky-text-game.data';
import { Word } from '../model/word';
import { checkedWordsMock } from '../mock-data/checked-words.data';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GameStatus } from '../model/game-status';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game = null;

  constructor(private http: HttpClient) {}

  getActiveGame(): Observable<LeakyTextGame> {
    return of(this.game);
  }

  startGame(id: number) {
    return of({ ...this.game, status: GameStatus.STARTED });
  }

  remix(id: number, level: number) {
    return of(this.game);
  }

  save(game: LeakyTextGame): Observable<LeakyTextGame> {
    this.game = game;
    return of(this.game);
  }

  create(text: string): Observable<LeakyTextGame> {
    console.log('ADD TEXT', text);
    this.game = leakyGameMock;
    // return this.http.post<TextWithGaps>(environment.textEndpoint(), text);
    return of(this.game);
  }

  cancel(id: number): Observable<any> {
    this.game = null;
    return of(null);
  }

  checkWords(gameId: number, words: Word[]): Observable<Word[]> {
    // return this.http.post<Word[]>(environment.textCheckEndpoint(textId), words);
    return of(checkedWordsMock).pipe(debounceTime(2000));
  }
}
