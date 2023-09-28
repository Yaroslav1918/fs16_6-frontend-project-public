import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { sortByPrice } from "../../redux/product/produtSlice";
import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

interface SortListProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SortList = ({ searchQuery, setSearchQuery }: SortListProps) => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    dispatch(sortByPrice(value));
  }, [dispatch, value]);

  return (
    <Box
      
    >
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
      />
    </Box>
  );
};
export default SortList;
