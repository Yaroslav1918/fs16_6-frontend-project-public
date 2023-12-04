import { CreateProductInput } from "./CreateProductInput";

export interface UpdateProductInput {
  update: Partial<CreateProductInput>;
  _id: string;
};
