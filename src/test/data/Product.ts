import { Product } from "../../types/Product";

export const product: Product = {
  _id: "1",
  name: "string",
  price: 20,
  description: "text",
  category: {
    _id: "1",
    name: "sport",
    images: ["image"],
  },
  images: ["img"],
  quantity: 1,
  stock: 23,
};
