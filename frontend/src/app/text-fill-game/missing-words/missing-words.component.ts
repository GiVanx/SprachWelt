import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LeakyTextGame } from '../../model/text-with-gaps';
import { Word } from '../../model/word';
import { GameFacade } from '../../state/game.facade';
import { UiStore } from '../../state/ui.store';

@Component({
  selector: 'app-missing-words',
  templateUrl: './missing-words.component.html',
  styleUrls: ['./missing-words.component.less'],
})
export class MissingWordsComponent implements OnInit {
  missingWords$: Observable<Word[]>;

  constructor(private textStore: GameFacade, private uiStore: UiStore) {}

  ngOnInit(): void {
    this.missingWords$ = this.textStore.selectAllMissingWords();
  }

  onWordSelectionChange(word: Word) {
    this.uiStore.setSelectedMissingWordId(word.id);
  }
}
