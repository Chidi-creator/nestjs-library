import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Category } from 'src/config/constants.config';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  price: number;

  @IsEnum(Category, {
    message: 'Category must be one of the predefined values',
  })
  category: Category;


 @IsEmpty({message: "User can't parse user id"}) 
readonly user: User

}
