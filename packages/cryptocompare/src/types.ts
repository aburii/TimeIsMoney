export interface ApiResponse<DataType> {
  Response: "Success" | "Error";
  Message: string;
  Data: DataType;
  RateLimit: any;
  HasWarning: boolean;
  Type: number;
}

export interface CoinSummary {
  Id: number;
  ImageUrl: string;
  Symbol: string;
  FullName: string;
}

export interface CoinsSummary {
  [symbol: string]: CoinSummary;
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
