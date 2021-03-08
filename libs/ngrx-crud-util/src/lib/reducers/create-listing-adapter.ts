import { Comparer, IdSelector } from '@ngrx/entity/src/models';
import { ListingAdapter } from './ListingAdapter';
import { createEntityAdapter } from '@ngrx/entity';
import { ListingState } from './ListingState';


export function createListingAdapter<T extends { id: string }, S extends ListingState<T>>(
  options?: { selectId?: IdSelector<T>; sortComparer?: false | Comparer<T> }
): ListingAdapter<T, S> {
  const entityAdapter = createEntityAdapter(options);
  const errorReducer = (state, action: { payload: Error }): S => ({
    ...state,
    loading: false,
    updating: false,
    creating: false,
    deleting: false,
    error: action.payload.message
  });
  const loadReducer = (state): S => ({
    ...state,
    error: null,
    loading: true
  });

  return {
    ...entityAdapter,
    getListingInitialState: (otherPartialState?): S => ({
      ...entityAdapter.getInitialState(otherPartialState),
      loading: false,
      updating: false,
      creating: false,
      deleting: false,
      error: null,
    } as S),

    loadEntities: loadReducer,
    loadEntitiesDone: (state, action: { payload: T[] } ): S => ({
      ...entityAdapter.setAll(action.payload, state),
      loading: false
    }),
    loadEntitiesError: errorReducer,

    loadEntity: loadReducer,
    loadEntityDone: (state, action: { payload: T }): S => ({
      ...entityAdapter.setOne(action.payload, state),
      loading: false
    }),
    loadEntityError: errorReducer,

    createEntity: (state): S => ({
      ...state,
      creating: true
    }),
    createEntityDone: (state, action: { payload: T }): S => ({
      ...entityAdapter.setOne(action.payload, state),
      creating: false
    }),
    createEntityError: errorReducer,

    updateEntity: (state): S => ({
      ...state,
      updating: true
    }),
    updateEntityDone: (state, { payload }: { payload: T }): S => ({
      ...entityAdapter.updateOne({ id: payload.id, changes: payload }, state),
      updating: false
    }),
    updateEntityError: errorReducer,

    deleteEntity: (state): S => ({
      ...state,
      deleting: true
    }),
    deleteEntityDone: (state, action: { payload: string }): S => ({
      ...entityAdapter.removeOne(action.payload, state),
      deleting: false
    }),
    deleteEntityError: errorReducer
  };
}
