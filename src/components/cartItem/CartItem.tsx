import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Product } from "../../types/Product";
import { decreaseQuantity, increaseQuantity } from "../../redux/cart/cartSlice";
import { AppState } from "../../redux/store";



const CartItem = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const productsItems = useAppSelector(
    (state: AppState) => state.cartSlice.cartProductItems
  );
  const isMobileScreen = useMediaQuery("(max-width:539px)");
  const cellStyle = {
    fontSize: isMobileScreen ? "12px" : "16px",
  };

  
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: 6,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={cellStyle}>
              Product
            </TableCell>
            <TableCell align="center" sx={cellStyle}>
              Price
            </TableCell>
            <TableCell align="center" sx={cellStyle}>
              Quantity
            </TableCell>
            <TableCell align="center" sx={cellStyle}>
              Total
            </TableCell>
            <TableCell align="center" sx={cellStyle}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsItems.map(
            ({ name, images, _id, quantity, price }: Product) => (
              <TableRow key={_id}>
                <TableCell align="center" sx={cellStyle}>
                  {!isMobileScreen && (
                    <CardMedia
                      component="img"
                      image={images[0]}
                      alt={name}
                      sx={{
                        width: "50px",
                        margin:"0 auto",
                        height: "50px",
                        borderRadius: "2px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  )}
                  {name}
                </TableCell>
                <TableCell align="center" sx={cellStyle}>
                  {price} $
                </TableCell>
                <TableCell align="center" sx={cellStyle}>
                  {quantity}
                </TableCell>
                <TableCell align="center" sx={cellStyle}>
                  {price * quantity} $
                </TableCell>
                <TableCell align="center" sx={cellStyle}>
                  <IconButton onClick={() => dispatch(decreaseQuantity(_id))}>
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={() => dispatch(increaseQuantity(_id))}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CartItem;
