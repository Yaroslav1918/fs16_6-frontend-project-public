import { User } from "./User";

export interface UptadeUserInput {
  update: Partial<User>;
  _id: string | undefined;
}
