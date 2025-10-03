// src/domain/value-objects/PasswordHash.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class PasswordHash {
  private readonly hash: string;

  private constructor(hash: string) {
    this.hash = hash;
  }

  public static isValid(hash: string): boolean {
    return hash.trim().length > 0;
  }

  public static async createFromPlain(plainPassword: string): Promise<PasswordHash> {
    if (plainPassword.trim().length === 0) {
      throw new Error('La contraseña no puede estar vacía');
    }
    const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return new PasswordHash(hash);
  }

  public static fromHash(hash: string): PasswordHash {
    if (!this.isValid(hash)) {
      throw new Error('Hash inválido');
    }
    return new PasswordHash(hash);
  }

  public async compareWith(plainPassword: string): Promise<boolean> {
    if (!PasswordHash.isValid(this.hash)) {
      throw new Error("Hash inválido para comparación");
    }
    return await bcrypt.compare(plainPassword, this.hash);
  }

  public getValue(): string {
    return this.hash;
  }
  public toJSON(): string {
    return this.hash;
  }
}