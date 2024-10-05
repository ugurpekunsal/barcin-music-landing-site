import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	lng: "en", // default language
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	resources: {
		en: {
			common: () => import("./public/locales/en/common.json"),
		},
		tr: {
			common: () => import("./public/locales/tr/common.json"),
		},
	},
});

export default i18n;
