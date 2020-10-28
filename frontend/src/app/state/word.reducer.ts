interface Entity {
  id: number;
}

export class State<T extends Entity> {
  readonly ids: number[];
  readonly entities: Map<number, T>;
}

export const initialState = {
  ids: [],
  entities: new Map(),
};

export class StateReducer<T extends Entity> {
  private state: State<T> = initialState;

  upsert(entity: T) {
    const newState = { ...this.state };
    const ids = [...this.state.ids].filter((id) => id !== entity.id);
    ids.push(entity.id);
    newState.ids = ids;
    newState.entities = new Map(this.state.entities);
    newState.entities.set(entity.id, { ...entity });
    this.state = newState;
  }

  delete(entity: T) {
    if (this.state.entities.has(entity.id)) {
      const newState = { ...this.state };

      const ids = [...this.state.ids];
      const idx = this.state.ids.findIndex((id) => id === entity.id);
      ids.splice(idx, 1);
      newState.ids = ids;

      newState.entities = new Map(this.state.entities);
      newState.entities.delete(entity.id);

      this.state = newState;
    }
  }

  replace(sourceId: number, newEntity: T) {
    if (this.state.entities.has(sourceId)) {
      const newState = { ...this.state };

      if (sourceId !== newEntity.id) {
        const ids = [...this.state.ids];
        const idx = this.state.ids.findIndex((id) => id === sourceId);
        ids.splice(idx, 1, newEntity.id);
        newState.ids = ids;
      }

      newState.entities = new Map(this.state.entities);
      newState.entities.set(newEntity.id, newEntity);

      if (sourceId !== newEntity.id) {
        newState.entities.delete(sourceId);
      }

      this.state = newState;
    }
  }

  selectAll() {
    const words = [];
    for (let id of this.state.ids) {
      words.push({ ...this.state.entities.get(id) });
    }
    return words;
  }

  selectEntities() {
    return new Map(this.state.entities);
  }

  addAll(words: T[]) {
    const newState = { ...this.state };

    newState.ids = words.map((word) => word.id);
    newState.entities = new Map(words.map((word) => [word.id, word]));

    this.state = newState;
  }

  selectById(id) {
    if (this.state.entities.has(id)) {
      return {
        ...this.state.entities.get(id),
      };
    }
    return null;
  }

  deleteAll() {
    const newState = { ...this.state };
    newState.ids = [];
    newState.entities = new Map();
    this.state = newState;
  }
}
