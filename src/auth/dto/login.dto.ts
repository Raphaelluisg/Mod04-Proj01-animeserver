import { IsString, IsEmail, MinLength } from 'class-validator';
import { User } from '@prisma/client';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

export class AuthResponse {
    token: string;
    user: User;
}