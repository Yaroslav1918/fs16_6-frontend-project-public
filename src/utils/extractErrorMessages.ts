import { AxiosError } from "axios";
import { toast } from "react-toastify";

const extractErrorMessages = (e: unknown) => {
  const error = e as AxiosError;
  const errorResponse = JSON.parse(error.request.response);
  if (typeof errorResponse.message === "string") {
    toast.error(errorResponse.message);
    return errorResponse.message;
  } else if (Array.isArray(errorResponse.message)) {
    const errorMessage = errorResponse.message.join(", ");
    toast.error(errorMessage);
    return errorMessage;
  }
};
export default extractErrorMessages;
