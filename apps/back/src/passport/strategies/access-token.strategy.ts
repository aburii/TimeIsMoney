import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IRequestUser } from '../../types/passport/request-user';
import { JwtPayload } from '../../types/jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractTokenFromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_AT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<IRequestUser> {
    return { userId: payload.userId, app: payload.app };
  }

  private static extractTokenFromCookies(request: Request) {
    if (
      request.cookies &&
      request.cookies['access_token'] &&
      request.cookies['access_token'].length > 0
    ) {
      return request.cookies['access_token'];
    }
    return null;
  }
}
