import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Colors } from "../../styles";
import styled from "@emotion/styled";
import SocialList from "../socialList";
import HiveIcon from "@mui/icons-material/Hive";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getCategories } from "../../redux/product/productSelectors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getLogin } from "../../redux/user/userSelectors";


const BlackBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`;

const StyledLink = styled(Link)({
  color: "inherit",
  fontSize: "19px",
  textDecoration: "none",
  cursor: "pointer",
});
export default function Footer() {
  const isLoggedIn = useAppSelector(getLogin)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Submitted:", values.email);
      resetForm();
    },
  });
  return (
    <Box
      component="footer"
      sx={{
        backgroundImage: "url('/img/footer.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        bgcolor: Colors.bgFooter,
        pt: 8,
        mt: 15,
        position: "relative",
        borderRadius: "1%",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg" sx={{ mb: -6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Contact info
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "19px" }}>
              Boston, MA 75421, USA
              <br />
              Phone: (555) 333-4422
              <br />
              Email: products@qodeinteractive.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Pages
            </Typography>
            <List>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledLink to={"/products"}> Products</StyledLink>
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledLink to={"/cart"}> Cart</StyledLink>
              </ListItem>
              {isLoggedIn && (
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <StyledLink to={"/profile"}> Profile</StyledLink>
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
              }}
            >
              <BlackBorderTextField
                id="email"
                name="email"
                label="Enter your email"
                InputLabelProps={{
                  style: { color: Colors.white },
                }}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  background: Colors.secondaryColor,
                  "&:hover": {
                    background: Colors.hoverColor,
                  },
                  marginLeft: "20px",
                }}
              >
                subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" align="center" sx={{ fontSize: "19px" }}>
            Connect with us:
          </Typography>
          <SocialList />
          <HiveIcon
            style={{
              margin: "0 auto",
              marginTop: "15px",
              marginBottom: "10px",
              display: "block",
            }}
          />
          <Typography
            variant="body2"
            align="center"
            sx={{ fontSize: "15px", paddingBottom: "20px" }}
          >
            © 2023 Qode Interactive All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
