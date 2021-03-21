import { Observable } from 'rxjs';

export interface IListingFacade<T> {
  creating$: Observable<boolean>;
  deleting$: Observable<boolean>;
  entities$: Observable<T[]>;
  loading$: Observable<boolean>;
  updating$: Observable<boolean>;
  createEntity(newEntity: Omit<T, 'id'>): void
  editEntity(id: string, updatedItem: T): void
  deleteEntity(id: string): void
}
