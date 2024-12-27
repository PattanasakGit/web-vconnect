"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { CallSignUp } from "@/sevices";

type SignupFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
const SignupComponent = () => {
  const { t } = useTranslation("auth");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    CallSignUp(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: t("input_required") || "Email is required",
            })}
            className={errors.email ? "border-red-500 border-2" : "border-2 border-[#00000090]"}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: t("input_required") || "Password is required",
                minLength: {
                  value: 8,
                  message:
                    t("password_min_length") ||
                    "Password must be at least 8 characters",
                },
              })}
              className={errors.password ? "border-red-500 border-2" : "border-2 border-[#00000090]"}
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
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        
         {/* Confirm Password Input */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t("confirm_password")}</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={confirmShowPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: t("input_required") || "Please confirm your password",
                validate: (value) =>
                  value === watch("password") ||
                  t("passwords_not_match") ||
                  "Passwords must match",
              })}
              className={errors.confirmPassword ? "border-red-500 border-2" : "border-2 border-[#00000090]"}
            />
            <button
              type="button"
              onClick={() => setConfirmShowPassword(!confirmShowPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              {confirmShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full font-bold">
          {t("signup")}
        </Button>
      </form>
    </div>
  );
};

export default SignupComponent;
