import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { IRequestUser } from 'src/types/passport/request-user';

@Injectable()
export class BoGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    if ((req.user as IRequestUser).app === 'BO') {
      return true;
    } else {
      return false;
    }
  }
}
