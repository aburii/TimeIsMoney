import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class CurrencyService extends PrismaCrudService {
  constructor() {
    super({
      model: 'currency',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
