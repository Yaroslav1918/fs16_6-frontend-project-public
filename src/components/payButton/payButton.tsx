import { Button } from "@mui/material";

import baseURL from "../../utils/axiosInstance";
import { Colors } from "../../styles";
import { AppState } from "../../redux/store";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toast } from "react-toastify";
import token from "../../utils/axiosAuth";
import { AxiosError } from "axios";

const PayButton = () => {
  const cart = useAppSelector(
    (state: AppState) => state.cartSlice.cartProductItems
  );
  const userId = useAppSelector(
    (state: AppState) => state.userSlice.currentUser?._id
  );
  const authToken = useAppSelector((state: AppState) => state.userSlice.token);

  const handleCheckout = async () => {
    try {
      token.set(authToken);
      const response = await baseURL.post("/payments/create-checkout-session", {
        cart,
        userId,
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
