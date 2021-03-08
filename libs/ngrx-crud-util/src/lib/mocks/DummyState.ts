import { ListingState } from '../reducers/ListingState';
import { Dummy } from './Dummy';

export type DummyState = ListingState<Dummy> & { currentId: string }
