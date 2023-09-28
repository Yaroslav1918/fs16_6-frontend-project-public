import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Colors } from "../../styles";
import { CartState } from "../../types/Cart";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getCartProductItems } from "../../redux/cart/cartSelectors";
import { Product } from "../../types/Product";
import { removeItemFromCart } from "../../redux/cart/cartSlice";



interface Props {
  hideContent?: Boolean;
  style?: React.CSSProperties;
}

const CartItem = ({  hideContent, style }: Props) => {
  const dispatch = useAppDispatch();
  const cartProductItems = useAppSelector(getCartProductItems);
  const isMobileScreen = useMediaQuery("(max-width:539px)");
  const cellStyle = {
    fontSize: isMobileScreen ? "12px" : "16px",
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ background: Colors.white, ...style }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ my: 2, fontSize: { md: "30px", xs: "20px" } }}
      >
        Shop Cart
      </Typography>
      <Table sx={{ flex: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={cellStyle}>
              Product Cart
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
          </TableRow>
        </TableHead>
        <TableBody>
          {cartProductItems.map(
            ({ title, images, id, totalPrice, quantity, price }: Product) => (
              <TableRow key={id}>
                <TableCell
                  sx={{ display: "grid", placeItems: "center", ...cellStyle }}
                >
                  {!isMobileScreen && (
                    <CardMedia
                      component="img"
                      image={images[0]}
                      alt={title}
                      sx={{
                        width: "50px",
                        height: "50px",
                        marginRight: "5px",
                        borderRadius: "2px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  )}
                  {title}
                </TableCell>
                <TableCell align="center" sx={cellStyle}>
                  {price}
                </TableCell>
                <TableCell align="center" sx={cellStyle}>
                  {quantity}
                </TableCell>
                <TableCell align="center" sx={cellStyle}>
                  {totalPrice}
                </TableCell>
                {!hideContent && !isMobileScreen && (
                  <TableCell>
                    <IconButton
                      onClick={
                        () => 
                          dispatch(removeItemFromCart(id))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default CartItem;