import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CoinAPI } from '@timeismoney/coinapi';

@Injectable()
export class CoinApiService {
  readonly client: CoinAPI;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.client = new CoinAPI(process.env.API_KEY, cacheManager);
  }
}
