import { ShoppingBasket } from "@mui/icons-material";
import { Badge, Button, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

import Popover from "@mui/material/Popover";
import { Colors } from "../../styles";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getTotalQuantity, getCartProductItems } from "../../redux/cart/cartSelectors";
import React from "react";
import CartItem from "../cartItem";



const CartButton = () => {
  const totalQuantity = useAppSelector(getTotalQuantity);
  const items = useAppSelector(getCartProductItems);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isDesktopScreen = useMediaQuery("(min-width: 1200px)");

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <Button
      component={Link}
      to="/cart"
      sx={{ color: Colors.black }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Badge
        showZero
        badgeContent={totalQuantity}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: Colors.secondaryColor, // Change the background color of the badge circle
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
          {items.length === 0 ? (
            <Typography sx={{ p: 1 }}>Shop Cart</Typography>
          ) : (
            <CartItem hideContent />
          )}
        </Popover>
      )}
    </Button>
  );
};

export default CartButton;
