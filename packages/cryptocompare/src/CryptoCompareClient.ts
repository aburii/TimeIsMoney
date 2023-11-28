import * as cctypes from "./types";

export class CryptoCompareClient {
  static baseUrl: string = "https://min-api.cryptocompare.com/data/";
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetchJSON(url: string): Promise<any> {
    return fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  }

  private async fetchApiResponse<DataType>(
    url: string
  ): Promise<cctypes.ApiResponse<DataType>> {
    return this.fetchJSON(url).then((body) => {
      const response = body as cctypes.ApiResponse<DataType>;
      if (response.Type !== 100) throw response.Message;
      return response;
    });
  }

  private async fetchApi<DataType>(url: string): Promise<DataType> {
    return this.fetchApiResponse<DataType>(url).then((res) => {
      return res.Data;
    });
  }

  private async fetchRawApi<DataType>(url: string): Promise<DataType> {
    return this.fetchJSON(url).then((body) => {
      return body as DataType;
    });
  }

  private objectToUrlSearchParams(obj: any): URLSearchParams {
    const params = new URLSearchParams();
    for (const property in obj) {
      if (obj[property]) params.append(property, `${obj[property]}`);
    }
    return params;
  }

  private apiUrl(
    endpoint: string,
    queryParams?: URLSearchParams | any
  ): string {
    const url = `${CryptoCompareClient.baseUrl}${endpoint}`;
    const searchParams: URLSearchParams = queryParams
      ? queryParams instanceof URLSearchParams
        ? queryParams
        : this.objectToUrlSearchParams(queryParams)
      : new URLSearchParams();

    if (this.apiKey !== "") searchParams.append("api_key", this.apiKey);

    if (url.indexOf("?") > -1) return `${url}&${searchParams}`;
    else return `${url}?${searchParams}`;
  }

  // https://min-api.cryptocompare.com/documentation?key=Other&cat=allCoinsWithContentEndpoint
  async coinList(params?: {
    // Default:
    builtOn?: string;
    // Default: false
    summary?: boolean;
    // Default:
    fsym?: string;
  }): Promise<cctypes.CoinsInformations | cctypes.CoinInformationShort> {
    if (params?.summary) {
      return this.fetchApi<cctypes.CoinInformationShort>(
        this.apiUrl(`all/coinlist`, params)
      );
    } else {
      return this.fetchApi<cctypes.CoinsInformations>(
        this.apiUrl(`all/coinlist`, params)
      );
    }
  }

  async coinFullData(params: {
    fsyms: string[];
    tsyms: string[];
    // Default: true
    tryConversion?: boolean;
    // Default: true
    relaxedValidation?: boolean;
    // Default: cccagg_or_exchange
    e?: string;
  }) {
    return this.fetchRawApi<cctypes.CoinPriceFullMulti>(
      this.apiUrl(`pricemultifull`, params)
    );
  }

  // https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistoday
  async history(
    period: "day" | "hour" | "minute",
    params: {
      fsym: string;
      tsym: string;
      // Default: true
      tryConversion?: boolean;
      // Default: CCCAGG
      e?: string;
      // Default: 1
      aggregate?: number;
      // Default: true
      aggregatePredictableTimePeriods?: boolean;
      // Default: 30day | 168h (equal 7 days) | 1440min (equal 24 hours)
      limit?: number;
      // Default: false
      allData?: boolean;
      // Default:
      toTs?: number;
    }
  ): Promise<cctypes.OHLCVHistory> {
    return this.fetchApi<cctypes.OHLCVHistory>(
      this.apiUrl(`v2/histo${period}/`, params)
    );
  }

  // https://min-api.cryptocompare.com/documentation?key=Social&cat=latestCoinSocialStats
  async coinSocialStats(params: {
    // Default: 1182 (BTC)
    coinId?: number;
  }): Promise<cctypes.SocialStats> {
    return this.fetchApi<cctypes.SocialStats>(
      this.apiUrl("social/coin/latest", params)
    );
  }

  // https://min-api.cryptocompare.com/documentation?key=News&cat=newsFeedAndCategoriesEndpoint
  async newsFeedsAndCategories(): Promise<cctypes.FeedsAndCategories> {
    return this.fetchApi<cctypes.FeedsAndCategories>(
      this.apiUrl("news/feedsandcategories")
    );
  }

  // https://min-api.cryptocompare.com/documentation?key=News&cat=latestNewsArticlesEndpoint
  async newsList(params?: {
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
  }): Promise<cctypes.Article[]> {
    return this.fetchApi<cctypes.Article[]>(this.apiUrl("v2/news/", params));
  }
}
