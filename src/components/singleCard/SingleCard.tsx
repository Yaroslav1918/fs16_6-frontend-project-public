import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Product } from "../../types/Product";
import { fetchSingleAsync } from "../../redux/product/productOperations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getProduct } from "../../redux/product/productSelectors";
import { Colors } from "../../styles";
import { Box } from "@mui/material";
import { addItemToCart } from "../../redux/cart/cartSlice";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const SingleCard = () => {
  let { id } = useParams();
  const product = useAppSelector(getProduct);
  const { title, description, price, category, images } = product;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleAsync({ id }));
    }
  }, [dispatch, id]);

  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto" }}>
      <Carousel showThumbs={false}>
        {images.map((i, index) => (
          <CardMedia
            key={index}
            sx={{ width: "100%", height: 500 }}
            image={i}
            title={title}
          />
        ))}
      </Carousel>

      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "5px" }}
        >
          Category: {category.name}
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
          <ShoppingBasketIcon sx={{ fontSize: { xs: 10, sm: 15 }, mr: 0.3 }} />
          Add to cart
        </Button>
      </Box>
    </Card>
  );
};
export default SingleCard;
