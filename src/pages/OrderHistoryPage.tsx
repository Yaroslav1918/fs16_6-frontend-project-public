import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import token from "../utils/axiosAuth";
import { AppState } from "../redux/store";
import { useAppSelector } from "../hooks/useAppSelector";
import baseURL from "../utils/axiosInstance";
import OrderDetails from "../orderDetails";
import { Order } from "../types/Order";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = useAppSelector(
    (state: AppState) => state.userSlice.currentUser?._id
  );
  const authToken = useAppSelector((state: AppState) => state.userSlice.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        token.set(authToken);
        const { data } = await baseURL.get(`/payments/${userId}`);
        setOrders(data);
      } catch (err) {
        const error = err as AxiosError;
        toast.error(error.message);
      }
    };
    fetchOrders();
  }, [authToken, setOrders, userId]);

  return (
    <>
      <Box component="section" sx={{ padding: "50px 0 100px" }}>
        <Container>
          <Box
            sx={{
              backgroundImage: "url(/img/orders.jpg)",
              backgroundSize: "cover",
              borderRadius: "2%",
              backgroundPosition: "right 50% top 10%;",
              height: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              marginBottom: "70px",
            }}
          ></Box>
          {orders.length === 0 ? (
            <Typography
              gutterBottom
              variant="h6"
              component="h6"
              sx={{
                fontSize: { xs: "20px", md: "24px" },
                textAlign: "center",
              }}
            >
              Your history orders is currently empty. Start shopping now!
            </Typography>
          ) : (
            <>
              <>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  Your history
                </Typography>
                {orders.map((order) => (
                  <OrderDetails key={order._id} order={order} />
                ))}
              </>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default OrderHistoryPage;
