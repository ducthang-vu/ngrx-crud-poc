import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { CrudService } from '@ngrx-crud-poc/ngrx-crud-util';
import { Action } from '@ngrx/store';
import { ListingActions, UpdatePayload } from '../actions/ListingActions';

export abstract class ListingEffect<T> {
  protected abstract crudService: CrudService<T>;

  protected constructor(
    protected actions$: Actions,
    protected actions: ListingActions<T>,
  ) {
  }

  loadEntities$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.loadEntities),
    fetch({
      run: () => this.crudService.findAll().pipe(
        map(res => this.actions.loadEntitiesDone({ payload: res }))
      ),
      onError: (_, error: Error) => this.actions.loadEntitiesError({ payload: { error } })
    }))
  );

  loadEntity$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.loadEntity),
    fetch({
      run: (action: Action & { payload: string }) => this.crudService.findOne(action.payload).pipe(
        map(res => this.actions.loadEntityDone({ payload: res }))
      ),
      onError: (_, error: Error) => this.actions.loadEntitiesError({ payload: { error } })
    }))
  );

  createEntity$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.createEntity),
    pessimisticUpdate({
      run: (action: Action & { payload: T }) => this.crudService.create(action.payload).pipe(
        map(this.actions.createEntityDone.bind(this))
      ),
      onError: (_, error: Error) => this.actions.createEntityError({ payload: { error } })
    }))
  );

  updateEntity$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.updateEntity),
    pessimisticUpdate({
      run: (action: Action & { payload: UpdatePayload<T> }) => this.crudService.update(action.payload.id, action.payload.updatedItem).pipe(
        map(res => this.actions.updateEntityDone({ payload: res }))
      ),
      onError: (_, error: Error) => this.actions.updateEntityError({ payload: { error } })
    }))
  );

  deleteEntity$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.deleteEntity),
    pessimisticUpdate({
      run: (action: Action & { payload: string }) => this.crudService.remove(action.payload).pipe(
        map(id => this.actions.deleteEntityDone({ payload: id }))
      ),
      onError: (_, error: Error) => this.actions.deleteEntityError({ payload: { error } })
    }))
  );

}



