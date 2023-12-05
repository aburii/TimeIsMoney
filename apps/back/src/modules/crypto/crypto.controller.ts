import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseArrayPipe,
  ParseIntPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { HistoryPeriod } from '@timeismoney/coinapi';
import { CreateCurrencyDto, UpdateCurrencyDto } from '@timeismoney/dto';

@Controller('cryptos')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('api-fiat-currencies')
  async listApiFiatCurrencies() {
    return this.cryptoService.listApiFiatCurrencies();
  }

  @Get('api-currencies')
  async listApiCurrencies() {
    return this.cryptoService.listApiCurrencies();
  }

  @Post('register/:symbol')
  async registerCryptoCurrency(@Param('symbol') symbol: string) {
    return this.cryptoService.registerCurrency(symbol);
  }

  @Get(':symbol/summary')
  async summary(@Param('symbol') symbol: string) {
    return this.cryptoService.coinSummary(symbol);
  }

  @Get(':symbol/details')
  async details(@Param('symbol') symbol: string) {
    return this.cryptoService.coinDetails(symbol);
  }

  @Get('prices')
  async prices(
    @Query(
      'symbols',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    symbols: string[],
  ) {
    return this.cryptoService.coinsPrices(
      await this.cryptoService.defaultConversionCurrency(),
      symbols,
    );
  }

  @Get(':symbol/price')
  async coinPrices(@Param('symbol') symbol: string) {
    return this.cryptoService.coinPrices(
      symbol,
      await this.cryptoService.defaultConversionCurrency(),
    );
  }

  @Get(':symbol/history/:period')
  async history(
    @Param('symbol') symbol: string,
    @Param('period', new ParseEnumPipe(HistoryPeriod)) period: HistoryPeriod,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('aggregate', ParseIntPipe) aggregate?: number,
  ) {
    return this.cryptoService.coinHistory(
      symbol,
      await this.cryptoService.defaultConversionCurrency(),
      period,
      limit,
      aggregate,
    );
  }

  @Get(':symbol/articles')
  async articles(@Param('symbol') symbol: string, @Query('lang') lang: string) {
    return this.cryptoService.coinArticles(symbol, lang);
  }

  @Get(':symbol/social')
  async socialStats(@Param('symbol') symbol: string) {
    return this.cryptoService.coinSocialStats(symbol);
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

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    return await this.cryptoService.findMany({ crudQuery });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.cryptoService.findOne(id);
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
