import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from '@timeismoney/dto';
import { User } from '@prisma/client';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserDto> | Promise<Observable<UserDto>> {
    return next.handle().pipe(
      map((data: User) => {
        return {
          id: data.id,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          nickname: data.lastname,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          currency: data.currencyId,
          pressKeywords: data.pressKeywords,
        };
      }),
    );
  }
}
