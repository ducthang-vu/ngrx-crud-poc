import { booksReducer, BooksState, initialState } from './books.reducer';
import { Book } from '@ngrx-crud-poc/core-data';
import { fromBooksActions } from './books.actions';

describe('Books Reducer', () => {
  const createBooksEntity = (id: string, name = '') =>
    ({
      id,
      title: name || `name-${id}`,
    } as Book);

  beforeEach(() => {});

  describe('valid Books actions', () => {
    it('loadBooksSuccess should return set the list of known Books', () => {
      const books = [
        createBooksEntity('PRODUCT-AAA'),
        createBooksEntity('PRODUCT-zzz'),
      ];
      const action = fromBooksActions.loadEntitiesDone(books);
      const newstate: BooksState = booksReducer(initialState, action);
      expect(newstate.ids.length).toBe(2);
      expect(Object.values(newstate.entities)).toEqual(books);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = booksReducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('update currentId', () => {
    it('loadBooksSuccess should return set the list of known Books', () => {
      const action = fromBooksActions.loadEntity('mock');
      const newstate: BooksState = booksReducer(initialState, action);
      expect(newstate.currentId).toBe('mock');
    });
  });
});
