import { Injectable } from '@nestjs/common';
import {
  Article,
  Feed,
  Category,
  FeedsAndCategories,
  CoinAPI,
} from '@timeismoney/coinapi';

@Injectable()
export class ArticleService {
  private readonly coinAPI: CoinAPI = new CoinAPI(process.env.API_KEY);

  constructor() {}

  async listArticles(
    lang: string = 'EN',
    feeds?: string[],
    categories?: string[],
    excludeCategories?: string[],
    sortOrder: 'latest' | 'popular' = 'latest',
  ): Promise<Article[]> {
    return this.coinAPI.newsArticles({
      lang: lang.toUpperCase(),
      feeds: feeds,
      categories: categories,
      excludeCategories: excludeCategories,
      sortOrder: sortOrder,
    });
  }

  async feeds(): Promise<Feed[]> {
    return this.coinAPI.newsFeeds();
  }

  async categories(): Promise<Category[]> {
    return this.coinAPI.newsCategories();
  }

  async feedsAndcategories(): Promise<FeedsAndCategories> {
    return this.coinAPI.newsFeedsAndCategories();
  }
}
