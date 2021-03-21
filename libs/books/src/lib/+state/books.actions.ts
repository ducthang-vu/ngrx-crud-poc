import { Book } from '@ngrx-crud-poc/core-data'
import { listingActionCreatorFactory } from '@ngrx-crud-poc/ngrx-crud-util';

export const fromBooksActions = listingActionCreatorFactory<Book>('Books')
