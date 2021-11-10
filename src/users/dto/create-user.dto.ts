import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail({}, { message: 'You needed a valid email.'})
  email: string;

  @IsString()
  @MinLength(6, { message: 'Your password must be at least 6 characters'})
  password: string;

  @IsString()
  @MinLength(6, { message: 'Your password must be at least 6 characters'})
  passwordConfirmation: string;
}
