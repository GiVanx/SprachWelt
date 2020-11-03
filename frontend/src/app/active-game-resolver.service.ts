import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { GameFacade } from './state/game.facade';

@Injectable({
  providedIn: 'root',
})
export class ActiveGameResolverService implements Resolve<any> {
  constructor(private gameFacade: GameFacade, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.gameFacade.selectActiveGameRequestSentAtLeastOnce().pipe(
      first(),
      switchMap((requestSent) => {
        const activeGame$ = this.gameFacade.selectActiveGame().pipe(first());
        if (!requestSent) {
          return this.gameFacade
            .getActiveGameRequest()
            .pipe(switchMap(() => activeGame$));
        }
        return activeGame$;
      })
    );
  }
}
