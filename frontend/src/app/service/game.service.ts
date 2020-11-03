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
import { GameStatusView } from '../view/game-status.view';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game = null;
  SERVER_URL = environment.serverUrl;
  MOCK_DELAY = 500;

  constructor(private http: HttpClient) {}

  getActiveGame(): Observable<LeakyTextGameView> {
    return this.http.get<LeakyTextGameView>(`${this.SERVER_URL}/game/active`);
  }

  create(text: string): Observable<LeakyTextGameView> {
    return this.http.post<LeakyTextGameView>(`${this.SERVER_URL}/game`, text);
  }

  startGame(id: number): Observable<GameStatusView> {
    return this.http.put<GameStatusView>(
      `${this.SERVER_URL}/game/${id}/start`,
      null
    );
  }

  remix(id: number, level: number): Observable<LeakyTextGameView> {
    return this.http.put<LeakyTextGameView>(
      `${this.SERVER_URL}/game/${id}/remix/${level}`,
      null
    );
  }

  save(game: LeakyTextGameView): Observable<LeakyTextGameView> {
    this.game = game;
    return of(this.game);
  }

  cancel(id: number): Observable<any> {
    return this.http.put<any>(`${this.SERVER_URL}/game/${id}/cancel`, null);
  }

  checkWords(id: number, words: Word[]): Observable<Word[]> {
    return this.http.post<Word[]>(`${this.SERVER_URL}/game/${id}/check`, words);
  }
}
