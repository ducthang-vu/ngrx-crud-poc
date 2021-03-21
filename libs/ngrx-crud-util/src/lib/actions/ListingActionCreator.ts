import { ActionCreator } from '@ngrx/store';
import { FunctionWithParametersType, TypedAction } from '@ngrx/store/src/models';

type CrudActionCreator<T> = FunctionWithParametersType<[payload: T], { payload: T } & TypedAction<string>> & TypedAction<string>;

export interface UpdatePayload<T> {
  id: string,
  updatedItem: Partial<T>
}

export interface ListingActionCreator<T> {
  loadEntities: ActionCreator;
  loadEntitiesDone: CrudActionCreator<T[]>;
  loadEntitiesError: CrudActionCreator<Error>;

  loadEntity: CrudActionCreator<string>;
  loadEntityDone: CrudActionCreator<T>;
  loadEntityError: CrudActionCreator<Error>;

  createEntity: CrudActionCreator<Omit<T, 'id'>>;
  createEntityDone: CrudActionCreator<T>;
  createEntityError: CrudActionCreator<Error>;

  updateEntity: CrudActionCreator<UpdatePayload<T>>;
  updateEntityDone: CrudActionCreator<T>;
  updateEntityError: CrudActionCreator<Error>;

  deleteEntity: CrudActionCreator<string>;
  deleteEntityDone: CrudActionCreator<string>;
  deleteEntityError: CrudActionCreator<Error>;
}
