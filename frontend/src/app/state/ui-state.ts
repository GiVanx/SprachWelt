export interface UiState {
  selectedMissingWordId: number;
  selectedTextGapId: number;
}

export const initialUiState: UiState = {
  selectedMissingWordId: null,
  selectedTextGapId: null,
};
