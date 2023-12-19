import { Request } from "express";

export type TokenCookiesName = "access_token" | "refresh_token";

export function extractAppAccessToken(request: Request) {
  const app = request.body.app ?? "BO";

  if (!app) {
    return null;
  }

  const cookie = getCookie(request, app, "access_token");
  if (request.cookies && cookie && cookie.length > 0) {
    return cookie;
  }
  return null;
}

export function extractAppRefreshToken(request: Request) {
  const app = request.body.app ?? "BO";

  if (!app) {
    return null;
  }

  const cookie = getCookie(request, app, "refresh_token");
  if (request.cookies && cookie && cookie.length > 0) {
    return cookie;
  }
  return null;
}

function getCookie(request: Request, app: string, name: TokenCookiesName) {
  return request.cookies[`${app}_${name}`];
}
