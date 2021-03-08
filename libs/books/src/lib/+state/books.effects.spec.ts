import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { BooksEffects } from './books.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@ngrx-crud-poc/ui';
import { routes } from '../books.module';
import { Router } from '@angular/router';
import { BooksListingComponent } from '@ngrx-crud-poc/books';
import { BookCreateComponent } from '../book-create/book-create.component';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { initialState } from './books.reducer';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';


describe('BooksEffects', () => {
  const actions$ = new ReplaySubject(1);
  let effects: BooksEffects;
  let router: Router;
  const initialStoreState = {
    books: initialState
  };

  beforeEach(async done => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NxModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        StoreRouterConnectingModule.forRoot({
          serializer: DefaultRouterStateSerializer
        }),
        UiModule
      ],
      providers: [
        //ActivatedRouteSnapshot,
        BooksEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: initialStoreState }),
      ],
      declarations: [BooksListingComponent, BookCreateComponent, BookEditComponent, BookDetailsComponent]
    });
    router = TestBed.inject(Router);
    effects = TestBed.inject(BooksEffects);
    router.initialNavigation();
    await router.navigate(['']);
    done()
  });

  describe('should be truthy', () => {
    it('should create service', () => {
      expect(effects).toBeTruthy();
    });
  });

});
