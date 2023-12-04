export const ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export type Role = {
  _id: string;
  name: string;
  permissions: string[];
};
