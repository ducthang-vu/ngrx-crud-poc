import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksFacade } from '../+state/books.facade';
import { Book } from '@ngrx-crud-poc/core-data';
import { MatSelectionList } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngrx-crud-poc-books-listing',
  templateUrl: './books-listing.component.html',
  styleUrls: ['./books-listing.component.scss']
})
export class BooksListingComponent implements OnInit {

  books$: Observable<Book[]>;
  loading$: Observable<boolean>;

  @ViewChild('books') bookList: MatSelectionList;

  constructor(
    private booksFacade: BooksFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.books$ = this.booksFacade.entities$;
    this.loading$ = this.booksFacade.loading$;
  }

  goToCreate() {
    this.router.navigate(['create'])
  }
}
