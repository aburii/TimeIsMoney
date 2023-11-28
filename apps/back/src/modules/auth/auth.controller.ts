import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestUser } from '../../decorators/request-user.decorator';
import { LocalGuard } from '../../guards/passport/local.guard';
import { logInDto, signUpDto } from '@timeismoney/dto';
import { Response } from 'express';
import { UserInterceptor } from '../../interceptors/user.interceptor';
import { IRequestUser } from '../../types/passport/request-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(UserInterceptor)
  @Post('/register')
  async register(@Body() body: signUpDto) {
    return this.authService.registerUser(body);
  }

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(
    @RequestUser() user: IRequestUser,
    @Body() body: logInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user.userId, body.app);

    response.cookie('access_token', tokens.accessToken, {
      sameSite: 'lax',
      httpOnly: true,
    });
    response.cookie('refresh_token', tokens.refreshToken, {
      sameSite: 'lax',
      httpOnly: true,
    });

    return user;
  }
}
