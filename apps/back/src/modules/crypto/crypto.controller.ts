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
} from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { HistoryPeriod } from '@timeismoney/coinapi';
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

  @Get('api-currencies')
  async listApiCurrencies() {
    return this.cryptoService.listApiCurrencies();
  }

  @Post('register/:symbol')
  async registerCryptoCurrency(@Param('symbol') symbol: string) {
    return this.cryptoService.registerCryptoCurrency(symbol);
  }

  @Get('details/:symbol')
  async details(@Param('symbol') symbol: string) {
    return this.cryptoService.coinDetails(symbol);
  }

  @Get('prices')
  async prices(
    @Query('symbols', new ParseArrayPipe({ items: String, separator: ',' }))
    symbols: string[],
  ) {
    return this.cryptoService.coinsPrices(
      await this.cryptoService.defaultConversionCurrency(),
      symbols,
    );
  }

  @Get('prices/:symbol')
  async coinPrices(@Param('symbol') symbol: string) {
    return this.cryptoService.coinPrices(
      symbol,
      await this.cryptoService.defaultConversionCurrency(),
    );
  }

  @Get(':symbol/history/:period')
  async history(
    @Param('symbol') symbol: string,
    @Param('period') period: HistoryPeriod,
  ) {
    return this.cryptoService.coinHistory(
      symbol,
      await this.cryptoService.defaultConversionCurrency(),
      period,
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
}
