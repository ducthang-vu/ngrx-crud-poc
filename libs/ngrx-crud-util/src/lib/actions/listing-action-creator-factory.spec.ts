import { Dummy } from '../mocks/Dummy';
import { dummyFactory } from '../mocks/dummy-factory';
import { listingActionCreatorFactory } from './listing-action-creator-factory';


describe('listingActionCreatorFactory', () => {
  const dummyAction = listingActionCreatorFactory<Dummy>('DUMMY')

  it('loadEntities should create  action', () => {
    const expected = {
      type: `[DUMMY] Load entities`
    }
    const action = dummyAction.loadEntities()
    expect(action).toEqual(expected)
  })

  it('loadEntitiesDone should create action', () => {
    const payload = [1, 2, 3].map(dummyFactory)
    const expected = {
      type: `[DUMMY] Load entities done`,
      payload
    }
    const action = dummyAction.loadEntitiesDone(payload)
    expect(action).toEqual(expected)
  })

  it('loadEntitiesError should create action', () => {
    const payload = new Error('error')
    const expected = {
      type: `[DUMMY] Load entities error`,
      payload
    }
    const action = dummyAction.loadEntitiesError(payload)
    expect(action).toEqual(expected)
  })


  it('loadEntity should create  action', () => {
    const expected = {
      type: `[DUMMY] Load entity`,
      payload: '100'
    }
    const action = dummyAction.loadEntity('100')
    expect(action).toEqual(expected)
  })

  it('loadEntityDone should create action', () => {
    const payload = dummyFactory(1)
    const expected = {
      type: `[DUMMY] Load entity done`,
      payload
    }
    const action = dummyAction.loadEntityDone(payload)
    expect(action).toEqual(expected)
  })

  it('loadEntityError should create action', () => {
    const payload = new Error('error')
    const expected = {
      type: `[DUMMY] Load entity error`,
      payload
    }
    const action = dummyAction.loadEntityError(payload)
    expect(action).toEqual(expected)
  })


  it('createEntity should create  action', () => {
    const payload = { name: 'mock' }
    const expected = {
      type: `[DUMMY] Create entity`,
      payload
    }
    const action = dummyAction.createEntity(payload)
    expect(action).toEqual(expected)
  })

  it('createEntityDone should create action', () => {
    const payload =  dummyFactory(10)
    const expected = {
      type: `[DUMMY] Create entity done`,
      payload
    }
    const action = dummyAction.createEntityDone(payload)
    expect(action).toEqual(expected)
  })

  it('createEntityError should create action', () => {
    const payload = new Error('error')
    const expected = {
      type: `[DUMMY] Create entity error`,
      payload
    }
    const action = dummyAction.createEntityError(payload)
    expect(action).toEqual(expected)
  })


  it('updateEntity should create  action', () => {
    const payload = {
      id: '150',
      updatedItem: { name: 'fakeName' }
    }
    const expected = {
      type: `[DUMMY] Update entity`,
      payload
    }
    const action = dummyAction.updateEntity(payload)
    expect(action).toEqual(expected)
  })

  it('updateEntityDone should create action', () => {
    const payload = dummyFactory(10)
    const expected = {
      type: `[DUMMY] Update entity done`,
      payload
    }
    const action = dummyAction.updateEntityDone(payload)
    expect(action).toEqual(expected)
  })

  it('updateEntityError should create action', () => {
    const payload = new Error('error')
    const expected = {
      type: `[DUMMY] Update entity error`,
      payload
    }
    const action = dummyAction.updateEntityError(payload)
    expect(action).toEqual(expected)
  })


  it('deleteEntity should create action', () => {
    const expected = {
      type: `[DUMMY] Delete entity`,
      payload: '100'
    }
    const action = dummyAction.deleteEntity('100')
    expect(action).toEqual(expected)
  })

  it('deleteEntityDone should create action', () => {
    const expected = {
      type: `[DUMMY] Delete entity done`,
      payload: '100'
    }
    const action = dummyAction.deleteEntityDone('100')
    expect(action).toEqual(expected)
  })

  it('deleteEntityError should create action', () => {
    const payload = new Error('error')
    const expected = {
      type: `[DUMMY] Delete entity error`,
      payload
    }
    const action = dummyAction.deleteEntityError(payload)
    expect(action).toEqual(expected)
  })

})
