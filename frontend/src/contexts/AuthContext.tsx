"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService, User, LoginInput, RegisterInput } from "@/src/services/auth";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Verificar sesión al cargar la app (o al recargar página)
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Llamamos a /me. Si la cookie está y es válida, devuelve el usuario.
        const data = await authService.me();
        setUser(data.user);
      } catch (error) {
        setUser(null); // No hay sesión válida
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  // 2. Función Login
  const login = async (data: LoginInput) => {
    const response = await authService.login(data);
    setUser(response.user);
    router.push("/dashboard"); // Redirigir al entrar
  };

  // 3. Función Register
  const register = async (data: RegisterInput) => {
    await authService.register(data);
    // Opcional: loguear automáticamente o redirigir a login
    router.push("/login"); 
  };

  // 4. Función Logout
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error al salir", error);
    }
  };

  // Protección de Rutas básica (Opcional: podés usar Middleware de Next.js también)
  useEffect(() => {
    if (!isLoading && !user && pathname.startsWith("/dashboard")) {
      router.push("/login");
    }
  }, [user, isLoading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};