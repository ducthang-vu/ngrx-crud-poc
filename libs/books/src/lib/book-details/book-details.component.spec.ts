import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailsComponent } from './book-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@ngrx-crud-poc/ui';
import { BooksFacade } from '@ngrx-crud-poc/books';
import { bookFacadeMock } from '../mocks/books.facade.mock';
import { Book } from '@ngrx-crud-poc/core-data';
import { of } from 'rxjs';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  const spy = jest.spyOn(bookFacadeMock, 'deleteEntity').mockImplementation(() => of({}).subscribe());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, UiModule],
      providers: [{
        provide: BooksFacade,
        useValue: bookFacadeMock
      }],
      declarations: [BookDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete should call bookFacade deleteEntity method with given argument', () => {
    component.delete();
    expect(spy).toBeCalledTimes(1);
  });
});
