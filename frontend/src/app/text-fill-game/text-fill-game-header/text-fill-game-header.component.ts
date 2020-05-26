import { Component, OnInit } from '@angular/core';
import { TextStore } from '../../state/text.store';
import { Difficulty } from 'src/app/model/difficulty';

@Component({
  selector: 'app-text-fill-game-header',
  templateUrl: './text-fill-game-header.component.html',
  styleUrls: ['./text-fill-game-header.component.less'],
})
export class TextFillGameHeaderComponent implements OnInit {
  constructor(private store: TextStore) {}

  ngOnInit(): void {}

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
