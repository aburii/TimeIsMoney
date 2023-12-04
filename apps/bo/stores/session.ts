import { useLocalStorage, StorageSerializers } from "@vueuse/core";

export const useSessionStore = defineStore("session", () => {
  const user = useLocalStorage("user", null, {
    serializer: StorageSerializers.object,
  });

  const isLoggedIn = computed(() => user.value != null);
  const isRefreshing = ref<boolean>(false);

  async function login() {}

  async function refreshSession(): Promise<boolean> {
    return true;
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
