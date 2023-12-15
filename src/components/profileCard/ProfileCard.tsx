import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, TextField } from "@mui/material";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { AppState } from "../../redux/store";
import token from "../../utils/axiosAuth";
import baseURL from "../../utils/axiosInstance";
import { CurrentUserResponse } from "../../types/UserResponse";

function ProfileCard() {
  const [passwordForm, setPasswordForm] = useState<{
    oldPassword: string;
    newPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUserResponse>();
  const theme = useTheme();
  const userId = useAppSelector(
    (state: AppState) => state.userSlice.currentUser?._id
  );
  const authToken = useAppSelector((state: AppState) => state.userSlice.token);

  const isGoogleLoggedIn = useAppSelector(
    (state: AppState) => state.userSlice.currentUser?.isGoogleLoggedIn
  );

  const handlePasswordChange = async () => {
    try {
      token.set(authToken);
      const { data } = await baseURL.post(`/users/change-password`, {
        newPassword: passwordForm.newPassword,
      });
      setShowPasswordFields(false);
      setMessage(data.message);
      toast.success(data.message);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error);
    }
    setPasswordForm((prevState) => ({
      ...prevState,
      newPassword: "",
    }));
  };

  const verifyPassword = async () => {
    try {
      token.set(authToken);
      const { data } = await baseURL.post(`/users/verify-password`, {
        password: passwordForm.oldPassword,
      });
      setMessage(data.message);
      toast.success(data.message);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error);
    }
    setPasswordForm((prevState) => ({
      ...prevState,
      oldPassword: "",
    }));
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        token.set(authToken);
        const { data } = await baseURL.get(`/users/${userId}`);
        setCurrentUser(data);
      } catch (err) {
        const error = err as AxiosError;
        toast.error(error.message);
      }
    };
    userId && fetchCurrentUser();
  }, [authToken, userId]);

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          padding: "20px",
          margin: "160px auto 0",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CardMedia
          component="img"
          width="170"
          image={currentUser?.user.avatar}
          alt={currentUser?.user.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
            {currentUser?.user.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "17px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MailOutlineIcon
              sx={{
                fontSize: "20px",
                marginRight: "5px",
              }}
            />{" "}
            Email: {currentUser?.user.email}
          </Typography>
        </CardContent>
        {showPasswordFields &&
          !isGoogleLoggedIn &&
          (message === "" ||
            message === "Password is successfully changed") && (
            <>
              <TextField
                label="Old Password"
                type="password"
                fullWidth
                placeholder="Fill old password"
                margin="normal"
                value={passwordForm.oldPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    oldPassword: e.target.value,
                  })
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={verifyPassword}
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Submit old password
              </Button>
            </>
          )}
        {showPasswordFields &&
          !isGoogleLoggedIn &&
          message === "Password is valid" && (
            <>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePasswordChange}
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Submit new password
              </Button>
            </>
          )}

        {!showPasswordFields && !isGoogleLoggedIn && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowPasswordFields(true)}
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            Change password
          </Button>
        )}
      </Card>
    </>
  );
}

export default ProfileCard;
