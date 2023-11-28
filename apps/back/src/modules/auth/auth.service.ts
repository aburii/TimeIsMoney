import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { compareHash, hash } from '@timeismoney/security';
import { ITokens } from '../../types/jwt';
import { ConfigService } from '@nestjs/config';
import { App } from '@timeismoney/models';
import { IRequestUser } from '../../types/passport/request-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    const compare = compareHash(user.password, password);

    return user && compare ? user : null;
  }

  async login(user: IRequestUser, app: App): Promise<ITokens> {
    const tokens = await this.generateTokens(user, app);
    await this.updateUserRefresh(user.userId, tokens.refreshToken);
    return tokens;
  }

  async generateTokens(user: IRequestUser, app: App): Promise<ITokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId: user.userId,
          app,
          expiresIn: this.configService.get<string>('JWT_AT_EXPIRATION'),
        },
        {
          secret: this.configService.get<string>('JWT_AT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_AT_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        {
          userId: user.userId,
          app,
          expiresIn: this.configService.get<string>('JWT_RT_EXPIRATION'),
        },
        {
          secret: this.configService.get<string>('JWT_RT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_RT_EXPIRATION'),
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateUserRefresh(userId: number, token: string) {
    const hashedToken = await hash(token);
    return this.userService.updateOne(userId, { refresh: hashedToken });
  }

  async removeUserRefresh(userId: number) {
    return this.userService.updateOne(userId, { refresh: null });
  }
}
