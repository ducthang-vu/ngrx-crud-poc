import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '@ngrx-crud-poc/core-data';
import { delay } from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CrudService } from '@ngrx-crud-poc/ngrx-crud-util';


@Injectable({
  providedIn: 'root'
})
export class BooksService implements CrudService<Book> {
  private baseUrl = 'http://localhost:3333/api/books';

  constructor(private http: HttpClient) {
  }

  @addRandomDelay
  findAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  @addRandomDelay
  findOne(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  @addRandomDelay
  create(newItem: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, newItem);
  }

  @addRandomDelay
  update(id: string, updateItem: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, updateItem);
  }

  @addRandomDelay
  remove(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }

}


// DELAY DECORATOR
function addRandomDelay(target: CrudService<any>, _, descriptor: TypedPropertyDescriptor<any>) {
  const originalMethod = descriptor.value; // save a reference to the original method
  descriptor.value = function (...args: never[]) {
    const time = (Math.random() + 0.5) * 5000;
    return originalMethod.apply(this, args).pipe(delay(time));
  };
  return descriptor;
}
