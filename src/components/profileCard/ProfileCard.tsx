import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";

import { useAppSelector } from "../../hooks/useAppSelector";
import { getUserData } from "../../redux/user/userSelectors";

const ProfileCard = () => {
  const theme = useTheme();
  const user = useAppSelector(getUserData);
  const { name, email, avatar, password } = user || {};
  const maskedPassword = password ? "*".repeat(password.length) : "";

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
              Password: {maskedPassword}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
    </>
  );
};
export default ProfileCard;
