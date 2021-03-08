import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { ListingState } from '@ngrx-crud-poc/ngrx-crud-util';


export interface ListingQuery<T> {
  getEntities: MemoizedSelector<ListingState<T>, T[], DefaultProjectorFn<T[]>>;
  getLoading: MemoizedSelector<ListingState<T>, boolean, DefaultProjectorFn<boolean>>;
  getUpdating: MemoizedSelector<ListingState<T>, boolean, DefaultProjectorFn<boolean>>;
  getCreating: MemoizedSelector<ListingState<T>, boolean, DefaultProjectorFn<boolean>>;
  getDeleting: MemoizedSelector<ListingState<T>, boolean, DefaultProjectorFn<boolean>>;
  getError: MemoizedSelector<ListingState<T>, Error, DefaultProjectorFn<Error>>;
}
