import { LoginDto } from "@timeismoney/dto";

const runtimeConfig = useRuntimeConfig();
const AUTH_ENDPOINT = `${runtimeConfig.public.BACK_URL}/auth`;

export function useLogin() {
  return async (credentials: LoginDto) => {
    return await useFetchAPI<any>(
      "POST",
      `${AUTH_ENDPOINT}/login`,
      credentials,
    );
  };
}

export function useRefresh() {
  return async () => {
    return await useFetchAPI<any>("POST", `${AUTH_ENDPOINT}/refresh`);
  };
}

export function useLogout() {
  return async (id: number) => {
    return await useFetchAPI("POST", `${AUTH_ENDPOINT}/logout/${id}`);
  };
}
