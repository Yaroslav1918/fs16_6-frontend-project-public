import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Colors } from "../../styles";

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        backgroundImage: "url(/img/hero.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
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
        sx={{ color: Colors.white }}
      >
        Discover Amazing Products
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: Colors.white, fontSize: "25px" }}
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
