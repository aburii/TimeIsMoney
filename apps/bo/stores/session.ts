import { useLocalStorage, StorageSerializers } from "@vueuse/core";

export const useSessionStore = defineStore("session", () => {
  const user = useLocalStorage("user", null, {
    serializer: StorageSerializers.object,
  });

  const isLoggedIn = computed(() => user.value != null);
  const isRefreshing = ref<boolean>(false);

  async function login(credentials: any) {
    const login = useLogin();
    const response = await useLogin()(credentials);

    return response.ok;
  }

  async function refreshSession(): Promise<boolean> {
    return false;
  }
  async function logout() {}
  async function localLogout() {}

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
