"use client";

import Link from "next/link";
import { useTranslations } from "../hooks/useTranslations";

export default function LiveStreams() {
	const { t } = useTranslations();

	return (
		<section id="live-streams" className="py-16 bg-purple-100">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold mb-8 text-center">
					{t("liveStreams")}
				</h2>
				<div className="flex flex-col md:flex-row items-center justify-center">
					<div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
						<div className="aspect-w-16 aspect-h-9">
							<iframe
								src="https://player.twitch.tv/?channel=barcinmusic&parent=barcin-music-landing-site.vercel.app"
								frameBorder="0"
								allowFullScreen={true}
								scrolling="no"
								height="378"
								width="620"
							></iframe>
						</div>
					</div>
					<div className="w-full md:w-1/2 text-center md:text-left">
						<h3 className="text-2xl font-semibold mb-4">{t("joinLive")}</h3>
						<p className="mb-6">{t("liveStreamDescription")}</p>
						<Link
							href="https://www.twitch.tv/barcinmusic"
							className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
						>
							{t("followOnTwitch")}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
