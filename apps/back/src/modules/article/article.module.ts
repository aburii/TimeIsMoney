import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { CoinApiService } from '../coinapi/coinapi.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, CoinApiService],
})
export class ArticleModule {}
