import { useSessionStore } from "~/stores/session";

export default defineNuxtRouteMiddleware(() => {
  const session = useSessionStore();

  if (session.isLoggedIn) {
    return navigateTo("/cryptocurrencies");
  }
});
