import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, IBeCrudService } from "@ngrx-crud-poc/core-data";
import { DbService } from "./db/db.service";

@Injectable()
export class BooksService implements IBeCrudService<Book> {
  constructor(private db: DbService) {
  }

  items: Book[] = this.db.items

  private checkIsExisting(id: string) {
    if (!this.items.find(i => i.id === id)) {
      throw new NotFoundException(`Not found (id: ${id})`)
    }
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      ...createBookDto,
      id: this.items.length.toString()
    }
    this.items.push(newBook)
    return this.findOne(newBook.id)
  }

  findAll(): Book[] {
    return this.items;
  }

  findOne(id: string): Book {
    this.checkIsExisting(id)
    return this.items.find(i => i.id === id)
  }

  update(id: string, updateBookDto: UpdateBookDto): Book {
    this.checkIsExisting(id)
    const oldItem = this.items.find(i => i.id === id)
    this.items = this.items.filter(i => i.id !== id).concat(Object.assign(oldItem, updateBookDto))
    return this.findOne(id)
  }

  remove(id: string): string {
    this.checkIsExisting(id)
    this.items = this.items.filter(i => i.id !== id)
    return id
  }
}
