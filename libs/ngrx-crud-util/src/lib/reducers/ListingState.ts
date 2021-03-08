import { EntityState } from '@ngrx/entity';

export interface ListingState<T> extends EntityState<T> {
  loading: boolean;
  updating: boolean;
  creating: boolean;
  deleting: boolean;
  error: Error | null;
}
