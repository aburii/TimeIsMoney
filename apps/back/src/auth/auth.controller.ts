import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logInDto, signUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // ======= CONTROLLER FOR SIGN UP THE APPLICATION =======
  @Post('signup')
  async signUp(@Body() dto: signUpDto) {
    return this.authService.signUp(dto);
  }
  // ======= CONTROLLER FOR LOG IN THE APPLICATION =======
  @Post('login')
  async logIn(@Body() dto: logInDto) {
    return this.authService.logIn(dto);
  }
}
