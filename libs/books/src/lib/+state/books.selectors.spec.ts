import { booksAdapter, initialState } from './books.reducer';
import * as BooksSelectors from './books.selectors';
import { Book } from '@ngrx-crud-poc/core-data';

describe('Books Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBooksId = (it) => it['id'];
  const createBooksEntity = (id: string, name = '') =>
    ({
      id,
      title: name || `name-${id}`,
    } as Book);

  let state;

  beforeEach(() => {
    state = {
      books: booksAdapter.setAll(
        [
          createBooksEntity('PRODUCT-AAA'),
          createBooksEntity('PRODUCT-BBB'),
          createBooksEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  /*describe('Books Selectors', () => {
    it('getAllBooks() should return the list of Books', () => {
      const results = BooksSelectors.getAllBooks(state);
      const selId = getBooksId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BooksSelectors.getSelected(state);
      const selId = getBooksId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getBooksLoaded() should return the current 'loaded' status", () => {
      const result = BooksSelectors.getBooksLoaded(state);

      expect(result).toBe(true);
    });

    it("getBooksError() should return the current 'error' state", () => {
      const result = BooksSelectors.getBooksError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });*/
});
