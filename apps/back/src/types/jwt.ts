import { App } from '@timeismoney/models';

export interface JwtPayload {
  userId: number;
  app: App;
  expiresIn: number;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
