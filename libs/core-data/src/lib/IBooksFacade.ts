import { Observable, Subscription } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IListingFacade } from '@ngrx-crud-poc/ngrx-crud-util';
import { Book } from './book';

export interface IBooksFacade extends IListingFacade<Book> {
  currentEntity$: Observable<Book>;
  deleteEntity(): Subscription;
}
