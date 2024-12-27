"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupComponent from "./components/sigup";
import SigninComponent from "./components/signin";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";

const LoginPage = () => {
  const { t } = useTranslation("auth");
  return (
    <div>
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle>{t("welcome")}</CardTitle>
            <CardDescription>{t("login_subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-12 flex flex-col items-center gap-8">
              <Button customStyle="blur" className="w-full text-sm border-2 border-[#00000080]">
                {"Login with Google"}
              </Button>
              <hr className="h-[3px] w-full rounded-full bg-[#00000020]" />
            </div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className=" grid w-full h-full grid-cols-2 text-black font-bold bg-transfer border-2 border-[#00000080] rounded-md">
                <TabsTrigger
                  className="h-[35px] font-bold data-[state=active]:bg-[#000000a0] data-[state=active]:text-white "
                  value="login"
                >
                  {t("login")}
                </TabsTrigger>
                <TabsTrigger
                  className="h-[35px] font-bold data-[state=active]:bg-[#000000a0] data-[state=active]:text-white"
                  value="signup"
                >
                  {t("signup")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <SigninComponent />
              </TabsContent>

              <TabsContent value="signup">
                <SignupComponent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
