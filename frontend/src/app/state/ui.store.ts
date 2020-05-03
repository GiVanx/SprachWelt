import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiState, initialUiState } from './ui-state';

@Injectable({
  providedIn: 'root',
})
export class UiStore {
  private _uiState: BehaviorSubject<UiState> = new BehaviorSubject(
    initialUiState
  );

  getSelectedMissingWordIndex() {
    return this._uiState
      .asObservable()
      .pipe(map((uiState) => uiState.selectedMissingWordIndex));
  }

  getSelectedTextGapIndex() {
    return this._uiState
      .asObservable()
      .pipe(map((uiState) => uiState.selectedTextGapIndex));
  }

  setSelectedMissingWordIndex(index: number) {
    let state = this._uiState.getValue();
    state = { ...state, selectedMissingWordIndex: index };
    this._uiState.next(state);
  }

  setSelectedTextGapIndex(index: number) {
    let state = this._uiState.getValue();
    state = { ...state, selectedTextGapIndex: index };
    this._uiState.next(state);
  }
}
