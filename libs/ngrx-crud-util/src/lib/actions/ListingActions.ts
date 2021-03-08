import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export interface UpdatePayload<T> {
  id: string,
  updatedItem: Partial<T>
}

export interface ErrorPayload {
  error: Error
}

export interface ListingActions<T> {
  loadEntities: ActionCreator;
  loadEntitiesDone: ActionCreator<string, (props: { payload: T[] }) => ({ payload: T[] } & TypedAction<string>)>;
  loadEntitiesError: ActionCreator<string, (props: { payload: ErrorPayload }) => ({ payload: ErrorPayload } & TypedAction<string>)>;

  loadEntity: ActionCreator<string, (props: { payload: string }) => ({ payload: string } & TypedAction<string>)>;
  loadEntityDone: ActionCreator<string, (props: { payload: T }) => ({ payload: T } & TypedAction<string>)>;
  loadEntityError: ActionCreator<string, (props: { payload: ErrorPayload }) => ({ payload: ErrorPayload } & TypedAction<string>)>;

  createEntity: ActionCreator<string, (props: { payload: Omit<T, 'id'> }) => ({ payload: T } & TypedAction<string>)>;
  createEntityDone: ActionCreator<string, (props: { payload: T }) => ({ payload: T } & TypedAction<string>)>;
  createEntityError: ActionCreator<string, (props: { payload: ErrorPayload }) => ({ payload: ErrorPayload } & TypedAction<string>)>;

  updateEntity: ActionCreator<string, (props: { payload: UpdatePayload<T> }) => ({ payload: UpdatePayload<T> } & TypedAction<string>)>;
  updateEntityDone: ActionCreator<string, (props: { payload: T }) => ({ payload: T } & TypedAction<string>)>;
  updateEntityError: ActionCreator<string, (props: { payload: ErrorPayload }) => ({ payload: ErrorPayload } & TypedAction<string>)>;

  deleteEntity: ActionCreator<string, (props: { payload: string }) => ({ payload: string } & TypedAction<string>)>;
  deleteEntityDone: ActionCreator<string, (props: { payload: string }) => ({ payload: string } & TypedAction<string>)>;
  deleteEntityError: ActionCreator<string, (props: { payload: ErrorPayload }) => ({ payload: ErrorPayload } & TypedAction<string>)>;
}
