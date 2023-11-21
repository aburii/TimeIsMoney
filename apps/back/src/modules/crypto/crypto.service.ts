import { Injectable } from '@nestjs/common';
import { CoinAPI, CoinSummary } from '@timeismoney/coinapi';

@Injectable()
export class CryptoService {
  private readonly coinAPI: CoinAPI = new CoinAPI(process.env.API_KEY);

  async listAll(): Promise<CoinSummary[]> {
    return this.coinAPI.listCoins();
  }
}
