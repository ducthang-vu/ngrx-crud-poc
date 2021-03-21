import { booksAdapter, initialState, BooksState } from './books.reducer';
import { booksQuery } from './books.selectors';
import { Book } from '@ngrx-crud-poc/core-data';

describe('Books Selectors', () => {
  const createBooksEntity = (id: string, name = '') =>
    ({
      id,
      title: name || `name-${id}`,
    } as Book);

  const state: { books: BooksState } = { books: initialState};

  beforeEach(() => {
    const payload = ['PRODUCT-AAA', 'PRODUCT-BBB', 'PRODUCT-CCC'].map(id => createBooksEntity(id));
    state.books = {
      ...initialState,
      ...booksAdapter.loadEntitiesDone(initialState, { payload })
    };
  });

  it('getCurrentEntity should get current entity', () => {
    state.books.currentId = 'PRODUCT-BBB';
    expect(booksQuery.getCurrentEntity(state)).toEqual(createBooksEntity('PRODUCT-BBB'));
  });

});
