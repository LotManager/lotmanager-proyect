import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET || "secreto_por_defecto";

export class Security {
  
  /** Encripta una contraseña */
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  /** Compara una contraseña plana con una encriptada */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /** Genera un JWT con los datos del usuario */
  static generateToken(payload: { id: number; username: string; rol: string }): string {
    return jwt.sign(payload, SECRET, { expiresIn: "8h" }); // Expira en 8 horas
  }

  /** Verifica un JWT */
  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, SECRET);
    } catch (error) {
      return null;
    }
  }
}