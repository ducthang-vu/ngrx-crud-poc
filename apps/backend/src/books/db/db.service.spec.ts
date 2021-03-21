import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from './db.service';
import { Book } from '@ngrx-crud-poc/core-data';

describe('DbService', () => {
  let service: DbService;
  const isBook = (item: any): item is Book => (
    item.id &&
    item.author &&
    item.title &&
    item.country &&
    item.language &&
    item.link &&
    item.pages &&
    item.year
  )
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbService],
    }).compile();

    service = module.get<DbService>(DbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('items getter should return list of books', () => {
    expect(service.items.every(isBook)).toBe(true);
  })
});
