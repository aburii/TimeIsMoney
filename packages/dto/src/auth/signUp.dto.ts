import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  // Matches,
} from "class-validator";

export class signUpDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/, {
  //   message: 'Password too weak',
  // })
  password: string;

  @IsNumber()
  @IsOptional()
  currencyId?: number;
}
