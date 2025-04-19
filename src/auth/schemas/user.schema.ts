import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/config/constants.config';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: String, enum: Role }],
    default:[ Role.User],
  })
  role: Role[];
}

const UserSchema = SchemaFactory.createForClass(User);

export default UserSchema;
