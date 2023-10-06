import { Category } from "./Category";

export interface UpdateCategoryInput {
  update: Partial<Category>;
  id: number;
}
