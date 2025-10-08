import { Request, Response } from "express";
import { AuthService } from "../../application/auth/services/auth-service";
import { PrismaUserRepository } from "../../infrastructure/repositorios/PrismaUserRepository";
import { userCreateDTOSchema } from "../../application/dtos/user.dto";
import { tokenService } from "../../application/auth/services/tokenService";

export async function registerHandler(req: Request, res: Response) {
  console.log("[AuthController] Intento de registro:", req.body.usuario);

  const result = userCreateDTOSchema.safeParse(req.body);
  if (!result.success) {
    console.warn("[AuthController] Datos inválidos en registro:", result.error.format());
    return res.status(400).json({ error: result.error.format() });
  }
  console.log("[AuthController] Rol recibido:", result.data.rol);

  try {
    const authService = new AuthService(new PrismaUserRepository(), tokenService);
    const response = await authService.register(result.data);
    res.status(201).json(response);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Error desconocido";
    console.error("[AuthController] Error en registro:", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
}


export async function loginHandler(req: Request, res: Response) {
  const { usuario, contrasena } = req.body;
  console.log('[AuthController] Intento de login:', usuario);

  try {
    const authService = new AuthService(new PrismaUserRepository(), tokenService);
    const { user, token, refreshToken } = await authService.login(usuario, contrasena);
    console.log('[AuthController] Login exitoso:', user.id);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      })
      .status(200)
      .json({ user, token });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(401).json({ error: errorMessage });
  }
}

export async function refreshHandler(req: Request, res: Response) {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token missing" });
  }

  const userId = tokenService.verifyRefreshToken(refreshToken);
  if (!userId) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }

  const userRepo = new PrismaUserRepository();
  const user = await userRepo.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userDTO = user.toDTO();
  const accessToken = tokenService.generateAccessToken(userDTO);

  res.status(200).json({ token: accessToken });
}

export async function logoutHandler(req: Request, res: Response) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({ message: "Sesión cerrada correctamente" });
  console.log("[AuthController] Usuario deslogueado");
}

export async function changePasswordHandler(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId || typeof userId !== "number") {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const { contrasenaActual, nuevaContrasena } = req.body;

  if (
    typeof contrasenaActual !== "string" ||
    typeof nuevaContrasena !== "string" ||
    contrasenaActual.trim().length === 0 ||
    nuevaContrasena.trim().length < 6
  ) {
    return res.status(400).json({ error: "Datos inválidos o contraseña demasiado corta" });
  }

  try {
    const authService = new AuthService(new PrismaUserRepository(), tokenService);
    await authService.changePassword(userId, contrasenaActual, nuevaContrasena);
    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Error desconocido";
    console.log(`[AuthController] Error al cambiar la contraseña del usuario ${userId}:`, errorMessage);
    res.status(400).json({ error: errorMessage });
  }
}

