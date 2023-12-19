import { Module } from '@nestjs/common';
import { BoUserController } from './user.controller';
import { UserService } from '../user/user.service';
import { AccessTokenStrategy } from '../../passport/strategies/access-token.strategy';
import { BoCryptoController } from './crypto.controller';
import { CryptoService } from '../crypto/crypto.service';
import { CoinApiService } from '../coinapi/coinapi.service';

@Module({
  controllers: [BoUserController, BoCryptoController],
  providers: [UserService, CryptoService, CoinApiService, AccessTokenStrategy],
})
export class BoModule {}
