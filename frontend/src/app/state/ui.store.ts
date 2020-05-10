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

  getSelection() {
    return this._uiState
      .asObservable()
      .pipe(
        map((state) => [state.selectedTextGapId, state.selectedMissingWordId])
      );
  }

  getSelectedMissingWordId() {
    return this._uiState
      .asObservable()
      .pipe(map((uiState) => uiState.selectedMissingWordId));
  }

  getSelectedTextGapId() {
    return this._uiState
      .asObservable()
      .pipe(map((uiState) => uiState.selectedTextGapId));
  }

  clearSelection() {
    let state = this._uiState.getValue();
    state = {
      ...state,
      selectedMissingWordId: null,
      selectedTextGapId: null,
    };
    this._uiState.next(state);
  }

  setSelectedMissingWordId(id: string) {
    let state = this._uiState.getValue();
    state = { ...state, selectedMissingWordId: id };
    this._uiState.next(state);
  }

  setSelectedTextGapId(id: string) {
    let state = this._uiState.getValue();
    state = { ...state, selectedTextGapId: id };
    this._uiState.next(state);
  }
}
