import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AccessGuard extends AuthGuard('jwt-at') {
  constructor(private readonly optional: boolean = false) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
    } catch (e) {
      if (!this.optional) throw e;
      // Handle the error if needed
    }

    // If the guard is marked as optional and an error occurred during token validation,
    // or if it's not optional, return true to allow access.
    return this.optional || true;
  }
}
