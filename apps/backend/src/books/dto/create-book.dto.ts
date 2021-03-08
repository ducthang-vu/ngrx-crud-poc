import { Book } from "@ngrx-crud-poc/core-data";

export class CreateBookDto implements Omit<Book, 'id'> {
  author: string;
  title: string;
  country: string;
  language: string;
  link: string;
  pages: number;
  year: number;
}
