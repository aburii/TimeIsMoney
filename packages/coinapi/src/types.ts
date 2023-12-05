export interface OHLV {
  open: number;
  high: number;
  low: number;
  volume: number;
  volumeCoin: number;
  change?: number;
  changePercent?: number;
}

export interface OHLCV extends OHLV {
  time: number;
  timeIso: string;
  close: number;
}

export enum HistoryPeriod {
  Daily = "day",
  Hourly = "hour",
  Minute = "minute",
}

export interface CoinHistory {
  period: HistoryPeriod;
  timeFrom: number;
  timeFromIso: string;
  timeTo: number;
  timeToIso: string;
  history: OHLCV[];
}

/// Price of a coin in a symbol (ex: BTC -> EUR)
export interface CoinSymbolPrices {
  currentPrice: number;
  dayCandle: OHLV;
  hourCandle: OHLV;
  last24hCandle: OHLV;
  marketCap: number;
  totalVolume: number;
}

/// Price of a coin in multiple symbols (ex: BTC -> EUR,USD)
export interface CoinSymbolsPrices {
  [symbol: string]: CoinSymbolPrices;
}

/// Price of multiple coins in multiple symbols (ex: BTC,ETH -> EUR,USD)
export interface MultiCoinsPrices {
  [coinSymbol: string]: CoinSymbolsPrices;
}

export interface CoinInformationsShort {
  id: number;
  fullname: string;
  symbol: string;
  imageUrl: string;
}

export interface CoinInformations extends CoinInformationsShort {
  maxSupply: number;
  coinName: string;
  description: string;
  launchDate: string;
  website: string;
  whitepaper: string;
}

export interface CoinSocialStats {}

export interface ArticleSource {
  name: string;
  img: string;
  lang: string;
}

export interface Article {
  id: string;
  guid: string;
  publishedOn: number;
  imageUrl: string;
  title: string;
  url: string;
  body: string;
  tags: string;
  lang: string;
  upvotes: string;
  downvotes: string;
  categories: string;
  source: ArticleSource;
  sourceName: string;
}

export interface BaseSocialStats {
  points: number;
}

export interface BaseSocialNetworkStats extends BaseSocialStats {
  name: string;
  link: string;
}

export interface GeneralSocialStats extends BaseSocialStats {
  Name: string;
  CoinName: string;
  Type: string;
}

export interface CryptoCompareStats extends BaseSocialStats {
  comments: number;
  posts: number;
  followers: number;
}

export interface TwitterStats extends BaseSocialNetworkStats {
  followers: number;
  following: number;
  lists: number;
  favourites: number;
  statuses: number;
  createdAt: string;
}

export interface RedditStats extends BaseSocialNetworkStats {
  subscribers: number;
  activeUsers: number;
  postsPerHour: number;
  commentsPerHour: number;
  postsPerDay: number;
  commentsPerDay: number;
  createdAt: string;
}

export interface CodeRepository {
  stars: number;
  forks: number;
  subscribers: number;
  contributors: number;
  size: number;
  openIssues: number;
  closedIssues: number;
  openPullIssues: number;
  closedPullIssues: number;
  openTotalIssues: number;
  closedTotalIssues: number;
  lastUpdate: string;
  lastPush: string;
  url: string;
  isFork: boolean;
  createdAt: string;
}

export interface CodeRepositoriesStats extends BaseSocialStats {
  repositories: CodeRepository[];
}

export interface SocialStats {
  general: GeneralSocialStats;
  cryptoCompare: CryptoCompareStats;
  twitter: TwitterStats;
  reddit: RedditStats;
  codeRepositories: CodeRepositoriesStats;
}
