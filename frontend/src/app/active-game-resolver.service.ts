import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { GameFacade } from './state/game.facade';

@Injectable({
  providedIn: 'root',
})
export class ActiveGameResolverService implements Resolve<any> {
  constructor(private gameFacade: GameFacade, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.gameFacade.getActiveGameRequest().pipe(
      tap((game) => {
        if (!game && state.url !== '/text' && state.url !== '/home') {
          this.router.navigate(['/text']);
        }
      })
    );
  }
}
