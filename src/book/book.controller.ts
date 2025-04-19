import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-books-dto';
import mongoose from 'mongoose';
import { UpdateBookDto } from './dto/update-book-dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/config/constants.config';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @Roles(Role.Moderator, Role.Admin, Role.User)
  @UseGuards(AuthGuard(), RolesGuard)
  async findAll(@Query() query: ExpressQuery): Promise<Array<Book>> {
    const books = await this.bookService.findAll(query);
    return books;
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body(ValidationPipe) createBookDto: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    const book = await this.bookService.createBook(createBookDto, req.user);
    return book;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async GetBookById(@Param('id') id: mongoose.Types.ObjectId): Promise<Book> {
    const book = await this.bookService.findById(id);
    return book;
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body(ValidationPipe) createBookDto: UpdateBookDto,
  ) {
    const book = await this.bookService.updateById(id, createBookDto);
    return book;
  }

  @Delete(':id')
  async deleteById(
    @Param('id') id: mongoose.Types.ObjectId,
  ): Promise<Book | null> {
    const book = await this.bookService.deleteById(id);
    return book;
  }
}
