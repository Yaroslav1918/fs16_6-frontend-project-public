import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { Colors } from "../../styles";

type AuthListProps = {
  onCloseMenu?: () => void;
  flexDirection?: Boolean;
};

export default function AuthList({
  onCloseMenu,
  flexDirection,
}: AuthListProps) {
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
            color: Colors.black,
            textDecoration: "none",
            marginRight: "5px",
            padding: 0,
            whiteSpace: "nowrap",
          }}
          onClick={onCloseMenu}
        >
          <ListItemText
            primary={"Sign In" + (flexDirection ? "" : " /")}
            primaryTypographyProps={{ style: { fontSize: "17px" } }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem sx={{ padding: 0 }}>
        <ListItemButton
          component={Link}
          to="signUp"
          sx={{
            color: Colors.black,
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
