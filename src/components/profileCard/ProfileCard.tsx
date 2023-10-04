import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import ModalText from "../modalText/ModalText";
import UptadeProfileInfo from "../uptadeProfileInfo";
import { Colors } from "../../styles";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getRole, getUserData } from "../../redux/user/userSelectors";

const ProfileCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const role = useAppSelector(getRole);
  const user = useAppSelector(getUserData);
  const { name, email, avatar, password } = user || {};
  const maskedPassword = password ? "*".repeat(password.length) : "";

  const onCloseModal = () => {
    setOpenModal(false);
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
              Password: {maskedPassword}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {role === "admin" && (
            <Button
              size="small"
              color="primary"
              sx={{
                color: Colors.secondaryColor,
                margin: "0 auto"
              }}
              onClick={() => {
                setOpenModal((prev) => !prev);
              }}
            >
              Uptade info
            </Button>
          )}
        </CardActions>
      </Card>
      <ModalText
        text="Choose the info"
        openModal={openModal}
        handleCloseModal={onCloseModal}
      >
        <UptadeProfileInfo handleCloseModal={onCloseModal} />
      </ModalText>
    </>
  );
};
export default ProfileCard;
