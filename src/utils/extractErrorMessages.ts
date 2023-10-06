import { AxiosError } from "axios";
import { toast } from "react-toastify";

const extractErrorMessages = (e: unknown) => {
  const error = e as AxiosError;
  const errorResponse = JSON.parse(error.request.response);
  const errorMessage = errorResponse.message.join(", ");
  toast.error(errorMessage);
  return errorMessage;
};
export default extractErrorMessages;
