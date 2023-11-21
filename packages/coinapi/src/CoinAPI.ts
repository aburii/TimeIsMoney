import { CryptoCompareClient } from "@timeismoney/cryptocompare";

export interface OHLV {
  open: number;
  high: number;
  low: number;
  volume: number;
  change?: number;
  changePercent?: number;
}

export interface OHLCV extends OHLV {
  close: number;
}

export interface CoinSummary {
  fullname: string;
  imageUrl: string;
  symbol: string;
}

export interface CoinStatus {
  currentPrice: number;
  dayCandle: OHLV;
  hourCandle: OHLV;
  last24hCandle: OHLV;
}

export interface CoinsStatus {
  [symbol: string]: CoinStatus;
}

export interface CoinDetails extends CoinSummary {
  status: CoinStatus;
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

  async coinSummary(coinSymbol: string): Promise<CoinSummary | undefined> {
    const coins = await this.client.coinList({
      fsym: coinSymbol,
      summary: true,
    });

    for (const sym in coins) {
      const coin = coins[sym];
      return {
        fullname: coin.FullName,
        imageUrl: `https://www.cryptocompare.com/${coin.ImageUrl}`,
        symbol: sym,
      };
    }
    return undefined;
  }

  async coinsStatus(
    coinsID: string[],
    destSymbols: string[] = ["EUR"]
  ): Promise<CoinsStatus> {
    const data = await this.client.coinFullData({
      fsyms: coinsID,
      tsyms: destSymbols,
    });

    const status: CoinsStatus = {};
    for (const coinSymbol in data.RAW) {
      for (const destSymbol in data.RAW[coinSymbol]) {
        const priceData = data.RAW[coinSymbol][destSymbol];

        status[coinSymbol] = {
          currentPrice: priceData.PRICE,
          dayCandle: {
            open: priceData.OPENDAY,
            high: priceData.HIGHDAY,
            low: priceData.LOWDAY,
            volume: priceData.VOLUMEDAY,
            change: priceData.CHANGEDAY,
            changePercent: priceData.CHANGEPCTDAY,
          },
          hourCandle: {
            open: priceData.OPENHOUR,
            high: priceData.HIGHHOUR,
            low: priceData.LOWHOUR,
            volume: priceData.VOLUMEHOUR,
            change: priceData.CHANGEHOUR,
            changePercent: priceData.CHANGEPCTHOUR,
          },
          last24hCandle: {
            open: priceData.OPEN24HOUR,
            high: priceData.HIGH24HOUR,
            low: priceData.LOW24HOUR,
            volume: priceData.VOLUME24HOUR,
            change: priceData.CHANGE24HOUR,
            changePercent: priceData.CHANGEPCT24HOUR,
          },
        };
      }
    }
    return status;
  }
}
