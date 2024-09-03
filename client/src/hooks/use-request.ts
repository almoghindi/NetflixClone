import axios, { AxiosError, Method } from "axios";
interface RequestParams {
  port: number;
  url: string;
  method: Method;
  body?: any;
  headers?: any;
}
const SERVICES_URLS = {
  auth: import.meta.env.VITE_AUTH_URL as string,
  content: import.meta.env.VITE_CONTENT_URL as string,
  accounts: import.meta.env.VITE_ACCOUNTS_URL as string,
  payment: import.meta.env.VITE_PAYMENT_URL as string,
  recommender: import.meta.env.VITE_RECOMMENDER_URL as string,
  streamer: (import.meta.env.STREAMER as string) || "NONE",
};
console.log(SERVICES_URLS);
export const sendRequest = async ({
  port,
  url,
  method,
  body,
  headers,
}: RequestParams) => {
  try {
    const Service_Url =
      port === 3001
        ? SERVICES_URLS.auth
        : port === 3002
        ? SERVICES_URLS.accounts
        : port === 3003
        ? SERVICES_URLS.content
        : port === 3004
        ? SERVICES_URLS.payment
        : port === 3006
        ? SERVICES_URLS.recommender
        : SERVICES_URLS.streamer;
    console.log(`${Service_Url}${url}`);
    const response = await axios({
      url: `${Service_Url}${url}`,
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
