import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BOOKS_FEATURE_KEY, booksReducer } from './+state/books.reducer';
import { BooksEffects } from './+state/books.effects';
import { BooksListingComponent } from './books-listing/books-listing.component';
import { UiModule } from '@ngrx-crud-poc/ui';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';


export const routes: Routes = [
  {
    path: '',
    component: BooksListingComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: BookCreateComponent,
    pathMatch: 'full'
  },
  {
    path: ':id/edit',
    component: BookEditComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: BookDetailsComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    StoreModule.forFeature(BOOKS_FEATURE_KEY, booksReducer),
    EffectsModule.forFeature([BooksEffects]),
    RouterModule.forChild(routes)
  ],
  declarations: [BooksListingComponent, BookDetailsComponent, BookCreateComponent, BookEditComponent],
  exports: [BooksListingComponent]
})
export class BooksModule {
}
