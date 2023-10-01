import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import ModalText from "../modalText";
import { resetToInitialState } from "../../redux/cart/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { useAppSelector } from "../../hooks/useAppSelector";
import { getCartProductItems } from "../../redux/cart/cartSelectors";
import { Colors } from "../../styles";

const CartTotals = () => {
  const [openModal, setOpenModal] = useState(false);
  const cartItems = useAppSelector(getCartProductItems);
  const dispatch = useAppDispatch();


  const onCloseModal = () => {
    setOpenModal(false);
    dispatch(resetToInitialState());
  };
  const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <Box width="100%" mx="auto" mt={4}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontSize: { xs: "25px", md: "30px" } }}
      >
        YOUR ORDER
      </Typography>
      <TableContainer component={Paper} elevation={16}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: { xs: "13px", md: "20px" } }}>
                PRODUCT
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: { xs: "13px", md: "20px" } }}
              >
                SUBTOTAL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map(({ id, title, quantity, totalPrice }) => (
              <TableRow key={id}>
                <TableCell sx={{ fontSize: { xs: "13px", md: "20px" } }}>
                  {title} × {quantity}{" "}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: { xs: "13px", md: "20px" } }}
                >
                  {totalPrice} $
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontSize: { xs: "13px", md: "20px" } }}>
                Total
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: { xs: "13px", md: "20px" } }}
              >
                {total} $
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
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
          onClick={() => {
            setOpenModal((prev) => !prev);
          }}
        >
          Place order
        </Button>
      </Box>
      <ModalText
        text="The transaction was successful"
        openModal={openModal}
        handleCloseModal={onCloseModal}
      />
    </Box>
  );
};
export default CartTotals;
