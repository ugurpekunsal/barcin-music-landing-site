"use client";

import { useTranslations } from "../../hooks/useTranslations";
import Link from "next/link";

export default function SupportBarcin() {
	const { t } = useTranslations();

	return (
		<section className="py-16 bg-purple-100">
			<div className="container mx-auto px-6">
				<h2 className="section-heading">{t("supportBarcin")}</h2>
				<div className="max-w-2xl mx-auto text-center mb-8">
					<p className="mb-4">{t("supportMessage")}</p>
					<div className="flex justify-center space-x-4">
						<Link
							href="https://www.patreon.com/barcinmusic"
							className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
							target="_blank"
							rel="noopener noreferrer"
						>
							Patreon
						</Link>
						<Link
							href="https://www.buymeacoffee.com/barcinmusic"
							className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
							target="_blank"
							rel="noopener noreferrer"
						>
							Buy Me a Coffee
						</Link>
					</div>
				</div>
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-white p-4 rounded shadow">
							<h4 className="font-semibold mb-2">Papara</h4>
							<p>{t("paparaSupport")}</p>
						</div>
						<div className="bg-white p-4 rounded shadow">
							<h4 className="font-semibold mb-2">Shopier</h4>
							<p>{t("shopierDescription")}</p>
						</div>
						<div className="bg-white p-4 rounded shadow">
							<h4 className="font-semibold mb-2">PayPal</h4>
							<p>{t("paypalSupport")}</p>
						</div>
					</div>
				</div>
				<div className="mt-8 text-center">
					<h3 className="text-2xl font-semibold mb-4">
						{t("songListDescription")}
					</h3>
					<p className="mb-4">{t("songListDescription")}</p>
					<Link
						href="https://www.streamersonglist.com/t/barcinmusic/songs"
						className="text-purple-600 hover:text-purple-800"
					>
						{t("viewSongList")}
					</Link>
				</div>
			</div>
		</section>
	);
}
