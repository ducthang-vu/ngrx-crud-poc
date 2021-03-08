import { Comparer, IdSelector } from '@ngrx/entity/src/models';
import { ListingAdapter } from './ListingAdapter';
import { createEntityAdapter } from '@ngrx/entity';
import { ErrorPayload } from '../actions/ListingActions';

export function createListingAdapter<T extends { id: string }>(
  options?: { selectId?: IdSelector<T>; sortComparer?: false | Comparer<T> }
): ListingAdapter<T> {
  const entityAdapter = createEntityAdapter(options);
  const errorReducer = (state, action: { payload: ErrorPayload }) => ({
    ...state,
    loading: false,
    updating: false,
    creating: false,
    deleting: false,
    error: action.payload.error.message
  });
  const loadReducer = (state) => ({
    ...state,
    error: null,
    loading: true
  });

  return {
    ...entityAdapter,
    getListingInitialState: (otherPartialState?) => ({
      ...entityAdapter.getInitialState(otherPartialState),
      loading: false,
      updating: false,
      creating: false,
      deleting: false,
      error: null,
    }),

    loadEntities: loadReducer,
    loadEntitiesDone: (state, action: { payload: T[] } ) => ({
      ...entityAdapter.setAll(action.payload, state),
      loading: false
    }),
    loadEntitiesError: errorReducer,

    loadEntity: loadReducer,
    loadEntityDone: (state, action: { payload: T }) => ({
      ...entityAdapter.setOne(action.payload, state),
      loading: false
    }),
    loadEntityError: errorReducer,

    createEntity: (state) => ({
      ...state,
      creating: true
    }),
    createEntityDone: (state, action: { payload: T }) => ({
      ...entityAdapter.setOne(action.payload, state),
      creating: false
    }),
    createEntityError: errorReducer,

    updateEntity: (state) => ({
      ...state,
      updating: true
    }),
    updateEntityDone: (state, { payload }: { payload: T }) => ({
      ...entityAdapter.updateOne({ id: payload.id, changes: payload }, state),
      updating: false
    }),
    updateEntityError: errorReducer,

    deleteEntity: (state) => ({
      ...state,
      deleting: true
    }),
    deleteEntityDone: (state, action: { payload: string }) => ({
      ...entityAdapter.removeOne(action.payload, state),
      deleting: false
    }),
    deleteEntityError: errorReducer
  };
}
