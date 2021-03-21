import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCreateComponent } from './book-create.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@ngrx-crud-poc/ui';
import { BooksFacade } from '@ngrx-crud-poc/books';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Book } from '@ngrx-crud-poc/core-data';
import { bookFacadeMock }  from '../mocks/books.facade.mock';


describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
  const spy = jest.spyOn(bookFacadeMock, 'createEntity').mockImplementation(() => undefined);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, UiModule],
      providers: [{
        provide: BooksFacade,
        useValue: bookFacadeMock
      }],
      declarations: [BookCreateComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create should call bookFacade createEntity method with given argument', () => {
    const newItem = { title: 'mock' } as Omit<Book, 'id'>;
    component.create(newItem);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(newItem);
  });
});
