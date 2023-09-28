import { Box, List, Typography } from "@mui/material";
import Container from "../container";
import { Colors } from "../../styles";
import { useSelector } from "react-redux";




import { useAppSelector } from "../../hooks/useAppSelector";
import { getCartProductItems, getTotalQuantity } from "../../redux/cart/cartSelectors";
import CartItem from "../cartItem";
import CartTotal from "../cartTotal";

const Cart = () => {
  const totalQuantity = useSelector(getTotalQuantity);

  return (
    <Box
      component="section"
      sx={{ background: Colors.backColor, padding: "50px 0 100px" }}
    >
      <Container>
        <Box
          sx={{
            backgroundImage: "url(/images/singleProduct.jpg)",
            backgroundSize: "cover",
            borderRadius: "2%",
            backgroundPosition: "right 50% top 45%;",
            height: "40vh",
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
              bottom: "10%",
            }}
          >
            Cart
          </Typography>
        </Box>
        {totalQuantity === 0 ? (
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            sx={{
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Cart is empty
          </Typography>
        ) : (
          <>
            <List>
              <CartItem  />
            </List>
           <CartTotal/>
          </>
        )}
      </Container>
    </Box>
  );
}
export default Cart;