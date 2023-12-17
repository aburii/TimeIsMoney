import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { CoinApiService } from '../coinapi/coinapi.service';
import { AccessTokenStrategy } from '../../passport/strategies/access-token.strategy';
import { UserService } from '../user/user.service';

@Module({
  controllers: [CryptoController],
  providers: [CryptoService, CoinApiService, AccessTokenStrategy, UserService],
})
export class CryptoModule {}
