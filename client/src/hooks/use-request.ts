import axios, { AxiosError, Method } from "axios";

interface RequestParams {
  port: number;
  url: string;
  method: Method;
  body?: any;
  headers?: any;
}

interface RequestError {
  message: string;
}

const BASE_URL = "http://localhost:";

export const sendRequest = async ({
  port,
  url,
  method,
  body,
  headers,
}: RequestParams) => {
  try {
    console.log(`${BASE_URL}${url}`);
    const response = await axios({
      url: `${BASE_URL}${port}${url}`,
      method,
      data: body,
      headers: headers,
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
