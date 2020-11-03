import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { WordDisplayComponent } from '../app-common/word-display/word-display.component';
import { GameStatus } from '../model/game-status';
import { LeakyTextGame } from '../model/leaky-text-game.model';
import { Word } from '../model/word.model';
import { GameFacade } from '../state/game.facade';

@Component({
  selector: 'app-text-fill-game',
  templateUrl: './text-fill-game.component.html',
  styleUrls: ['./text-fill-game.component.less'],
})
export class TextFillGameComponent implements OnInit {
  textWithGaps$: Observable<Word[]>;
  missingWords$: Observable<Word[]>;
  activeGame$: Observable<LeakyTextGame>;
  selectedGap: Word;
  selectedMissingWord: Word;

  @ViewChild('textWithGapsDisplay', { static: true })
  textWithGapsDisplay: WordDisplayComponent;
  @ViewChild('missingWordsDisplay', { static: true })
  missingWordsDisplay: WordDisplayComponent;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit(): void {
    this.textWithGaps$ = this.gameFacade.selectAllTextWithGaps();
    this.missingWords$ = this.gameFacade.selectAllMissingWords();
    this.activeGame$ = this.gameFacade.selectActiveGame().pipe(shareReplay());
  }

  onGapSingleClick(word: Word) {
    this.selectedGap = word;
    this.onSelection();
  }

  onGapDoubleClick(word: Word) {
    this.gameFacade.moveWordFromTextGapToMissingWords(word);
    this.textWithGapsDisplay.clearSelection();
  }

  onMissingWordSingleClick(word: Word) {
    this.selectedMissingWord = word;
    this.onSelection();
  }

  onSelection() {
    if (this.selectedGap && this.selectedMissingWord) {
      this.gameFacade.moveWordFromMissingToTextGap(
        this.selectedGap.id,
        this.selectedMissingWord.id
      );
      this.selectedGap = null;
      this.selectedMissingWord = null;
      this.textWithGapsDisplay.clearSelection();
      this.missingWordsDisplay.clearSelection();
    }
  }

  onCheckClick() {}

  gameStatus() {
    return GameStatus;
  }
}
