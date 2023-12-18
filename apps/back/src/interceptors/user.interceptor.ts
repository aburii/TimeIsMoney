import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from '@timeismoney/dto';
import { User } from '@prisma/client';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserEntity> | Promise<Observable<UserEntity>> {
    return next.handle().pipe(
      map((data: User) => {
        return {
          id: data.id,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          nickname: data.nickname,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          currency: data.currencyId,
          pressKeywords: data.pressKeywords,
        };
      }),
    );
  }
}

@Injectable()
export class UsersListInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserEntity[]> | Promise<Observable<UserEntity[]>> {
    return next.handle().pipe(
      map((data: { data: User[] }) => {
        return data.data.map((user: User) => ({
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          nickname: user.lastname,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          currency: user.currencyId,
          pressKeywords: user.pressKeywords,
        }));
      }),
    );
  }
}
