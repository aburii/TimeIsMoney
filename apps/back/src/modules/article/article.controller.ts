import {
  Controller,
  Get,
  Query,
  ParseArrayPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { PaginationInterceptor } from '../../interceptors/pagination.interceptor';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async index(
    @Query('lang') lang: string = 'en',
    @Query(
      'feeds',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    feeds: string[],
    @Query(
      'categories',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    categories: string[],
    @Query(
      'excludeCategories',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    excludeCategories: string[],
    sortOrder: 'latest' | 'popular' = 'latest',
  ) {
    return this.articleService.listArticles(
      lang,
      feeds,
      categories,
      excludeCategories,
      sortOrder,
    );
  }

  @UseInterceptors(PaginationInterceptor)
  @Get('feeds')
  async feeds() {
    return this.articleService.feeds();
  }

  @UseInterceptors(PaginationInterceptor)
  @Get('categories')
  async categories() {
    return this.articleService.categories();
  }

  @UseInterceptors(PaginationInterceptor)
  @Get('feedsAndCategories')
  async feedsAndCategories() {
    return this.articleService.feedsAndcategories();
  }
}
