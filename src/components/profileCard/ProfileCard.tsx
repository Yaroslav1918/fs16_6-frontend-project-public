import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "../../hooks/useAppSelector";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton } from "@mui/material";

function ProfileCard() {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const user = useAppSelector((state) => state.userSlice.currentUser);
  const { name, email, avatar, password } = user || {};
  const maskedPassword = password ? "*".repeat(password.length) : "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          margin: "90px auto 0",
          textAlign: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CardActionArea>
          <CardMedia component="img" width="140" image={avatar} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Password: {showPassword ? password : maskedPassword}
              <IconButton
                size="small"
                color="primary"
                onClick={togglePasswordVisibility}
                sx={{ marginLeft: "10px" }}
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default ProfileCard;
