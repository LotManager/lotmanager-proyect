const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type LoginInput = {
  username: string;
  contrasena: string;
};


export type RegisterInput = {
  username: string;
  contrasena: string;
  rol: "ADMINISTRADOR" | "ENCARGADO";
  // Datos de Persona 
  nombre: string;
  apellido: string;
  email: string;
};

export type User = {
  id: number;
  username: string;
  rol: string;
  persona?: { nombre: string; apellido: string };
};

async function fetchAuth(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}/api/auth${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // 🚨 ESTO ES FUNDAMENTAL: Permite que el navegador guarde y envíe la cookie
    credentials: "include", 
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Error en la autenticación");
  }

  return res.json();
}

export const authService = {
  login: (data: LoginInput) => fetchAuth("/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data: RegisterInput) => fetchAuth("/register", { method: "POST", body: JSON.stringify(data) }),
  logout: () => fetchAuth("/logout", { method: "POST" }),
  me: () => fetchAuth("/me", { method: "GET" }), // Verifica si la cookie es válida
};