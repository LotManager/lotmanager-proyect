import  prisma  from "../../config/db";
import { Security } from "../helper/security";
import { z } from "zod";

// DTOs simples para Auth
export const LoginDto = z.object({
  username: z.string(),
  contrasena: z.string(),
});
export const RegisterDto = z.object({
  // Datos del Usuario
  username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rol: z.enum(["ADMINISTRADOR", "ENCARGADO"]),
  
  // Datos de la Persona
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("El email no es válido"),
});

type LoginType = z.infer<typeof LoginDto>;
type RegisterType = z.infer<typeof RegisterDto>;

export class AuthService {

 async register(data: RegisterType) {
    // 1. Validaciones previas (Checkear duplicados)
    const usuarioExiste = await prisma.usuario.findUnique({ where: { username: data.username } });
    if (usuarioExiste) throw new Error("El nombre de usuario ya está en uso.");

    const emailExiste = await prisma.persona.findUnique({ where: { email: data.email } });
    if (emailExiste) throw new Error("El email ya está registrado en el sistema.");

    // 2. Hashear contraseña
    const hashedPassword = await Security.hashPassword(data.contrasena);

    // 3. TRANSACCIÓN: Crear Persona + Crear Usuario atómico
    const resultado = await prisma.$transaction(async (tx) => {
      
      // A. Crear la Persona
      const nuevaPersona = await tx.persona.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
        }
      });

      // B. Crear el Usuario vinculado a esa Persona
      const nuevoUsuario = await tx.usuario.create({
        data: {
          username: data.username,
          contrasena: hashedPassword,
          rol: data.rol,
          personaId: nuevaPersona.id, // Conectamos con la persona recién creada
        },
        include: { persona: true }
      });

      return nuevoUsuario;
    });

    // 4. Devolver resultado sin la contraseña
    const { contrasena, ...usuarioSinPass } = resultado;
    return usuarioSinPass;
  }

  async login(data: LoginType) {
    // 1. Buscar usuario
    const usuario = await prisma.usuario.findUnique({ 
      where: { username: data.username },
      include: { persona: true }
    });
    
    if (!usuario) throw new Error("Credenciales inválidas");

    // 2. Comparar contraseña
    const esValida = await Security.comparePassword(data.contrasena, usuario.contrasena);
    if (!esValida) throw new Error("Credenciales inválidas");

    // 3. Generar Token
    const token = Security.generateToken({
      id: usuario.id,
      username: usuario.username,
      rol: usuario.rol
    });

    // 4. Retornar datos y token
    const { contrasena, ...usuarioSinPass } = usuario;
    return { user: usuarioSinPass, token };
  }
}