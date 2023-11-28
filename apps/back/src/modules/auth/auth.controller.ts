import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestUser } from '../../decorators/request-user.decorator';
import { IRequestUser } from '../../types/passport/request-user';
import { LocalGuard } from '../../guards/passport/local.guard';
import { logInDto } from '@timeismoney/dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(
    @RequestUser() user: IRequestUser,
    @Body() body: logInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user, body.app);

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
