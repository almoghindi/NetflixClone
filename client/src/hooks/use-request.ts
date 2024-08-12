import axios, { AxiosError, Method } from "axios";
import { useState } from "react";

interface useRequestParams {
  url: string;
  method: Method;
  body?: any;
  onSuccess?: (value?: any) => void;
}
interface RequestError {
  message: string;
}

export default function useRequest() {
  const [requestErrors, setRequestErrors] = useState<RequestError[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = async ({
    url,
    method,
    body,
    onSuccess,
  }: useRequestParams) => {
    try {
      setRequestErrors(null);
      setIsLoading(true);
      const response = await axios({
        url,
        method,
        data: body,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError)
        setRequestErrors(err.response?.data.errors);
      else setRequestErrors([{ message: "Some Error Occured" }]);
    }
    setIsLoading(false);
  };

  return { requestErrors, sendRequest, isLoading };
}