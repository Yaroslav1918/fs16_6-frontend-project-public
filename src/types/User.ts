export interface SignIn {
  email: string;
  password: string;
}
export interface User {
  id: number;
  email: string | null;
  password: string;
  name: string;
  role: "customer" | "admin";
  avatar: string;
}
