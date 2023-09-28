export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
  quantity: number,
  totalPrice: number,
}

export interface Categories {
  id: number;
  name: string;
  image: string;
}