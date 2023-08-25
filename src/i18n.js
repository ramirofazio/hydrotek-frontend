import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

//Descomentar esta linea en caso de querer utilizar el detector automatico de lenguaje
//import LanguageDetector from 'i18next-browser-languagedetector';

i18n

  .use(Backend)
  //Descomentar esta linea en caso de querer utilizar el detector automatico de lenguaje
  // .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    fallbackLng: "es",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
