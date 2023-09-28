import { Product } from "../types/Product";

 const getFilteredProducts = (state: Product[], name?: string) => {
  return state.filter((p) =>
    p.category.name.toLowerCase().includes(name?.toLowerCase() || "")
  );
};
export default getFilteredProducts;
