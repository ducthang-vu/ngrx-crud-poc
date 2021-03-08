import { Component, OnInit } from '@angular/core';
import { BooksFacade } from '../+state/books.facade';
import { Observable } from 'rxjs';
import { Book } from '@ngrx-crud-poc/core-data';

@Component({
  selector: 'ngrx-crud-poc-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  creating$: Observable<boolean>

  constructor(private bookFacade: BooksFacade) { }

  ngOnInit() {
    this.creating$ = this.bookFacade.creating$;
  }

  create(values: Omit<Book, 'id'>) {
    this.bookFacade.createEntity(values)
  }
}
