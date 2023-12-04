import { Module } from '@nestjs/common';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from '@timeismoney/models';
import { UserModule } from './modules/user/user.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
    UserModule,
    CryptoModule,
    AuthModule,
  ],
})
export class AppModule {}
