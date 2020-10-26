import { Injectable } from '@angular/core';
import { LeakyTextGame } from '../model/text-with-gaps';
import { Observable, of } from 'rxjs';
import { leakyGameMock } from '../mock-data/leaky-text-game.data';
import { Word } from '../model/word';
import { checkedWordsMock } from '../mock-data/checked-words.data';
import { debounceTime, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GameStatus } from '../model/game-status';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game = null;
  MOCK_DELAY = 500;

  constructor(private http: HttpClient) {}

  getActiveGame(): Observable<LeakyTextGame> {
    return of(this.game).pipe(delay(this.MOCK_DELAY));
  }

  startGame(id: number) {
    console.log('start game request');
    return of({ ...this.game, status: GameStatus.STARTED }).pipe(
      delay(this.MOCK_DELAY)
    );
  }

  remix(id: number, level: number) {
    console.log('remix request issued');
    return of(this.game).pipe(delay(this.MOCK_DELAY));
  }

  save(game: LeakyTextGame): Observable<LeakyTextGame> {
    this.game = game;
    return of(this.game);
  }

  create(text: string): Observable<LeakyTextGame> {
    console.log('ADD TEXT', text);
    this.game = leakyGameMock;
    // return this.http.post<TextWithGaps>(environment.textEndpoint(), text);
    return of(this.game).pipe(delay(this.MOCK_DELAY));
  }

  cancel(id: number): Observable<any> {
    this.game = null;
    return of(null).pipe(delay(this.MOCK_DELAY));
  }

  checkWords(gameId: number, words: Word[]): Observable<Word[]> {
    // return this.http.post<Word[]>(environment.textCheckEndpoint(textId), words);
    return of(checkedWordsMock).pipe(delay(this.MOCK_DELAY));
  }
}
