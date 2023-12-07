import { User } from "../../types/User";

export const usersData: User[] = [
  {
    _id: "1",
    email: "john@mail.com",
    password: "changeme",
    name: "Jhon",
    role: "USER",
    avatar: "https://i.imgur.com/DumuKkD.jpeg",
    isGoogleLoggedIn: false,
  },
  {
    _id: "2",
    email: "maria@mail.com",
    password: "12345",
    name: "Maria",
    role: "USER",
    avatar: "https://i.imgur.com/00qWleT.jpeg",
    isGoogleLoggedIn: false,
  },
  {
    _id: "3",
    email: "admin@mail.com",
    password: "admin123",
    name: "Admin",
    role: "ADMIN",
    avatar: "https://i.imgur.com/5mPmJYO.jpeg",
    isGoogleLoggedIn: false,
  },
];
