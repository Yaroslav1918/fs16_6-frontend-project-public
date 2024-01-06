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

import { useAppSelector } from "../../hooks/useAppSelector";
import { Colors } from "../../styles";
import ModalText from "../modals/modalText/ModalText";
import { AppState } from "../../redux/store";
import PayButton from "../payButton";
import { Product } from "../../types/Product";

const CartTotals = () => {
  const [openModal, setOpenModal] = useState(false);
  const productsItems = useAppSelector(
    (state: AppState) => state.cartSlice.cartProductItems
  );
  const isLoggenIn = useAppSelector(
    (state: AppState) => state.userSlice.isLoggedIn
  );

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const totalPrice = productsItems.reduce(
    (acc: number, { quantity, price }: { quantity: number; price: number }) =>
      acc + quantity * price,
    0
  );

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
      <TableContainer
        component={Paper}
        elevation={16}
        sx={{ bgcolor: "background.default" }}
      >
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
            {productsItems.map(({ _id, name, quantity, price }: Product) => (
              <TableRow key={_id}>
                <TableCell sx={{ fontSize: { xs: "13px", md: "20px" } }}>
                  {name} × {quantity}{" "}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: { xs: "13px", md: "20px" } }}
                >
                  {quantity * price} $
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
                {totalPrice} $
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
        {isLoggenIn ? (
          <PayButton />
        ) : (
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
        )}
      </Box>
      <ModalText
        text={
          !isLoggenIn
            ? "Only authenticated users can make purchases. Please log in first."
            : ""
        }
        openModal={openModal}
        handleCloseModal={onCloseModal}
      />
    </Box>
  );
};
export default CartTotals;
