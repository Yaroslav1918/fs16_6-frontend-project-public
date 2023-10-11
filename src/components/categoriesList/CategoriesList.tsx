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
import { useNavigate } from "react-router-dom";
import SortList from "../sortList";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addItemToCart } from "../../redux/cart/cartSlice";
import { Colors } from "../../styles";
import { useDebounce } from "../../hooks/useDebounce";
import { AppState } from "../../redux/store";
import { fetchAllProductAsync } from "../../redux/product/productOperations";
import ImageModal from "../modals/imageModal";

const CategoriesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Clothes");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 9;
  const products = useAppSelector(
    (state: AppState) => state.productSlice.products
  );

  const handleOpenModal = (img: string) => {
    setSelectedImage(img);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchAllProductAsync());
  }, [dispatch, currentPage]);

  const getFilteredCategories = (state: Product[], name?: string) => {
    return state.filter((p) =>
      p.category.name.toLowerCase().includes(name?.toLowerCase() || "")
    );
  };

  const filteredCategoriesList = getFilteredCategories(
    products,
    selectedCategory
  );

  const getFilteredProducts = filteredCategoriesList.filter(
    (product: Product) =>
      product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
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
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://demofree.sirv.com/nope-not-here.jpg";
                    }}
                    loading="lazy"
                    style={{ borderRadius: "2%" }}
                    onClick={() => handleOpenModal(images[0])}
                  />
                  <ImageListItemBar
                    sx={{ textAlign: "center" }}
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
                      justifyContent: "space-evenly",
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
                          quantity: 1,
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
            count={Math.ceil(getFilteredProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setCurrentPage(value);
            }}
          />
        )}
        <ImageModal
          open={open}
          handleClose={() => setOpen(false)}
          selectedImage={selectedImage}
        />
      </Container>
    </Box>
  );
};

export default CategoriesList;
