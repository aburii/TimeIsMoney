import { CryptoCompareClient } from "@timeismoney/cryptocompare";
import * as cc from "@timeismoney/cryptocompare";
import * as types from "./types";

function convertTimestampToISODate(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const isoDate = date.toISOString();
  return isoDate;
}

export class CoinAPI {
  client: CryptoCompareClient;

  constructor(apiKey: string) {
    this.client = new CryptoCompareClient(apiKey);
  }

  private convertCCCoinInformationShort(
    coin: cc.CoinInformationShort
  ): types.CoinInformationsShort {
    return {
      id: coin.Id,
      fullname: coin.FullName,
      imageUrl: `https://www.cryptocompare.com/${coin.ImageUrl}`,
      symbol: coin.Symbol,
    };
  }

  private convertCCCoinInformation(
    coin: cc.CoinInformation
  ): types.CoinInformations {
    const short = this.convertCCCoinInformationShort(coin);
    return {
      ...short,
      maxSupply: coin.MaxSupply,
      coinName: coin.CoinName,
      description: coin.Description,
      launchDate: coin.AssetLaunchDate,
      website: coin.AssetWebsiteUrl,
      whitepaper: coin.AssetWhitepaperUrl,
    };
  }

  private convertCCCoinPriceFullRaw(
    coinPrice: cc.CoinPriceFullRaw
  ): types.CoinSymbolPrices {
    return {
      currentPrice: coinPrice.PRICE,
      marketCap: coinPrice.MKTCAP,
      totalVolume: coinPrice.SUPPLY,
      dayCandle: {
        open: coinPrice.OPENDAY,
        high: coinPrice.HIGHDAY,
        low: coinPrice.LOWDAY,
        volume: coinPrice.VOLUMEDAY,
        volumeCoin: coinPrice.VOLUMEDAYTO,
        change: coinPrice.CHANGEDAY,
        changePercent: coinPrice.CHANGEPCTDAY,
      },
      hourCandle: {
        open: coinPrice.OPENHOUR,
        high: coinPrice.HIGHHOUR,
        low: coinPrice.LOWHOUR,
        volume: coinPrice.VOLUMEHOUR,
        volumeCoin: coinPrice.VOLUME24HOURTO,
        change: coinPrice.CHANGEHOUR,
        changePercent: coinPrice.CHANGEPCTHOUR,
      },
      last24hCandle: {
        open: coinPrice.OPEN24HOUR,
        high: coinPrice.HIGH24HOUR,
        low: coinPrice.LOW24HOUR,
        volume: coinPrice.VOLUME24HOUR,
        volumeCoin: coinPrice.VOLUME24HOURTO,
        change: coinPrice.CHANGE24HOUR,
        changePercent: coinPrice.CHANGEPCT24HOUR,
      },
    };
  }

  private convertCCOHLCV(ohlcv: cc.OHLCV): types.OHLCV {
    return {
      time: ohlcv.time,
      timeIso: convertTimestampToISODate(ohlcv.time),
      open: ohlcv.open,
      high: ohlcv.high,
      low: ohlcv.low,
      close: ohlcv.close,
      volume: ohlcv.volumefrom,
      volumeCoin: ohlcv.volumeto,
      change: ohlcv.close - ohlcv.open,
      changePercent: ((ohlcv.close - ohlcv.open) / ohlcv.open) * 100,
    };
  }

  private convertCCHistory(
    period: types.HistoryPeriod,
    history: cc.OHLCVHistory
  ): types.CoinHistory {
    return {
      period: period,
      timeFrom: history.TimeFrom,
      timeFromIso: convertTimestampToISODate(history.TimeFrom),
      timeTo: history.TimeTo,
      timeToIso: convertTimestampToISODate(history.TimeTo),
      history: history.Data.map(this.convertCCOHLCV),
    };
  }

  private convertCCArticle(article: cc.Article): types.Article {
    return {
      id: article.id,
      guid: article.guid,
      publishedOn: article.published_on,
      imageUrl: article.imageurl,
      title: article.title,
      url: article.url,
      body: article.body,
      tags: article.tags,
      lang: article.lang,
      upvotes: article.upvotes,
      downvotes: article.downvotes,
      categories: article.categories,
      source: {
        name: article.source_info.name,
        lang: article.source_info.lang,
        img: article.source_info.img,
      },
      sourceName: article.source,
    };
  }

  private convertCCGeneralStats(
    stats: cc.GeneralSocialStats
  ): types.GeneralSocialStats {
    return {
      points: stats.Points,
      Name: stats.Name,
      CoinName: stats.CoinName,
      Type: stats.Type,
    };
  }

  private convertCCStats(
    stats: cc.CryptoCompareStats
  ): types.CryptoCompareStats {
    return {
      points: stats.Points,
      comments: stats.Comments,
      posts: stats.Posts,
      followers: stats.Followers,
    };
  }

  private convertCCTwittterStats(stats: cc.TwitterStats): types.TwitterStats {
    return {
      points: stats.Points,
      link: stats.link,
      name: stats.name,
      followers: stats.followers,
      following: stats.following,
      lists: stats.lists,
      favourites: stats.favourites,
      statuses: stats.statuses,
      createdAt: stats.account_creation,
    };
  }

  private convertCCRedditStats(stats: cc.RedditStats): types.RedditStats {
    return {
      points: stats.Points,
      link: stats.link,
      name: stats.name,
      createdAt: stats.community_creation,
      subscribers: stats.subscribers,
      activeUsers: stats.active_users,
      postsPerHour: stats.posts_per_hour,
      commentsPerHour: stats.comments_per_hour,
      postsPerDay: stats.posts_per_day,
      commentsPerDay: stats.comments_per_day,
    };
  }

