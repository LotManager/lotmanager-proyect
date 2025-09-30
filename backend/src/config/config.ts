import { Secret } from "jsonwebtoken";


const jwtSecret: Secret = getEnvVar("JWT_SECRET") as Secret;

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} no está definido en el entorno`);
  return value!;
}

export const config = {
  jwtSecret, 
  recoverySecret: getEnvVar("RECOVERY_SECRET") as Secret,
  jwtExpiration: getEnvVar("JWT_EXPIRATION"),
  refreshSecret: getEnvVar("REFRESH_SECRET") as Secret,
};





