import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import { AxiosError } from "axios";

import { Colors } from "../../styles";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleInfo } from "../../types/GoogleProfile";
import requestToGoogle from "../../utils/requestToGoogle";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchGoogleLogInAsync } from "../../redux/user/userOperations";


interface GoogleLoginButtonProps {
  
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
}) => {
   const dispatch = useAppDispatch();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(
        "🚀 ~ file: GoogleLoginButton.tsx:19 ~ onSuccess: ~ response:",
        response
      );
      try {
        const res = await requestToGoogle(response);

        // const { name, email, picture } = res;
        // sendGoogleInfo({ name, email, picture });
      } catch (e) {
        const error = e as AxiosError;
        return error.message;
      }
    },
  });

  return (
    <>
      <GoogleLogin
        containerProps={{
          style: {
            marginTop: "20px",
          },
        }}
       width= "590"
        onSuccess={(credentialResponse) => {
          if (credentialResponse) {
            console.log(
              "🚀 ~ file: GoogleLoginButton.tsx:43 ~ credentialResponse:",
              credentialResponse
            );
            dispatch(fetchGoogleLogInAsync(credentialResponse.credential));
            // sendGoogleInfo(credentialResponse.credential);
          }
        }}
        onError={() => {
          // Handle the Google login error here if needed
          console.log("Login Failed");
        }}
      ></GoogleLogin>
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
        Sign In using your Google account
      </Button>
    </>
  );
};

export default GoogleLoginButton;
