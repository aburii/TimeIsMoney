import { useLocalStorage, StorageSerializers } from "@vueuse/core";

export const useSessionStore = defineStore("session", () => {
  const user = useLocalStorage("user", null, {
    serializer: StorageSerializers.object,
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

  async function login(credentials: any) {
    const login = useLogin();
    const response = await useLogin()(credentials);

    if (!response.ok) {
      return false;
    }

    await reloadUser();
    return true;
  }

  async function refreshSession(): Promise<boolean> {
    return false;
  }
  async function logout() {}
  function localLogout() {}

  return {
    user,
    isLoggedIn,
    isRefreshing,
    login,
    refreshSession,
    logout,
    localLogout,
  };
});
