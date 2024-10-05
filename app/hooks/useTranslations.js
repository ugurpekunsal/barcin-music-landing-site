"use client";

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";

const translations = {
	en: require("../locales/en/common.json"),
	tr: require("../locales/tr/common.json"),
};

const TranslationsContext = createContext();

export function TranslationsProvider({ children }) {
	const [locale, setLocale] = useState("en");

	useEffect(() => {
		const savedLocale = localStorage.getItem("locale") || "en";
		setLocale(savedLocale);
	}, []);

	const t = useCallback(
		(key, fallback = "") => {
			return translations[locale][key] || fallback || key;
		},
		[locale]
	);

	const changeLanguage = useCallback((newLocale) => {
		setLocale(newLocale);
		localStorage.setItem("locale", newLocale);
	}, []);

	return (
		<TranslationsContext.Provider value={{ t, changeLanguage, locale }}>
			{children}
		</TranslationsContext.Provider>
	);
}

export function useTranslations() {
	const context = useContext(TranslationsContext);
	if (context === undefined) {
		throw new Error(
			"useTranslations must be used within a TranslationsProvider"
		);
	}
	return context;
}
