import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    
    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter valid email"})
    email: string

    @IsString()
    @MinLength(4)
    password: string

}
