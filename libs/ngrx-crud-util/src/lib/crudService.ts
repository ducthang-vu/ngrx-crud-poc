import { Observable } from 'rxjs';

/**
 * Interface to be implemented by service which perform crud operations with backend
 *
 * @typeParam T - The entity type
 */
export interface CrudService<T> {
  /**
   * Fetch all entities from backend
   */
  findAll: () => Observable<T[]>;

  /**
   * Fetch one entities from backend
   */
  findOne: (id: string) => Observable<T>;

  /**
   * Create a mew entity
   */
  create: (item: Omit<T, 'id'>) => Observable<T>;

  /**
   * Update an entity
   */
  update: (id: string, item: Partial<T>) => Observable<T>;

  /**
   * Remove an entity
   */
  remove: (id: string) => Observable<string>;
}
