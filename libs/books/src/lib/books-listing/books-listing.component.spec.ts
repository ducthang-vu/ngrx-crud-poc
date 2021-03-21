import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksListingComponent } from './books-listing.component';
import { UiModule } from '@ngrx-crud-poc/ui';
import { BooksFacade } from '@ngrx-crud-poc/books';
import { bookFacadeMock } from '../mocks/books.facade.mock';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('BooksListingComponent', () => {
  let component: BooksListingComponent;
  let fixture: ComponentFixture<BooksListingComponent>;
  const routerMock = {
    navigate: () => undefined
  } as unknown as Router;
  const spyRouter = jest.spyOn(routerMock, 'navigate');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        UiModule
      ],
      providers: [
        {
          provide: BooksFacade,
          useValue: bookFacadeMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ],
      declarations: [BooksListingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goToCreate should call router navigate method', () => {
    component.goToCreate();
    expect(spyRouter).toBeCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledWith(['create']);
  });

});
