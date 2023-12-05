import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { CoinApiService } from '../coinapi/coinapi.service';

@Module({
  controllers: [CryptoController],
  providers: [CryptoService, CoinApiService],
})
export class CryptoModule {}
