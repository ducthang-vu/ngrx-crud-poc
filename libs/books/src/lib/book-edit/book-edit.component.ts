import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BooksFacade } from '../+state/books.facade';
import { Book } from '@ngrx-crud-poc/core-data';
import { tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'ngrx-crud-poc-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  currentEntity$: Observable<Book>
  editing$: Observable<boolean>

  constructor(private bookFacade: BooksFacade) { }

  ngOnInit() {
    this.currentEntity$ = this.bookFacade.currentEntity$;
    this.editing$ = this.bookFacade.updating$;
  }

  edit(values) {
    of(values).pipe(
      withLatestFrom(this.currentEntity$),
      tap(([values, entity]) => this.bookFacade.editBook(entity.id, values))
    ).subscribe()
  }
}
