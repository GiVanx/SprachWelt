import { Word } from '../model/word';

export interface UiState {
  selectedMissingWordId: string;
  selectedTextGapId: string;
}

export const initialUiState: UiState = {
  selectedMissingWordId: null,
  selectedTextGapId: null,
};
