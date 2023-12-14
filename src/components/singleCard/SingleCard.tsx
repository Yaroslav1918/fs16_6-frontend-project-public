import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchSingleAsync } from "../../redux/product/productOperations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Colors } from "../../styles";
import { addItemToCart } from "../../redux/cart/cartSlice";
import { AppState } from "../../redux/store";
import ImgModal from "../modals/imageModal";

const SingleCard = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { _id } = useParams();
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
    if (_id) {
      dispatch(fetchSingleAsync(_id));
    }
  }, [dispatch, _id]);

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "90px auto 0",
        backgroundColor: theme.palette.background.default,
        boxShadow: 5,
      }}
    >
      <Carousel showThumbs={false}>
        {images &&
          images.map((i, index) => (
            <CardMedia
              key={index}
              sx={{ width: "100%", height: 450 }}
              image={i}
              title={name}
              onClick={() => setSelectedImage(i || null)}
            />
          ))}
      </Carousel>

      <CardContent>
        <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "5px", fontSize: { xs: 15, sm: 18 } }}
        >
          Category: {category?.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "5px", fontSize: { xs: 15, sm: 18 } }}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: Colors.secondaryColor, fontSize: { xs: 15, sm: 18 } }}
        >
          Price: {price} $
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: 15, sm: 18 } }}
        >
          Stock: {stock} pieces
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleClickBack}
          sx={{
            display: "flex",
            alignItems: "baseline",
            background: "none",
            padding: "10px",
            color: Colors.secondaryColor,
            fontSize: { xs: 15, sm: 18 },
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: { xs: 15, sm: 18 }, mr: 0.3 }} />
          Back
        </Button>
        <Button
          onClick={() => {
            const newItem = {
              _id: _id || "",
              name: name || "",
              price: price || 0,
              description: description || "",
              category: category || { _id: "0", name: "", images: [] },
              images: images || [],
              quantity: 1,
              stock: stock || 0,
            };
            dispatch(addItemToCart(newItem));
          }}
          sx={{
            color: Colors.secondaryColor,
            fontSize: { xs: 15, sm: 18 },
            padding: "10px",
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <ShoppingBasketIcon
            sx={{
              color: Colors.secondaryColor,
              fontSize: { xs: 10, sm: 15 },
              mr: 0.3,
            }}
          />
          Add to cart
        </Button>
      </Box>
      <ImgModal
        open={!!selectedImage}
        handleClose={() => setSelectedImage(null)}
        selectedImage={selectedImage || ""}
      />
    </Card>
  );
};
export default SingleCard;
