const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ✅ AGREGAMOS <T = any> AQUÍ
export async function api<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    cache: "no-store",
  });

  // Si es DELETE (204), devolvemos true as T (o lo que corresponda)
  if (res.status === 204) return true as unknown as T;

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = Array.isArray(errorData.error)
      ? errorData.error.map((e: any) => e.message).join(", ")
      : errorData.message || "Ocurrió un error en la petición";
      
    throw new Error(message);
  }

  // ✅ TypeScript ahora sabe que esto devuelve T
  return res.json();
}