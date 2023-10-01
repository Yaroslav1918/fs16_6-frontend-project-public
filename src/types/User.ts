export interface SignIn {
  email: string;
  password: string;
}
export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role?: "customer" | "admin";
}
// role: "customer" | "admin";
