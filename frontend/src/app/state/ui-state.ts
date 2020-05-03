import { Word } from '../model/word';

export interface UiState {
  selectedMissingWordIndex: number;
  selectedTextGapIndex: number;
}

export const initialUiState: UiState = {
  selectedMissingWordIndex: null,
  selectedTextGapIndex: null,
};
