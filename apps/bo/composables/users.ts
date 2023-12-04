import { UserEntity } from "@timeismoney/dto";

const runtimeConfig = useRuntimeConfig();
const USERS_ENDPOINT = `${runtimeConfig.public.BACK_URL}/users`;

export function useGetMe() {
  return function () {
    return useFetchAPI<UserEntity>("GET", `${USERS_ENDPOINT}/me`);
  };
}
