import { Product } from './Product';
export interface CreateProductInput extends Partial<Product> {
  categoryId?: string;
}