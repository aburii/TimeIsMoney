import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class logInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
