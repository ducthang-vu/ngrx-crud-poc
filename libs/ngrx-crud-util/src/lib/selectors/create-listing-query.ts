import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { ListingQuery } from './ListingQuery';
import { ListingState } from '../reducers/ListingState';

function createListingSelectors<T>(
  listState: MemoizedSelector<ListingState<T>, ListingState<T>, DefaultProjectorFn<ListingState<T>>>)
  : ListingQuery<T> {
  const createListingSelector = <S>(callback: (state: ListingState<T>) => S) => createSelector(listState, callback)
  return {
    getEntities: createListingSelector(state => Object.values(state.entities)),
    getLoading: createListingSelector(state => state.loading),
    getUpdating: createListingSelector(state => state.updating),
    getCreating: createListingSelector(state => state.creating),
    getDeleting: createListingSelector(state => state.deleting),
    getError: createListingSelector(state => state.error),
  }
}

export function createListingQuery<T>(featureKey: string) {
  return createListingSelectors<T>(createFeatureSelector(featureKey));
}
