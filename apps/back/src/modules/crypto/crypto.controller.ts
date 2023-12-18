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
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { HistoryPeriod } from '@timeismoney/coinapi';
import { CreateCurrencyDto, UpdateCurrencyDto } from '@timeismoney/dto';
import { PaginationInterceptor } from '../../interceptors/pagination.interceptor';
import { AccessGuard } from '../../guards/passport/jwt-at.guard';
import { IRequestUser } from '../../types/passport/request-user';
import { RequestUser } from '../../decorators/request-user.decorator';
import { Currency } from '@prisma/client';
import { UserService } from '../user/user.service';
import { BoGuard } from '../../guards/bo.guard';

@Controller('cryptos')
export class CryptoController {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly userService: UserService,
  ) {}

  private async userCurrency(user?: IRequestUser): Promise<Currency> {
    if (user === null || user === undefined)
      return this.cryptoService.defaultConversionCurrency();
    else {
      const userCurrency = (await this.userService.findOne(user.userId))
        .currencyId;
      if (userCurrency) return this.cryptoService.findOne(userCurrency);
      else return this.cryptoService.defaultConversionCurrency();
    }
  }

  @UseInterceptors(PaginationInterceptor)
  @Get('api-fiat-currencies')
  async listApiFiatCurrencies() {
    return this.cryptoService.listApiFiatCurrencies();
  }

  @UseInterceptors(PaginationInterceptor)
  @Get('api-currencies')
  async listApiCurrencies() {
    return this.cryptoService.listApiCurrencies();
  }

  @UseGuards(AccessGuard, BoGuard)
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

  @UseGuards(new AccessGuard(true))
  @Get('prices')
  async prices(
    @RequestUser() user: IRequestUser,
    @Query(
      'symbols',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    symbols: string[],
  ) {
    return this.cryptoService.coinsPrices(
      await this.userCurrency(user),
      symbols,
    );
  }

  @UseGuards(new AccessGuard(true))
  @Get(':symbol/price')
  async coinPrices(
    @RequestUser() user: IRequestUser,
    @Param('symbol') symbol: string,
  ) {
    return this.cryptoService.coinPrices(symbol, await this.userCurrency(user));
  }

  @Get(':symbol/prices')
  async coinSymbolsPrices(
    @Param('symbol') symbol: string,
    @Query(
      'symbols',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    symbols: string[],
  ) {
    return this.cryptoService.coinSymbolsPrices(symbol, symbols);
  }

  @UseGuards(new AccessGuard(true))
  @Get(':symbol/history/:period')
  async history(
    @RequestUser() user: IRequestUser,
    @Param('symbol') symbol: string,
    @Param('period', new ParseEnumPipe(HistoryPeriod)) period: HistoryPeriod,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('aggregate', ParseIntPipe) aggregate?: number,
  ) {
    return this.cryptoService.coinHistory(
      symbol,
      await this.userCurrency(user),
      period,
      limit,
      aggregate,
    );
  }

  @UseInterceptors(PaginationInterceptor)
  @Get(':symbol/articles')
  async articles(@Param('symbol') symbol: string, @Query('lang') lang: string) {
    return this.cryptoService.coinArticles(symbol, lang);
  }

  @Get(':symbol/social')
  async socialStats(@Param('symbol') symbol: string) {
    return this.cryptoService.coinSocialStats(symbol);
  }

  @UseGuards(AccessGuard, BoGuard)
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

  @UseGuards(AccessGuard, BoGuard)
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

  @UseGuards(AccessGuard, BoGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.cryptoService.remove(id, { crudQuery });
  }
}
