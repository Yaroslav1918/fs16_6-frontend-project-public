import { PaletteMode } from "@mui/material";
import { amber, grey } from "@mui/material/colors";
import { Colors } from "../../styles";

const theme = {
  palette: {
    primary: amber,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
          background: {
            default: Colors.backColor,
            paper: Colors.backColor,
            footer: Colors.bgFooter,
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          divider: grey[900],
          background: {
            default: Colors.blackMode,
            paper: Colors.bgFooter,
            footer: Colors.bgFooter,
          },
          text: {
            primary: grey[400],
            secondary: grey[400],
          },
        }),
  },
});

export default theme;
