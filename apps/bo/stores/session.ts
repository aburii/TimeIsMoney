import { useLocalStorage, StorageSerializers } from "@vueuse/core";

export const useSessionStore = defineStore("session", () => {
  const user = useLocalStorage<any | null>("user", null, {
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
    const response = await useLogin()(credentials);

    if (!response.ok) {
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
    return navigateTo("/");
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
    logout,
    localLogout,
  };
});
