export interface ApiResponse<DataType> {
  Response: "Success" | "Error";
  Message: string;
  Data: DataType;
  RateLimit: any;
  HasWarning: boolean;
  Type: number;
}

export interface CoinInformationShort {
  Id: number;
  ImageUrl: string;
  Symbol: string;
  FullName: string;
}

export interface CoinsInformationsShort {
  [symbol: string]: CoinInformationShort;
}

export interface CoinInformation extends CoinInformationShort {
  Url: string;
  ContentCreatedOn: number;
  Name: string;
  CoinName: string;
  Description: string;
  AssetTokenStatus: string;
  Algorithm: string;
  ProofType: string;
  SortOrder: string;
  Sponsored: boolean;
  Taxonomy: Object;
  Rating: Object;
  IsTrading: boolean;
  TotalCoinsMined: number;
  CirculatingSupply: number;
  BlockNumber: number;
  NetHashesPerSecond: number;
  BlockReward: number;
  BlockTime: number;
  AssetLaunchDate: string;
  AssetWhitepaperUrl: string;
  AssetWebsiteUrl: string;
  MaxSupply: number;
  MktCapPenalty: number;
  IsUsedInDefi: number;
  IsUsedInNft: number;
  PlatformType: string;
  DecimalPoints: number;
  AlgorithmType: string;
  Difficulty: number;
}

export interface CoinsInformations {
  [symbol: string]: CoinInformation;
}

export interface CoinPriceFullRaw {
  TYPE: string;
  MARKET: string;
  FROMSYMBOL: string;
  TOSYMBOL: string;
  FLAGS: string;
  LASTMARKET: string;
  MEDIAN: number;
  TOPTIERVOLUME24HOUR: number;
  TOPTIERVOLUME24HOURTO: number;
  LASTTRADEID: number;
  PRICE: number;
  LASTUPDATE: number;
  LASTVOLUME: number;
  LASTVOLUMETO: number;
  VOLUMEHOUR: number;
  VOLUMEHOURTO: number;
  OPENHOUR: number;
  HIGHHOUR: number;
  LOWHOUR: number;
  VOLUMEDAY: number;
  VOLUMEDAYTO: number;
  OPENDAY: number;
  HIGHDAY: number;
  LOWDAY: number;
  VOLUME24HOUR: number;
  VOLUME24HOURTO: number;
  OPEN24HOUR: number;
  HIGH24HOUR: number;
  LOW24HOUR: number;
  CHANGE24HOUR: number;
  CHANGEPCT24HOUR: number;
  CHANGEDAY: number;
  CHANGEPCTDAY: number;
  CHANGEHOUR: number;
  CHANGEPCTHOUR: number;
  CONVERSIONTYPE: string;
  CONVERSIONSYMBOL: string;
  CONVERSIONLASTUPDATE: number;
  SUPPLY: number;
  MKTCAP: number;
  MKTCAPPENALTY: number;
  CIRCULATINGSUPPLY: number;
  CIRCULATINGSUPPLYMKTCAP: number;
  TOTALVOLUME24H: number;
  TOTALVOLUME24HTO: number;
  TOTALTOPTIERVOLUME24H: number;
  TOTALTOPTIERVOLUME24HTO: number;
  IMAGEURL: string;
}

export interface CoinPriceFullDisplay {
  FROMSYMBOL: string;
  TOSYMBOL: string;
  MARKET: string;
  LASTMARKET: string;
  TOPTIERVOLUME24HOUR: string;
  TOPTIERVOLUME24HOURTO: string;
  LASTTRADEID: string;
  PRICE: string;
  LASTUPDATE: string;
  LASTVOLUME: string;
  LASTVOLUMETO: string;
  VOLUMEHOUR: string;
  VOLUMEHOURTO: string;
  OPENHOUR: string;
  HIGHHOUR: string;
  LOWHOUR: string;
  VOLUMEDAY: string;
  VOLUMEDAYTO: string;
  OPENDAY: string;
  HIGHDAY: string;
  LOWDAY: string;
  VOLUME24HOUR: string;
  VOLUME24HOURTO: string;
  OPEN24HOUR: string;
  HIGH24HOUR: string;
  LOW24HOUR: string;
  CHANGE24HOUR: string;
  CHANGEPCT24HOUR: string;
  CHANGEDAY: string;
  CHANGEPCTDAY: string;
  CHANGEHOUR: string;
  CHANGEPCTHOUR: string;
  CONVERSIONTYPE: string;
  CONVERSIONSYMBOL: string;
  CONVERSIONLASTUPDATE: string;
  SUPPLY: string;
  MKTCAP: string;
  MKTCAPPENALTY: string;
  CIRCULATINGSUPPLY: string;
  CIRCULATINGSUPPLYMKTCAP: string;
  TOTALVOLUME24H: string;
  TOTALVOLUME24HTO: string;
  TOTALTOPTIERVOLUME24H: string;
  TOTALTOPTIERVOLUME24HTO: string;
  IMAGEURL: string;
}

