import { Observable, of } from 'rxjs';
import { CrudService } from '../crudService';
import { Dummy } from './Dummy';
import { dummyFactory } from './dummy-factory';


export class DummyService implements CrudService<Dummy> {
  private isValid(id) {
    if (!['1', '2', '3'].includes(id)) {
      throw new Error('mockError')
    }
  }

  findAll(): Observable<Dummy[]> {
    return of([1, 2, 3].map(dummyFactory))
  }

  findOne(id: string): Observable<Dummy> {
    this.isValid(id);
    return of(dummyFactory(+id));
  }

  create(newItem: Omit<Dummy, 'id'>): Observable<Dummy> {
    if(newItem.name === 'errorName') {
      throw new Error('mockError')
    }
    const newDummy: Dummy = {
      id: '100',
      ...newItem
    }
    return of(newDummy);
  }

  update(id: string, updateItem: Partial<Dummy>): Observable<Dummy> {
    this.isValid(id);
    const updatedItem: Dummy = {
      ...dummyFactory(+id),
      ...updateItem
    }
    return of(updatedItem);
  }

  remove(id: string): Observable<string> {
    this.isValid(id);
    return of(id);
  }

}
