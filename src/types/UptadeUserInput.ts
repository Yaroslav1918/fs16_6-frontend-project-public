import { User } from "./User";

export interface UptadeUserInput {
  update: Partial<User>;
  id: number;
}
