import { Injectable } from '@nestjs/common';
import {
  Article,
  CoinAPI,
  CoinHistory,
  CoinInformations,
  CoinInformationsShort,
  CoinSymbolPrices,
  HistoryPeriod,
  MultiCoinsPrices,
  SocialStats,
} from '@timeismoney/coinapi';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { Currency } from '@prisma/client';
import { CoinApiService } from '../coinapi/coinapi.service';

@Injectable()
export class CryptoService extends PrismaCrudService {
  constructor(private readonly coinAPI: CoinApiService) {
    super({
      model: 'currency',
      allowedJoins: [],
      defaultJoins: [],
    });
  }

  get prisma() {
    return PrismaCrudService.prismaClient;
  }

  override async findOne(id: number): Promise<Currency | null> {
    return this.prisma.currency.findFirst({
      where: {
        id,
      },
    });
  }

  async findOneByApiId(api_id: number): Promise<Currency | undefined> {
    return this.prisma.currency.findFirst({
      where: {
        api_id: api_id,
      },
    });
  }

  async findOneBySymbol(symbol: string): Promise<Currency | undefined> {
    return this.prisma.currency.findFirst({
      where: {
        symbol: symbol,
      },
    });
  }

  async conversionCurrencies(): Promise<Currency[]> {
    return this.prisma.currency.findMany({
      where: {
        is_crypto: false,
      },
    });
  }

  async cryptoCurrencies(): Promise<Currency[]> {
    return this.prisma.currency.findMany({
      where: {
        is_crypto: true,
      },
    });
  }

  defaultConversionCurrency(): Promise<Currency> {
    return this.prisma.currency.findFirst({
      where: { is_crypto: false, symbol: 'EUR' },
    });
  }

  async registerCurrency(symbol: string) {
    const coinInfos = await this.coinAPI.client.coinInformationsShort(symbol);
    return await this.prisma.currency.create({
      data: {
        name: coinInfos.fullname,
        symbol: coinInfos.symbol,
        api_id: +coinInfos.id,
        is_crypto: !coinInfos.is_fiat,
        image_url: coinInfos.imageUrl,
      },
    });
  }

  async listApiFiatCurrencies() {
    return this.coinAPI.client.listFiats();
  }

  async listApiCurrencies() {
    return this.coinAPI.client.listCoins();
  }

  async coinSummary(symbol: string): Promise<CoinInformationsShort> {
    return this.coinAPI.client.coinInformationsShort(symbol);
  }

  async coinDetails(symbol: string): Promise<CoinInformations> {
    return this.coinAPI.client.coinInformations(symbol);
  }

  async coinPrices(
    symbol: string,
    destSymbol: Currency,
  ): Promise<CoinSymbolPrices> {
    return this.coinAPI.client.coinSymbolPrices(symbol, destSymbol.symbol);
  }

  async coinsPrices(
    destSymbol: Currency,
    coinsSymbols?: string[],
  ): Promise<MultiCoinsPrices> {
    const registered = await this.cryptoCurrencies();
    if (!coinsSymbols) {
      coinsSymbols = registered.map((coin: Currency) => coin.symbol);
    } else {
      coinsSymbols = coinsSymbols.filter(
        (sym) => this.findOneBySymbol(sym) !== undefined,
      );
    }
    return this.coinAPI.client.coinsPrices(coinsSymbols, [destSymbol.symbol]);
  }

  async coinHistory(
    symbol: string,
    dest: Currency,
    period: HistoryPeriod,
    limit?: number,
    aggregate: number = 1,
  ): Promise<CoinHistory> {
    if (limit === undefined) limit = period == HistoryPeriod.Hourly ? 48 : 60;
    return this.coinAPI.client.coinHistory(
      symbol,
      dest.symbol,
      period,
      limit,
      aggregate,
    );
  }

  async coinArticles(symbol: string, lang?: string): Promise<Article[]> {
    return this.coinAPI.client.coinArticles(symbol, lang);
  }

  async coinSocialStats(symbol: string): Promise<SocialStats> {
    const coin = await this.findOneBySymbol(symbol);

    return this.coinAPI.client.coinSocialStats(coin.api_id);
  }
}
