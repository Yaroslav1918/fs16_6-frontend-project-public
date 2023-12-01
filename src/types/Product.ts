export interface Product {
  _id: number;
  name: string;
  price: number;
  description: string;
  category: {
    _id: number;
    name: string;
    images: string[];
  };
  images: string[];
  quantity: number;
  stock: number;
}
