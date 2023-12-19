import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCurrencyDto, UpdateCurrencyDto } from '@timeismoney/dto';
import { AccessGuard } from '../../guards/passport/jwt-at.guard';
import { BoGuard } from '../../guards/bo.guard';
import { CryptoService } from '../crypto/crypto.service';

@UseGuards(AccessGuard, BoGuard)
@Controller('bo/cryptos')
export class BoCryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('register/:symbol')
  async registerCryptoCurrency(@Param('symbol') symbol: string) {
    return this.cryptoService.registerCurrency(symbol);
  }

  @Post()
  async create(
    @Body() createCurrencyDto: CreateCurrencyDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.cryptoService.create(createCurrencyDto, {
      crudQuery,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.cryptoService.update(id, updateCurrencyDto, {
      crudQuery,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.cryptoService.remove(id, { crudQuery });
  }
}
