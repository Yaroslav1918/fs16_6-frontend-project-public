import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import baseURL from "../../utils/axiosInstance";
import { Colors } from "../../styles";
import { AppState } from "../../redux/store";
import { useAppSelector } from "../../hooks/useAppSelector";
import token from "../../utils/axiosAuth";

const PayButton = () => {
  const cart = useAppSelector(
    (state: AppState) => state.cartSlice.cartProductItems
  );
  const authToken = useAppSelector((state: AppState) => state.userSlice.token);
  const handleCheckout = async () => {
    try {
      token.set(authToken);
      const response = await baseURL.post("/payments/create-checkout-session", {
        cart,
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{
          background: Colors.secondaryColor,
          "&:hover": {
            background: Colors.hoverColor,
          },
          fontSize: { xs: "13px", md: "15px" },
        }}
        onClick={() => handleCheckout()}
      >
        Place order
      </Button>
    </>
  );
};

export default PayButton;
