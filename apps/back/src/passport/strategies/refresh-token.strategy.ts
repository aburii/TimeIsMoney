import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../../types/jwt';
import { IRequestUser } from '../../types/passport/request-user';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractTokenFromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_RT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<IRequestUser> {
    return { userId: payload.userId, app: payload.app };
  }

  private static extractTokenFromCookies(request: Request) {
    if (
      request.cookies &&
      request.cookies['refresh_token'] &&
      request.cookies['refresh_token'].length > 0
    ) {
      return request.cookies['refresh_token'];
    }
    return null;
  }
}
