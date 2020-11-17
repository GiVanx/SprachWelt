import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../authentication/service/auth.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { GameFacade } from '../state/game.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(
    private gameFacade: GameFacade,
    private router: Router,
    private spinnerOverlayService: SpinnerOverlayService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onPlayClick() {
    this.authService
      .user$()
      .pipe(first())
      .subscribe((user) => {
        if (!user) {
          this.router.navigate(['auth', 'login']);
        } else {
          this.gameRedirect();
        }
      });
  }

  gameRedirect() {
    this.gameFacade
      .selectActiveGameRequestSentAtLeastOnce()
      .pipe(
        first(),
        switchMap((requestSent) => {
          const activeGame$ = this.gameFacade.selectActiveGame().pipe(first());
          if (!requestSent) {
            this.spinnerOverlayService.showSpinner();
            return this.gameFacade.getActiveGameRequest().pipe(
              tap(() => this.spinnerOverlayService.stopSpinner()),
              switchMap(() => activeGame$)
            );
          }
          return activeGame$;
        }),
        first()
      )
      .subscribe((activeGame) => {
        if (activeGame) {
          this.router.navigate(['text-fill']);
        } else {
          this.router.navigate(['text']);
        }
      });
  }
}
