"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { CallSignIn } from "@/sevices";

type SigninFormInputs = {
  email: string;
  password: string;
};

const SigninComponent = () => {
  const { t } = useTranslation("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
    // clearErrors,
  } = useForm<SigninFormInputs>();

  const onSubmit: SubmitHandler<SigninFormInputs> = async (data) => {
    try {
      await CallSignIn(data);
    } catch (error) {
      if (error instanceof Error) {
        setInvalidLogin(true);
      }
    }
  };

  return (
    <div>
      {invalidLogin && (
        <div className="w-full p-4 my-4 border border-red-500 rounded-md flex justify-center items-center">
          <p className="text-red-500 text-sm">{t("invalid_login")}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="login-email">{t("email")}</Label>
          <Input
            id="login-email"
            type="email"
            {...register("email", { required: t("input_required") })}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="login-password">{t("password")}</Label>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: t("input_required") })}
              className={errors.email ? "border-red-500" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {t("login")}
        </Button>
      </form>
    </div>
  );
};

export default SigninComponent;
