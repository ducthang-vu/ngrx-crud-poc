import { listingActionCreatorFactory } from '../actions/listing-action-creator-factory';
import { Dummy } from '../mocks/Dummy';
import { DummyState } from '../mocks/DummyState';
import { createListingAdapter } from './create-listing-adapter';
import { createListingReducer } from './create-listing-reducer';


describe('createListingReducer', () => {
  const adapter = createListingAdapter<Dummy, DummyState>();
  const initialState = adapter.getListingInitialState({ currentId: null })
  const actions = listingActionCreatorFactory<Dummy>('DUMMY')
  const reducer = createListingReducer<Dummy, DummyState>(adapter, initialState, actions)

  it('reducer should be truthy', () => {
    expect(reducer).toBeTruthy()
  })
})
