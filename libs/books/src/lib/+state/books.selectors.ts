import { BOOKS_FEATURE_KEY, BooksState, } from './books.reducer';
import { createListingQuery } from '@ngrx-crud-poc/ngrx-crud-util';
import { Book } from '@ngrx-crud-poc/core-data';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getCurrentEntity = createSelector(
  createFeatureSelector<BooksState>(
    BOOKS_FEATURE_KEY
  ),
(state: BooksState) => Object.values(state.entities).find(b => b.id === state.currentId)
)


export const booksQuery = {
  ...createListingQuery<Book>(BOOKS_FEATURE_KEY),
  getCurrentEntity
}
