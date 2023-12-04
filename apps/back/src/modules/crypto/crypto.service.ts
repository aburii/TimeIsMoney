import { Injectable } from '@nestjs/common';
import { CoinAPI, MultiCoinsPrices } from '@timeismoney/coinapi';
import { PrismaCrudService } from 'nestjs-prisma-crud';

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

  async registerCryptoCurrency(symbol: string) {
    const coinInfos = await this.coinAPI.coinInformationsShort(symbol);
    return await this.prisma.currency.create({
      data: {
        name: coinInfos.fullname,
        symbol: coinInfos.symbol,
        api_id: coinInfos.symbol,
        is_crypto: true,
        image_url: coinInfos.imageUrl,
      },
    });
  }

  async listApiCurrencies() {
    return this.coinAPI.listCoins();
  }
}