  private convertCCCodeRepository(
    repo: cc.CodeRepository
  ): types.CodeRepository {
    return {
      stars: repo.stars,
      forks: repo.forks,
      subscribers: repo.subscribers,
      contributors: repo.contributors,
      size: repo.size,
      openIssues: repo.open_issues,
      closedIssues: repo.closed_issues,
      openPullIssues: repo.open_pull_issues,
      closedPullIssues: repo.closed_pull_issues,
      openTotalIssues: repo.open_total_issues,
      closedTotalIssues: repo.closed_total_issues,
      lastUpdate: repo.last_update,
      lastPush: repo.last_push,
      url: repo.url,
      isFork: repo.fork,
      createdAt: repo.created_at,
    };
  }

  private convertCCCodeRepositories(
    stats: cc.CodeRepositoriesStats
  ): types.CodeRepositoriesStats {
    return {
      points: stats.Points,
      repositories: stats.List.map(this.convertCCCodeRepository),
    };
  }

  private convertCCSocialStats(stats: cc.SocialStats): types.SocialStats {
    return {
      general: this.convertCCGeneralStats(stats.General),
      cryptoCompare: this.convertCCStats(stats.CryptoCompare),
      twitter: this.convertCCTwittterStats(stats.Twitter),
      reddit: this.convertCCRedditStats(stats.Reddit),
      codeRepositories: this.convertCCCodeRepositories(stats.CodeRepository),
    };
  }

  async listCoins(): Promise<types.CoinInformationsShort[]> {
    const coins: cc.CoinsInformationsShort = await this.client.coinList({
      summary: true,
    });
    const informations: types.CoinInformationsShort[] = [];

    for (const sym in coins) {
      const coin = coins[sym];
      informations.push(this.convertCCCoinInformationShort(coin));
    }
    return informations;
  }

  async coinInformationsShort(
    coinSymbol: string
  ): Promise<types.CoinInformationsShort | undefined> {
    const coins: cc.CoinsInformationsShort = await this.client.coinList({
      fsym: coinSymbol,
      summary: true,
    });

    for (const sym in coins) {
      const coin = coins[sym];
      return this.convertCCCoinInformationShort(coin);
    }
    return undefined;
  }

  async coinInformations(
    coinSymbol: string
  ): Promise<types.CoinInformations | undefined> {
    const coins = (await this.client.coinList({
      fsym: coinSymbol,
      summary: false,
    })) as cc.CoinsInformations;

    for (const sym in coins) {
      const coin = coins[sym];
      return this.convertCCCoinInformation(coin);
    }
    return undefined;
  }

  async coinsPrices(
    coinSymbols: string[],
    destSymbols: string[] = ["EUR"]
  ): Promise<types.MultiCoinsPrices> {
    const data = await this.client.coinFullData({
      fsyms: coinSymbols,
      tsyms: destSymbols,
    });

    const prices: types.MultiCoinsPrices = {};
    for (const coinSymbol in data.RAW) {
      prices[coinSymbol] = {};
      for (const destSymbol in data.RAW[coinSymbol]) {
        prices[coinSymbol][destSymbol] = this.convertCCCoinPriceFullRaw(
          data.RAW[coinSymbol][destSymbol]
        );
      }
    }
    return prices;
  }

  async coinSymbolsPrices(
    coinSymbol: string,
    destSymbols: string[] = ["EUR"]
  ): Promise<types.CoinSymbolsPrices> {
    return (await this.coinsPrices([coinSymbol], destSymbols))[coinSymbol];
  }

  async coinSymbolPrices(
    coinSymbol: string,
    destSymbols: string = "EUR"
  ): Promise<types.CoinSymbolPrices> {
    return (await this.coinSymbolsPrices(coinSymbol, [destSymbols]))[
      destSymbols
    ];
  }

  async coinHistory(
    coinSymbol: string,
    destSymbol: string,
    period: types.HistoryPeriod = types.HistoryPeriod.Daily,
    limit: number = 30,
    aggregate: number = 1
  ): Promise<types.CoinHistory> {
    const history = await this.client.history(period, {
      fsym: coinSymbol,
      tsym: destSymbol,
      aggregate: aggregate,
      limit: limit,
    });
    return this.convertCCHistory(period, history);
  }

  async newsArticles(params?: {
    // Default: ALL_NEWS_FEEDS
    feeds?: string[];
    // Default: ALL_NEWS_CATEGORIES
    categories?: string[];
    // Default: NO_EXCLUDED_NEWS_CATEGORIES
    excludeCategories?: string[];
    // Default: 0
    lTs?: number;
    // Default: EN
    lang: string;
    // Default: latest
    sortOrder: "latest" | "popular";
  }): Promise<types.Article[]> {
    const articles = await this.client.newsList(params);
    return articles.map(this.convertCCArticle);
  }

  async latestArticles(
    categories?: string[],
    lang: string = "EN"
  ): Promise<types.Article[]> {
    return this.newsArticles({
      categories: categories,
      lang: lang,
      sortOrder: "latest",
    });
  }

  async coinArticles(
    coinSymbol: string,
    lang: string = "EN"
  ): Promise<types.Article[]> {
    return this.latestArticles([coinSymbol], lang);
  }

  async coinSocialStats(coinId?: number): Promise<types.SocialStats> {
    const socialStats = await this.client.coinSocialStats({ coinId: coinId });
    return this.convertCCSocialStats(socialStats);
  }
}
