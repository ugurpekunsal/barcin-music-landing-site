"use client";

import { useTranslations } from "../../hooks/useTranslations";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LiveStreams from "../../components/LiveStreams";

export default function LivePage() {
	const { t } = useTranslations();

	return (
		<>
			<Header />
			<main>
				<LiveStreams />
				<section className="py-16 bg-white">
					<div className="container mx-auto px-6">
						<h2 className="text-3xl font-bold mb-8 text-center">
							{t("joinOurCommunity")}
						</h2>
						<div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8">
							<div className="md:w-1/2 space-y-6">
								<p className="text-lg">{t("communityDescription")}</p>
								<div>
									<h3 className="text-xl font-semibold mb-2">
										{t("communityFeatures")}
									</h3>
									<ul className="list-disc list-inside space-y-2">
										<li>{t("feature1")}</li>
										<li>{t("feature2")}</li>
										<li>{t("feature3")}</li>
										<li>{t("feature4")}</li>
									</ul>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-2">
										{t("recentActivities")}
									</h3>
									<ul className="space-y-2">
										<li>{t("activity1")}</li>
										<li>{t("activity2")}</li>
										<li>{t("activity3")}</li>
									</ul>
								</div>
							</div>
							<div className="md:w-1/2 flex justify-center">
								<iframe
									src="https://discord.com/widget?id=605447034488619025&theme=dark"
									width="350"
									height="500"
									allowtransparency="true"
									frameBorder="0"
									sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
									className="rounded-lg shadow-lg"
								></iframe>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
