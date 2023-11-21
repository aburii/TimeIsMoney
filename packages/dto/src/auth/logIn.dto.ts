import { IsNotEmpty } from "class-validator";

export class logInDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
