import { Product } from './../../types/Product';
import { categoriesData } from "./categoriesData";

export const productsData: Product[] = [
  {
    _id: 1,
    name: "nuevo title",
    price: 987,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: categoriesData[0],
    images: [],
    quantity: 1,
    stock: 22,
  },

  {
    _id: 2,
    name: "Bespoke Wooden Shirt",
    price: 551,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: categoriesData[1],
    images: [],
    quantity: 1,
    stock: 12,
  },

  {
    _id: 3,
    name: "Gorgeous Soft Hat",
    price: 635,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: categoriesData[3],
    images: [],
    quantity: 1,
    stock: 1,
  },
];
