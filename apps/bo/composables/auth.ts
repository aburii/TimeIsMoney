import { LoginDto } from "@timeismoney/dto";

export function useLogin() {
  return async (credentials: LoginDto) => {
    return await useFetchAPI<any>("POST", "auth/login", credentials);
  };
}

export function useRefresh() {
  return async () => {
    return await useFetchAPI<any>("POST", "auth/refresh");
  };
}

export function useLogout() {
  return async (id: number) => {
    return await useFetchAPI("POST", `auth/logout/${id}`);
  };
}
