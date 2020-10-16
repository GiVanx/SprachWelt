import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { GameFacade } from './state/game.facade';

@Injectable({
  providedIn: 'root',
})
export class ActiveGameResolverService implements Resolve<any> {
  constructor(private gameFacade: GameFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.gameFacade.getActiveGameRequest();
  }
}
