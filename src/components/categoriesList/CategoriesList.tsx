import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {
  Box,
  Button,

  List,
  ListItem,
  Pagination,
  Typography,
} from "@mui/material";
import Container from "../container";
import { Product } from "../../types/Product";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SortList from "../sortList";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getProducts } from "../../redux/product/productSelectors";
import { fetchAllProductAsync } from "../../redux/product/productOperations";
import getFilteredProducts from "../../utils/getFilteredProducts";
import { addItemToCart } from "../../redux/cart/cartSlice";
import { Colors } from "../../styles";

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
          component="h4"
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "30px" }}
        >
          Check out what's new products of the trends we have to offer
        </Typography>
        <SortList
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <ImageList
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                    style={{ borderRadius: "2%" }}
                  />
                  <ImageListItemBar
                    sx={{ textAlign: "center", }}
                    title={title}
                    subtitle={
                      <List sx={{ padding: "0" }}>
                        <ListItem
                          sx={{
                            color: Colors.secondaryColor,
                            fontSize: "15px",
                          }}
                        >
                          Price: {price} $
                        </ListItem>
                        <ListItem
                          sx={{
                            fontSize: "15px",
                            color: "inherit",
                          }}
                        >
                          Category: {category.name}
                        </ListItem>
                      </List>
                    }
                    position="below"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly"
                    }}
                  >
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
                      sx={{
                        color: "inherit",
                        fontSize: { xs: 10, sm: 13 },
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <ShoppingBasketIcon
                        sx={{ fontSize: { xs: 10, sm: 15 }, mr: 0.3 }}
                      />
                      Add to cart
                    </Button>
                    <Button
                      onClick={() => navigate(`/product/${id}`)}
                      sx={{
                        background: "none",
                        color: Colors.secondaryColor,
                        fontSize: "20px",
                      }}
                    >
                      <ChevronRightIcon />
                    </Button>
                  </Box>
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
              marginTop: "30px",
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
