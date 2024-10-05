"use client";

import { useTranslations } from "../hooks/useTranslations";

export default function About() {
	const { t } = useTranslations();

	return (
		<section id="about" className="py-16 bg-white">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold mb-8 text-center">
					{t("aboutBarcin")}
				</h2>
				<div className="max-w-2xl mx-auto text-center">
					<p className="mb-4">{t("aboutDescription")}</p>
					<p className="mb-4">{t("aboutDescription2")}</p>
					<p>{t("aboutDescription3")}</p>
				</div>
			</div>
		</section>
	);
}
