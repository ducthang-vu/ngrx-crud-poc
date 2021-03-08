import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  author: string;
  title: string;
  country: string;
  language: string;
  link: string;
  pages: number;
  year: number;
}

