"use client";

import { useTranslations } from "../hooks/useTranslations";

export default function LanguageSelector() {
	const { changeLanguage, locale } = useTranslations();

	return (
		<select
			onChange={(e) => changeLanguage(e.target.value)}
			value={locale}
			className="bg-purple-800 text-white px-2 py-1 rounded"
		>
			<option value="en">English</option>
			<option value="tr">Türkçe</option>
		</select>
	);
}
