import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { booksQuery } from './books.selectors';
import { Observable, of } from 'rxjs';
import { Book, IBooksFacade } from '@ngrx-crud-poc/core-data';
import { fromBooksActions } from './books.actions';
import { tap, withLatestFrom } from 'rxjs/operators';
import { BooksState } from './books.reducer';
import { ListingFacade } from '@ngrx-crud-poc/ngrx-crud-util';

@Injectable({
  providedIn: 'root'
})
export class BooksFacade extends ListingFacade<Book, BooksState> implements IBooksFacade {
  currentEntity$: Observable<Book> = this.select(booksQuery.getCurrentEntity);

  constructor(
    protected store: Store<BooksState>
  ) {
    super(fromBooksActions, booksQuery, store)
  }

  deleteEntity() {
    return of({}).pipe(
      withLatestFrom(this.currentEntity$),
      tap(([, { id }]) => super.deleteEntity(id))
    ).subscribe()
  }

}
