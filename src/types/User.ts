export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: "USER" | "ADMIN";
  isGoogleLoggedIn: boolean;
}
