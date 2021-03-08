import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DbService } from "./db/db.service";

@Module({
  controllers: [BooksController],
  providers: [BooksService, DbService]
})
export class BooksModule {}
