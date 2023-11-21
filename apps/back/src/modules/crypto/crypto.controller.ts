import { Controller, Get } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('cryptos')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get()
  async findMany() {
    return this.cryptoService.listAll();
  }
}
