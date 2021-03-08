import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { BooksEffects } from './books.effects';
import * as BooksActions from './books.actions';

describe('BooksEffects', () => {
  let actions: Observable<any>;
  let effects: BooksEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BooksEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BooksEffects);
  });

  describe('init$', () => {
/*    it('should work', () => {
      actions = hot('-a-|', { a: BooksActions.init() });

      const expected = hot('-a-|', {
        a: BooksActions.loadBooksSuccess({ books: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });*/
  });
});
