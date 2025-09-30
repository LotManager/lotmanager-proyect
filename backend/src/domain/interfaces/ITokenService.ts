import { UserDTO } from "../../application/auth/dtos/user.dto";

export interface ITokenService {
  generateAccessToken(user: UserDTO): string;
  verifyAccessToken(token: string): UserDTO | null;

  generateRecoveryToken(userId: number): string;
  verifyRecoveryToken(token: string): number | null;

  generateRefreshToken(userId: number): string;
  verifyRefreshToken(token: string): number | null;
}
