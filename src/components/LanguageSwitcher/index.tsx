"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import SelectComponent from "../Select";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleSelectChange = (lng: string) => {
    i18n.changeLanguage(lng).then(() => setCurrentLang(lng));
    console.log("Current language:", i18n.language);
  };

  const languageOptions = [
    { value: "en", label: 'EN' },
    { value: "th", label: 'TH' },
  ];

  return (
    <div className="flex space-x-2 items-center w-20">
      <SelectComponent
        placeholder="Select Language"
        options={languageOptions}
        onChange={handleSelectChange}
        defaultValue={currentLang}
      />
    </div>
  );
};

export default LanguageSwitcher;