import { Controller, Get, Post, Param } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('cryptos')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('available')
  async listAvailableCurrencies() {
    return this.cryptoService.listAvailableCurrencies();
  }

  @Get()
  async listRegisteredCurrencies() {
    return this.cryptoService.listRegisteredCurrencies();
  }

  @Post('register/:symbol')
  async registerCryptoCurrency(@Param('symbol') symbol: string) {
    return this.cryptoService.registerCryptoCurrency(symbol);
  }
}
