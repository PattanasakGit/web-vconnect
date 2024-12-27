"use client";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import LoginPage from "@/screen/login-page";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect } from "react";

export default function Login() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light")
  }, [setTheme]);
  return (
    <div
      className="flex h-screen items-center bg-cover"
      style={{ backgroundImage: "url('/images/bg_login.webp')" }}
    >
      <div className="w-[65dvw] h-[98dvh] p-4">
        <div className="w-full h-full rounded-[20px]">
          <Image
            src="/images/login.webp"
            alt="login-image"
            className="w-full h-full object-cover rounded-xl"
            width={1260}
            height={750}
          />
        </div>
      </div>

      <div className="flex-1 flex-col items-center relative">
        <div className="flex items-center justify-end w-full pr-[80px] fixed top-6 -right-16">
          <LanguageSwitcher />
        </div>
        <LoginPage />
      </div>
    </div>
  );
}
