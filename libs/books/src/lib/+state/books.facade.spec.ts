import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { BooksEffects } from './books.effects';
import { BooksFacade } from './books.facade';
import { BOOKS_FEATURE_KEY, booksReducer, BooksState, initialState } from './books.reducer';
import { Book } from '@ngrx-crud-poc/core-data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { fromBooksActions } from './books.actions';
import { UiModule } from '@ngrx-crud-poc/ui';
import { of } from 'rxjs';

interface TestSchema {
  books: BooksState;
}

describe('BooksFacade', () => {
  let facade: BooksFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BOOKS_FEATURE_KEY, booksReducer),
          EffectsModule.forFeature([BooksEffects]),
          UiModule
        ],
        providers: [
          provideMockStore({ initialState }),
          BooksFacade
        ],
      })
      class CustomFeatureModule {
      }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
          HttpClientTestingModule,
          RouterTestingModule
        ],
      })
      class RootModule {
      }

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BooksFacade);
    });

    it('BooksFacade should be truthy', () => {
      expect(facade).toBeTruthy();
    });

    it('should be truthy dispatch delete action', async () => {
      facade.currentEntity$ = of({ id: 'mock' } as Book);
      const spy = spyOn(store, 'dispatch').and.stub();
      facade.deleteEntity();
      expect(spy).toBeCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(fromBooksActions.deleteEntity('mock'))
    });
  });
});
