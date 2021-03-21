import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { CrudService } from '@ngrx-crud-poc/ngrx-crud-util';
import { Action } from '@ngrx/store';
import { ListingActionCreator, UpdatePayload } from '../actions/ListingActionCreator';

export abstract class ListingEffects<T> {
  protected abstract crudService: CrudService<T>;

  protected constructor(
    protected actions$: Actions,
    protected actions: ListingActionCreator<T>,
  ) {
  }

  loadEntities$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.loadEntities),
    fetch({
      run: () => this.crudService.findAll().pipe(
        map(this.actions.loadEntitiesDone)
      ),
      onError: (_, error: Error) => this.actions.loadEntitiesError(error)
    }))
  );

  loadEntity$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.loadEntity),
    fetch({
      run: (action: Action & { payload: string }) => this.crudService.findOne(action.payload).pipe(
        map(this.actions.loadEntityDone)
      ),
      onError: (_, error: Error) => this.actions.loadEntityError(error)
    }))
  );

  createEntity$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.createEntity),
    pessimisticUpdate({
      run: (action) => this.crudService.create(action.payload).pipe(
        map(this.actions.createEntityDone)
      ),
      onError: (_, error: Error) => this.actions.createEntityError(error)
    }))
  );

  updateEntity$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.updateEntity),
    pessimisticUpdate({
      run: (action: Action & { payload: UpdatePayload<T> }) =>
        this.crudService.update(action.payload.id, action.payload.updatedItem).pipe(
          map(this.actions.updateEntityDone)
        ),
      onError: (_, error: Error) => this.actions.updateEntityError(error)
    }))
  );

  deleteEntity$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.deleteEntity),
    pessimisticUpdate({
      run: (action: Action & { payload: string }) => this.crudService.remove(action.payload).pipe(
        map(this.actions.deleteEntityDone)
      ),
      onError: (_, error: Error) => this.actions.deleteEntityError(error)
    }))
  );

}



