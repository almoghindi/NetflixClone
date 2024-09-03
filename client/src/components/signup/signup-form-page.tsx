import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setUser } from "../../store/slices/authSlice";
import { sendRequest } from "../../hooks/use-request";
import HeaderLandingPage from "../../layouts/header-landing-page";
import { encryptObject, encryptString } from "../../utils/encription";
import { Link } from "react-router-dom";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type SignUpFormInputs = z.infer<typeof signUpSchema>;

interface SignUpPageFormProps {
  onNext: () => void;
}

const SignUpPageForm: React.FC<SignUpPageFormProps> = ({ onNext }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const signup = async (credentials: SignUpFormInputs): Promise<void> => {
    try {
      const encryptedPassword = encryptString(credentials.password);
      const encryptedCredentials = {
        ...credentials,
        password: encryptedPassword,
      };

      const response = await sendRequest({
        port: 3001,
        url: "/api/auth/register",
        method: "POST",
        body: encryptedCredentials,
      });
      console.log(response);

      dispatch(setUser(response));
      const encryptedResponse: string | null = encryptObject(response);
      if (encryptedResponse) {
        localStorage.setItem("user", encryptedResponse as string);
      }

      // if (user?.subscription === "NOT_PAID") {
      //   console.log(user, "USER IN LOGIN PAGE");
      //   navigation("/choose-payment");
      // }
      onNext(); // Proceed to the next step
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  const onSubmit = (data: SignUpFormInputs) => {
    signup(data);
  };

  return (
    <>
      <div
        style={{ minHeight: "80vh" }}
        className="min-h-screen flex flex-col bg-white"
      >
        <header className="bg-white border-b border-gray-200 py-0">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <HeaderLandingPage />

            <Link
              className="text-gray-600 font-semibold text-medium cursor-pointer hover:underline"
              to="/login"
            >
              Sign In
            </Link>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center bg-white justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded">
            <h1 className="text-3xl font-bold mb-4">
              Create a password to start your membership
            </h1>
            <p className="text-lg mb-6">
              Just a few more steps and you're done!
              <br />
              We hate paperwork, too.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full p-4 border border-gray-300 rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Add a password"
                  {...register("password")}
                  className="w-full p-4 border border-gray-300 rounded"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white p-4 rounded font-bold hover:bg-red-700 transition duration-300"
              >
                Next
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default SignUpPageForm;
