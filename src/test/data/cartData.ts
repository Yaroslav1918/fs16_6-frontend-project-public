import { categoriesData } from "./categoriesData";
export const cartData = {
  cartProductItems: [
    {
      _id: 1,
      name: "nuevo title",
      price: 987,
      category: categoriesData[1],
      images: [],
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      quantity: 1,
      stock: 22,
    },
    {
      _id: 2,
      name: "Bespoke Wooden Shirt",
      price: 551,
      category: categoriesData[0],
      images: [],
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      quantity: 2,
      stock: 11,
    },
  ],
};
