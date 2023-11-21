import { CryptoCompareClient } from "@timeismoney/cryptocompare";

export interface OHLC {
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CoinSummary {
  fullname: string;
  imageUrl: string;
  symbol: string;
}

export class CoinAPI {
  client: CryptoCompareClient;

  constructor(apiKey: string) {
    this.client = new CryptoCompareClient(apiKey);
  }

  async listCoins(): Promise<CoinSummary[]> {
    const coins = await this.client.coinList({ summary: true });
    const summaries: CoinSummary[] = [];

    for (const sym in coins) {
      const coin = coins[sym];
      summaries.push({
        fullname: coin.FullName,
        imageUrl: `https://www.cryptocompare.com/${coin.ImageUrl}`,
        symbol: sym,
      });
    }
    return summaries;
  }
}
