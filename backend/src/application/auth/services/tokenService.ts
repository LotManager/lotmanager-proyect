import jwt from "jsonwebtoken";
import { config } from "../../../config/config";
import { jwtPayloadSchema } from "../../dtos/jwtPayload.dto";
import { TokenTipo } from "../tokens/token-tipo";
import { ITokenService } from "../../../domain/interfaces/ITokenService";


export const tokenService: ITokenService = {
  generateAccessToken(user) {
    return jwt.sign(
      {
        sub: user.id,
        usuario: user.usuario,
        rol: user.rol,
      },
      config.jwtSecret,
      {
        expiresIn: "1h",
        issuer: "auth-service"
      }
    );
  },

  verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret, {
        issuer: "auth-service",
      });

      if (typeof decoded !== "object" || decoded === null) return null;

      const result = jwtPayloadSchema.safeParse(decoded);
      if (!result.success) return null;

      const { id, usuario, rol } = result.data;
      if (rol !== "admin" && rol !== "user") return null;

      return { id, usuario, rol };
    } catch (error) {
      console.warn("Access token verification failed:", error);
      return null;
    }
  },

  generateRecoveryToken(userId) {
    const payload: { sub: number; tipo: TokenTipo } = {
      sub: userId,
      tipo: "recuperacion",
    };

    return jwt.sign(payload, config.recoverySecret, {
      expiresIn: "15m",
      issuer: "auth-service",
    });
  },

  verifyRecoveryToken(token) {
    try {
      const decoded = jwt.verify(token, config.recoverySecret, {
        issuer: "auth-service",
      });

      if (typeof decoded !== "object" || decoded === null) return null;

      const { sub, tipo } = decoded as { sub?: unknown; tipo?: unknown };

      if (tipo !== "recuperacion") return null;
      if (typeof sub !== "number") return null;

      return sub;
    } catch (error) {
      console.warn("Recovery token verification failed:", error);
      return null;
    }
  },
  generateRefreshToken(userId: number) {
    const payload: { sub: number; tipo: TokenTipo } = {
      sub: userId,
      tipo: "refresh",
    };
    return jwt.sign(payload, config.refreshSecret, {
      expiresIn: "7d",
      issuer: "auth-service"
    });
  },

  verifyRefreshToken(token: string): number | null {
    try {
      const decoded = jwt.verify(token, config.refreshSecret, {
        issuer: "auth-service",
      });

      if (typeof decoded !== "object" || decoded === null) return null;

      const { sub, tipo } = decoded as { sub?: unknown; tipo?: unknown };

      if (tipo !== "refresh") return null;
      if (typeof sub !== "number") return null;

      return sub;
    } catch (error) {
      console.warn("Refresh token verification failed:", error);
      return null;
    }
  },
};
