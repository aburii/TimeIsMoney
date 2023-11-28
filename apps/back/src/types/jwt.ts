import { App } from '@timeismoney/models/dist';

export interface JwtPayload {
  userId: number;
  app: App;
  expiresIn: number;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
