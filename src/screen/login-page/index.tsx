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

const LoginPage = () => {
  const { t } = useTranslation("auth");
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center  p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t("welcome")}</CardTitle>
            <CardDescription>{t("login_subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t("login")}</TabsTrigger>
                <TabsTrigger value="signup">{t("signup")}</TabsTrigger>
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
