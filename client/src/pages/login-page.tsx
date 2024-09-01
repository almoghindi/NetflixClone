import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setUser } from "../store/slices/authSlice";
import { sendRequest } from "../hooks/use-request";
import { useNavigate } from "react-router-dom";
import HeaderLandingPage from "../layouts/header-landing-page";
import BackGroundLadingPage from "../assets/img/landing-page-assets/landing-page-background.jpg";
import { encryptObject, encryptString } from "../utils/encription";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const login = async (credentials: LoginFormInputs): Promise<void> => {
    try {
      const encryptedPassword = encryptString(credentials.password);
      const encryptedCredentials = {
        ...credentials,
        password: encryptedPassword,
      };

      console.log(encryptedPassword, "PASS LOGIN");
      const response = await sendRequest({
        port: 3001,
        url: "/api/auth/login",
        method: "POST",
        body: encryptedCredentials,
      });
      dispatch(setUser(response));

      const encryptedResponse: string | null = encryptObject(response);
      if (encryptedResponse) {
        localStorage.setItem("user", encryptedResponse as string);
      }
      if (user?.subscription === "NOT_PAID") {
        console.log(user, "USER IN LOGIN PAGE");
        navigation("/choose-payment");
      } else {
        navigation("/");
      }
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  const onSubmit = (data: LoginFormInputs) => {
    login(data);
  };

  return (
    <div
      className="bg-center"
      style={{
        backgroundImage: `url(${BackGroundLadingPage})`,
        minHeight: "80vh",
      }}
    >
      <div className="bg-black bg-opacity-60" style={{ minHeight: "80vh" }}>
        <header className="p-4">
          <HeaderLandingPage />
        </header>
        <main className="container mx-auto px-4 py-4 flex justify-center items-center">
          <div className="bg-black bg-opacity-70 p-16 rounded-lg max-w-md w-full text-white">
            <h2 className="text-3xl font-bold mb-6">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email or phone number"
                  {...register("email")}
                  className="w-full p-3 bg-gray-700 rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full p-3 bg-gray-700 rounded"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white p-3 rounded font-bold hover:bg-red-700 transition duration-300"
              >
                {"Sign In"}
              </button>
            </form>
            <div
              onClick={() => navigation("/forgot-password")}
              className="hover:text-gray-300 cursor-pointer mt-5 text-sm text-medium text-white hover:underline flex items-center justify-center"
            >
              Forgot password?
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-400">
                Remember me
              </label>
            </div>
            <p className="mt-4 text-gray-400">
              New to Netflix?{" "}
              <button
                type="button"
                onClick={() => navigation("/signup")}
                className="text-white hover:underline"
              >
                Sign up now
              </button>
            </p>
            <p className="mt-4 text-sm text-gray-400">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Learn more
              </a>
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
