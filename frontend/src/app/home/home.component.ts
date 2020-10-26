import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GameFacade } from '../state/game.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(private gameFacade: GameFacade, private router: Router) {}

  ngOnInit(): void {}

  onPlayClick() {
    this.gameFacade
      .selectActiveGameId()
      .pipe(first())
      .subscribe((id) => {
        if (id) {
          this.router.navigate(['text-fill']);
        } else {
          this.router.navigate(['text']);
        }
      });
  }
}
