import { DynamicInput } from "../types/DynamicInput";

export const formCategoriesFields: DynamicInput[] = [
  { name: "name", label: "name" },
  { name: "images", label: "images", placeholder: "Write only an array of url" },
];

export const formProductsFields: DynamicInput[] = [
  { name: "name", label: "name" },
  { name: "price", label: "price" },
  { name: "description", label: "description" },
  { name: "category", label: "category" },
  {
    name: "images",
    label: "images",
    placeholder: "Write only an array of url",
  },
];

export const formUsersFields: DynamicInput[] = [
  { name: "name", label: "name" },
  { name: "email", label: "email" },
  { name: "password", label: "password" },
  { name: "role", label: "role" },
  { name: "avatar", label: "avatar", placeholder: "Write only url" },
];

export const dataFields = {
  formCategoriesFields,
  formProductsFields,
  formUsersFields,
};
