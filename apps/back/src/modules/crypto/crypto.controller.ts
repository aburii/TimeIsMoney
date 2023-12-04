import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CreateCurrencyDto, UpdateCurrencyDto } from '@timeismoney/dto';

@Controller('cryptos')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post()
  async create(
    @Body() createCurrencyDto: CreateCurrencyDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.cryptoService.create(createCurrencyDto, {
      crudQuery,
    });
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    return await this.cryptoService.findMany({ crudQuery });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.cryptoService.findOne(id, { crudQuery });
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

  @Get('api-currencies')
  async listApiCurrencies() {
    return this.cryptoService.listApiCurrencies();
  }

  @Post('register/:symbol')
  async registerCryptoCurrency(@Param('symbol') symbol: string) {
    return this.cryptoService.registerCryptoCurrency(symbol);
  }
}
