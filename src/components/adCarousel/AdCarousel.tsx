import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Carousel } from "react-responsive-carousel";

import Container from "../container";

const images = [
  {
    label: "Enjoy a 20% discount on all products this Black Friday.",
    imgPath:
      "https://images.pexels.com/photos/5624976/pexels-photo-5624976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    label: "Invite a friend and get $50 towards your next shopping spree.",
    imgPath:
      "https://images.pexels.com/photos/7319110/pexels-photo-7319110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    label: "Save More with Our Bundle Deals!",
    imgPath:
      "https://images.pexels.com/photos/5650052/pexels-photo-5650052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    label: "Top pick of the week.",
    imgPath:
      "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const AdCarousel = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1
    );
  };

  return (
    <Box component="section" pt={10}>
      <Container>
        <Box sx={{ margin: "0 auto" }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            <Typography
              sx={{
                margin: "0 auto",
                fontSize: { xs: "17px", sm: "24px" },
              }}
            >
              {images[activeStep].label}
            </Typography>
          </Paper>
          <Carousel
            selectedItem={activeStep}
            onChange={setActiveStep}
            autoPlay
            interval={2000}
            infiniteLoop
            stopOnHover={false}
            emulateTouch
            showArrows={false}
          >
            {images.map((step, index) => (
              <Box key={index} style={{ marginTop: "10px" }}>
                <Box
                  component={"img"}
                  src={step.imgPath}
                  alt={step.label}
                  sx={{
                    height: { xs: "100%", sm: "500px" },
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </Box>
            ))}
          </Carousel>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext}>
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </Container>
    </Box>
  );
};

export default AdCarousel;
