import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestUser } from '../types/passport/request-user';

export const RequestUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): IRequestUser => {
    const req = context.switchToHttp().getRequest();
    if (!data) return req.user;
    return req.user[data];
  },
);
