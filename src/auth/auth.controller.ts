import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('/login')
  async login(@Body(ValidationPipe)dto: LoginUserDto): Promise<{token: string}>{
        return await this.authService.login(dto)
  }
}
