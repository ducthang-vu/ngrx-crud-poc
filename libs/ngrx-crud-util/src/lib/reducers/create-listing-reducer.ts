import { createReducer, on, ReducerTypes } from '@ngrx/store';
import { ListingAdapter } from './ListingAdapter';
import { ListingActionCreator } from '../actions/ListingActionCreator';
import { ListingState } from './ListingState';


export function createListingReducer<T, S extends ListingState<T>>(
  adapter: ListingAdapter<T, S>,
  initialState: S,
  actions: ListingActionCreator<T>,
  otherReducers: ReducerTypes<S, any>[] = []
) {
  return createReducer(
    initialState,
    on(actions.loadEntities, adapter.loadEntities as any),
    on(actions.loadEntitiesDone, adapter.loadEntitiesDone as any),
    on(actions.loadEntitiesError, adapter.loadEntitiesError as any),

    on(actions.loadEntity, adapter.loadEntity as any),
    on(actions.loadEntityDone, adapter.loadEntityDone as any),
    on(actions.loadEntityError, adapter.loadEntityError as any),

    on(actions.createEntity, adapter.createEntity as any),
    on(actions.createEntityDone, adapter.createEntityDone as any),
    on(actions.createEntityError, adapter.loadEntitiesError as any),

    on(actions.updateEntity, adapter.updateEntity as any),
    on(actions.updateEntityDone, adapter.updateEntityDone as any),
    on(actions.updateEntityError, adapter.updateEntityError as any),

    on(actions.deleteEntity, adapter.deleteEntity as any),
    on(actions.deleteEntityDone, adapter.deleteEntityDone as any),
    on(actions.deleteEntityError, adapter.deleteEntityError as any),

    ...(otherReducers && otherReducers)
  );
}
