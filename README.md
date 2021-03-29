# NgrxCrudPoc

This project is a proof of concept for creating a ngrx utility library with factories for actions, reducers, selectors 
and facade which simplify working with common crud operation for a given resource.

The utility library is called **ngrx-crud-util** (in the libs folder). 
The root application is a simple example; to try it run: 
```
npm run start-both
```

## FEATURES
- Action creator factory for common crud operations.

```
// Example with Book entity
import { Book } from '@ngrx-crud-poc/core-data'
import { listingActionCreatorFactory } from '@ngrx-crud-poc/ngrx-crud-util';

export const fromBooksActions = listingActionCreatorFactory<Book>('Books')

// create loadEntities action:
const newAction = fromBooksActions.loadEntities()

console.log(newAction)
// { type: "[Books] Load entities" }


// fromBooksActions implements the following interface:
// ngrx-crud-poc/libs/ngrx-crud-util/src/lib/actions/ListingActionCreator.ts
interface ListingActionCreator<T> {
  loadEntities: ActionCreator;
  loadEntitiesDone: CrudActionCreator<T[]>;
  loadEntitiesError: CrudActionCreator<Error>;

  loadEntity: CrudActionCreator<string>;
  loadEntityDone: CrudActionCreator<T>;
  loadEntityError: CrudActionCreator<Error>;

  createEntity: CrudActionCreator<Omit<T, 'id'>>;
  createEntityDone: CrudActionCreator<T>;
  createEntityError: CrudActionCreator<Error>;

  updateEntity: CrudActionCreator<UpdatePayload<T>>;
  updateEntityDone: CrudActionCreator<T>;
  updateEntityError: CrudActionCreator<Error>;

  deleteEntity: CrudActionCreator<string>;
  deleteEntityDone: CrudActionCreator<string>;
  deleteEntityError: CrudActionCreator<Error>;
}
```


This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

