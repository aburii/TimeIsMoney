import { Injectable } from '@nestjs/common';
import {
  CoinAPI,
  CoinSummary,
  CoinDetails,
  CoinStatus,
} from '@timeismoney/coinapi';
import { PrismaService } from '@timeismoney/models';

@Injectable()
export class CryptoService {
  private readonly coinAPI: CoinAPI = new CoinAPI(process.env.API_KEY);

  constructor(private prisma: PrismaService) {}

  async listRegisteredCurrencies(): Promise<{ [symbol: string]: CoinDetails }> {
    const response: { [symbol: string]: CoinDetails } = {};
    const tsym = 'EUR'; // TODO: user currency
    const currencies = await this.prisma.currency.findMany({
      where: { is_crypto: { equals: true } },
    });

    const fsyms: string[] = currencies.reduce((symbols: string[], currency) => {
      response[currency.api_id] = {
        fullname: currency.name,
        imageUrl: currency.image_url,
        symbol: currency.symbol,
        status: {} as CoinStatus,
      };
      symbols.push(currency.api_id);
      return symbols;
    }, []);

    const coinsStatus = await this.coinAPI.coinsStatus(fsyms, [tsym]);
    for (const coinSymbol in coinsStatus)
      response[coinSymbol].status = coinsStatus[coinSymbol];

    return response;
  }

  async registerCryptoCurrency(symbol: string) {
    const coinSummary = await this.coinAPI.coinSummary(symbol);
    return await this.prisma.currency.create({
      data: {
        name: coinSummary.fullname,
        symbol: coinSummary.symbol,
        api_id: coinSummary.symbol,
        is_crypto: true,
        image_url: coinSummary.imageUrl,
      },
    });
  }

  async listAvailableCurrencies() {
    return this.coinAPI.listCoins();
  }
}
