export interface IBeCrudService<T> {
  findAll: () => T[];
  findOne: (id: string) => T;
  create: (item: T) => T;
  update: (id: string, item: T) => T;
  remove: (id: string) => string;
}
