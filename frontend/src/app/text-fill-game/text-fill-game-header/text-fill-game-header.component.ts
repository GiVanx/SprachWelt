import { Component, OnInit } from '@angular/core';
import { GameFacade } from '../../state/game.facade';
import { Difficulty } from 'src/app/model/difficulty';

@Component({
  selector: 'app-text-fill-game-header',
  templateUrl: './text-fill-game-header.component.html',
  styleUrls: ['./text-fill-game-header.component.less'],
})
export class TextFillGameHeaderComponent implements OnInit {
  MAX_COUNT_LEVELS = 10;
  levels: number[];
  constructor(private store: GameFacade) {}

  ngOnInit(): void {
    this.levels = new Array(this.MAX_COUNT_LEVELS).fill(0).map((x, i) => i + 1);
  }

  difficultyEnum() {
    return Difficulty;
  }

  onDifficultyChange($event) {
    console.log($event.value);
  }

  onCheckButtonClicked() {
    this.store.checkWords();
  }
}
