import { Word } from '../model/word';

export class MissingWordState {
  readonly ids: number[];
  readonly words: Map<number, Word>;
}

export const initialState = {
  ids: [],
  words: new Map(),
};

export class WordStateReducer {
  private state: MissingWordState = initialState;

  add(word: Word) {
    const newState = { ...this.state };
    const ids = [...this.state.ids];
    ids.push(word.id);
    newState.ids = ids;
    newState.words = new Map(this.state.words);
    newState.words.set(word.id, { ...word });
    this.state = newState;
  }

  delete(word: Word) {
    if (this.state.words.has(word.id)) {
      const newState = { ...this.state };

      const ids = [...this.state.ids];
      const idx = this.state.ids.findIndex((id) => id === word.id);
      ids.splice(idx, 1);
      newState.ids = ids;

      newState.words = new Map(this.state.words);
      newState.words.delete(word.id);

      this.state = newState;
    }
  }

  replace(oldWordId: number, newWord: Word) {
    if (this.state.words.has(oldWordId)) {
      const newState = { ...this.state };

      if (oldWordId !== newWord.id) {
        const ids = [...this.state.ids];
        const idx = this.state.ids.findIndex((id) => id === oldWordId);
        ids.splice(idx, 1, newWord.id);
        newState.ids = ids;
      }

      newState.words = new Map(this.state.words);
      newState.words.set(newWord.id, newWord);

      if (oldWordId !== newWord.id) {
        newState.words.delete(oldWordId);
      }

      this.state = newState;
    }
  }

  selectAll() {
    const words = [];
    for (let id of this.state.ids) {
      words.push({ ...this.state.words.get(id) });
    }
    return words;
  }

  selectEntities() {
    return new Map(this.state.words);
  }

  addAll(words: Word[]) {
    const newState = { ...this.state };

    newState.ids = words.map((word) => word.id);
    newState.words = new Map(words.map((word) => [word.id, word]));

    this.state = newState;
  }

  selectById(id) {
    if (this.state.words.has(id)) {
      return {
        ...this.state.words.get(id),
      };
    }
    return null;
  }
}

export const initalState = {};
