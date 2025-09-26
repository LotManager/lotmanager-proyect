import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { UserCreateInput } from "../dtos/user.dto";
import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { PasswordHash } from "../../../domain/value-objects/PasswordHash";
import { Rol } from "../../../domain/value-objects/Rol";
import { AuthResponseDTO } from "../dtos/auth-responde.dto";
import { User } from "../../../domain/entities/User";



export class AuthService {
  constructor(private userRepo: IUserRepository,
    private tokenService: ITokenService
  ) {}

  public async register(data: UserCreateInput): Promise<AuthResponseDTO> {
   
    const duplicado = await this.userRepo.findByUsername(data.usuario);
    if (duplicado) throw new Error("El nombre de usuario ya está en uso");

   
    const passwordHash = await PasswordHash.createFromPlain(data.contrasena);
    const rol = Rol.fromNombre(data.rol);
    if (!rol) {
      throw new Error("Rol inválido");
    }

   
    const nuevoUsuario = new User(0, data.usuario, passwordHash, rol);
    if (!nuevoUsuario.isValid()) {
      throw new Error("Datos de usuario inválidos");
    }

    const usuarioPersistido = await this.userRepo.create(nuevoUsuario);
    if (!usuarioPersistido) {
      throw new Error("Error al crear el usuario");
    }
    const userDTO = usuarioPersistido.toDTO();

    console.log("Usuario registrado:", userDTO);
    const token = this.tokenService.generateAccessToken(userDTO);

    return { user: userDTO, token };
  }


  public async login(username: string, password: string): Promise<AuthResponseDTO & { refreshToken: string }> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) throw new Error("Usuario no encontrado");

    const isValid = await user.validarPassword(password);
    if (!isValid) throw new Error("Credenciales inválidas");

    const userDTO = user.toDTO();
    const accessToken = this.tokenService.generateAccessToken(userDTO);
    const refreshToken = this.tokenService.generateRefreshToken(userDTO.id);

    return { user: userDTO, token: accessToken, refreshToken };
}
  
  public generateRefreshToken(userId: number): string {
    return this.tokenService.generateRefreshToken(userId);
}
}

