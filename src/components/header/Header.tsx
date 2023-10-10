import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import FitbitOutlinedIcon from "@mui/icons-material/FitbitOutlined";

import { Colors } from "../../styles";
import AuthList from "../authList";
import { Link, useNavigate } from "react-router-dom";
import CartButton from "../cartButton";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Avatar, Button, Tooltip, useTheme } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logOut } from "../../redux/user/userSlice";
import NightModeToggle from "../nightModeToggle";
import { AppState } from "../../redux/store";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const isLoggedIn = useAppSelector(
    (state: AppState) => state.userSlice.isLoggedIn
  );
  const role = useAppSelector(
    (state: AppState) => state.userSlice.currentUser?.role
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickToButton = (settings: string) => {
    if (settings === "Logout") {
      dispatch(logOut());
      navigate("/");
    } else {
      navigate("/profile");
    }
  };

  const pages = ["Products", "Cart"];
  if (isLoggedIn && role === "admin") {
    pages.push("Dashboard", "Profile");
  } else if (isLoggedIn && role !== "admin") {
    pages.push("Profile");
  }
  const settings = ["Profile", "Logout"];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
        color: Colors.black,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <FitbitOutlinedIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                marginRight: "20px",
                fontSize: "30px",
                color: Colors.secondaryColor,
              }}
            />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    key={page}
                    to={`/${page.toLocaleLowerCase()}`}
                    style={{
                      textDecoration: "none",
                      marginRight: index !== pages.length - 1 ? "25px" : "0",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to="/">
            <FitbitOutlinedIcon
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                marginRight: "20px",
                fontSize: "30px",
                color: Colors.secondaryColor,
              }}
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page, index) => (
              <Link
                key={page}
                to={`/${page.toLocaleLowerCase()}`}
                style={{
                  textDecoration: "none",
                  marginRight: index !== pages.length - 1 ? "25px" : "0",
                  color: theme.palette.text.primary,
                }}
              >
                {page}
              </Link>
            ))}
          </Box>
          <NightModeToggle />
          <CartButton />
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0, marginLeft: "30px" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Button
                      sx={{ color: theme.palette.text.primary }}
                      onClick={() => handleClickToButton(setting)}
                    >
                      {setting}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <AuthList />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
