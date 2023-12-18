import { useSessionStore } from "~/stores/session";

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; status: number };

export async function useFetchAPI<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?: any
): Promise<Ok<T> | Err> {
  const session = useSessionStore();

  const response = await fetch(url, {
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
