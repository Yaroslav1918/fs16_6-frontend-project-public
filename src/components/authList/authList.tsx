import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

type AuthListProps = {
  onCloseMenu?: () => void;
  flexDirection?: Boolean;
};

export default function AuthList({
  onCloseMenu,
  flexDirection,
}: AuthListProps) {
  const theme = useTheme();
  
  return (
    <List
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: flexDirection && "column",
        padding: 0,
      }}
    >
      <ListItem sx={{ padding: 0 }}>
        <ListItemButton
          component={Link}
          to="/signIn"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
            marginRight: "5px",
            padding: 0,
            whiteSpace: "nowrap",
          }}
          onClick={onCloseMenu}
        >
          <ListItemText
            primary={"Log In" + (flexDirection ? "" : " /")}
            primaryTypographyProps={{ style: { fontSize: "17px" } }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem sx={{ padding: 0 }}>
        <ListItemButton
          component={Link}
          to="signUp"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
            marginRight: "5px",
            padding: 0,
            whiteSpace: "nowrap",
          }}
          onClick={onCloseMenu}
        >
          <ListItemText
            primary="Sign Up"
            primaryTypographyProps={{ style: { fontSize: "17px" } }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
