import { IsEnum, IsNotEmpty } from "class-validator";
import { App } from "@timeismoney/models";

export class logInDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(App)
  app: App;
}
