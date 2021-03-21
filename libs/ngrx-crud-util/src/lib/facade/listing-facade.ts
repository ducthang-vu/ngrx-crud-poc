import { Observable } from 'rxjs';
import { Action, DefaultProjectorFn, MemoizedSelector, Store } from '@ngrx/store';
import { ListingActionCreator } from '../actions/ListingActionCreator';
import { ListingQuery } from '../selectors/ListingQuery';
import { ListingState } from '../reducers/ListingState';
import { IListingFacade } from './IListingFacade';

export abstract class ListingFacade<T, S extends ListingState<T>> implements IListingFacade<T> {
  creating$: Observable<boolean> = this.select(this.listingQuery.getCreating);
  deleting$: Observable<boolean> = this.select(this.listingQuery.getDeleting);
  entities$: Observable<T[]> = this.select(this.listingQuery.getEntities);
  loading$: Observable<boolean> = this.select(this.listingQuery.getLoading);
  updating$: Observable<boolean> = this.select(this.listingQuery.getUpdating);

  protected constructor(
    protected actions: ListingActionCreator<T>,
    protected listingQuery: ListingQuery<T>,
    protected store: Store<S>
  ) {
  }

  protected select<R>(selector: MemoizedSelector<S, R, DefaultProjectorFn<R>>) {
    return this.store.select(selector)
  }

  protected dispatch(action: Action): void {
    return this.store.dispatch(action);
  }

  public createEntity(newEntity: Omit<T, 'id'>): void {
    this.dispatch(this.actions.createEntity(newEntity));
  }

  public editEntity(id: string, updatedItem: Partial<T>): void {
    const payload = { id, updatedItem };
    this.dispatch(this.actions.updateEntity(payload));
  }

  public deleteEntity(id: string): void {
    this.dispatch(this.actions.deleteEntity(id))
  }

}
