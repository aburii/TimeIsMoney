import { useSessionStore } from "~/stores/session";

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; status: number };

const runtimeConfig = useRuntimeConfig();
const ENDPOINT = `${runtimeConfig.public.BACK_URL}`;

export async function useFetchAPI<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  body?: any,
): Promise<Ok<T> | Err> {
  const session = useSessionStore();
  const fullUrl = `${ENDPOINT}/${url}`;

  const response = await fetch(fullUrl, {
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    method,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (session.isRefreshing) {
      return { ok: false, status: response.status };
    }
    if (response.status === 401) {
      const success = await session.refreshSession();

      if (!success) {
        return { ok: false, status: response.status };
      }

      return useFetchAPI(method, url, body);
    }
    return { ok: false, status: response.status };
  }

  const json =
    method !== "DELETE" && response.status !== 204
      ? await response.json()
      : { data: undefined };

  const data = json?.data ?? { ...json };
  return { ok: true, data };
}
