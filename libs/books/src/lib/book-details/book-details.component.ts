import { Component, OnInit } from '@angular/core';
import { BooksFacade } from '../+state/books.facade';
import { Observable } from 'rxjs';
import { Book } from '@ngrx-crud-poc/core-data';

@Component({
  selector: 'ngrx-crud-poc-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<Book>;
  deleting$: Observable<boolean>;

  constructor(
    private booksFacade: BooksFacade
  ) { }

  ngOnInit(): void {
    this.book$ = this.booksFacade.currentEntity$;
    this.deleting$ = this.booksFacade.deleting$;
  }

  delete() {
    this.booksFacade.deleteEntity();
  }

}
