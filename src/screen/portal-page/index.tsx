import React from "react";
// import { useTranslation } from "react-i18next";

const PortalPage = () => {
  // const { t } = useTranslation("translation");

  return (
    <div className="h-full w-full p-4   bg-backgound flex justify-center">
      <div className="w-full h-full bg-zinc-100 dark:bg-[#FFFFFF05] border rounded-xl p-4 pt-8">
        This is home portal page for manage your project in this platform you
        can create new project, manage your project, and also you can see the
        documentation of the project
      </div>
    </div>
  );
};

export default PortalPage;
