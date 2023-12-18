import { UserEntity } from "@timeismoney/dto";

export function useGetMe() {
  return function () {
    return useFetchAPI<UserEntity>("GET", `/users/me`);
  };
}
