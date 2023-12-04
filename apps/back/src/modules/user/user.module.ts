import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AccessTokenStrategy } from '../../passport/strategies/access-token.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, AccessTokenStrategy],
})
export class UserModule {}
