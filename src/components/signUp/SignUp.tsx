import { Box, Button, TextField, Typography } from "@mui/material";
import "react-app-polyfill/ie11";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../container/Container";
import { Colors } from "../../styles";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import operations from "../../redux/user/userOperations";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getLogin } from "../../redux/user/userSelectors";
import GoogleLoginButton from "../googleLoginButton";
import { GoogleInfo } from "../../types/GoogleProfile";


const SignUp = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getLogin);
  const navigate = useNavigate();
  const [googleInfo, setGoogleInfo] = useState<GoogleInfo>();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (googleInfo) {
      const { name, email, picture } = googleInfo;
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: prevFormData.name || name || "",
        email: prevFormData.email || email || "",
        avatar: prevFormData.avatar || picture || "",
      }));
    }
  }, [googleInfo]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    if (updatedFormData.avatar === "") {
      updatedFormData.avatar =
        "https://i.pinimg.com/originals/ea/76/c3/ea76c343f9bbd6917e9a094b9317ab9e.jpg";
    }
    dispatch(operations.fetchRegisterAsync(updatedFormData));
    setFormData({
      name: "",
      email: "",
      password: "",
      avatar: "",
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Box
      component="section"
      sx={{
        padding: "60px 0 100px",
      }}
    >
      <Container>
        <Typography
          component="h3"
          sx={{
            fontSize: { md: 30, xs: 15, sm: 20 },
            fontWeight: "600",
            textAlign: "center",
            color: Colors.black,
            marginBottom: "20px",
          }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label={"Name"}
            name="name"
            placeholder={!googleInfo?.name ? "Enter user name" : ""}
            required
            value={formData.name || ""}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
          />

          <TextField
            fullWidth
            name="email"
            variant="outlined"
            label={"Email"}
            type="email"
            required
            value={formData.email || ""}
            placeholder={!googleInfo?.email ? "Enter your email" : ""}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label={"Avatar"}
            name="avatar"
            value={formData.avatar || ""}
            placeholder={"Enter your avatar"}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label={"Password"}
            type="password"
            name="password"
            required
            value={formData.password || ""}
            placeholder={"Enter your password"}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: "16px",
              background: Colors.secondaryColor,
              "&:hover": {
                background: Colors.hoverColor,
              },
            }}
          >
            submit
          </Button>

          <GoogleLoginButton sendGoogleInfo={setGoogleInfo} />
        </Box>
      </Container>
    </Box>
  );
};
export default SignUp;
