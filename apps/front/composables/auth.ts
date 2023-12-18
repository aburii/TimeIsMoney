import { LoginDto } from "@timeismoney/dto";
import type { GoogleLoginDto } from "@timeismoney/dto/dist/auth/googleLogin.dto";

export function useLogin() {
  return async (credentials: LoginDto) => {
    return await useFetchAPI<any>("POST", `/auth/login`, credentials);
  };
}

export function useRefresh() {
  return async () => {
    return await useFetchAPI<any>("POST", `/auth/refresh`);
  };
}

export function useLogout() {
  return async (id: number) => {
    return await useFetchAPI("POST", `/auth/logout/${id}`);
  };
}

export function useGoogleLogin() {
  return async (body: GoogleLoginDto) => {
    return await useFetchAPI("POST", `/auth/google/verify`, body);
  };
}
