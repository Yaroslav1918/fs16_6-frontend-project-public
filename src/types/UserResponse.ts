import { User } from "./User";

export interface UserResponse {
  user: User;
  message: string;
}

export interface CurrentUserResponse {
  user: User;
}

