import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { booksQuery } from './books.selectors';
import { Observable, of, Subject } from 'rxjs';
import { Book } from '@ngrx-crud-poc/core-data';
import { fromBooksActions } from './books.actions';
import { tap, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksFacade {
  currentEntity$: Observable<Book> = this.store.select(booksQuery.getCurrentEntity);
  creating$: Observable<boolean> = this.store.select(booksQuery.getCreating);
  deleting$: Observable<boolean> = this.store.select(booksQuery.getDeleting);
  entities$: Observable<Book[]> = this.store.select(booksQuery.getEntities);
  loading$: Observable<boolean> = this.store.select(booksQuery.getLoading);
  updating$: Observable<boolean> = this.store.select(booksQuery.getUpdating);

  constructor(
    private store: Store
  ) {
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }

  createBook(newBook: Omit<Book, 'id'>) {
    this.dispatch(fromBooksActions.createEntity({ payload: newBook }));
  }

  editBook(id: string, updatedItem: Book) {
    const payload = { id, updatedItem };
    this.dispatch(fromBooksActions.updateEntity({ payload }));
  }

  delete() {
    return of({}).pipe(
      withLatestFrom(this.currentEntity$),
      tap(([, { id }]) => this.dispatch(fromBooksActions.deleteEntity({ payload: id })))
    ).subscribe()
  }

}
