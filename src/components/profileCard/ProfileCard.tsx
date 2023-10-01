import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getUserData } from "../../redux/user/userSelectors";
import ModalText from "../modalText/ModalText";
import { useState } from "react";
import UptadeProfileInfo from "../uptadeProfileInfo";
import { Colors } from "../../styles";

const ProfileCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const user = useAppSelector(getUserData);
  const { name, email, avatar, password } = user ?? {
    name: "",
    email: "",
    avatar: "",
    password: "",
  };
  const maskedPassword = "*".repeat(password.length);
  return (
    <>
      <Card sx={{ maxWidth: 300, margin: "0 auto" }}>
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
          <Button
            size="small"
            color="primary"
            sx={{
              color: Colors.secondaryColor,
            }}
            onClick={() => {
              setOpenModal((prev) => !prev);
            }}
          >
            Uptade info
          </Button>
        </CardActions>
      </Card>
      <ModalText
        text="Choose the info you want to update"
        openModal={openModal}
        handleCloseModal={onCloseModal}
      >
        <UptadeProfileInfo handleCloseModal={onCloseModal} />
      </ModalText>
    </>
  );
};
export default ProfileCard;
