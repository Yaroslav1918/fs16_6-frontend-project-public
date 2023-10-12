import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

import { DynamicInput } from "../../types/DynamicInput";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  createProductAsync,
  updateProductAsync,
} from "../../redux/product/productOperations";
import operations from "../../redux/user/userOperations";
import {
  fetchCategoriesAsync,
  fetchCreateCategoryAsync,
  fetchUptadeCategoryAsync,
} from "../../redux/category/categoryOperations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";

interface FormProps {
  formCategoriesFields: DynamicInput[];
  formProductsFields: DynamicInput[];
  formUsersFields: DynamicInput[];
  handleCloseModal: () => void;
  action: string;
  valueId: number;
  selectedCategory: string;
}

const AdminForm = ({
  formCategoriesFields,
  handleCloseModal,
  action,
  valueId,
  selectedCategory,
  formProductsFields,
  formUsersFields,
}: FormProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state: AppState) => state.categorySlice.categories
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (action) {
      case "add category":
        dispatch(fetchCreateCategoryAsync(formData));
        break;
      case "update category":
        const updatedCategory = {
          id: valueId,
          update: formData,
        };
        dispatch(fetchUptadeCategoryAsync(updatedCategory));
        break;
      case "update product":
        const updatedProduct = {
          id: valueId,
          update: formData,
        };
        dispatch(updateProductAsync(updatedProduct));
        break;
      case "add product":
        const imagesArray =
          formData.images !== undefined ? formData.images.split(",") : [];
        const product = {
          ...formData,
          images: imagesArray,
        };
        dispatch(fetchCategoriesAsync());
        dispatch(createProductAsync(product));
        break;
      case "add user":
        dispatch(operations.fetchRegisterAsync(formData));
        break;
      case "update user":
        const updatedUser = {
          id: valueId,
          update: formData,
        };
        dispatch(operations.fetchUptadeUserAsync(updatedUser));
        break;
      default:
        break;
    }
    handleCloseModal();
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        {selectedCategory === "categories" &&
          formCategoriesFields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              variant="outlined"
              fullWidth
              name={field.name}
              placeholder={field.placeholder || ""}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              sx={{ marginBottom: "15px" }}
            />
          ))}

        {selectedCategory === "products" &&
          formProductsFields.map((field) => {
            if (field.name === "categoryId" && action === "update product") {
              return null;
            }

            if (field.name === "categoryId") {
              return (
                <FormControl
                  key={field.name}
                  fullWidth
                  variant="filled"
                  sx={{ marginBottom: "15px" }}
                >
                  <InputLabel htmlFor="category-select">Category</InputLabel>
                  <Select
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    name={field.name}
                    inputProps={{
                      name: field.name,
                      id: "category-select",
                    }}
                  >
                    <MenuItem value="">Select a category</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }

            return (
              <TextField
                key={field.name}
                label={field.label}
                variant="outlined"
                fullWidth
                name={field.name}
                placeholder={field.placeholder || ""}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                sx={{ marginBottom: "15px" }}
              />
            );
          })}

        {selectedCategory === "users" &&
          formUsersFields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              variant="outlined"
              fullWidth
              name={field.name}
              placeholder={field.placeholder || ""}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              sx={{ marginBottom: "15px" }}
            />
          ))}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ margin: "0 auto" }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AdminForm;
