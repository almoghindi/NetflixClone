import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginSuccess, signupSuccess } from "../store/slices/authSlice";
import { sendRequest } from "../hooks/use-request";
import { useNavigate } from "react-router-dom";

const authSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type AuthFormInputs = z.infer<typeof authSchema>;

const AuthForm: React.FC = () => {
  const navigation = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { error, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(authSchema),
  });

  const login = async (credentials: AuthFormInputs): Promise<void> => {
    try {
      const response = await sendRequest({
        port: 3001,
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      });
      dispatch(loginSuccess(response));
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("userId", response.user._id);
      navigation("/");
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };
  const signup = async (credentials: AuthFormInputs): Promise<void> => {
    try {
      const response = await sendRequest({
        port: 8000,
        url: "/api/auth/register",
        method: "POST",
        body: credentials,
      });
      dispatch(signupSuccess(response));
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const onSubmit = (data: AuthFormInputs) => {
    if (isLogin) {
      login(data);
    } else {
      signup(data);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6">
        {isLogin ? "Sign In" : "Sign Up"}
      </h2>
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
          disabled={isLoading}
          className="w-full bg-red-600 text-white p-3 rounded font-bold hover:bg-red-700 transition duration-300"
        >
          {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
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
        {isLogin ? "New to Netflix? " : "Already have an account? "}
        <button
          type="button"
          //onClick={() => setIsLogin(!isLogin)}
          onClick={() => navigation("/signup/")}
          className="text-white hover:underline"
        >
          {isLogin ? "Sign up now" : "Sign in"}
        </button>
      </p>
      {isLogin && (
        <p className="mt-4 text-sm text-gray-400">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a className="text-blue-500 hover:underline">Learn more</a>.
        </p>
      )}
    </div>
  );
};

export default AuthForm;
