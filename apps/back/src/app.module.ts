import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from '@timeismoney/models';
import { UserModule } from './user/user.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
    UserModule,
    CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
