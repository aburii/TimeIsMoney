import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
      secret:
        '5eaa9d0da64e51439b94665b6ae59631cf450b499a7a211fb815d67fd56b52cb',
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
