import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../modules/auth/auth.service';
import { IRequestUser } from '../../types/passport/request-user';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    email: string,
    password: string,
  ): Promise<IRequestUser | null> {
    const user = await this.authService.validateUser(email, password);

    if (!user) return null;
    return { userId: user.id, app: request.body?.app };
  }
}
