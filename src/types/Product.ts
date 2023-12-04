export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: {
    _id: string;
    name: string;
    images: string[];
  };
  images: string[];
  quantity: number;
  stock: number;
}
