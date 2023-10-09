import axios from "axios";
import { GoogleInfo, GoogleResponse } from "../types/GoogleProfile";

const constrequestToGoogle = async (response: GoogleResponse) => {
  try {
    const res = await axios.get<GoogleInfo>(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default constrequestToGoogle;
