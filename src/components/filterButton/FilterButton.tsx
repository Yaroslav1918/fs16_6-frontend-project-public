import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useEffect } from "react";

import { useAppSelector } from "../../hooks/useAppSelector";
import { getCategories } from "../../redux/product/productSelectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchCategoriesAsync } from "../../redux/product/productOperations";

interface FilterButtonProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const FilterButton = ({
  onCategorySelect,
  selectedCategory,
}: FilterButtonProps) => {
  const categories = useAppSelector(getCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup color="secondary" aria-label="medium secondary button group">
        {categories &&
          categories.map(({ name, id }) => (
            <Button
              key={id}
              onClick={() => handleCategoryClick(name)}
              sx={{
                backgroundColor:
                  selectedCategory === name ? "#007bff" : "#f0f0f0",
                color: selectedCategory === name ? "#fff" : "#000",
              }}
            >
              {name}
            </Button>
          ))}
      </ButtonGroup>
    </Box>
  );
};

export default FilterButton;
