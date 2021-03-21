import { Dummy } from '../mocks/Dummy';
import { dummyState } from '../mocks/state';
import { dummyFactory } from '../mocks/dummy-factory';
import { createListingQuery } from './create-listing-query';
import { ListingState } from '../reducers/ListingState';


describe('createListingQuery', () => {
  let state: { DUMMY: ListingState<Dummy> };
  const query = createListingQuery<Dummy>('DUMMY');

  beforeEach(() => state = { DUMMY: dummyState });

  describe('getEntities', () => {
    it('getEntities should return dummy array', () => {
      // @ts-expect-error is correct?
      const result = query.getEntities(state);
      const expected = [1, 2, 3].map(dummyFactory);
      expect(result).toEqual(expected);
    });

    it('getEntities should return empty array', () => {
      state = {
        DUMMY: {
          ...state.DUMMY,
          entities: {},
          ids: []
        }
      }
      // @ts-expect-error is correct?
      const result = query.getEntities(state);
      expect(result).toEqual([]);
    });
  });

  // @ts-expect-error is correct?
  it('getLoading', () => expect(query.getLoading(state)).toBe(false))
  // @ts-expect-error is correct?
  it('getUpdating', () => expect(query.getUpdating(state)).toBe(false))
  // @ts-expect-error is correct?
  it('getCreating', () => expect(query.getCreating(state)).toBe(false))
  // @ts-expect-error is correct?
  it('getDeleting', () => expect(query.getDeleting(state)).toBe(false))
  // @ts-expect-error is correct?
  it('getError', () => expect(query.getError(state)).toBe(null))
});
