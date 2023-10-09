import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import { AxiosError } from "axios";

import { Colors } from "../../styles";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleInfo } from "../../types/GoogleProfile";
import requestToGoogle from "../../utils/requestToGoogle";

interface GoogleLoginButtonProps {
  sendGoogleInfo: (data: GoogleInfo) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  sendGoogleInfo,
}) => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await requestToGoogle(response);
        const { name, email, picture } = res;
        sendGoogleInfo({ name, email, picture });
      } catch (e) {
        const error = e as AxiosError;
        return error.message;
      }
    },
  });

  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          marginTop: "20px",
          padding: "7px ",
          background: Colors.googleBack,
          color: Colors.white,
          "&:hover": {
            background: Colors.googleHoverColor,
          },
        }}
        onClick={async () => {
          await login();
        }}
      >
        <GoogleIcon sx={{ marginRight: "5px" }} />
        Fill the form using your Google account
      </Button>
    </>
  );
};

export default GoogleLoginButton;
