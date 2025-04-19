import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { Category } from "src/config/constants.config";

@Schema({timestamps: true})
export class Book{

  @Prop()
    title: string;

    @Prop()
    description: string

    @Prop()
    author: string

    @Prop()
    price: number

    @Prop()
    category: Category

    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: User


}

const BookSchema = SchemaFactory.createForClass(Book)

export default BookSchema