import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";
import { Box, TextField, useTheme } from "@mui/material";
import Select from "@mui/material/Select";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { sortByPrice } from "../../redux/product/produtSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchCategoriesAsync } from "../../redux/category/categoryOperations";
import { AppState } from "../../redux/store";
import { Category } from "../../types/Category";

interface SortListProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string | undefined;
  categoryName: string | undefined;
}

const SortList = ({
  searchQuery,
  setSearchQuery,
  onCategorySelect,
  selectedCategory,
  categoryName,
}: SortListProps) => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state: AppState) => state.categorySlice.categories
  );
  const theme = useTheme();

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
      {!categoryName && (
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
            onChange={(event) => onCategorySelect(event.target.value)}
          >
            {categories.map(({ _id, name }: Category) => (
              <MenuItem key={_id} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl sx={{ minWidth: 110, marginRight: "10px" }} size="small">
        <InputLabel id="demo-select-small-label">Sort By</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label="Sort by"
          onChange={(event) => setValue(event.target.value)}
        >
          <MenuItem value={"desc"}>Sort by Highest Price</MenuItem>
          <MenuItem value={"asc"}>Sort by Lowest Price</MenuItem>
          <MenuItem value={"none"}>None</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchQuery}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(event.target.value);
        }}
        size="small"
        sx={{ width: 140 }}
      />
    </Box>
  );
};
export default SortList;
