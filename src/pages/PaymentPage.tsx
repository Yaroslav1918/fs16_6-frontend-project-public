import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import Container from "../components/container";
import { Colors } from "../styles";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { resetToInitialState } from "../redux/cart/cartSlice";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    dispatch(resetToInitialState());
  }, [dispatch]);

  return (
    <Container sx={{ textAlign: "center" }}>
      <Box
        component="img"
        sx={{
          marginTop: "90px",
          marginBottom: "30px",
          width: "100%",
          maxWidth: "600px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
        alt={"Payment is success."}
        src={"/img/payment.jpg"}
      />
      <Button
        startIcon={<KeyboardDoubleArrowLeftIcon />}
        onClick={handleClick}
        sx={{ display: "flex", margin: "0 auto", color: Colors.redColor }}
      >
        Go to main page
      </Button>
    </Container>
  );
};

export default PaymentPage;
