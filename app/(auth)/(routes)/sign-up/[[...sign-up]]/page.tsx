"use client";

import { LOGIN } from "@/app/constants/routes";
import { registerUser } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/app/validations/authValidations";
import { useForm } from "react-hook-form";
import ErrorText from "@/components/Common/ErrorText";

export default function Page() {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: () => {
      toast.success("Register success");
      router.push(LOGIN);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const registerUserHandler = async (data: any) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen py-40 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="mx-auto">
        <div className="flex flex-col w-10/12 mx-auto overflow-hidden bg-white shadow-lg lg:w-8/12 lg:flex-row rounded-xl">
          <div
            className="flex flex-col items-center justify-center w-full p-12 bg-center bg-no-repeat bg-cover lg:w-1/2
           bg-[url('/images/register-bg.png')]"
          >
            <h1 className="mb-3 text-3xl text-white">Welcome</h1>
            <div>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                suspendisse aliquam varius rutrum purus maecenas ac{" "}
                <a href="#" className="font-semibold text-purple-500">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="w-full px-12 py-16 lg:w-1/2">
            <h2 className="mb-4 text-3xl">Register</h2>
            <p className="mb-4">
              Create your account. It’s free and only take a minute
            </p>
            <form onSubmit={handleSubmit(registerUserHandler)}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    placeholder="First name"
                    className="px-2 py-1 border border-gray-400"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <ErrorText message={errors.firstName.message} />
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="px-2 py-1 border border-gray-400"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <ErrorText message={errors.lastName.message} />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-2 py-1 border border-gray-400"
                    {...register("email")}
                  />
                  {errors.email && <ErrorText message={errors.email.message} />}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="px-2 py-1 border border-gray-400"
                    {...register("username")}
                  />
                  {errors.username && (
                    <ErrorText message={errors.username.message} />
                  )}
                </div>
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-2 py-1 border border-gray-400"
                  {...register("password")}
                />
                {errors.password && (
                  <ErrorText message={errors.password.message} />
                )}
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-2 py-1 border border-gray-400"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <ErrorText message={errors.confirmPassword.message} />
                )}
              </div>
              <div className="mt-5">
                <input type="checkbox" className="border border-gray-400" />
                <span>
                  I accept the
                  <a href="#" className="font-semibold text-purple-500">
                    Terms of Use
                  </a>
                  &
                  <a href="#" className="font-semibold text-purple-500">
                    Privacy Policy
                  </a>
                </span>
              </div>
              <div className="mt-5">
                <button
                  className="w-full py-3 text-center text-white bg-purple-500"
                  disabled={isLoading}
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
