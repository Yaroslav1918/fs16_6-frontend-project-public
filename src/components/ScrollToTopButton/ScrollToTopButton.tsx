import  { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useMediaQuery } from "@mui/material";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobileScreen = useMediaQuery("(max-width:900px)");

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<KeyboardArrowUpIcon />}
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: "16px",
        zIndex: 20,
        fontSize: "11px",
        right: "16px",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {!isMobileScreen && "To the top"}
    </Button>
  );
};

export default ScrollToTopButton;
