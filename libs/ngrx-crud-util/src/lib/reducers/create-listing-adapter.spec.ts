import { DummyState } from '../mocks/DummyState';
import { Dummy } from '../mocks/Dummy';
import { dummyState } from '../mocks/state';
import { dummyFactory } from '../mocks/dummy-factory';
import { createListingAdapter } from '../reducers/create-listing-adapter';


describe('createListingAdapter', () => {
  const adapter = createListingAdapter<Dummy, DummyState>();
  let mockState: DummyState;

  beforeEach(() => mockState = dummyState);

  it('getListingInitialState should return initial state', () => {
    const result = adapter.getListingInitialState({ currentId: null });
    const expected: DummyState = {
      entities: {},
      ids: [],
      loading: false,
      updating: false,
      creating: false,
      deleting: false,
      error: null,
      currentId: null
    };
    expect(result).toEqual(expected);
  });

  it('loadEntities', () => {
    const result = adapter.loadEntities(mockState);
    const expected = {
      ...mockState,
      loading: true
    };
    expect(result).toEqual(expected);
  });

  it('loadEntitiesDone', () => {
    mockState.loading = true;
    const payload = [10, 20, 30].map(dummyFactory);
    const result = adapter.loadEntitiesDone(mockState, { payload });
    const expected = {
      ...mockState,
      entities: {
        10: dummyFactory(10),
        20: dummyFactory(20),
        30: dummyFactory(30)
      },
      ids: ['10', '20', '30'],
      loading: false
    };
    expect(result).toEqual(expected);
  });

  it('loadEntity', () => {
    const result = adapter.loadEntity(mockState);
    const expected = {
      ...mockState,
      loading: true
    };
    expect(result).toEqual(expected);
  });

  it('loadEntityDone', () => {
    mockState.loading = true;
    const payload = dummyFactory(101);
    const result = adapter.loadEntityDone(mockState, { payload });
    const expected = {
      ...mockState,
      entities: {
        ...mockState.entities,
        101: payload
      },
      ids: ['1', '2', '3', '101'],
      loading: false
    };
    expect(result).toEqual(expected);
  });

  it('createEntity', () => {
    const result = adapter.createEntity(mockState);
    const expected = {
      ...mockState,
      creating: true
    };
    expect(result).toEqual(expected);
  });

  it('createEntityDone', () => {
    mockState.creating = true;
    const payload = dummyFactory(500);
    const result = adapter.createEntityDone(mockState, { payload });
    const expected = {
      ...mockState,
      entities: {
        ...mockState.entities,
        500: payload
      },
      ids: ['1', '2', '3', '500'],
      creating: false
    };
    expect(result).toEqual(expected);
  });


  it('updateEntityDone', () => {
    const result = adapter.updateEntity(mockState);
    const expected = {
      ...mockState,
      updating: true
    };
    expect(result).toEqual(expected);
  });

  it('updateEntityDone', () => {
    mockState.updating = true;
    const payload: Dummy = {
      id: '2',
      name: 'editedName'
    };
    const result = adapter.updateEntityDone(mockState, { payload });
    const expected = {
      ...mockState,
      entities: {
        ...mockState.entities,
        2: payload
      },
      ids: ['1', '2', '3'],
      updating: false
    };
    expect(result).toEqual(expected);
  });


  it('deleteEntity', () => {
    const result = adapter.deleteEntity(mockState);
    const expected = {
      ...mockState,
      deleting: true
    };
    expect(result).toEqual(expected);
  });

  it('deleteEntityDone', () => {
    mockState.deleting = true;
    const payload = '2';
    const result = adapter.deleteEntityDone(mockState, { payload });
    const expected = {
      ...mockState,
      entities: {
        1: dummyFactory(1),
        3: dummyFactory(3)
      },
      ids: ['1', '3'],
      deleting: false
    };
    expect(result).toEqual(expected);
  });

  const errorActions = [
    adapter.loadEntitiesError,
    adapter.loadEntityError,
    adapter.createEntityError,
    adapter.updateEntityError,
    adapter.deleteEntityError
  ];
  const payload = new Error('error message');
  errorActions.forEach((action, index) => {
    mockState = {
      ...mockState,
      loading: true,
      updating: true,
      creating: true,
      deleting: true,
      error: null
    };
    it(`action (${errorActions[index].name}) should manage error`, () => {
      const expected = {
        ...mockState,
        loading: false,
        updating: false,
        creating: false,
        deleting: false,
        error: 'error message'
      };
      const result = action(mockState, { payload });
      expect(result).toEqual(expected)
    });
  });
});
