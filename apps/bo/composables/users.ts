import { UserEntity } from "@timeismoney/dto";

export function useGetMe() {
  return function () {
    return useFetchAPI<UserEntity>("GET", "bo/users/me");
  };
}

export function useGetAllUsers() {
  return function () {
    return useFetchAPI<UserEntity[]>("GET", "users");
  };
}
