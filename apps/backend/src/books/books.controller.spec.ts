import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, IBeCrudService } from '@ngrx-crud-poc/core-data';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

const mockBook = (id: number): Book => ({
  id: id.toString(),
  author: 'author-' + id.toString(),
} as Book);

const mockBookService: IBeCrudService<Book> = {
  create: (newItem: CreateBookDto) => ({id: 'mockId', ...newItem }),
  findAll: () => [1, 2, 3].map(mockBook),
  findOne: (id: string) => mockBook(+id),
  update: (id: string, updated: UpdateBookDto) => ({id, author: 'fakeAuthor',...updated }),
  remove: (id: string) => id
}

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [{
        provide: BooksService,
        useValue: mockBookService
      }],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should return new item', () => {
    const newItem = { author: 'newAuthor', title: 'newTitle'} as CreateBookDto;
    const result = controller.create(newItem)
    expect(result).toEqual({ id: 'mockId', author: 'newAuthor', title: 'newTitle'} as Book)
  })

  it('findAll should return array of Book items', () => {
    const result = controller.findAll()
    expect(result).toEqual([1, 2, 3].map(mockBook))
  })

  it('findOne should return one item', () => {
    const result = controller.findOne('100')
    expect(result).toEqual(mockBook(100))
  })

  it('update should return updated item', () => {
    const updated = { title: 'updatedTitle'} as UpdateBookDto;
    const result = controller.update('200', updated)
    expect(result).toEqual({ id: '200', author: 'fakeAuthor', title: 'updatedTitle'} as Book)
  })

  it('remove should return given id', () => {
    const result = controller.remove('100')
    expect(result).toBe('100')
  })
});
