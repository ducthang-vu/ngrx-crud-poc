import { createAction, props } from '@ngrx/store';
import { ErrorPayload, ListingActions, UpdatePayload } from './ListingActions';

export function crudActionFactory<T>(entity: string): ListingActions<T> {
  return {
    // get multiple entities
    loadEntities: createAction(
      `[${entity}] Load entities`
    ),
    loadEntitiesDone: createAction(
      `[${entity}] Load entities done`,
      props<{ payload: T[] }>()
    ),
    loadEntitiesError: createAction(
      `[${entity}] Load entities error`,
      props<{ payload: ErrorPayload }>()
    ),

    // get one entity
    loadEntity: createAction(
      `[${entity}] Load entity`,
      props<{ payload: string }>()
    ),
    loadEntityDone: createAction(
      `[${entity}] Load entity done`,
      props<{ payload: T }>()
    ),
    loadEntityError: createAction(
      `[${entity}] Load entity error`,
      props<{ payload: ErrorPayload }>()
    ),

    // create one entity
    createEntity: createAction(
      `[${entity}] create entity`,
      props<{ payload: T }>()
    ),
    createEntityDone: createAction(
      `[${entity}] create entity done`,
      props<{ payload: T }>()
    ),
    createEntityError: createAction(
      `[${entity}] create entity error`,
      props<{ payload: ErrorPayload }>()
    ),

    // update one entity
    updateEntity: createAction(
      `[${entity}] update entity`,
      props<{ payload: UpdatePayload<T> }>()
    ),
    updateEntityDone: createAction(
      `[${entity}] update entity done`,
      props<{ payload: T }>()
    ),
    updateEntityError: createAction(
      `[${entity}] update entity error`,
      props<{ payload: ErrorPayload }>()
    ),

    // delete one entity
    deleteEntity: createAction(
      `[${entity}] delete entity`,
      props<{ payload: string }>()
    ),
    deleteEntityDone: createAction(
      `[${entity}] delete entity done`,
      props<{ payload: string }>()
    ),
    deleteEntityError: createAction(
      `[${entity}] delete entity error`,
      props<{ payload: ErrorPayload }>()
    )
  };
}