export interface CoinPriceFullMulti {
  RAW: {
    [fsymbol: string]: {
      [tsymbol: string]: CoinPriceFullRaw;
    };
  };
  DISPLAY: {
    [fsymbol: string]: {
      [tsymbol: string]: CoinPriceFullDisplay;
    };
  };
}

export interface OHLCV {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number;
  conversionType: string;
  conversionSymbol: string;
}

export interface OHLCVHistory {
  Aggregated: boolean;
  TimeFrom: number;
  TimeTo: number;
  Data: OHLCV[];
}

export interface BaseSocialStats {
  Points: number;
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

export interface CryptoCompareSimilarItem {
  Id: number;
  Name: string;
  FullName: string;
  ImageUrl: string;
  Url: string;
  FollowingType: string;
}

export interface CryptoComparePageView {
  Overview: number;
  Markets: number;
  Analysis: number;
  Charts: number;
  Trades: number;
  Orderbook: number;
  Forum: number;
  Influence: number;
  News: number;
  Timeline: number;
}

export interface CryptoCompareStats extends BaseSocialStats {
  SimilarItems: CryptoCompareSimilarItem[];
  Comments: number;
  Posts: number;
  Followers: number;
  PageViewsSplit: CryptoComparePageView;
  PageViews: number;
}

export interface TwitterStats extends BaseSocialNetworkStats {
  followers: number;
  following: number;
  lists: number;
  favourites: number;
  statuses: number;
  account_creation: string;
}

export interface RedditStats extends BaseSocialNetworkStats {
  subscribers: number;
  active_users: number;
  posts_per_hour: number;
  posts_per_day: number;
  comments_per_hour: number;
  comments_per_day: number;
  community_creation: string;
}

export interface FacebookStats extends BaseSocialNetworkStats {
  talking_about: number;
  is_closed: boolean;
  likes: number;
}

export interface CodeRepositoryLink {
  Name: string;
  Url: string;
  InternalId: number;
}

export interface CodeRepository {
  source: CodeRepositoryLink;
  parent: CodeRepositoryLink;
  stars: number;
  forks: number;
  subscribers: number;
  contributors: number;
  closed_issues: number;
  size: number;
  open_pull_issues: number;
  fork: boolean;
  closed_pull_issues: number;
  created_at: string;
  last_update: string;
  closed_total_issues: number;
  open_total_issues: number;
  last_push: string;
  open_issues: number;
  url: string;
}

export interface CodeRepositoriesStats extends BaseSocialStats {
  List: CodeRepository[];
}

export interface SocialStats {
  General: GeneralSocialStats;
  CryptoCompare: CryptoCompareStats;
  Twitter: TwitterStats;
  Reddit: RedditStats;
  Facebook: FacebookStats;
  CodeRepository: CodeRepositoriesStats;
}

export interface Category {
  categoryName: string;
  wordsAssociatedWithCategory: string[];
}

export interface Feed {
  key: string;
  name: string;
  img: string;
  lang: string;
}

export interface FeedsAndCategories {
  Categories: Category[];
  Feeds: Feed[];
}

export interface SourceInfo {
  name: string;
  img: string;
  lang: string;
}

export interface Article {
  id: string;
  guid: string;
  published_on: number;
  imageurl: string;
  title: string;
  url: string;
  body: string;
  tags: string;
  lang: string;
  upvotes: string;
  downvotes: string;
  categories: string;
  source_info: SourceInfo;
  source: string;
}
