import { Product } from "./Product";

interface Address {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  postal_code: string;
  state: string | null;
}

interface Shipping {
  address: Address;
  email: string;
  name: string;
  phone: string;
  tax_exempt: string;
  tax_ids: any[];
}
export interface Order {
  _id: string;
  userId: string;
  products: Array<{
    quantity: number;
    productId: Product;
  }>;
  subtotal: number;
  total: number;
  shipping: Shipping;
  delivery_status: string;
  payment_status: string;
  date: string;
}

export interface OrderOfProducts {
  quantity: number;
  productId: Product;
}
