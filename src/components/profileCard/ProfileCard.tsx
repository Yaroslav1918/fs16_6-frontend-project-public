import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { useAppSelector } from "../../hooks/useAppSelector";

function ProfileCard() {
  const theme = useTheme();
  const user = useAppSelector((state) => state.userSlice.currentUser);
  const { name, email, avatar, role } = user || {};

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          margin: "160px auto 0",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CardMedia component="img" width="140" image={avatar} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {role}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ProfileCard;
