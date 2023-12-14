import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Colors } from "../../styles";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundImage: "url(/img/hero.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: { xs: "center top", md: "center" },
        backgroundSize: "cover",
        height: { xs: "50vh", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        component="div"
        gutterBottom
        sx={{ color: Colors.white, fontSize: { xs: "28px", md: "47px" } }}
      >
        Discover Amazing Products
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: Colors.white, fontSize: { xs: "19px", md: "32px" } }}
      >
        Explore a Wide Range of Products and Services
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/products")}
        sx={{
          background: Colors.secondaryColor,
          "&:hover": {
            background: Colors.hoverColor,
          },
        }}
      >
        Learn More
      </Button>
    </Box>
  );
};

export default HeroSection;
