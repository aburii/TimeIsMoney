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

@Injectable()
export class CryptoService extends PrismaCrudService {
  private readonly coinAPI: CoinAPI = new CoinAPI(process.env.API_KEY);

  constructor() {
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
    const coinInfos = await this.coinAPI.coinInformationsShort(symbol);
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
    return this.coinAPI.listFiats();
  }

  async listApiCurrencies() {
    return this.coinAPI.listCoins();
  }

  async coinSummary(symbol: string): Promise<CoinInformationsShort> {
    return this.coinAPI.coinInformationsShort(symbol);
  }

  async coinDetails(symbol: string): Promise<CoinInformations> {
    return this.coinAPI.coinInformations(symbol);
  }

  async coinPrices(
    symbol: string,
    destSymbol: Currency,
  ): Promise<CoinSymbolPrices> {
    return this.coinAPI.coinSymbolPrices(symbol, destSymbol.symbol);
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
    return this.coinAPI.coinsPrices(coinsSymbols, [destSymbol.symbol]);
  }

  async coinHistory(
    symbol: string,
    dest: Currency,
    period: HistoryPeriod,
  ): Promise<CoinHistory> {
    const limit = period == HistoryPeriod.Hourly ? 48 : 60;
    return this.coinAPI.coinHistory(symbol, dest.symbol, period, limit);
  }

  async coinArticles(symbol: string, lang?: string): Promise<Article[]> {
    return this.coinAPI.coinArticles(symbol, lang);
  }

  async coinSocialStats(symbol: string): Promise<SocialStats> {
    const coin = await this.findOneBySymbol(symbol);

    return this.coinAPI.coinSocialStats(coin.api_id);
  }
}
