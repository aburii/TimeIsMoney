import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class BoGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    const dbUser = await this.userService.findOne(user.userId);

    return dbUser.role === 'ADMIN' && user.app === 'BO';
  }
}
