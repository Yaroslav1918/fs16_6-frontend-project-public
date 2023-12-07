import { AxiosError } from "axios";
import { toast } from "react-toastify";

const extractErrorMessages = (e: unknown) => {
  const error = e as AxiosError;
  const errorResponse = JSON.parse(error.request.response);
  return errorResponse.issues.map((i: any) => {
    const errMessage = `Field: ${i.path[1]}; Reason: ${i.message}`;
    toast.error(errMessage);
    return errMessage;
  });
};
export default extractErrorMessages;
