import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { compareHash, hash } from '@timeismoney/security';
import { ITokens } from '../../types/jwt';
import { ConfigService } from '@nestjs/config';
import { App } from '@timeismoney/models';
import { signUpDto } from '@timeismoney/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) return null;

    const compare = await compareHash(user.password, password);

    return user && compare ? user : null;
  }

  async registerUser(newUser: signUpDto) {
    const hashPw = await hash(newUser.password);

    return this.userService.insertOne({ ...newUser, password: hashPw });
  }

  async login(userId: number, app: App): Promise<ITokens> {
    const tokens = await this.generateTokens(userId, app);
    await this.updateUserRefresh(userId, tokens.refreshToken);
    return tokens;
  }

  async generateTokens(id: number, app: App): Promise<ITokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId: id,
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
          userId: id,
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
