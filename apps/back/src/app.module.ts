import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from '@timeismoney/models';
import { UserModule } from './modules/user/user.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
    CacheModule.register({ isGlobal: true }),
    UserModule,
    CryptoModule,
    AuthModule,
    ArticleModule,
  ],
})
export class AppModule {}
