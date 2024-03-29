import { AxiosError } from "axios";
import { toast } from "react-toastify";

const extractErrorMessages = (e: any) => {
  const error = e as AxiosError;
  const errorResponse = JSON.parse(error.request.response);
  if (errorResponse.message) {
    toast.error(errorResponse.message);
    return errorResponse.message;
  }
  return errorResponse.issues.map((i: any) => {
    const errMessage = `Field: ${i.path[1]}; Reason: ${i.message}`;
    toast.error(errMessage);
    return errMessage;
  });
};
export default extractErrorMessages;
