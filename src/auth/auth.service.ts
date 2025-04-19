import {
    ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const {  name, password, email, } = createUserDto;

    const alreadyExists = await this.userModel.findOne({ email });

    if (alreadyExists) throw new ConflictException('user already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException('Invalid email or password');

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
