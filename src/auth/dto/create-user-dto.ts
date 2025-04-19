import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    
    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter valid email"})
    email: string

    @IsString()
    @MinLength(4)
    password: string

}
