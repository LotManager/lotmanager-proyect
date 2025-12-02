import { Request, Response } from "express";
import { AuthService, LoginDto, RegisterDto } from "../../application/services/auth.service";

const authService = new AuthService();

export class AuthController {

  static async register(req: Request, res: Response) {
    const parsed = RegisterDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

    try {
      const user = await authService.register(parsed.data);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const parsed = LoginDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

    try {
      const result = await authService.login(parsed.data);

      // ✅ GUARDAMOS EL TOKEN EN UNA COOKIE SEGURA
      res.cookie("token", result.token, {
        httpOnly: true, // No accesible por JS del navegador (seguridad)
        secure: process.env.NODE_ENV === "production", // Solo HTTPS en prod
        sameSite: "strict", // Protección contra CSRF
        maxAge: 8 * 60 * 60 * 1000, // 8 horas
      });

      res.status(200).json({ message: "Login exitoso", user: result.user });

    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static async logout(req: Request, res: Response) {
    // Para salir, simplemente borramos la cookie
    res.clearCookie("token");
    res.status(200).json({ message: "Logout exitoso" });
  }
  
  // Endpoint para verificar si estoy logueado (útil para el frontend)
  static async me(req: Request, res: Response) {
      // (Esto lo conectamos después con el middleware)
      res.json({ user: (req as any).user });
  }
}