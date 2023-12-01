export interface User {
  _id: number;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: "USER" | "ADMIN";
}

