import { GoogleLogin } from "@react-oauth/google";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchGoogleLogInAsync } from "../../redux/user/userOperations";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <GoogleLogin
        containerProps={{
          style: {
            marginTop: "20px",
          },
        }}
        width="590"
        onSuccess={(credentialResponse) => {
          if (credentialResponse) {
            dispatch(fetchGoogleLogInAsync(credentialResponse.credential));
          }
        }}
        onError={() => {
          toast.error("Login Failed");
        }}
      ></GoogleLogin>
    </>
  );
};

export default GoogleLoginButton;
