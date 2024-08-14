import axios, { AxiosError, Method } from "axios";

interface RequestParams {
  url: string;
  method: Method;
  body?: any;
}

interface RequestError {
  message: string;
}

const BASE_URL = "http://localhost:8000";

export const sendRequest = async ({ url, method, body }: RequestParams) => {
  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method,
      data: body,
    });

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(
        err.response?.data.errors[0]?.message || "An error occurred"
      );
    } else {
      throw new Error("An error occurred");
    }
  }
};
