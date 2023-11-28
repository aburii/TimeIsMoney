import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from '../../passport/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '../../passport/strategies/refresh-token.strategy';
import { LocalStrategy } from '../../passport/strategies/local.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({
      session: false,
    }),
  ],
  providers: [
    JwtService,
    AuthService,
    UserService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
