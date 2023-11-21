import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logInDto } from '@timeismoney/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // ======= CONTROLLER FOR SIGN UP THE APPLICATION =======
  @Post('signIn')
  async signUp() {
    // return this.authService.signIn();
  }
  // ======= CONTROLLER FOR LOG IN THE APPLICATION =======
  @Post('login')
  async logIn(@Body() dto: logInDto) {
    return this.authService.login(dto);
  }
}
