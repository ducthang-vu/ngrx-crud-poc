import { Injectable } from '@angular/core';
import { Book, BooksService } from '@ngrx-crud-poc/core-data';
import { DataPersistence } from '@nrwl/angular';
import { fromBooksActions } from './books.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksListingComponent } from '../books-listing/books-listing.component';
import { ListingEffects } from '@ngrx-crud-poc/ngrx-crud-util';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { BooksState } from './books.reducer';


@Injectable()
export class BooksEffects extends ListingEffects<Book> {

  constructor(
    protected actions$: Actions,
    protected crudService: BooksService,
    private persistence: DataPersistence<BooksState>,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    super(actions$, fromBooksActions);
  }

  loadBooks$ = createEffect(() => this.persistence.navigation(BooksListingComponent, {
    run: () => of(this.actions.loadEntities()) as Observable<Action>,
    onError: error => console.error(error)
  }));

  loadBookOnDetail$ = createEffect(() => this.loadOneBookOnNavigation(BookDetailsComponent));
  loadBookOnEdit$ = createEffect(() => this.loadOneBookOnNavigation(BookEditComponent));

  navigateAfterCreated$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.createEntityDone, this.actions.deleteEntityDone),
    tap(() => this.router.navigate(['/']))
  ), { dispatch: false });

  oneEntityUpdated$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.loadEntityDone, this.actions.loadEntitiesDone),
    tap(() => {
      const message = 'Data updated';
      this.snackBar.open(message, '', { duration: 2500 });
    })
  ), { dispatch: false });

  private loadOneBookOnNavigation(component) {
    return this.persistence.navigation(component, {
      run: (route: ActivatedRouteSnapshot) => of(this.actions.loadEntity(route.params.id)) as Observable<Action>,
      onError: error => console.error(error)
    });
  }
}
