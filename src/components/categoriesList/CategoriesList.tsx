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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import Container from "../container";
import { Product } from "../../types/Product";
import { useNavigate, useParams } from "react-router-dom";
import SortList from "../sortList";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addItemToCart } from "../../redux/cart/cartSlice";
import { Colors } from "../../styles";
import { useDebounce } from "../../hooks/useDebounce";
import { AppState } from "../../redux/store";
import { fetchAllProductAsync } from "../../redux/product/productOperations";

const CategoriesList = () => {
  const { categoryName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("" );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 9;
  const products = useAppSelector(
    (state: AppState) => state.productSlice.products
  );

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
  }, [categoryName]);


  useEffect(() => {
    dispatch(fetchAllProductAsync());
  }, [dispatch, currentPage]);
  
    
  const getFilteredCategories = (state: Product[], name?: string) => {
    return state.filter((p) =>
      p.category?.name.toLowerCase().includes(name?.toLowerCase() || "")
    );
  };

  const filteredCategoriesList = getFilteredCategories(
    products,
    selectedCategory
  );

  const getFilteredProducts = filteredCategoriesList.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = getFilteredProducts.slice(startIndex, endIndex);

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
          searchQuery={debouncedSearchQuery}
          categoryName={categoryName}
          setSearchQuery={setSearchQuery}
          onCategorySelect={setSelectedCategory}
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
                name,
                _id,
                images,
                description,
                category,
                stock,
              }: Product) => (
                <ImageListItem
                  key={_id}
                  sx={{
                    margin: "7px",
                    "&:hover": { transform: "scale(1.01)" },
                  }}
                  onClick={() => navigate(`/product/${_id}`)}
                >
                  <img
                    src={images[0]}
                    alt={name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://demofree.sirv.com/nope-not-here.jpg";
                    }}
                    loading="lazy"
                    style={{
                      borderRadius: "2%",
                      width: "350px",
                      height: "350px",
                    }}
                  />
                  <ImageListItemBar
                    sx={{ textAlign: "center" }}
                    title={
                      <Box
                        component="span"
                        sx={{ fontSize: { xs: 15, sm: 21 } }}
                      >
                        {name}
                      </Box>
                    }
                    subtitle={
                      <List sx={{ padding: "0" }}>
                        <ListItem
                          sx={{
                            color: Colors.secondaryColor,
                            fontSize: { xs: 15, sm: 18 },
                          }}
                        >
                          Price: {price} $
                        </ListItem>
                        <ListItem
                          sx={{
                            fontSize: { xs: 15, sm: 18 },
                            color: "inherit",
                          }}
                        >
                          Category: {category?.name}
                        </ListItem>
                      </List>
                    }
                    position="below"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "baseline",
                    }}
                  >
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newItem = {
                          _id,
                          name,
                          price,
                          description,
                          category,
                          images,
                          quantity: 1,
                          stock,
                        };
                        dispatch(addItemToCart(newItem));
                      }}
                      sx={{
                        color: "inherit",
                        padding: "10px",
                        fontSize: { xs: 15, sm: 15 },
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <ShoppingBasketIcon
                        sx={{ fontSize: { xs: 15, sm: 15 }, mr: 0.3 }}
                      />
                      Add to cart
                    </Button>
                    <Button
                      onClick={() => navigate(`/product/${_id}`)}
                      sx={{
                        background: "none",
                        padding: "10px",
                        color: Colors.secondaryColor,
                        fontSize: { xs: 15, sm: 15 },
                      }}
                    >
                      {" "}
                      Detail Info
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
            count={Math.ceil(getFilteredProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setCurrentPage(value);
            }}
          />
        )}
      </Container>
    </Box>
  );
};

export default CategoriesList;
