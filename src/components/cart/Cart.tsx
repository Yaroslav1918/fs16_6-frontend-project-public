import { Box, List, Typography } from "@mui/material";

import CartItem from "../cartItem";
import Container from "../container";
import { Colors } from "../../styles";
import CartTotal from "../cartTotal";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";

const Cart = () => {
  const productItems = useAppSelector(
    (state: AppState) => state.cartSlice.cartProductItems
  );

  return (
    <Box component="section" sx={{ padding: "50px 0 100px" }}>
      <Container>
        <Box
          sx={{
            backgroundImage: "url(/img/cart.jpg)",
            backgroundSize: "cover",
            borderRadius: "2%",
            backgroundPosition: "right 50% top 10%;",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginBottom: "70px",
          }}
        >
          <Typography
            variant="h1"
            component="h2"
            sx={{
              color: Colors.white,
              fontSize: { md: 70, xs: 50, sm: 60 },
              position: "absolute",
              bottom: "20%",
            }}
          >
            Shop Cart
          </Typography>
        </Box>
        {productItems.length === 0 ? (
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            sx={{
              fontSize: { xs: "20px", md: "24px" },
              textAlign: "center",
            }}
          >
            Your shopping cart is currently empty. Start shopping now!
          </Typography>
        ) : (
          <>
            <List>
              <CartItem />
            </List>
            <CartTotal />
          </>
        )}
      </Container>
    </Box>
  );
};
export default Cart;
