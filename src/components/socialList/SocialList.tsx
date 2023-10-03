import { Box, Link } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import styled from "@emotion/styled";

import { Colors } from "../../styles";

const SocialLink = styled(Link)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: Colors.secondaryColor,
  transition: "background-color 0.2s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: Colors.hoverColor,
  },
  "&:not(:last-child)": {
    marginRight: 9,
  },
});

export default function SocialList() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <SocialLink href="https://www.facebook.com" target="_blank">
        <Facebook style={{ fontSize: 25, color: "white" }} />
      </SocialLink>
      <SocialLink href="https://www.twitter.com" target="_blank">
        <Twitter style={{ fontSize: 25, color: "white" }} />
      </SocialLink>
      <SocialLink href="https://www.instagram.com" target="_blank">
        <Instagram style={{ fontSize: 25, color: "white" }} />
      </SocialLink>
    </Box>
  );
}
