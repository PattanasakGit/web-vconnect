/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: require('../../public/locales/en/translation.json') },
  th: { translation: require('../../public/locales/th/translation.json') },
  // en: { auth: require("../../public/locales/en/auth.json") },
  // th: { auth: require("../../public/locales/th/auth.json") },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "th",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
