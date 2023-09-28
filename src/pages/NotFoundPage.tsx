import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";


import { Colors } from "../styles";
import Container from "../components/container";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <Container>
      <Typography
        sx={{
          paddingTop: "80px",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        404 Not Found
        <br />
        The page you are looking for might have been removed or is temporarily
        unavailable. Please check the URL and try again.
      </Typography>
      <Button
        startIcon={<KeyboardDoubleArrowLeftIcon />}
        onClick={handleClick}
        sx={{ display: "flex", margin: "0 auto", color: Colors.logoColor }}
      >
        Go back
      </Button>
    </Container>
  );
};

export default NotFoundPage;
