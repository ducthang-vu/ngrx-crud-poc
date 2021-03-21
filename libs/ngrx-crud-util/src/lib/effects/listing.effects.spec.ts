import { Dummy } from '../mocks/Dummy';
import { DummyService } from '../mocks/dummy.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { dummyFactory } from '../mocks/dummy-factory';
import { DummyEffects } from '../mocks/dummy-effects.mock';
import { listingActionCreatorFactory } from '../actions/listing-action-creator-factory';


describe('ListingEffect', () => {
  let actions$ = new Observable<any>();
  let effects: DummyEffects;
  const dummyActions = listingActionCreatorFactory<Dummy>('DUMMY');

  describe('all except loadEntities$ (error)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          DummyEffects,
          DummyService,
          provideMockActions(() => actions$)
        ]
      });

      effects = TestBed.inject(DummyEffects);
    });

    it('loadEntities$ should return done action', async () => {
      actions$ = of(dummyActions.loadEntities());
      const result = await effects.loadEntities$.toPromise();
      const payload = [1, 2, 3].map(dummyFactory);
      expect(result).toEqual(dummyActions.loadEntitiesDone(payload));
    });

    describe('loadEntity$ should return done action', () => {
      it('loadEntity$', async () => {
        actions$ = of(dummyActions.loadEntity('1'));
        const result = await effects.loadEntity$.toPromise();
        expect(result).toEqual(dummyActions.loadEntityDone(dummyFactory(1)));
      });

      it('loadEntity$ should return error action', async () => {
        actions$ = of(dummyActions.loadEntity('100'));
        const result = await effects.loadEntity$.toPromise();
        expect(result).toEqual(dummyActions.loadEntityError(new Error('mockError')));
      });
    });


    describe('createEntity$', () => {
      it('createEntity$ should return done action', async () => {
        actions$ = of(dummyActions.createEntity({ name: 'mockName' }));
        const result = await effects.createEntity$.toPromise();
        const payload: Dummy = {
          id: '100',
          name: 'mockName'
        };
        expect(result).toEqual(dummyActions.createEntityDone(payload));
      });

      it('createEntity$ should return error action', async () => {
        actions$ = of(dummyActions.createEntity({ name: 'errorName' }));
        const result = await effects.createEntity$.toPromise();
        expect(result).toEqual(dummyActions.createEntityError(new Error('mockError')));
      });
    });

    describe('updateEntity$', () => {
      it('updateEntity$ should return done action', async () => {
        const payload = { id: '1', updatedItem: { name: 'mockName' } };
        actions$ = of(dummyActions.updateEntity(payload));
        const result = await effects.updateEntity$.toPromise();
        const expectedPayload: Dummy = {
          id: '1',
          name: 'mockName'
        };
        expect(result).toEqual(dummyActions.updateEntityDone(expectedPayload));
      });

      it('updateEntity$  should return error action', async () => {
        const payload = { id: '100', updatedItem: { name: 'mockName' } };
        actions$ = of(dummyActions.updateEntity(payload));
        const result = await effects.updateEntity$.toPromise();
        expect(result).toEqual(dummyActions.updateEntityError(new Error('mockError')));
      });
    });


    describe('deleteEntity$', () => {
      it('deleteEntity$ should return done action', async () => {
        actions$ = of(dummyActions.deleteEntity('1'));
        const result = await effects.deleteEntity$.toPromise();
        expect(result).toEqual(dummyActions.deleteEntityDone('1'));
      });

      it('deleteEntity$  should return error action', async () => {
        actions$ = of(dummyActions.deleteEntity('100'));
        const result = await effects.deleteEntity$.toPromise();
        expect(result).toEqual(dummyActions.deleteEntityError(new Error('mockError')));
      });
    });
  });

  describe('loadEntities$ (error)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          DummyEffects,
          {
            provide: DummyService,
            useValue: {
              findAll: () => {
                throw new Error('mockError');
              }
            }
          },
          provideMockActions(() => actions$)
        ]
      });
      effects = TestBed.inject(DummyEffects);
    });

    it('loadEntities$ should return error action', async () => {
      actions$ = of(dummyActions.loadEntities());
      const result = await effects.loadEntities$.toPromise();
      expect(result).toEqual(dummyActions.loadEntitiesError(new Error('mockError')));
    });
  });
});
