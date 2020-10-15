import { Component, OnInit } from '@angular/core';
import { GameFacade } from '../state/game.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.less'],
})
export class TextInputComponent implements OnInit {
  text: string;

  constructor(private textStore: GameFacade, private router: Router) {}

  ngOnInit(): void {
    console.log('text input component');
  }

  onPlay() {
    console.log('ON PLAY', this.text);
    // TODO: change this length logic
    if (this.text.length > 0) {
      this.textStore.createGameRequest(this.text);
      this.router.navigate(['/text-fill']);
    }
  }
}
