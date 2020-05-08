import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TextWithGaps } from '../model/text-with-gaps';
import { Word } from '../model/word';
import { TextStore } from '../state/text.store';
import { UiStore } from '../state/ui.store';

@Component({
  selector: 'app-missing-words',
  templateUrl: './missing-words.component.html',
  styleUrls: ['./missing-words.component.less'],
})
export class MissingWordsComponent implements OnInit {
  missingWords$: Observable<Word[]>;

  constructor(private textStore: TextStore, private uiStore: UiStore) {}

  ngOnInit(): void {
    this.missingWords$ = this.textStore.selectMissingWords();
  }

  onWordSelectionChange(word: Word) {
    console.log('onWordSelectionChange');
    this.uiStore.setSelectedMissingWordIndex(word.position);
  }
}
