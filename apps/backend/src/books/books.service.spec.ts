import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { DbService } from './db/db.service';
import { Book } from '@ngrx-crud-poc/core-data';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { NotFoundException } from '@nestjs/common';

const book0: Book = {
  "id": "0",
  "author": "Chinua Achebe",
  "country": "Nigeria",
  "language": "English",
  "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
  "pages": 209,
  "title": "Things Fall Apart",
  "year": 1958
};

const book1: Book = {
  "id": "1",
  "author": "Hans Christian Andersen",
  "country": "Denmark",
  "language": "Danish",
  "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
  "pages": 784,
  "title": "Fairy tales",
  "year": 1836
};

const mockDbService = {
  items: [book0, book1]
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: DbService,
          useValue: mockDbService
        }
      ],
    }).compile();
    mockDbService.items = [book0, book1]
    service = module.get<BooksService>(BooksService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should create new item', () => {
    const newItem: CreateBookDto = {
      "author": "Jane Austen",
      "country": "United Kingdom",
      "language": "English",
      "link": "https://en.wikipedia.org/wiki/Pride_and_Prejudice\n",
      "pages": 226,
      "title": "Pride and Prejudice",
      "year": 1813
    };
    const newBook: Book = {id: "2", ...newItem}
    expect(service.create(newItem)).toEqual(newBook)
    expect(service.findOne("2")).toEqual(newBook)
    expect(service.findAll()).toEqual([book0, book1, newBook])
  });

  it('findAll should return all books', () => {
    expect(service.findAll()).toEqual([book0, book1]);
  });

  describe('findOne', () => {
    it('findOne should return one book', () => {
      expect(service.findOne('1')).toEqual(book1);
    });

    it('findOne should raise NotFoundException', () => {
      const error = new NotFoundException(`Not found (id: 100)`)
      expect(() => service.findOne('100')).toThrowError(error);
    })
  })

  describe('update', () => {

    it('update should return updated item', () => {
      const updated: UpdateBookDto = {
        "author": "Hans Christian Andersen",
        "country": "Denmark",
        "language": "Italian",
        "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.",
        "pages": 784,
        "title": "Fairy tales",
        "year": 1836
      };
      const id = "1";
      const updatedBook: Book = {
        "id": "1",
        ...updated
      }
      expect(service.findOne(id)).toEqual(book1)
      expect(service.update(id, updated)).toEqual(updatedBook)
      expect(service.findAll()).toEqual([book0, updatedBook]);
    })

    it('update should raise NotFoundException', () => {
      const error = new NotFoundException(`Not found (id: 100)`)
      expect(() => service.update('100', {} as UpdateBookDto)).toThrowError(error)
    })
  })


  it('remove should return given id and eliminated one item', () => {
    expect(service.remove('0')).toBe('0');
    expect(service.findAll()).toEqual([book1]);
  });
});
