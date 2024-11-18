"use client";

import { useTranslations } from "../hooks/useTranslations";

export default function LanguageSelector() {
	const { changeLanguage, locale } = useTranslations();

	return (
		<select
			onChange={(e) => changeLanguage(e.target.value)}
			value={locale}
			className="bg-purple-800 text-purple-200 hover:text-white px-2 py-1 rounded border border-purple-600 hover:border-purple-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
		>
			<option value="en">English</option>
			<option value="tr">Türkçe</option>
		</select>
	);
}
