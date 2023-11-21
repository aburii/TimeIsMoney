import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  Validate,
  // Matches,
} from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  @Validate((value, args) => value === args.object.password, {
    message: 'please use the same password',
  })
  confirmPassword: string;

  @IsNumber()
  @IsNotEmpty()
  currencyId: number;
}
