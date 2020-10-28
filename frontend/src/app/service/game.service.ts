import { Injectable } from '@angular/core';
import { LeakyTextGameView } from '../view/leaky-text-game.view';
import { Observable, of } from 'rxjs';
import { leakyGameMock } from '../mock-data/leaky-text-game.data';
import { Word } from '../model/word.model';
import { checkedWordsMock } from '../mock-data/checked-words.data';
import { debounceTime, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GameStatus } from '../model/game-status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game = null;
  SERVER_URL = environment.serverUrl;
  MOCK_DELAY = 500;

  constructor(private http: HttpClient) {}

  getActiveGame(): Observable<LeakyTextGameView> {
    if (environment.mockServer) {
      return of(leakyGameMock).pipe(delay(this.MOCK_DELAY));
    }

    return this.http.get<LeakyTextGameView>(`${this.SERVER_URL}/active`);
  }

  create(text: string): Observable<LeakyTextGameView> {
    if (environment.mockServer) {
      this.game = leakyGameMock;
      return of(this.game).pipe(delay(this.MOCK_DELAY));
    }

    return this.http.post<LeakyTextGameView>(this.SERVER_URL, text);
  }

  startGame(id: number) {
    return of({ ...this.game, status: GameStatus.STARTED }).pipe(
      delay(this.MOCK_DELAY)
    );
  }

  remix(id: number, level: number) {
    console.log('remix request issued');
    return of(this.game).pipe(delay(this.MOCK_DELAY));
  }

  save(game: LeakyTextGameView): Observable<LeakyTextGameView> {
    this.game = game;
    return of(this.game);
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
