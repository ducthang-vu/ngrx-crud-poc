import { EntityAdapter } from '@ngrx/entity';
import { ListingState } from './ListingState';


export interface ListingAdapter<T, S extends ListingState<T>> extends EntityAdapter<T> {
  getListingInitialState: (otherPartialState?: {[key: string]: any}) => S;

  loadEntities: (state: S) => S;
  loadEntitiesDone: (state: S, action: { payload: T[] }) => S;
  loadEntitiesError: (state: S, action: { payload: Error }) => S;

  loadEntity: (state: S) => S;
  loadEntityDone: (state: S, action: { payload: T }) => S;
  loadEntityError: (state: S, action: { payload: Error }) => S;

  createEntity:  (state: S) => S;
  createEntityDone: (state: S, action: { payload: T }) => S;
  createEntityError: (state: S, action: { payload: Error }) => S;

  updateEntity:  (state: S) => S;
  updateEntityDone: (state: S, action: { payload: T }) => S;
  updateEntityError: (state: S, action: { payload: Error }) => S;

  deleteEntity:  (state: S) => S;
  deleteEntityDone: (state: S, action: { payload: string }) => S;
  deleteEntityError: (state: S, action: { payload: Error }) => S;
}
