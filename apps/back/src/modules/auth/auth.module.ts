import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from '../../passport/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '../../passport/strategies/refresh-token.strategy';
import { LocalStrategy } from '../../passport/strategies/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secretOrPrivateKey: configService.get<string>('JWT_AT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_AT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      session: false,
    }),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
