import { Book } from '@ngrx-crud-poc/core-data'
import { crudActionFactory } from '@ngrx-crud-poc/ngrx-crud-util';

export const fromBooksActions = crudActionFactory<Book>('Books')
