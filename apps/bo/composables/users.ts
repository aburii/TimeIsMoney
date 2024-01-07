import { CreateUserDto, UserEntity } from "@timeismoney/dto";

export function useGetMe() {
  return function () {
    return useFetchAPI<UserEntity>("GET", "bo/users/me");
  };
}

export function useGetUser() {
  return function (id: string) {
    return useFetchAPI<UserEntity>("GET", `users/${id}`);
  };
}

export function useGetAllUsers() {
  return function () {
    return useFetchAPI<UserEntity[]>("GET", "users");
  };
}

export function useCreateUser() {
  return function (createUserdto: CreateUserDto) {
    return useFetchAPI<UserEntity>("POST", "users", createUserdto);
  };
}

export function useUpdateUser() {
  return function (id: number, updateUserdto: Partial<UserEntity>) {
    return useFetchAPI<UserEntity>("PATCH", `users/${id}`, updateUserdto);
  };
}

export function useDeleteUser() {
  return function (id: number) {
    return useFetchAPI<void>("DELETE", `users/${id}`);
  };
}
