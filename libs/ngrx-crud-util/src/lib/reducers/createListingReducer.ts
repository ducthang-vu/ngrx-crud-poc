import { createReducer, on, ReducerTypes } from '@ngrx/store';
import { ListingState } from '@ngrx-crud-poc/ngrx-crud-util';
import { ListingAdapter } from './ListingAdapter';
import { ListingActions } from '../actions/ListingActions';


export function createListingReducer<T, S extends ListingState<T>>(
  adapter: ListingAdapter<T>,
  initialState: S,
  actions: ListingActions<T>,
  otherReducers: ReducerTypes<S, any>[] = []
) {
  return createReducer(
    initialState,
    on(actions.loadEntities, adapter.loadEntities),
    on(actions.loadEntitiesDone, adapter.loadEntitiesDone),
    on(actions.loadEntitiesError, adapter.loadEntitiesError),

    on(actions.loadEntity, adapter.loadEntity),
    on(actions.loadEntityDone, adapter.loadEntityDone),
    on(actions.loadEntityError, adapter.loadEntityError),

    on(actions.createEntity, adapter.createEntity),
    on(actions.createEntityDone, adapter.createEntityDone),
    on(actions.createEntityError, adapter.loadEntitiesError),

    on(actions.updateEntity, adapter.updateEntity),
    on(actions.updateEntityDone, adapter.updateEntityDone),
    on(actions.updateEntityError, adapter.updateEntityError),

    on(actions.deleteEntity, adapter.deleteEntity),
    on(actions.deleteEntityDone, adapter.deleteEntityDone),
    on(actions.deleteEntityError, adapter.deleteEntityError),

    ...(otherReducers && otherReducers)
  );
}
