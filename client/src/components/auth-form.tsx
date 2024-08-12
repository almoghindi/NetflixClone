import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginSuccess, signupSuccess } from "../store/slices/authSlice";
import { sendRequest } from "../hooks/use-request";

const authSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type AuthFormInputs = z.infer<typeof authSchema>;

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const { error, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(authSchema),
  });

  const login = async (credentials: AuthFormInputs) : Promise<void> => {
    try {
      const response = await sendRequest({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      });
      dispatch(loginSuccess(response));
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("userId", response.user._id);
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };
  const signup = async (credentials: AuthFormInputs) : Promise<void> => {
    try {
      const response = await sendRequest({
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
    <div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading
            ? isLogin
              ? "Logging in..."
              : "Signing up..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </button>
      </form>
      {error && <p>{error}</p>}
      <p>
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <button type="button" onClick={() => setIsLogin(false)}>
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button type="button" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
