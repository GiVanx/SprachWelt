import { Component, OnInit } from '@angular/core';
import { TextStore } from '../../state/text.store';

@Component({
  selector: 'app-text-fill-game-header',
  templateUrl: './text-fill-game-header.component.html',
  styleUrls: ['./text-fill-game-header.component.less'],
})
export class TextFillGameHeaderComponent implements OnInit {
  constructor(private store: TextStore) {}

  ngOnInit(): void {}

  onCheckButtonClicked() {
    this.store.checkWords();
  }
}
