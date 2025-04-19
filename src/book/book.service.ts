import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose, { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-books-dto';
import { UpdateBookDto } from './dto/update-book-dto';

import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  findAll = async (query: Query): Promise<Array<Book>> => {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  };

  async createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {

    const data = {
      ...createBookDto,
      user: user._id
    }

    const book = await this.bookModel.create(data);
    return book;
  }

  async findById(id: mongoose.Types.ObjectId): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) throw new BadRequestException('Enter valid Id');

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not Found');
    }

    return book;
  }

  async updateById(id: mongoose.Types.ObjectId, updateBookDto: UpdateBookDto) {
    await this.findById(id);

    const updatedBook = await this.bookModel.findOneAndUpdate(
      { _id: id },
      updateBookDto,
      { new: true },
    );

    return updatedBook;
  }

  async deleteById(id: mongoose.Types.ObjectId): Promise<Book | null> {
    await this.findById(id);

    const deletedBook = await this.bookModel.findByIdAndDelete(id);

    return deletedBook;
  }
}
