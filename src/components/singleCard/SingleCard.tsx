import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchSingleAsync } from "../../redux/product/productOperations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Colors } from "../../styles";
import { addItemToCart } from "../../redux/cart/cartSlice";
import { AppState } from "../../redux/store";

const SingleCard = () => {
  let { _id } = useParams();
  const numericId = Number(_id);
  const product = useAppSelector(
    (state: AppState) => state.productSlice.singleProduct
  );
  const { name, description, price, category, images, stock } = product || {};
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (numericId) {
      dispatch(fetchSingleAsync(numericId));
    }
  }, [dispatch, numericId]);

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "90px auto 0",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Carousel showThumbs={false}>
        {images &&
          images.map((i, index) => (
            <CardMedia
              key={index}
              sx={{ width: "100%", height: 500 }}
              image={i}
              title={name}
            />
          ))}
      </Carousel>

      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "5px" }}
        >
          Category: {category && category.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "5px" }}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: Colors.secondaryColor }}
        >
          Price: {price} $
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: Colors.secondaryColor }}
        >
          Stock: {stock}
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleClickBack}
          sx={{
            background: "none",
            color: Colors.secondaryColor,
            fontSize: "20px",
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() => {
            const newItem = {
              _id: numericId,
              name: name || "",
              price: price || 0,
              description: description || "",
              category: category || { _id: 0, name: "", images: [] },
              images: images || [],
              quantity: 1,
              stock: stock || 0,
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
          <ShoppingBasketIcon sx={{ fontSize: { xs: 10, sm: 15 }, mr: 0.3 }} />
          Add to cart
        </Button>
      </Box>
    </Card>
  );
};
export default SingleCard;
