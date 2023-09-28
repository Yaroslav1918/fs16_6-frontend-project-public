import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Product } from "../../types/Product";
import { fetchSingleAsync } from "../../redux/product/productOperations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getProduct } from "../../redux/product/productSelectors";

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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={images[0]} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          About: {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickBack}>
          Back
        </Button>
      </CardActions>
    </Card>
  );
};
export default SingleCard;
