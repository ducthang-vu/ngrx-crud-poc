import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListingComponent } from './books-listing.component';

describe('BooksListingComponent', () => {
  let component: BooksListingComponent;
  let fixture: ComponentFixture<BooksListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
