import { Injectable, NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { Dummy } from '../mocks/Dummy';
import { DummyState } from '../mocks/DummyState';
import { EffectsModule } from '@ngrx/effects';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { DummyEffects } from '../mocks/dummy-effects.mock';
import { DummyService } from '../mocks/dummy.service';
import { listingActionCreatorFactory } from '../actions/listing-action-creator-factory';
import { createListingQuery } from '../selectors/create-listing-query';
import { ListingFacade } from './listing-facade';
import { createListingAdapter } from '../reducers/create-listing-adapter';
import { createListingReducer } from '../reducers/create-listing-reducer';


const dummyActions = listingActionCreatorFactory<Dummy>('DUMMY');
const query = createListingQuery<Dummy>('DUMMY');

@Injectable()
export class DummyFacade extends ListingFacade<Dummy, DummyState> {
  constructor(
    protected store: Store<DummyState>
  ) {
    super(dummyActions, query, store);
  }
}


describe('ListingFacade', () => {
  const adapter = createListingAdapter<Dummy, DummyState>();
  const initialState = adapter.getListingInitialState({ currentId: null });
  let facade: DummyFacade;
  let store: Store<DummyState>;
  let spy;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('DUMMY', createListingReducer<Dummy, DummyState>(adapter, initialState, dummyActions)),
          EffectsModule.forFeature([DummyEffects])
        ],
        providers: [
          provideMockStore({ initialState }),
          DummyFacade,
          DummyService,
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
      spy = jest.spyOn(store, 'dispatch').mockImplementation(() => undefined);
      facade = TestBed.inject(DummyFacade);
    });

    it('BooksFacade should be truthy', () => {
      expect(facade).toBeTruthy();
    });

    it('createEntity should dispatch createEntity', async () => {
      const newItem:  Omit<Dummy, 'id'> = {
        name: 'mockName'
      };
      facade.createEntity(newItem);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(dummyActions.createEntity(newItem));
    });

    it('editEntity should dispatch updateEntity', async () => {
      const updatedItem: Partial<Dummy> = {
        name: 'mockName'
      };
      facade.editEntity('1', updatedItem);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(dummyActions.updateEntity({ id: '1', updatedItem }));
    });

    it('deleteEntity should dispatch deleteEntity', async () => {
      facade.deleteEntity('1');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(dummyActions.deleteEntity('1'));
    });

  });
});
