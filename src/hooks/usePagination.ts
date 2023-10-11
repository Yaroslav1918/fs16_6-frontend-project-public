import { useState, useEffect, useCallback } from "react";

import { useAppSelector } from "./useAppSelector";
import { AppState } from "../redux/store";

const usePagination = (selectedCategory: string, searchText: string) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState<any[]>([]);
  const users = useAppSelector((state: AppState) => state.userSlice.users);
  const categories = useAppSelector(
    (state: AppState) => state.categorySlice.categories
  );
  const products = useAppSelector(
    (state: AppState) => state.productSlice.products
  );

const handleSearch = useCallback((arr: any[]) => {
  return arr.filter((item) =>
    (item.name || item.title).toLowerCase().includes(searchText.toLowerCase())
  );
}, [searchText]);
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    switch (selectedCategory) {
      case "products":
        const filteredProducts = handleSearch(products);
        const slicedProducts = filteredProducts.slice(startIndex, endIndex);
        setDisplayedItems(slicedProducts);

        break;
      case "users":
        const filteredUsers = handleSearch(users);
        const slicedUsers = filteredUsers.slice(startIndex, endIndex);
        setDisplayedItems(slicedUsers);
        break;
      case "categories":
        const filteredCategories = handleSearch(categories);
        const slicedCategories = filteredCategories.slice(startIndex, endIndex);
        setDisplayedItems(slicedCategories);
        break;

      default:
        break;
    }
  }, [categories, endIndex, handleSearch, products, selectedCategory, startIndex, users]);

  let count = 1;
  let onChange: (event: React.ChangeEvent<unknown>, value: number) => void = (
    event,
    value
  ) => setCurrentPage(value);

  switch (selectedCategory) {
    case "products":
      count = Math.ceil(products.length / itemsPerPage);
      onChange = (event, value) => {
        setCurrentPage(value);
      };
      break;
    case "users":
      count = Math.ceil(users.length / itemsPerPage);
      onChange = (event, value) => {
        setCurrentPage(value);
      };
      break;
    case "categories":
      count = Math.ceil(categories.length / itemsPerPage);
      onChange = (event, value) => {
        setCurrentPage(value);
      };
      break;
    default:
      count = 1;
  }
  return {
    currentPage,
    displayedItems,
    count,
    onChange,
  };
};

export default usePagination;
