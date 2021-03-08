import { DummyState } from './DummyState';
import { dummyFactory } from './dummy-factory';

export const dummyState: DummyState = {
  entities: {
    1: dummyFactory(1),
    2: dummyFactory(2),
    3: dummyFactory(3)
  },
  ids: ['1', '2', '3'],
  loading: false,
  updating: false,
  creating: false,
  deleting: false,
  error: null,
  currentId: null
};
