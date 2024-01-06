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
import {
  fetchCreateCategoryAsync,
  fetchUptadeCategoryAsync,
} from "../../redux/category/categoryOperations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";
import validUrl from "../../utils/validUrl";
import {
  fetchCreateUserAsync,
  fetchUptadeUserAsync,
} from "../../redux/user/userOperations";
import useRoles from "../../hooks/useRoles";

interface FormProps {
  formCategoriesFields: DynamicInput[];
  formProductsFields: DynamicInput[];
  formUsersFields: DynamicInput[];
  handleCloseModal: () => void;
  action: string;
  uptadeId: string;
  selectedCategory: string;
}

const AdminForm = ({
  formCategoriesFields,
  handleCloseModal,
  action,
  uptadeId,
  selectedCategory,
  formProductsFields,
  formUsersFields,
}: FormProps) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const dispatch = useAppDispatch();
  const { roles } = useRoles(selectedCategory);
  const categories = useAppSelector(
    (state: AppState) => state.categorySlice.categories
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imagesArr = validUrl(formData.images)
      ? formData.images.slice(1, -1).replace(/\\"/g, '"').split('","')
      : formData.images;
    const category = {
      ...formData,
      images: imagesArr,
    };
    switch (action) {
      case "add category":
        dispatch(fetchCreateCategoryAsync(category));
        break;
      case "update category":
        {
          const updatedCategory = {
            _id: uptadeId,
            update: category,
          };
          dispatch(fetchUptadeCategoryAsync(updatedCategory));
        }
        break;
      case "update product":
        {
          const updatedProduct = {
            _id: uptadeId,
            update: {
              ...formData,
              images: imagesArr,
            },
          };
          dispatch(updateProductAsync(updatedProduct));
        }
        break;
      case "add product":
        {
          const product = {
            ...formData,
            images: imagesArr,
          };
          dispatch(createProductAsync(product));
        }
        break;
      case "add user":
        dispatch(fetchCreateUserAsync(formData));
        break;
      case "update user":
        {
          const updatedUser = {
            _id: uptadeId,
            update: formData,
          };
          dispatch(fetchUptadeUserAsync(updatedUser));
        }
        break;
      default:
        break;
    }
    handleCloseModal();
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    let parsedValue;
    switch (true) {
      case name === "price" && !isNaN(Number(value)):
        parsedValue = parseFloat(value);
        break;
      case name === "name" && !isNaN(value):
        parsedValue = parseFloat(value);
        break;
      default:
        parsedValue = value;
        break;
    }

    setFormData({
      ...formData,
      [name]: parsedValue,
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
              value={
                formData[field.name] || ""
              }
              onChange={handleInputChange}
              sx={{ marginBottom: "15px" }}
            />
          ))}

        {selectedCategory === "products" &&
          formProductsFields.map((field) => {
            if (field.name === "category" && action === "update product") {
              return null;
            }

            if (field.name === "category") {
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
                    {categories.map(
                      ({ _id, name }: { _id: string; name: string }) => (
                        <MenuItem key={_id} value={_id}>
                          {name}
                        </MenuItem>
                      )
                    )}
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
          formUsersFields.map((field) => {
            if (field.name === "role") {
              return (
                <FormControl
                  key={field.name}
                  fullWidth
                  variant="filled"
                  sx={{ marginBottom: "15px" }}
                >
                  <InputLabel htmlFor="roles-select">Role</InputLabel>
                  <Select
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    name={field.name}
                    inputProps={{
                      name: field.name,
                      id: "roles-select",
                    }}
                  >
                    <MenuItem value="">Select a roles</MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        {role.name}
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
