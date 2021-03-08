import { Book, IBooksFacade } from '@ngrx-crud-poc/core-data';
import { of } from 'rxjs';

export const bookFacadeMock: IBooksFacade = {
  creating$: of(true),
  deleting$: of(true),
  entities$: of({} as Book[]),
  loading$: of(true),
  updating$: of(true),
  createEntity(): void {return undefined},
  editEntity(): void {return undefined},
  deleteEntity() { return of({}).subscribe() },
  currentEntity$: of({id: 'mockId'} as Book)
};
