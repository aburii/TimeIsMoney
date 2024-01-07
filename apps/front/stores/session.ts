import { useLocalStorage, StorageSerializers } from "@vueuse/core";
import { LoginDto, UserEntity } from "@timeismoney/dto";

export const useSessionStore = defineStore("session", () => {
  const user = useLocalStorage<UserEntity | null>("user", null, {
    serializer: StorageSerializers.object,
  });

  const fiatSymbol = useLocalStorage<string>("fiatSymbol", '€', {
    serializer: StorageSerializers.string,
  });
  const isLoggedIn = computed(() => user.value != null);
  const isRefreshing = ref<boolean>(false);

  async function reloadUser() {
    const response = await useGetMe()();

    if (!response.ok) {
      localLogout();
      return;
    }
    user.value = response.data;
  }

  async function login(credentials: LoginDto) {
    const response = await useLogin()(credentials);

    if (!response.ok) {
      return false;
    }

    await reloadUser();
    return true;
  }

  async function loginWithGoogle(credential: string) {
    const res = await useGoogleLogin()({ token: credential });

    if (!res.ok) {
      return false;
    }

    await reloadUser();
    return true;
  }

  async function refreshSession(): Promise<boolean> {
    if (!user.value) {
      return false;
    }
    isRefreshing.value = true;

    const response = await useRefresh()();

    if (!response.ok) {
      await logout();
      isRefreshing.value = false;
      return false;
    }

    isRefreshing.value = false;
    return true;
  }

  async function logout() {
    if (!user.value) {
      return;
    }

    await useLogout()(user.value.id);

    return localLogout();
  }

  function localLogout() {
    user.value = null;
  }

  setTimeout(() => {
    reloadUser().catch((err) => console.error(err));
  }, 0);

  return {
    user,
    isLoggedIn,
    isRefreshing,
    login,
    refreshSession,
    loginWithGoogle,
    logout,
    localLogout,
  };
});
