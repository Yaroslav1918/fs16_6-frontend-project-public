import { useState, useEffect } from "react";

import { useAppSelector } from "./useAppSelector";
import { getCategories, getProducts } from "../redux/product/productSelectors";
import { getUsersData } from "../redux/user/userSelectors";

const usePagination = (selectedCategory: string) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState<any[]>([]);
  const categories = useAppSelector(getCategories);
  const products = useAppSelector(getProducts);
  const users = useAppSelector(getUsersData);
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    switch (selectedCategory) {
      case "products":
        const slicedProducts = products.slice(startIndex, endIndex);
        setDisplayedItems(slicedProducts);
        break;
      case "users":
        const slicedUsers = users.slice(startIndex, endIndex);
        setDisplayedItems(slicedUsers);
        break;
      case "categories":
        const slicedCategories = categories.slice(startIndex, endIndex);
        setDisplayedItems(slicedCategories);
        break;

      default:
        break;
    }
  }, [categories, endIndex, products, selectedCategory, startIndex, users]);

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
