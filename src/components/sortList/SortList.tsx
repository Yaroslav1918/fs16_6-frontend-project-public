import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";
import { Box, TextField, useTheme } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { sortByPrice } from "../../redux/product/produtSlice";
import { fetchCategoriesAsync } from "../../redux/product/productOperations";
import { getCategories } from "../../redux/product/productSelectors";
import { useAppSelector } from "../../hooks/useAppSelector";

interface SortListProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const SortList = ({
  searchQuery,
  setSearchQuery,
  onCategorySelect,
  selectedCategory,
}: SortListProps) => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);
    const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  const handleCategoryClick = (event: SelectChangeEvent) => {
    onCategorySelect(event.target.value);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sortByPrice(value));
  }, [dispatch, value]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <FormControl
        sx={{
          minWidth: 150,
          marginRight: "10px",
          backgroundColor: theme.palette.background.default,
        }}
        size="small"
      >
        <InputLabel id="demo-select-small-label">Categories</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedCategory}
          label="Categories"
          onChange={handleCategoryClick}
        >
          {categories.map(({ id, name }) => (
            <MenuItem
              key={id}
              value={name}

            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 110, marginRight: "10px" }} size="small">
        <InputLabel id="demo-select-small-label">Sort By</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value={"desc"}>Sort by Highest Price</MenuItem>
          <MenuItem value={"asc"}>Sort by Lowest Price</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Search by Title"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchInputChange}
        size="small"
        sx={{ width: 140 }}
      />
    </Box>
  );
};
export default SortList;
