import { AxiosError } from "axios";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { ToastContentProps, toast } from "react-toastify";

const extractErrorMessages = (e: unknown) => {
  const error = e as AxiosError;
  const errorResponse = JSON.parse(error.request.response);
  console.log("🚀 ~ file: extractErrorMessages.ts:7 ~ extractErrorMessages ~ errorResponse:", errorResponse.issues)
  if (typeof errorResponse.message === "string") {
    toast.error(errorResponse.message);
    return errorResponse.message;
  } else if (Array.isArray(errorResponse.message)) {
    const errorMessage = errorResponse.message.join(", ");
    toast.error(errorMessage);
    return errorMessage;
  } else if (Array.isArray(errorResponse.issues)) {
    errorResponse.issues.map((i: { message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined; errorMessage: any; }): any => {
      toast.error(i.message);
      return i.errorMessage;
    })
  }
};
export default extractErrorMessages;
