import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BooksService } from './books.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Book } from '@ngrx-crud-poc/core-data';


describe('BooksService', () => {
  let service: BooksService;

  const mockBook = (id: number): Book => ({
    id: id.toString(),
    author: 'author-' + id.toString(),
  } as Book);

  const mockHttp = {
    get: (url: string) => {
      const match = url.match(/.*books\/(.*)/);
      const id = match ? match[1] : undefined;
      return of(id ? mockBook(+id) : [1, 2, 3].map(mockBook));
    },
    post: (url, newItem: Omit<Book, 'id'>) => of({ id: 'mockId', ...newItem }),
    put: (url: string, updateItem: Partial<Book>) => of({
      id: url.match(/.*books\/(.*)/)[1],
      ...updateItem
    }),
    delete: (url: string) => of(url.match(/.*books\/(.*)/)[1]),
  } as unknown as HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HttpClient,
        useValue: mockHttp
      }]
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(' findAll should return an array of Book observable', fakeAsync(() => {
    let result;
    service.findAll().subscribe(res => result = res);
    tick(10000);
    expect(result).toEqual([1, 2, 3].map(mockBook));
  }));

  it(' findOne should return an array of Book observable', fakeAsync(() => {
    let result;
    service.findOne('5').subscribe(res => result = res);
    tick(10000);
    expect(result).toEqual(mockBook(5));
  }));

  it(' create should return a new Book item observable', fakeAsync(() => {
    let result;
    service.create({ author: 'fakeAuthor' } as Omit<Book, 'id'>).subscribe(res => result = res);
    tick(10000);
    expect(result).toEqual({ id: 'mockId', author: 'fakeAuthor' } as Book);
  }));

  it(' update should return a updated Book item observable', fakeAsync(() => {
    let result;
    service.update('10', { author: 'fakeUpdate' } as Partial<Book>).subscribe(res => result = res);
    tick(10000);
    expect(result).toEqual({ id: '10', author: 'fakeUpdate' } as Book);
  }));

  it(' remove should return a observable with given id', fakeAsync(() => {
    let result;
    service.remove('5').subscribe(res => result = res);
    tick(10000);
    expect(result).toBe('5');
  }));

});
