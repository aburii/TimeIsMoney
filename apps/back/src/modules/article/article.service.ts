import { Injectable } from '@nestjs/common';
import {
  Article,
  Feed,
  Category,
  FeedsAndCategories,
} from '@timeismoney/coinapi';
import { CoinApiService } from '../coinapi/coinapi.service';

@Injectable()
export class ArticleService {
  constructor(private readonly coinAPI: CoinApiService) {}

  async listArticles(
    lang: string = 'EN',
    feeds?: string[],
    categories?: string[],
    excludeCategories?: string[],
    sortOrder: 'latest' | 'popular' = 'latest',
  ): Promise<Article[]> {
    return this.coinAPI.client.newsArticles({
      lang: lang.toUpperCase(),
      feeds: feeds,
      categories: categories,
      excludeCategories: excludeCategories,
      sortOrder: sortOrder,
    });
  }

  async feeds(): Promise<Feed[]> {
    return this.coinAPI.client.newsFeeds();
  }

  async categories(): Promise<Category[]> {
    return this.coinAPI.client.newsCategories();
  }

  async feedsAndcategories(): Promise<FeedsAndCategories> {
    return this.coinAPI.client.newsFeedsAndCategories();
  }
}
