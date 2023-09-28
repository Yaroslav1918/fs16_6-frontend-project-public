import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  Pagination,
  Typography,
} from "@mui/material";
import Container from "../container";
import { Product } from "../../types/Product";
import { useNavigate } from "react-router-dom";
import FilterButton from "../filterButton";
import SortList from "../sortList";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getProducts } from "../../redux/product/productSelectors";
import { fetchAllProductAsync } from "../../redux/product/productOperations";
import getFilteredProducts from "../../utils/getFilteredProducts";
import { addItemToCart } from "../../redux/cart/cartSlice";

const CategoriesList = () => {
  const products = useAppSelector(getProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Clothes");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 9;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductAsync());
  }, [dispatch, currentPage]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };
  const filteredProductsByCategory = getFilteredProducts(
    products,
    selectedCategory
  );
  const filteredProducts = filteredProductsByCategory.filter(
    (product: Product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  const navigate = useNavigate();
  return (
    <Box component="section" pt={10}>
      <Container>
        <Typography
          component="h3"
          variant="h3"
          sx={{ textAlign: "center", fontSize: "25px" }}
        >
          Check out what's new products of the trends we have to offer
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FilterButton
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
          <SortList searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Box>

        <ImageList sx={{ display: "flex", flexWrap: "wrap" }}>
          {displayedProducts &&
            displayedProducts.map(
              ({
                price,
                title,
                id,
                images,
                description,
                category,
              }: Product) => (
                <ImageListItem key={id} sx={{ width: "33%" }}>
                  <img
                    srcSet={images
                      .map((i) => `${i}?w=248&fit=crop&auto=format&dpr=2 2x`)
                      .join(", ")}
                    src={images
                      .map((i) => `${i}?w=248&fit=crop&auto=format`)
                      .join(", ")}
                    alt={title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    sx={{ textAlign: "center" }}
                    title={title}
                    subtitle={
                      <List>
                        <ListItem>Title: {title}</ListItem>
                        <ListItem>Price: {price}</ListItem>
                        <ListItem>{description}</ListItem>
                      </List>
                    }
                    position="below"
                  />
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    size="small"
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      boxShadow: "none",
                    }}
                  >
                    <Button onClick={() => navigate(`/product/${id}`)}>
                      Read more
                    </Button>
                    <Button
                      onClick={() => {
                        const newItem = {
                          id,
                          title,
                          price,
                          description,
                          category,
                          images,
                        };
                        dispatch(addItemToCart(newItem));
                      }}
                    >
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </ImageListItem>
              )
            )}
        </ImageList>
        {displayedProducts.length === 0 ? (
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
            }}
          >
            Products not found
          </Typography>
        ) : (
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "15px",
            }}
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChange}
          />
        )}
      </Container>
    </Box>
  );
};

export default CategoriesList;
