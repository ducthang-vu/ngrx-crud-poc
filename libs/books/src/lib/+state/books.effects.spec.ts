import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { BooksEffects } from './books.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormComponent, PromptSelectComponent } from '@ngrx-crud-poc/ui';
import { routes } from '../books.module';
import { Router } from '@angular/router';
import { BooksListingComponent } from '@ngrx-crud-poc/books';
import { BookCreateComponent } from '../book-create/book-create.component';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { initialState } from './books.reducer';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CommonModule, Location } from '@angular/common';
import { fromBooksActions } from './books.actions';
import { Book } from '@ngrx-crud-poc/core-data';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


describe('BooksEffects', () => {
  const actions$ = new ReplaySubject(1);
  let effects: BooksEffects;
  let router: Router;
  let location: Location;
  const initialStoreState = {
    books: initialState
  };
  const mockSnackBar = {
    //open: (a, b, c) => ({} as MatSnackBarRef<TextOnlySnackBar>)
    open: () => (console.log('a') as unknown as MatSnackBarRef<TextOnlySnackBar>)
  } as unknown as MatSnackBar;
  let spySnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NxModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        StoreRouterConnectingModule.forRoot({
          serializer: DefaultRouterStateSerializer
        }),
        CommonModule,
        ReactiveFormsModule,
        // angular material
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule
      ],
      providers: [
        BooksEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: initialStoreState }),
        {
          provide: MatSnackBar,
          userValue: mockSnackBar
        }
      ],
      declarations: [
        BooksListingComponent,
        BookCreateComponent,
        BookEditComponent,
        BookDetailsComponent,
        PromptSelectComponent,
        FormComponent
      ]
    });
    spySnackBar = jest.spyOn(mockSnackBar, 'open').mockImplementation((a, b, c) => ({} as MatSnackBarRef<TextOnlySnackBar>))
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    effects = TestBed.inject(BooksEffects);
    router.initialNavigation();
  });

  afterEach(() => jest.resetAllMocks());

  it('should create service', () => {
    expect(effects).toBeTruthy();
  });

/*  describe('loadBooks$', () => {
    it('loadBooks$', async () => {
      await router.navigate(['/create']);
      await router.navigate(['/']);
      const result = await effects.loadBooks$.toPromise();
      expect(result).toEqual(fromBooksActions.loadEntities());
    });
  });*/

  describe('navigateAfterCreatedOrDelete$ should navigate to "/"', () => {
    beforeEach(async () => {
      await router.navigate(['/create']);
    });

    it('navigateAfterCreatedOrDelete$ should navigate to "/" (createEntityDone action)', async () => {
      actions$.next(fromBooksActions.createEntityDone({} as Book));
      effects.navigateAfterCreatedOrDelete$.subscribe();
      await new Promise(resolve => resolve());
      expect(location.path()).toBe('/');
    });

    it('navigateAfterCreatedOrDelete$ should navigate to "/" (deleteEntityDone action)', async () => {
      actions$.next(fromBooksActions.deleteEntityDone('1'));
      effects.navigateAfterCreatedOrDelete$.subscribe();
      await new Promise(resolve => resolve());
      expect(location.path()).toBe('/');
    });
  });

/*  describe('oneEntityUpdated$ should open snackBar', () => {
    const message = 'Data updated';

    it('oneEntityUpdated$  should open snackBar', async () => {
      actions$.next(fromBooksActions.loadEntityDone({} as Book));
      effects.oneEntityUpdated$.subscribe();
      await new Promise(resolve => resolve());
      expect(spySnackBar).toHaveBeenCalledTimes(1);
      expect(spySnackBar).toHaveBeenCalledWith(message, '', { duration: 2500 });
    });

    it('oneEntityUpdated$ should open snackBar', async () => {
      actions$.next(fromBooksActions.loadEntitiesDone([]));
      effects.oneEntityUpdated$.subscribe();
      await new Promise(resolve => resolve());
      expect(spySnackBar).toHaveBeenCalledTimes(1);
      expect(spySnackBar).toHaveBeenCalledWith(message, '', { duration: 2500 });
    });
  });*/

});
