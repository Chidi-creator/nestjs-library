import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { Category } from 'src/config/constants.config';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsOptional()
  @IsEnum(Category, {
    message: 'Category must be one of the predefined values',
  })
  category: Category;

  @IsEmpty({ message: "User can't parse user id" })
  readonly user: User;
}
