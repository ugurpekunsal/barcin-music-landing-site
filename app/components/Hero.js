"use client";

import Link from "next/link";
import { useTranslations } from "../hooks/useTranslations";

export default function Hero() {
	const { t } = useTranslations();

	return (
		<section className="h-screen relative overflow-hidden">
			<video
				autoPlay
				loop
				muted
				playsInline
				className="absolute z-0 w-full h-full object-cover"
			>
				<source src="/videos/hero-video.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="relative z-10 h-full flex items-center justify-center">
				<div className="text-center bg-black bg-opacity-50 p-8 rounded-lg">
					<h1 className="barcin-logo text-6xl mb-4 text-purple-200">Barçın</h1>
					<p className="text-2xl mb-8 text-gray-200">{t("blendingEmotions")}</p>
					<Link
						href="https://open.spotify.com/artist/6cTIJAOGc7aOxEnSnSLKhb"
						className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
					>
						{t("listenNow")}
					</Link>
				</div>
			</div>
		</section>
	);
}
