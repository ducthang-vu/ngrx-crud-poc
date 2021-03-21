import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BookEditComponent } from './book-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@ngrx-crud-poc/ui';
import { BooksFacade } from '@ngrx-crud-poc/books';
import { bookFacadeMock } from '../mocks/books.facade.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Book } from '@ngrx-crud-poc/core-data';
import { of } from 'rxjs';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  const spyFacade = jest.spyOn(bookFacadeMock, 'editEntity').mockImplementation(() => undefined);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        UiModule,
        RouterTestingModule
      ],
      providers: [{
        provide: BooksFacade,
        useValue: bookFacadeMock
      }],
      declarations: [BookEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('edit should call bookFacade editEntity', fakeAsync(() => {
    const values: Partial<Book> = { title: 'mockTitle' };
    component.edit(values);
    tick();
    expect(spyFacade).toBeCalledTimes(1);
    expect(spyFacade).toHaveBeenCalledWith('mockId', values);
  }));
});
