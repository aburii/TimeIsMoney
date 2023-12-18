import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { compareHash, hash } from '@timeismoney/security';
import { ITokens } from '../../types/jwt';
import { ConfigService } from '@nestjs/config';
import { App, Provider } from '@timeismoney/models';
import { signUpDto } from '@timeismoney/dto';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { GoogleLoginDto } from '@timeismoney/dto/dist/auth/googleLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user || user.provider === Provider.GOOGLE) return null;

    const compare = await compareHash(user.password, password);

    return user && compare ? user : null;
  }

  async registerUser(newUser: signUpDto) {
    const hashPw = await hash(newUser.password);

    return this.userService.insertOne({
      ...newUser,
      password: hashPw,
      refresh: '',
    });
  }

  async login(userId: number, app: App): Promise<ITokens> {
    await this.checkUserAppPermission(userId, app);
    const tokens = await this.generateTokens(userId, app);
    await this.updateUserRefresh(userId, tokens.refreshToken);
    return tokens;
  }

  async refreshSession(
    userId: number,
    app: App,
    refreshToken: string,
  ): Promise<ITokens> {
    const user = await this.userService.findOne(userId);

    const compare = compareHash(user.refresh, refreshToken);

    if (!compare) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(userId, app);

    await this.updateUserRefresh(userId, app);

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
    return this.userService.updateOne(userId, { refresh: '' });
  }

  async checkUserAppPermission(userId: number, app: App) {
    const { role } = await this.userService.findOne(userId);

    if (app === App.BO && role !== 'ADMIN') {
      throw new ForbiddenException();
    }
  }

  async verifyGoggleSession(body: GoogleLoginDto) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: body.token,
      audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
    });
    return ticket.getPayload();
  }

  async loginOrCreateGoogleUser(payload: TokenPayload) {
    let user = await this.userService.findOneByEmail(payload.email);

    if (!user) {
      user = await this.userService.insertOne({
        nickname: payload.name,
        firstname: payload.given_name,
        lastname: payload.family_name,
        email: payload.email,
        password: '',
        provider: Provider.GOOGLE,
        refresh: '',
      });
    }

    const tokens = await this.generateTokens(user.id, App.FRONT);
    await this.updateUserRefresh(user.id, tokens.refreshToken);
    return tokens;
  }
}
