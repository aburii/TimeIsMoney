import { CryptoCompareClient } from "@timeismoney/cryptocompare";
import { Cache } from "cache-manager";
import * as cc from "@timeismoney/cryptocompare";
import * as types from "./types";

function convertTimestampToISODate(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const isoDate = date.toISOString();
  return isoDate;
}

const TTL_SECOND = 1000;
const TTL_MINUTE = TTL_SECOND * 60;
const TTL_HOUR = TTL_MINUTE * 60;
const TTL_DAY = TTL_HOUR * 24;
const TTL_WEEK = TTL_DAY * 7;

export class CoinAPI {
  client: CryptoCompareClient;
  cacheManager?: Cache;
  private onlyCache?: boolean;

  constructor(apiKey: string, cacheManager?: Cache) {
    this.client = new CryptoCompareClient(apiKey);
    this.cacheManager = cacheManager;
    this.onlyCache = false;
  }

  private convertCCCoinInformationShort(
    coin: cc.CoinInformationShort
  ): types.CoinInformationsShort {
    return {
      is_fiat: false,
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
      id: +article.id,
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

  private convertCCAssetSummaryToCoinShort(
    assetSummary: cc.AssetSummary
  ): types.CoinInformationsShort {
    return {
      id: assetSummary.ID,
      symbol: assetSummary.SYMBOL,
      fullname: assetSummary.NAME,
      imageUrl: assetSummary.LOGO_URL,
      is_fiat: assetSummary.ASSET_TYPE == cc.AssetType.Fiat,
    };
  }

  private cacheKey(fctName: string, ...args: any[]): string {
    return `CoinAPI-${fctName}${args.length > 0 ? `-${args.join("-")}` : ""}`;
  }

  private cacheValue<DataType>(key: string, value: DataType, ttl?: number) {
    if (this.cacheManager) this.cacheManager.set(key, value, ttl);
  }

  private async cachedValue<DataType>(
    key: string,
    callback: () => Promise<DataType>,
    ttl?: number
  ): Promise<DataType | undefined> {
    if (!this.cacheManager) return callback();
    const cached = await this.cacheManager.get<DataType>(key);
    if (cached) return cached;
    else {
      if (this.onlyCache) return undefined;
      const value = await callback();
      this.cacheValue(key, value, ttl);
      return value;
    }
  }

  private static cached(cacheDuration: number) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any[]) {
        const coinApi = this as CoinAPI;

        return coinApi.cachedValue(
          coinApi.cacheKey(propertyKey, args),
          async () => {
            return originalMethod.apply(coinApi, args);
          },
          cacheDuration
        );
      };
      return descriptor;
    };
  }

  @CoinAPI.cached(TTL_WEEK)
  async listFiats(): Promise<types.CoinInformationsShort[]> {
    const fiats = await this.client.fiatList();

    return fiats.map(this.convertCCAssetSummaryToCoinShort);
  }

  @CoinAPI.cached(TTL_WEEK)
  async coinInformationsShort(
    symbol: string
  ): Promise<types.CoinInformationsShort> {
    return this.convertCCAssetSummaryToCoinShort(
      await this.client.getAssetBySymbol({ asset_symbol: symbol })
    );
  }

  @CoinAPI.cached(TTL_WEEK)
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

  @CoinAPI.cached(TTL_WEEK)
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

  // Custom cache
  async coinsPrices(
    coinSymbols: string[],
    destSymbols: string[] = ["EUR"]
  ): Promise<types.MultiCoinsPrices> {
    const result: types.MultiCoinsPrices = {};
    const notCachedCoins: Set<string> = new Set();
    const notCachedDests: Set<string> = new Set();

    for (const coinSym of coinSymbols) {
      for (const destSym of destSymbols) {
        this.onlyCache = true;
        const coinSymPrices = await this.coinSymbolPrices(coinSym, destSym);
        this.onlyCache = false;
        if (coinSymPrices === undefined) {
          notCachedCoins.add(coinSym);
          notCachedDests.add(destSym);
        } else {
          if (!(coinSym in result)) result[coinSym] = {};
          result[coinSym][destSym] = coinSymPrices;
        }
      }
    }

    if (notCachedCoins.size > 0) {
      const data = await this.client.coinFullData({
        fsyms: Array.from(notCachedCoins),
        tsyms: Array.from(notCachedDests),
      });

      for (const coinSymbol in data.RAW) {
        if (!(coinSymbol in result)) result[coinSymbol] = {};
        for (const destSymbol in data.RAW[coinSymbol]) {
          const coinSymPrices = this.convertCCCoinPriceFullRaw(
            data.RAW[coinSymbol][destSymbol]
          );
          this.cacheValue(
            this.cacheKey("coinSymbolPrices", coinSymbol, destSymbol),
            coinSymPrices,
            TTL_MINUTE
          );
          result[coinSymbol][destSymbol] = coinSymPrices;
        }
      }
    }
    return result;
  }

  // Cached in coinsPrices
  async coinSymbolsPrices(
    coinSymbol: string,
    destSymbols: string[] = ["EUR"]
  ): Promise<types.CoinSymbolsPrices> {
    return (await this.coinsPrices([coinSymbol], destSymbols))[coinSymbol];
  }

  // Cached in coinsPrices
  @CoinAPI.cached(TTL_MINUTE)
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
    // Define cache key
    const cacheKey = this.cacheKey(
      "coinHistory",
      coinSymbol,
      destSymbol,
      period
    );

    // If we have a cache Manager we try to avoid an api call
    if (this.cacheManager) {
      const cached = await this.cacheManager.get<types.CoinHistory>(cacheKey);
      if (cached) {
        console.log(cached.history.length);
        if (cached.history.length >= limit) {
          return cached;
        }
      }
    }

    // If we are here, we don't have the value cached so we fetch it
    const history = await this.client.history(period, {
      fsym: coinSymbol,
      tsym: destSymbol,
      aggregate: aggregate,
      limit: limit,
    });
    const convertedHistory = this.convertCCHistory(period, history);

    // Cache the new value
    if (this.cacheManager) {
      const deltaTime =
        convertedHistory.history[1].time - convertedHistory.history[0].time;
      const ttl =
        deltaTime - (new Date().getTime() / 1000 - convertedHistory.timeTo);
      this.cacheValue(cacheKey, convertedHistory, ttl * 1000);
    }
    return convertedHistory;
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

  @CoinAPI.cached(TTL_WEEK)
  async newsFeeds(): Promise<types.Feed[]> {
    return this.client.newsFeeds();
  }

  @CoinAPI.cached(TTL_WEEK)
  async newsCategories(): Promise<types.Category[]> {
    return this.client.newsCategories();
  }

  @CoinAPI.cached(TTL_WEEK)
  async newsFeedsAndCategories(): Promise<types.FeedsAndCategories> {
    return this.client.newsFeedsAndCategories();
  }

  @CoinAPI.cached(TTL_HOUR)
  async coinArticles(
    coinSymbol: string,
    lang: string = "EN"
  ): Promise<types.Article[]> {
    return this.latestArticles([coinSymbol], lang);
  }

  @CoinAPI.cached(TTL_HOUR)
  async coinSocialStats(coinId?: number): Promise<types.SocialStats> {
    const socialStats = await this.client.coinSocialStats({ coinId: coinId });
    return this.convertCCSocialStats(socialStats);
  }
}
