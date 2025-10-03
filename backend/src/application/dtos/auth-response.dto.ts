import { UserDTO } from "./user.dto.js";

export type AuthResponseDTO = {
  user: UserDTO;
  token: string;
};
