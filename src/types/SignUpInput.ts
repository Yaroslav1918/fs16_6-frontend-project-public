export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: "customer" | "admin";
}
