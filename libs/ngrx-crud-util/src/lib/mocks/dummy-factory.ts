import { Dummy } from './Dummy';

export const dummyFactory = (id: number): Dummy => ({
  id: id.toString(),
  name: 'name-' + id.toString()
})
