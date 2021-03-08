import { fromBooksActions } from './books.actions';
import { Book } from '@ngrx-crud-poc/core-data';
import { createListingAdapter, createListingReducer, ListingState } from '@ngrx-crud-poc/ngrx-crud-util';
import { on } from '@ngrx/store';


export const BOOKS_FEATURE_KEY = 'books';

export type BooksState = ListingState<Book> & { currentId: string }

export interface BooksPartialState {
  readonly [BOOKS_FEATURE_KEY]: BooksState;
}

export const booksAdapter = createListingAdapter<Book, BooksState>();

export const initialState: BooksState = booksAdapter.getListingInitialState({ currentId: null });


const updateCurrentId = (state: BooksState, action: { payload: string }): BooksState => ({
  ...state,
  currentId: action.payload
});


export const booksReducer = createListingReducer<Book, BooksState>(
  booksAdapter,
  initialState,
  fromBooksActions,
  [on(fromBooksActions.loadEntity, updateCurrentId)]
);

