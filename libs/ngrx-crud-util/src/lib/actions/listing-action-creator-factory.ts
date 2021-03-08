import { createAction } from '@ngrx/store';
import { ListingActionCreator, UpdatePayload } from './ListingActionCreator';

export function listingActionCreatorFactory<T>(entity: string): ListingActionCreator<T> {
  return {
    // get multiple entities
    loadEntities: createAction(
      `[${entity}] Load entities`
    ),
    loadEntitiesDone: createAction(
      `[${entity}] Load entities done`,
      (payload: T[]) => ({ payload })
    ),
    loadEntitiesError: createAction(
      `[${entity}] Load entities error`,
      (payload: Error) => ({ payload })
    ),

    // get one entity
    loadEntity: createAction(
      `[${entity}] Load entity`,
      (payload: string) => ({ payload })
    ),
    loadEntityDone: createAction(
      `[${entity}] Load entity done`,
      (payload: T) => ({ payload })
    ),
    loadEntityError: createAction(
      `[${entity}] Load entity error`,
      (payload: Error) => ({ payload })
    ),

    // create one entity
    createEntity: createAction(
      `[${entity}] Create entity`,
      (payload: Omit<T, 'id'>) => ({ payload })
    ),
    createEntityDone: createAction(
      `[${entity}] Create entity done`,
      (payload: T) => ({ payload })
    ),
    createEntityError: createAction(
      `[${entity}] Create entity error`,
      (payload: Error) => ({ payload })
    ),

    // update one entity
    updateEntity: createAction(
      `[${entity}] Update entity`,
      (payload: UpdatePayload<T>) => ({ payload })
    ),
    updateEntityDone: createAction(
      `[${entity}] Update entity done`,
      (payload: T) => ({ payload })
    ),
    updateEntityError: createAction(
      `[${entity}] Update entity error`,
      (payload: Error) => ({ payload })
    ),

    // delete one entity
    deleteEntity: createAction(
      `[${entity}] Delete entity`,
      (payload: string) => ({ payload })
    ),
    deleteEntityDone: createAction(
      `[${entity}] Delete entity done`,
      (payload: string) => ({ payload })
    ),
    deleteEntityError: createAction(
      `[${entity}] Delete entity error`,
      (payload: Error) => ({ payload })
    )
  };
}
