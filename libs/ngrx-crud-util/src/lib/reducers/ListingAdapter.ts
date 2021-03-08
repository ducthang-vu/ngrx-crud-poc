import { EntityAdapter, EntityState } from '@ngrx/entity';
import { ListingState } from '@ngrx-crud-poc/ngrx-crud-util';
import { ErrorPayload } from '../actions/ListingActions';


export interface ListingAdapter<T> extends EntityAdapter<T> {
  getListingInitialState: (otherPartialState?: {[key: string]: never}) => ListingState<T>;

  loadEntities: (state: EntityState<T>) => EntityState<T>;
  loadEntitiesDone: (state: EntityState<T>, action: { payload: T[] }) => EntityState<T>;
  loadEntitiesError: (state: EntityState<T>, action: { payload: ErrorPayload }) => EntityState<T>;

  loadEntity: (state: EntityState<T>) => EntityState<T>;
  loadEntityDone: (state: EntityState<T>, action: { payload: T }) => EntityState<T>;
  loadEntityError: (state: EntityState<T>, action: { payload: ErrorPayload }) => EntityState<T>;

  createEntity:  (state: EntityState<T>) => EntityState<T>;
  createEntityDone: (state: EntityState<T>, action: { payload: T }) => EntityState<T>;
  createEntityError: (state: EntityState<T>, action: { payload: ErrorPayload }) => EntityState<T>;

  updateEntity:  (state: EntityState<T>) => EntityState<T>;
  updateEntityDone: (state: EntityState<T>, action: { payload: T }) => EntityState<T>;
  updateEntityError: (state: EntityState<T>, action: { payload: ErrorPayload }) => EntityState<T>;

  deleteEntity:  (state: EntityState<T>) => EntityState<T>;
  deleteEntityDone: (state: EntityState<T>, action: { payload: string }) => EntityState<T>;
  deleteEntityError: (state: EntityState<T>, action: { payload: ErrorPayload }) => EntityState<T>;
}
