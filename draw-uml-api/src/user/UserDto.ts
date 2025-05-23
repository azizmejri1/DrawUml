import { IsEmail, IsString, MinLength } from "class-validator";

export class UserDto{
    @IsString()
    firstName : string;

    @IsString()
    lastName: string;

    @IsString()
    username: string; 

    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}