import { ShoppingBasket } from "@mui/icons-material";
import {
  Badge,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import React from "react";

import { Colors } from "../../styles";
import { useAppSelector } from "../../hooks/useAppSelector";
import CartItem from "../cartItem";
import { AppState } from "../../redux/store";

const CartButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isDesktopScreen = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const productsItems = useAppSelector(
    (state: AppState) => state.cartSlice.cartProductItems
  );

  const totalQuantity = productsItems.reduce(
    (acc: number, { quantity }: { quantity: number }) => acc + quantity,
    0
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Button
      component={Link}
      to="/cart"
      sx={{ color: theme.palette.text.primary }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Badge
        showZero
        badgeContent={totalQuantity}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: Colors.secondaryColor,
          },
        }}
      >
        <ShoppingBasket />
      </Badge>
      {isDesktopScreen && (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open && isDesktopScreen}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          {productsItems.length === 0 ? (
            <Typography sx={{ p: 1 }}>Shop Cart</Typography>
          ) : (
            <CartItem />
          )}
        </Popover>
      )}
    </Button>
  );
};

export default CartButton;
